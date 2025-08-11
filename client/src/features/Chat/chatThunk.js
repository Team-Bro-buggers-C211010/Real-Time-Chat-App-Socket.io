import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (userId, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.get(`/messages/${userId}`);
      return res.data;
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch chat messages"
      );
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// export const fetchUsers = createAsyncThunk(
//   "chat/fetchUsers",
//   async (_, thunkAPI) => {
//     const axiosSecure = useAxiosSecure();
//     try {
//       const res = await axiosSecure.get("/messages/users");
//       return res.data;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch users");
//       return thunkAPI.rejectWithValue(err.response?.data);
//     }
//   }
// );

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.post(`/messages/send/${data.receiverId}`, data);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const fetchLastMessages = createAsyncThunk(
  "chat/fetchLastMessages",
  async (_, thunkAPI) => {
    const axiosSecure = useAxiosSecure();
    try {
      const res = await axiosSecure.get("/messages/last/messages");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch last messages");
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);