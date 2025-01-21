import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profileImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true // createdAt, updatedAt save in database
    }
)

const User = mongoose.model("User", userSchema);

export default User;