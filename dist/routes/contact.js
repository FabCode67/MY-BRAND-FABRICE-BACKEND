"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const {
  postMsg,
  getMsg,
  deleteContact,
  countContact
} = require("../controllers/contact");
router.post("/contact", postMsg);
router.get("/contact", getMsg);
router.delete("/contact/:id", deleteContact);
router.get("/contact/count", countContact);
var _default = router;
exports.default = _default;