import express from "express";
import ConfigCategory from "../Model/ConfigCategory";

const configRouter = express.Router();

configRouter.post("/category", async (req, res) => {
  try {
    const result = await ConfigCategory.create(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});
configRouter.post("/contents", async (req, res) => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
  }
});

export default configRouter;
