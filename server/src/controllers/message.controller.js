import cloudinary from '../lib/cloudinary';
import User from '../models/user.model';
import Message from './../models/message.model';
export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log("Error in getUsersForSideBar: ", err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find( {
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        } );

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessages: ", err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const {text, image} = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (err) {
        console.log("Error in sendMessages: ", err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
