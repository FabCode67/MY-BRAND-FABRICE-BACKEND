import express from 'express'
import bcrypt  from 'bcrypt';
import signup  from "./../models/signup"

export const postuser = async(req,res)=>{
    try{
        const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const post = new signup({
            email:req.body.email,
            username:req.body.username,
            password:hashedPassword
        });
        await post.save()
        res.send(post)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }
   
};





export const getUser = async(req,res)=>{
    try{
        const query = await signup.find()
        res.send(query)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }

}


