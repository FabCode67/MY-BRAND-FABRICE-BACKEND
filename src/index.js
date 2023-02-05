import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import contactRoutes from "./routes/contact";
import userRoutes from "./routes/user";
import loginRoutes from "./routes/login";
import blogRoutes from "./routes/blog";

import docs from "./documentation";

dotenv.config();
mongoose.set("strictQuery", true);
const app = express();

const { PORT } = process.env;


const corsOpts = {
  origin: '*',
  
  methods: [
  'GET',
  'POST',
  'DELETE',
  'PATCH'
  ],
  
  allowedHeaders: [
  'Content-Type',
  'Authorization',
  ],
  };
  
  
  
  

app.use(cors(corsOpts));

app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", blogRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

mongoose
  .connect(
    `mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PASSWORD}@my-brand-fabrice.7myztk9.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  )
  .then(() => {
    /* ------------------------ by default*--------------------*/
    app.use((req, res) => {
      res.status(404).send({ status: "fail", message: "Endpoint not found" });
    });
    /* ------------------------ by default*--------------------*/
    app.listen(PORT, () => {
      console.log(`server started port ${PORT}...`);
    });
  });
