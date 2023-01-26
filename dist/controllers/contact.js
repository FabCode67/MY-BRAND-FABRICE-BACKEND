"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postMsg = exports.getMsg = exports.deleteContact = exports.default = exports.countContact = void 0;
var _contact = _interopRequireDefault(require("../models/contact"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ---------------------------GET ALL MESSAGES---------------------------- */

const getMsg = async (req, res) => {
  try {
    const query = await _contact.default.find();
    res.status(200).send({
      status: "success",
      data: query
    });
  } catch (err) {
    res.status(404);
    res.send({
      error: "Postman not found"
    });
  }
};

/* ---------------------------GET ALL MESSAGES---------------------------- */

/* ---------------------------POST MESSAGES---------------------------- */
exports.getMsg = getMsg;
const postMsg = async (req, res) => {
  try {
    const post = new _contact.default({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await post.save();
    if (post._id) {
      res.status(200).send({
        status: "success",
        data: post
      });
    } else {
      res.status(404).send({
        status: "fail",
        dada: "Failed to create contact"
      });
    }
  } catch (err) {
    res.status(404).send({
      status: "fail",
      dada: "Postman not found"
    });
  }
};

/* ---------------------------POST MESSAGE---------------------------- */

/* ---------------------------DELETE MESSAGE---------------------------- */
exports.postMsg = postMsg;
const deleteContact = async (req, res) => {
  try {
    const contactToDelete = await _contact.default.findOne({
      _id: req.params.id
    });
    if (!contactToDelete) {
      res.status(404).send({
        status: "fail",
        message: "message not found"
      });
      return;
    }
    await _contact.default.deleteOne({
      _id: req.params.id
    });
    res.status(200).json({
      status: "success",
      message: "message deleted successfully"
    });
  } catch (err) {
    res.status(404).send({
      status: "fail",
      message: err.message
    });
  }
};
/* ---------------------------DELETE MESSAGE ---------------------------- */

/* ---------------------------COUNT ALL MESSAGES---------------------------- */
exports.deleteContact = deleteContact;
const countContact = async (req, res) => {
  try {
    const contactCount = await _contact.default.countDocuments();
    res.status(200).send({
      status: "success",
      message: `There are ${contactCount} contacts in the collection.`
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      error: "Error counting contacts"
    });
  }
};

/* ---------------------------GET ALL MESSAGES---------------------------- */
exports.countContact = countContact;
var _default = {
  postMsg,
  getMsg,
  deleteContact,
  countContact
};
exports.default = _default;