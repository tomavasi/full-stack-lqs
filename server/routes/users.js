import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import { JWTverifier } from "../middleware/JWTverifier.js";



const router = express.Router()

router.get("/all", JWTverifier, async(req,res) =>{
    try{
        const users = await UserModel.find().select("-password").lean()
        if (!users?.length){
            return res.status(400).json({message: "Users not found"})
        }
        res.json(users)
    } catch(err) {
        console.log(err)
        res.status(500).send({message: err.message});
    }
})
router.post("/register", async (req, res)=>{
 try{
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).send({message: "All fields are required"})
    }
    const user = await UserModel.findOne({username})
    if (user) {
        return res.status(409).send({message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword, email});
    await newUser.save();

    res.status(201).json({message: "User registered successfully"})
} catch (err){
    console.log(err)
    res.status(500).send({message: err.message});
 }
});


export {router as userRouter};


