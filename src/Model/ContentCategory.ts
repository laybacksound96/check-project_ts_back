import mongoose from "mongoose";
import { ContentCategoryDocument } from "../Types/types";

const contentCategorySchema = new mongoose.Schema<ContentCategoryDocument>({
  type: { type: String, require: true, enum: ["normal", "custom"] },
  name: { type: String, require: true },
  alias: { type: String, trim: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});
const ContentCategory = mongoose.model("ContentCategory", contentCategorySchema);
export default ContentCategory;
