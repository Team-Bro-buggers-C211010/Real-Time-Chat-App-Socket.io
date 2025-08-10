import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Error in verifyToken:", err.message);
        if (err.name === "MongoServerError") {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        res.status(401).json({ message: "Invalid token" });
    }
}