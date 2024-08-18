import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const mongodbUrl = process.env.MONGODB_BASE_URL

export const connectDB = async () => {
    try{
        await mongoose.connect(mongodbUrl)
    } catch (err) {
        console.log(err)
    }

}