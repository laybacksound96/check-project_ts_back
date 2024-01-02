import express from "express";
import { getUser } from "../Controllers/userController";
import User from "../Model/User";
import Category from "../Model/Category";
import ConfigCategory from "../Model/ConfigCategory";
import ConfigContent from "../Model/ConfigContents";
import ContentCategory from "../Model/ContentCategory";

const userRouter = express.Router();

userRouter.get("/:user_id", getUser);
userRouter.post("/", async (req, res) => {
  try {
    const sheetName = `${req.body.global_name}님의 시트`;
    const newUser = await User.create({ ...req.body, sheetName });

    const categoryNames = [
      { name: "commander", alias: "군단장" },
      { name: "dailyContents", alias: "일일 컨텐츠" },
      { name: "weeklyContents", alias: "주간 컨텐츠" },
    ];
    for (const { name, alias } of categoryNames) {
      const newCategory = await Category.create({ owner: newUser._id, type: "normal", name, alias });
      const makeCategories = async () => {
        const category = await ConfigCategory.findOne({ subjectName: "lostark", categoryName: name });
        if (!category) return;
        const contents = await ConfigContent.find({ owner: category._id });
        for (const { name } of contents) {
          await ContentCategory.create({ type: "normal", name, alias: name, owner: newCategory._id });
        }
      };
      await makeCategories();
      newUser.categoriesOrder.push(newCategory._id);
    }
    await newUser.save();
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

userRouter.post("/categoriesOrder/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.sendStatus(400);
    const newCategory = await Category.create({ owner: user._id, type: "custom", name, alias: name });
    user.categoriesOrder.push(newCategory._id);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
userRouter.patch("/categoriesOrder/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { categoriesOrder } = req.body;

    await User.findByIdAndUpdate(user_id, { categoriesOrder });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
userRouter.delete("/categoriesOrder/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { category_id } = req.body;
    const category = await Category.findById(category_id);
    if (!category || category.type === "normal") return res.sendStatus(400);
    await Category.findByIdAndRemove(category_id);
    await User.findByIdAndUpdate(user_id, { $pull: { categoriesOrder: category_id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default userRouter;
