import express from "express";
import ConfigCategory from "../Model/ConfigCategory";
import ConfigContent from "../Model/ConfigContents";
import { dailyContentsConfig, weeklyContentsConfig, commanderConfig } from "../Types/config";

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
    const { subjectName, categoryName, content } = req.body;
    const newConfigContent = await ConfigContent.create(content);
    await ConfigCategory.findOneAndUpdate({ subjectName, categoryName }, { $push: { contents: newConfigContent._id } });
    return res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});
configRouter.post("/AllContents", async (req, res) => {
  try {
    const subjectName = "lostark";

    const commanders = commanderConfig;
    const dailyContents = dailyContentsConfig;
    const weeklyContents = weeklyContentsConfig;

    for (const commander of commanders) {
      const newConfigContent = await ConfigContent.create(commander);
      await ConfigCategory.findOneAndUpdate({ subjectName, categoryName: "commander" }, { $push: { contents: newConfigContent._id } });
    }

    for (const dailyContent of dailyContents) {
      const newConfigContent = await ConfigContent.create(dailyContent);
      await ConfigCategory.findOneAndUpdate({ subjectName, categoryName: "dailyContents" }, { $push: { contents: newConfigContent._id } });
    }

    for (const weeklyContent of weeklyContents) {
      const newConfigContent = await ConfigContent.create(weeklyContent);
      await ConfigCategory.findOneAndUpdate({ subjectName, categoryName: "weeklyContents" }, { $push: { contents: newConfigContent._id } });
    }

    return res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});

export default configRouter;
