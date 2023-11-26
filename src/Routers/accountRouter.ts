import express from "express";
import { putAccount } from "../Controllers/accountController";

const accountRouter = express.Router();

accountRouter.put("/", putAccount);

export default accountRouter;
