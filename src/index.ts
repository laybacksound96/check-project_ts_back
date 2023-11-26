import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "./db";

dotenv.config();
const app = express();

if (process.env.MODE === "dev") {
  app.use(cors());
  app.use(morgan("dev"));
}

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello, world!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
