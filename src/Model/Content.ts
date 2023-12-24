import mongoose from "mongoose";
import { ContentDocument } from "../Types/types";

const contentSchema = new mongoose.Schema<ContentDocument>({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContentCategory",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  isVisble: { type: Boolean, require: true, default: false },
  isChecked: { type: Boolean, require: true, default: false },
  gateSetting: {
    type: [
      {
        isVisible: { type: Boolean, require: true, default: false },
        difficulty: { type: String, require: true, default: "normal" },
        isGateVisible: { type: Boolean, require: true, default: false },
      },
    ],
    require: true,
    default: [],
  },
});
const Content = mongoose.model("ContentCategory", contentSchema);
export default Content;
