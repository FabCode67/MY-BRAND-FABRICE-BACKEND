// eslint-disable-next-line template-literals
import express from 'express';

const router = express.Router();
const { authenticat } = require("../controllers/login");
const {
  registerUser,
  getUser,
  deleteUser,
  countUser,
} = require("../controllers/user");

router.post("/user", registerUser);
router.get("/user", authenticat, getUser);
router.delete("/user/:id", authenticat, deleteUser);
router.get("/user/count", authenticat, countUser);
export default  router;
