import express from "express";
import { authenticat } from "../controllers/login";

import {
  postMsg,
  getMsg,
  deleteContact,
  countContact,
} from "../controllers/contact";

const router = express.Router();

router.post("/contact", postMsg);
router.get("/contact", authenticat, getMsg);
router.delete("/contact/:id", authenticat, deleteContact);
router.get("/contact/count",  countContact);

export default router;
