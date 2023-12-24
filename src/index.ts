import "./db";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./Routers/userRouter";
import accountRouter from "./Routers/accountRouter";
import cors from "cors";
import { errorController } from "./Controllers/error";

dotenv.config();
const app = express();

if (process.env.MODE === "DEV") {
  app.use(cors());
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorController);

app.use("/user", userRouter);
app.use("/account", accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, Mode = ${process.env.MODE}`);
});
