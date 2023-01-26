import contact from "../models/contact";

/* ---------------------------GET ALL MESSAGES---------------------------- */

export const getMsg = async (req, res) => {
  try {
    const query = await contact.find();
    res.status(200).send({ status: "success", data: query });
  } catch (err) {
    res.status(404);
    res.send({ error: "Postman not found" });
  }
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
    if (post._id) {
      res.status(200).send({ status: "success", data: post });
    } else {
      res
        .status(404)
        .send({ status: "fail", dada: "Failed to create contact" });
    }
  } catch (err) {
    res.status(404).send({ status: "fail", dada: "Postman not found" });
  }
};

/* ---------------------------POST MESSAGE---------------------------- */

/* ---------------------------DELETE MESSAGE---------------------------- */

export const deleteContact = async (req, res) => {
  try {
    const contactToDelete = await contact.findOne({ _id: req.params.id });
    if (!contactToDelete) {
      res.status(404).send({ status: "fail", message: "message not found" });
      return;
    }
    await contact.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ status: "success", message: "message deleted successfully" });
  } catch (err) {
    res.status(404).send({ status: "fail", message: err.message });
  }
};
/* ---------------------------DELETE MESSAGE ---------------------------- */

/* ---------------------------COUNT ALL MESSAGES---------------------------- */
export const countContact = async (req, res) => {
  try {
    const contactCount = await contact.countDocuments();
    res.status(200).send({
      status: "success",
      message: `There are ${contactCount} contacts in the collection.`,
    });
  } catch (err) {
    res.status(500).send({ status: "fail", error: "Error counting contacts" });
  }
};

/* ---------------------------GET ALL MESSAGES---------------------------- */

export default {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
};
