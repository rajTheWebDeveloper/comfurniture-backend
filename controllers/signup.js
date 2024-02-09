import express from 'express'
import SignUp from '../models/signup.js'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config({
    path:'../config/.env'
})




let signup=async (req,res)=>
{
    let {firstName,lastName,email,password}=req.body
    let baseUrl=process.env.BASE_URL || 'http://localhost:8000/'
    let profileImage=req.file
    console.log(profileImage+"Li")
    let foundUser=await SignUp.findOne({email})
    if(foundUser)
    {
        return res.send({success:true,data:"User already has an account. Try Signing In"})
    }
    if(!foundUser)
    {
        console.log("last jion");
        let userObject={profileImage:baseUrl+"public/"+profileImage.filename,...req.body}
        let newUser=await SignUp.create(userObject)
        let {firstName,email,_id}=newUser
        let token=jwt.sign({firstName,email,_id},process.env.JWT_PASSWORD,{expiresIn:"2h"})
        res.cookie('token',token)
        return res.send({success:true,data:newUser})
    }
    return res.send("Milan Ki Valli")
}



export default signup