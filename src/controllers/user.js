import bcrypt from "bcrypt";
import User from "../models/user";

/*======================================REGISTER USER============================================== */

export const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const hashedComfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      saltRounds
    );

    // check if the email or username is already registered
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      res
        .status(400)
        .send({ status: "fail", message: "Email or username already exists" });
      return;
    }

    // Check if password and confirmPassword match
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      hashedComfirmPassword
    );

    if (!passwordsMatch) {
      res.status(400).send({
        status: "fail",
        message: "Password and Confirm Password do not match",
      });
      return;
    }

    // check if gender is either Male or Female
    if (req.body.gender !== "Male" && req.body.gender !== "Female") {
      res.status(400).send({ status: "fail", message: "Invalid Gender" });
      return;
    }

    // validate email
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(req.body.email)) {
      res.status(400).send({ status: "fail", message: "Invalid Email" });
      return;
    }

    // validate username length
    if (req.body.username.length < 3 || req.body.username.length > 15) {
      res.status(400).send({
        status: "fail",
        message: "Username must be between 3 and 15 characters",
      });
      return;
    }

    const post = new User({
      email: req.body.email,
      username: req.body.username,
      gender: req.body.gender,
      password: hashedPassword,
      confirmPassword: hashedComfirmPassword,
    });
    await post.save();
    res.status(200).send({ status: "success", data: post });
  } catch {
    res.status(404);
    res.send({ status: "fail", message: "Postman not found" });
  }
};
/*======================================REGISTER USER============================================== */

/*======================================GET ALL USER============================================== */

export const getUser = async (req, res) => {
  try {
    const query = await User.find();
    res.status(200).send({ status: "success", data: query });
  } catch {
    res.status(404);
    res.send({ status: "fail", message: "Postman not found" });
  }
};
/*======================================GET ALL USER============================================== */

/*======================================DELETE SINGLE USER============================================== */

export const deleteUser = async (req, res) => {
  try {
    // check if user exists
    const userToDelete = await User.findOne({ _id: req.params.id });
    if (!userToDelete) {
      res.status(404).send({ status: "fail", message: "user not found" });
      return;
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).send({ status: "fail", message: "user not found" });
  }
};

/*======================================DELETE SINGLE USER============================================== */

/*======================================COUNT ALL USERs============================================== */

export const countUser = async (req, res) => {
  try {
    // Count the number of blogs in the collection
    const userCount = await User.countDocuments();

    res.status(200).send({
      status: "success",
      message: `There are ${userCount} users in the collection.`,
    });
  } catch (err) {
    res.status(500).send({ status: "fail", message: "Error counting users" });
  }
};

/*======================================COUNT ALL USER============================================== */

