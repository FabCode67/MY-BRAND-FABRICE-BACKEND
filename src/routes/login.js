import express from "express";

const router = express.Router();
const { login, getProfile } = require("../controllers/login");

router.post("/login", login);
router.post("/login", login);
router.get("/profile", getProfile);

export default router;
