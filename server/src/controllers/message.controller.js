import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import {
  getReceiverSocketId,
  getSenderSocketId,
  io,
} from "../lib/socket.io.js";

export const getLastMessages = async (req, res) => {
  try {
    const myId = req.user._id;

    // Step 1: Fetch all users except the logged-in user (same as getUsersForSideBar)
    const users = await User.find({ _id: { $ne: myId } })
      .select("userName profileImage email")
      .lean();

    // Step 2: Fetch the last message for each user
    const lastMessages = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.find({
          $or: [
            { senderId: myId, receiverId: user._id },
            { senderId: user._id, receiverId: myId },
          ],
        })
          .populate("senderId", "userName profileImage email")
          .populate("receiverId", "userName profileImage email")
          .lean()
          .sort({ createdAt: -1 })
          .limit(1); // Explicitly limit to 1 message

        return {
          user, // User details
          lastMessage: lastMessage[0] || null, // First message or null
        };
      })
    );

    // Step 3: Sort users by last message timestamp (WhatsApp-like)
    const sortedLastMessages = lastMessages.sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const bTime = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return bTime - aTime; // Most recent first
    });

    res.status(200).json(sortedLastMessages);
  } catch (err) {
    console.log("Error in getLastMessages: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
      .populate("senderId", "userName profileImage email")
      .populate("receiverId", "userName profileImage email")
      .lean()
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const sendMessages = async (req, res) => {
  try {
    const { message: text, attachment: image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "userName profileImage email")
      .populate("receiverId", "userName profileImage email")
      .lean();

    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getSenderSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    if(senderId) {
      io.to(senderSocketId).emit("newMessage", populatedMessage);
    }

    res.status(200).json(populatedMessage);
  } catch (err) {
    console.log("Error in sendMessages: ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
