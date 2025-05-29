import {configureStore} from '@reduxjs/toolkit'
import  authReducer from "../feature/Slice.jsx"

const Store=configureStore({
     reducer:{
auth:authReducer,

     }
})

export default Store;