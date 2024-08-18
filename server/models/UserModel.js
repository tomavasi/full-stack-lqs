import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required: true
        },
        roles:{
            type: String,
            default: "Customer"
        },
        active:{
            type: Boolean,
            default: true
        }
    }
);
export const UserModel = mongoose.model("users", userSchema)