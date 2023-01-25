"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _contact = _interopRequireDefault(require("./routes/contact"));
var _user = _interopRequireDefault(require("./routes/user"));
var _login = _interopRequireDefault(require("./routes/login"));
var _blog = _interopRequireDefault(require("./routes/blog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const swaggerUI = require("swagger-ui-express");
const docs = require("./documentation");
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
  app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(docs));

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
module.exports = app;