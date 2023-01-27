import express from "express";
const router = express.Router();
import { authenticat }  from "../controllers/login";

const {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
} = require("../controllers/contact");

router.post("/contact", postMsg);
router.get("/contact", authenticat, getMsg);
router.delete("/contact/:id", authenticat, deleteContact);
router.get("/contact/count", authenticat, countContact);

export default router;
