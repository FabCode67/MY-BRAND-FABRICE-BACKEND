import express from 'express'
const router = express.Router();
const { registerUser, getUser, deleteUser,countUser} = require('./../controllers/user');


router.post('/user', registerUser)
router.get("/user", getUser);
router.delete('/user/:id', deleteUser);
router.get('/user/count', countUser);


  
  
module.exports = router
