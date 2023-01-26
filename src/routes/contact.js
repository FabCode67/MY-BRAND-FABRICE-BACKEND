import express from "express";

const router = express.Router();

const {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
} = require("../controllers/contact");

router.post("/contact", postMsg);
router.get("/contact", getMsg);
router.delete("/contact/:id", deleteContact);
router.get("/contact/count", countContact);

export default router;
