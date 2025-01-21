import User from './../models/user.model.js';
import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
    const {userName, email, password} = req.body;
    try {
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.getSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        if(newUser){
            await newUser.save();
            return res.status(201).json({message: "User created successfully"});
        }
        else {
            return res.status(400).json({message: "Failed to create user"});
        }
    }
    catch (err) {

    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};