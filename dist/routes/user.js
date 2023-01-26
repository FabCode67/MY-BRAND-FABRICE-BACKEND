"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line template-literals

const router = _express.default.Router();
const {
  authenticat
} = require("../controllers/login");
const {
  registerUser,
  getUser,
  deleteUser,
  countUser
} = require("../controllers/user");
router.post("/user", registerUser);
router.get("/user", authenticat, getUser);
router.delete("/user/:id", authenticat, deleteUser);
router.get("/user/count", authenticat, countUser);
var _default = router;
exports.default = _default;