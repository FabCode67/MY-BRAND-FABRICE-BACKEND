const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email:"String",
    username:"String",
    gender:"String",
    password:"String",
    confirmPassword:"String"
})

module.exports = mongoose.model("user", userSchema);