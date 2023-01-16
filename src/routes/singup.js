import express from 'express'
const router = express.Router();
const { postuser, getUser} = require('./../controllers/signup');

router.post('/signup', postuser)

router.get("/signup", getUser);

module.exports = router
