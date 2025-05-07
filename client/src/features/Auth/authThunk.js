import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
