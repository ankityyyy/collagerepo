import express from 'express';
const app=express();
import mongoose from 'mongoose'
import { User } from './models/user.js';
import bcrypt from "bcrypt";
import crypto from "crypto";
import ExpressError from './utils/expressError.js';
import { wrapasync } from './utils/wrapAsync.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const dbUrl = process.env.ATLASDB_URL;
const Port=process.env.PORT || 3000;

import { StatusCodes } from "http-status-codes";



// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection successful");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
}
main(); 

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ THEN: JSON/body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/register",wrapasync(async(req,res,next)=>{
  console.log(req.body)
      const { username, password, name, email, number } = req.body;
     
     const foundUser= await User.findOne({username});

     if(foundUser){
        return   next( new ExpressError("User already exists",StatusCodes.CONFLICT));
     }

     let hashedPassword=await bcrypt.hash(password, 10)

     let newUser=new User({
    username,
    password: hashedPassword, 
    name,
    email,
    number,

     })
     
     await newUser.save();
     

    
   
    console.log(newUser)

    return res.status(StatusCodes.CREATED).json({ message: "User Registered" });
    

}))

app.post("/login",wrapasync(async(req,res,next)=>{
     let {username,password}=req.body;

   const  foundUser= await User.findOne({username});
   if (!foundUser) {
       return next(new ExpressError( "Username is wrong",StatusCodes.NOT_FOUND));
     }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
     return next(new ExpressError( "Password is worng",StatusCodes.NOT_FOUND));
   }

   const token = crypto.randomBytes(20).toString("hex");
     foundUser.token = token;
     await foundUser.save();
   

     return res.status(StatusCodes.OK).json({ token });

}))

app.use((req, res, next) => {
  console.warn(` Route not found: ${req.method} ${req.originalUrl}`);
  next(new ExpressError("Page not found", StatusCodes.NOT_FOUND));
});



  app.use((err, req, res, next) => {
    console.log("ERROR:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({ message });
  });
  


app.listen(8080,()=>{
    console.log('listen on port number 8080')
})