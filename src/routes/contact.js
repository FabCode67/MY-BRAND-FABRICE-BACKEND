
const express = require('express')
const router = express.Router();

const { postMsg, getMsg,deleteContact} = require('./../controllers/contact');

router.post('/contact', postMsg);
router.get("/contact", getMsg);
router.delete('/contact/:id', deleteContact);
module.exports = router;
