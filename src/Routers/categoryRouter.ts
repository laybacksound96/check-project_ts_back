import express from "express";
import Category from "../Model/Category";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const { category_id } = req.body;
    const category = await Category.findById(category_id).populate("accountOrder.characterOrder");
    res.status(200).json(category);
  } catch (error) {}
});

export default categoryRouter;
