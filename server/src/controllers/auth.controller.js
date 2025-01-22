import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from './../models/user.model.js';
import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
    const {userName, email, password} = req.body;
    try {
        if(!userName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profileImage: newUser.profileImage,
            });
        }
        else {
            return res.status(400).json({message: "Invalid user data"});
        }
    }
    catch (err) {
        console.log("Error in signup: ", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            profileImage: user.profileImage,
        });
    } catch (err) {
        console.log("Error in login: ", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("token", "", {
            maxAge: 0
        });
        return res.status(200).json({message: "Logged out successfully"});
    } catch (err) {
        console.log("Error in logout: ", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profileImage} = req.body;
        const userId = req.user._id;
        if(!profileImage) {
            return res.status(400).json({message: "Profile image is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profileImage);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profileImage: uploadResponse.secure_url // upload response from cloudinary
        }, {new: true});
        res.status(200).json({updatedUser});
    } catch (err) {
        console.log("Error in updateProfile: ", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const checkAuth = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (err) {
        console.log("Error in checkAuth: ", err.message);
        return res.status(500).json({message: "Internal server error"});
    }
};