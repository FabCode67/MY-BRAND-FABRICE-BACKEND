
import contact from "./../../src/models/contact"

       /* ---------------------------GET ALL MESSAGES---------------------------- */
export const getMsg =  async(req,res)=>{
    try{
        const query = await contact.find()
        res.send(query)
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }

}
       /* ---------------------------GET ALL MESSAGES---------------------------- */




       /* ---------------------------POST MESSAGES---------------------------- */
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
       /* ---------------------------POST MESSAGE---------------------------- */




       /* ---------------------------DELETE MESSAGE---------------------------- */

export const deleteContact = async(req,res)=>{
    try{
        const contactToDelete = await contact.findOne({_id: req.params.id});
        if (!contactToDelete) {
            res.status(404).send({ error: 'message not found' });
            return;
        }
        await contact.deleteOne({_id: req.params.id})
        res.status(200).json({message:"message deleted successfully"})
    }catch{
        res.status(404)
        res.send({error:"Postman not found"})
    }
}
       /* ---------------------------DELETE MESSAGE ---------------------------- */



       /* ---------------------------COUNT ALL MESSAGES---------------------------- */
       export const countContact = async (req, res) => {
    try {
        const contactCount = await contact.countDocuments();
        res.status(200).send({ message: `There are ${contactCount} contacts in the collection.` });
    } catch (err) {
        res.status(500).send({ error: "Error counting contacts" });
    }
}


       /* ---------------------------GET ALL MESSAGES---------------------------- */

module.exports = { postMsg, getMsg, deleteContact,countContact }