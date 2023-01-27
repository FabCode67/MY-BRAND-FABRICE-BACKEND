// eslint-disable-next-line template-literals
import express from 'express';

const router = express.Router();
import { authenticat }  from "../controllers/login";
import {
  registerUser,
  getUser,
  deleteUser,
  countUser,
} from "../controllers/user";

router.post("/user", registerUser);
router.get("/user", authenticat, getUser);
router.delete("/user/:id", authenticat, deleteUser);
router.get("/user/count", authenticat, countUser);
export default  router;
