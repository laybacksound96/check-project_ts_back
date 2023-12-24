import express from "express";
import { createAccount } from "../Controllers/accountController";

const accountRouter = express.Router();

accountRouter.post("/", createAccount);

export default accountRouter;
