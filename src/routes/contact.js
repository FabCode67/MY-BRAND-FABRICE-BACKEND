import express from "express";
const router = express.Router();
import { authenticat }  from "../controllers/login";

import {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
}  from "../controllers/contact";

router.post("/contact", postMsg);
router.get("/contact", authenticat, getMsg);
router.delete("/contact/:id", authenticat, deleteContact);
router.get("/contact/count", authenticat, countContact);

export default router;
