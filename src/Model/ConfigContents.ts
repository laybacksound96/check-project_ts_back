import mongoose from "mongoose";
import { ConfigContentDocument } from "../Types/types";

const configContent = new mongoose.Schema<ConfigContentDocument>({
  name: { type: String, required: true },
  data: [
    {
      difficulty: { type: String, required: true },
      gates: [
        {
          level: { type: Number, required: true },
          gold: { type: Number, required: true },
          seeMoreGold: { type: Number, required: true },
        },
      ],
    },
  ],
});
const ConfigContent = mongoose.model("ConfigContent", configContent);
export default ConfigContent;
