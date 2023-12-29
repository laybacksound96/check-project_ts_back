import mongoose from "mongoose";
import { ConfigCategoryDocument } from "../Types/types";

const configCategory = new mongoose.Schema<ConfigCategoryDocument>({
  subjectName: { type: String, required: true },
  categoryName: { type: String, required: true },
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConfigContent",
      require: true,
    },
  ],
});
const ConfigCategory = mongoose.model("ConfigCategory", configCategory);
export default ConfigCategory;
