import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import OpenAI from "openai";
import { getIntegratedScience, getScienceResearch } from "./controllers";

dotenv.config();
const app = express();

if (process.env.MODE === "dev") {
  app.use(cors());
  app.use(morgan("dev"));
}

export const openaiInstance = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/getText", getIntegratedScience);
app.post("/getResearch", getScienceResearch);

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
