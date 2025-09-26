import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../Socket.io/socketThunk.js";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.get("auth/check");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.post("/auth/signup", formData);
      thunkAPI.dispatch(connectSocket());
      toast.success("Account created successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.post("/auth/logout");
      toast.success("Logged out successfully");
      thunkAPI.dispatch(disconnectSocket());
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.post("/auth/login", formData);
      thunkAPI.dispatch(connectSocket());
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.put("/auth/update-profile", formData);
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Profile update failed");
    }
  }
);
