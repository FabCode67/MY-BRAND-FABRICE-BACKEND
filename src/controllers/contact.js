


import express from 'express'
import contact from "./../../src/models/contact"

//post message
//get all messages
export const getMsg =  async(req,res)=>{
    try{
        const query = await contact.find()
        res.send(query)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }

}

export const postMsg = async(req,res)=>{
    try{
        const post = new contact({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message
        })
        await post.save()
        res.send(post)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }
}
//delete a message
export const deleteContact = async(req,res)=>{
    try{
        await contact.deleteOne({_id: req.params.id})
        res.status(204).send()
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }
}

module.export = postMsg
