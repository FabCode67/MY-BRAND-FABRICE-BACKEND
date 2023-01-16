import express from 'express'
const router = express.Router();
const { loginUser, getlLoginUser } = require('./../controllers/login');

router.post('/login', loginUser)

router.get("/login", getlLoginUser);

module.exports = router
