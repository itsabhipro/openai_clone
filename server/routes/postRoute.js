import express from "express";
import * as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();
const postRoutes = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SCRETE 
})
postRoutes.get("/",async (req,res)=>{
   try {
     const posts = await Post.find({});
     res.status(200).json({sucess:true,data:posts});
   } catch (error) {
    res.status(400).json({success:false,error:error});
   }
});

postRoutes.post("/",async (req,res)=>{
    const {name,prompt,photo} = req.body;
    try {
        const photoUrl = await cloudinary.uploader.upload(photo);
        const post = await Post.create({
            name,prompt,photo:photoUrl.url
        }); 
        res.status(201).json({
            success:true,
            data:post
        });
    } catch (error) {
       res.status(400).json({
        success:false,
        error:error
       }) 
    }
})

export default postRoutes;