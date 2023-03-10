import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoutes from "../src/routes/contact";
import userRoutes from "../src/routes/user";
import loginRoutes from "../src/routes/login";
import blogRoutes from "../src/routes/blog";

dotenv.config();
mongoose.set("strictQuery", true);
const app = express();

app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", blogRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.ADMIN_NAME_TEST}:${process.env.ADMIN_PASSWORD_TEST}@cluster0.ozwjhei.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  )
  .then(() => {
    app.listen(process.env.PORT_TEST, () => {
      console.log(`server started on port ${process.env.PORT_TEST}...`);
    });
  });
export default app;
