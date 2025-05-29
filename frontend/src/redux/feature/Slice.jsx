import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log( localStorage.setItem("token", response.data.token))
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "login failed");
    }
  }
);


let initialState = {
  user: {},
  loading: false,
  error: null,
  success: false,
  isToken: false,
  loggedin: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionsRequest: [],
  allUserProfile: [],
  allUserProfileFetch: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    emptyMessage: (state) => {
      state.message = "";
    },
    setIsToken: (state) => {
      state.isToken = true;
    },
    setIsNotToken: (state) => {
      state.isToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        (state.loading = true), (state.message = "signup you..");
      })
      .addCase(signup.fulfilled, (state, action) => {
        (state.loading = false),
          (state.success = true),
          (state.loggedin = true),
          (state.message = action.payload.message);
      })
      .addCase(signup.rejected, (state, action) => {
        (state.success = false),
          (state.loggedin = false),
          (state.message = action.payload?.message || "Signup failed");
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "login you";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.loggedin = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "login failed";
        state.message = action.payload;
      })
      
  },
});
export const { emptyMessage, setIsNotToken, setIsToken, reset } =
  userSlice.actions;
export default userSlice.reducer;
