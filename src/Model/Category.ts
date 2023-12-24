import mongoose from "mongoose";
import { CategoryDocument } from "../Types/types";

const categorySchema = new mongoose.Schema<CategoryDocument>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  alias: { type: String, trim: true },
  name: { type: String, require: true },
  type: { type: String, require: true, enum: ["normal", "custom"], default: "normal" },

  accountOrder: {
    type: [
      {
        account_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
        },
        characterOrder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Character",
        },
      },
    ],
    default: [],
    required: true,
  },
  contentsOrder: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContentCategory",
      },
    ],
    default: [],
    required: true,
  },
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
