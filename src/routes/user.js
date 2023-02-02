// eslint-disable-next-line template-literals
import express from "express";
import { authenticat } from "../controllers/login";
import {
  registerUser,
  getUser,
  deleteUser,
  countUser,
} from "../controllers/user";

const router = express.Router();

router.post("/user", registerUser);
router.get("/user", getUser);
router.delete("/user/:id", authenticat, deleteUser);
router.get("/user/count", authenticat, countUser);
export default router;
