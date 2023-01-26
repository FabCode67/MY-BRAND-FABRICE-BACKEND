"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.getProfile = exports.authenticat = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const secretKey = process.env.SECRETKEY;

/*= ====================================================USER LOGIN========================================= */
const login = async (req, res) => {
  try {
    const user = await _user.default.findOne({
      username: req.body.username
    });
    const isPasswordValid = await _bcrypt.default.compare(req.body.password, user.password);
    if (!user) {
      res.status(401).send({
        error: "Invalid username"
      });
      return;
    }
    if (!isPasswordValid) {
      res.status(401).send({
        status: "fail",
        message: "Invalid password"
      });
      return;
    }
    const payload = {
      userId: user._id,
      username: user.username
    };
    const token = _jsonwebtoken.default.sign(payload, secretKey);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      status: "success",
      message: `welcome ${user.username} `,
      data: token
    });
  } catch (error) {
    res.status(404).send({
      status: "fail",
      message: "Error logging in"
    });
  }
};

/*= ====================================================USER LOGIN========================================= */

/*= ====================================================USER PROFILE========================================= */
exports.login = login;
const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = _jsonwebtoken.default.verify(token, secretKey);
    const user = await _user.default.findOne({
      _id: decoded.userId
    });
    res.send({
      status: "success",
      data: user
    });
  } catch (error) {
    res.status(401).send({
      status: "fail",
      error: "Unauthorized"
    });
  }
};
/*= ====================================================USER PROFILE========================================= */

/*= ====================================================USER AUTHOTICATION========================================= */
exports.getProfile = getProfile;
const authenticat = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = _jsonwebtoken.default.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      status: "fail",
      message: "Unauthorized"
    });
  }
};

/*= ====================================================USER AUTHOTICATION========================================= */
exports.authenticat = authenticat;