"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _contact = _interopRequireDefault(require("./routes/contact"));
var _user = _interopRequireDefault(require("./routes/user"));
var _login = _interopRequireDefault(require("./routes/login"));
var _blog = _interopRequireDefault(require("./routes/blog"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _documentation = _interopRequireDefault(require("./documentation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
_mongoose.default.set("strictQuery", true);
const app = (0, _express.default)();
_mongoose.default.connect(`mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PASSWORD}@my-brand-fabrice.7myztk9.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true
}).then(() => {
  const {
    PORT
  } = process.env;
  app.use(_express.default.json());
  app.use("/api", _contact.default);
  app.use("/api", _user.default);
  app.use("/api", _login.default);
  app.use("/api", _blog.default);
  app.use("/api-doc", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_documentation.default));

  /* ------------------------ by default*--------------------*/
  app.use((req, res) => {
    res.status(404).send({
      status: "fail",
      message: "Endpoint not found"
    });
  });
  /* ------------------------ by default*--------------------*/
  app.listen(PORT, () => {
    console.log(`server started port ${PORT}...`);
  });
});
var _default = app;
exports.default = _default;