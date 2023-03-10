import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();
const secretKey = process.env.SECRETKEY;
const admin_username = process.env.ADMIN_USERNAME_LOGIN
const admin_password = process.env.ADMIN_PASSWORD_LOGIN

/*= ====================================================USER LOGIN========================================= */
// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     const isPasswordValid = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!(isPasswordValid && user)) {
//       res
//         .status(401)
//         .send({ status: "fail", message: "Invalid password or Username" });
//       return;
//     }


//     const payload = {
//       userId: user._id,
//       username: user.username,
//     };
//     const token = jwt.sign(payload, secretKey);
//     res.setHeader("Authorization", `Bearer ${token}`);
//     res.send({
//       status: "success",
//       message: `welcome ${user.username} `,
//       data: token,
//     });
//   } catch (error) {
//     res.status(404).send({ status: "fail", message: "Error logging in" });
//   }
// };
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!(isPasswordValid && user)) {
      res
        .status(401)
        .send({ status: "fail", message: "Invalid password or username" });
      return;
    }

    let role= 'isUser';
    if (req.body.username === admin_username && req.body.password === admin_password) {
      role = "isAdmin";
    } 

    const payload = {
      userId: user._id,
      username: user.username,
      role: role
    };
    const token = jwt.sign(payload, secretKey);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      status: "success",
      message: `Welcome ${user.username}`,
      data: token,
      role:role
    });
  } catch (error) {
    res.status(404).send({ status: "fail", message: "Error logging in" });
  }
};

/*= ====================================================USER LOGIN========================================= */

/*= ====================================================USER PROFILE========================================= */


export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({ status: "fail", error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ _id: decoded.userId });
    res.send({ status: "success", data: user });
  } catch (error) {
    res.status(401).send({ status: "fail", error: "Unauthorized" });
  }
};
/*= ====================================================USER PROFILE========================================= */

/*= ====================================================USER AUTHOTICATION========================================= */

export const authenticat = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ status: "fail", message: "Unauthorized" });
  }
};

/*= ====================================================USER AUTHOTICATION========================================= */
