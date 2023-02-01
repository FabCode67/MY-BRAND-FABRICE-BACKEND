import contact from "../models/contact";

/* ---------------------------GET ALL MESSAGES---------------------------- */

export const getMsg = async (req, res) => {
  
    const query = await contact.find();
    res.status(200).json({ status: "success", data: query });
 
};

/* ---------------------------GET ALL MESSAGES---------------------------- */

/* ---------------------------POST MESSAGES---------------------------- */
export const postMsg = async (req, res) => {
  try {
    const post = new contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await post.save();
      res.status(200).send({ status: "success", data: post });
    } catch(err) {
      res.status(404)
        .send({ status: "fail", message: "Failed to create contact" });
    }
  
};

/* ---------------------------POST MESSAGE---------------------------- */

/* ---------------------------DELETE MESSAGE---------------------------- */

export const deleteContact = async (req, res) => {
  
    const contactToDelete = await contact.findOne({ _id: req.params.id });
    if (!contactToDelete) {
      res.status(404).send({ status: "fail", message: "message not found" });
      return;
    }
    await contact.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json({ status: "success", message: "message deleted successfully" });
};
/* ---------------------------DELETE MESSAGE ---------------------------- */

/* ---------------------------COUNT ALL MESSAGES---------------------------- */
export const countContact = async (req, res) => {
 
    const contactCount = await contact.countDocuments();
    res.status(200).send({
      status: "success",
      message: `There are ${contactCount} contacts in the collection.`,
    });
};

/* ---------------------------GET ALL MESSAGES---------------------------- */

export default {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
};
