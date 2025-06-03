import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

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
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
)
