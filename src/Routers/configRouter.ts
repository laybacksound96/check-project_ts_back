import express from "express";
import ContentConfig from "../Model/ContentConfig";

const configRouter = express.Router();

configRouter.post("/", async (req, res) => {
  try {
    //@TODO: config 추가
    const a = await ContentConfig.find();
    return res.status(200).json(a);
  } catch (error) {
    console.log(error);
  }
});

export default configRouter;
