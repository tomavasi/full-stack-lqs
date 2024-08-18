import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";


const router = express.Router()

router.post("/login",  async (req, res)=>{
    try{
       const {username, password} = req.body;
       if (!username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
       const user = await UserModel.findOne({username})
       if (!user) {
           return res.status(401).json({message: "Unauthorised"})
       }
       const validPassword = await bcrypt.compare(password,user.password)

       if (!validPassword){
        return res.status(401).json({message: "Unauthorised"})
       }

       const accessToken = jwt.sign({
        id: user._id,
        roles: user.roles
    }, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s'}
    )
        const refreshToken = jwt.sign({
        id: user._id
        }, process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'})

    res.cookie("jwt", refreshToken, {
        httpOnly:true,
        secure:false,
        sameSite: 'None',
        maxAge: 7 * 24 * 360 * 1000
    })
       res.json({accessToken, userID: user._id})
   } catch (err){
       console.log(err)
       res.status(500).send({message: err.message});
    }
   });

router.get("/refresh", async(req, res)=>{
    try{
        const cookies = req.cookies

        if (!cookies?.jwt) {
            return res.status(401).json({message: "Unauthorized"})
    }

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err,decoded) =>{
            console.log(decoded)
            if (err) {
                return res.status(403).json({message: "Forbidden"})
            }

            const user = await UserModel.findOne({_id: decoded.id})
            if(!user) {
                return res.status(401).json({message: "Unauthorized"})
            }
            const accessToken = jwt.sign({
                id: user._id,
                roles: user.roles
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}
            )
            res.send({accessToken})
        }
    )

    }catch (err){
        console.log(err)
        res.status(500).send({message: err.message});
     }
});

router.delete("/logout", async (req, res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    res.clearCookie("jwt",{
        httpOnly:true,
        secure:false,
        sameSite: 'None'})
    res.json({message: "cookie cleared"})
})

   export {router as authRouter}