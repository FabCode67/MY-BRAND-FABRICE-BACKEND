import bcrypt  from 'bcrypt';
import login  from "./../models/login"

export const loginUser = async(req,res)=>{
    try{
        const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const post = new login({
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





export const getlLoginUser = async(req,res)=>{
    try{
        const query = await login.find()
        res.send(query)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }

}


