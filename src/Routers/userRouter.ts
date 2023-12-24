import express from "express";
import { getUser } from "../Controllers/userController";
import User from "../Model/User";
import Category from "../Model/Category";

const userRouter = express.Router();

userRouter.get("/:user_id", getUser);
userRouter.post("/", async (req, res) => {
  try {
    const { user_id, user_name, discriminator, global_name, banner_color, avatar } = req.body;
    const sheetName = `${global_name}님의 시트`;
    const newUser = await User.create({ ...req.body, sheetName });

    const categoryNames = [
      { name: "군단장", alias: "군단장" },
      { name: "일일_컨텐츠", alias: "일일 컨텐츠" },
      { name: "주간_컨텐츠", alias: "주간 컨텐츠" },
    ];
    for (const { name, alias } of categoryNames) {
      const newCategory = await Category.create({ owner: newUser._id, type: "normal", name, alias });
      newUser.categoriesOrder.push(newCategory._id);
    }
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
