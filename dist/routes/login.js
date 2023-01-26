"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const {
  login,
  getProfile
} = require("../controllers/login");
router.post("/login", login);
router.post("/login", login);
router.get("/profile", getProfile);
var _default = router;
exports.default = _default;