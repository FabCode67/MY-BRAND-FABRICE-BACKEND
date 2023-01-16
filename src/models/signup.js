const mongoose = require('mongoose')
const signupSchema = mongoose.Schema({
    email:"String",
    username:"String",
    password:"String"
})

module.exports = mongoose.model("signup", signupSchema);