import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoutes from "./routes/contact";
import userRoutes from "./routes/user";
import loginRoutes from "./routes/login";
import blogRoutes from "./routes/blog";

const swaggerUI = require("swagger-ui-express");
const docs = require("./documentation");

dotenv.config();
mongoose.set("strictQuery", true);
const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PASSWORD}@my-brand-fabrice.7myztk9.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  )
  .then(() => {
    const { PORT } = process.env;
    app.use(express.json());

    app.use("/api", contactRoutes);
    app.use("/api", userRoutes);
    app.use("/api", loginRoutes);
    app.use("/api", blogRoutes);
    app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(docs));

    /* ------------------------ by default*--------------------*/
    app.use((req, res) => {
      res.status(404).send({ status: "fail", message: "Endpoint not found" });
    });
    /* ------------------------ by default*--------------------*/
    app.listen(PORT, () => {
      console.log(`server started port ${PORT}...`);
    });
  });
module.exports = app;
