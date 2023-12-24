import mongoose from "mongoose";
import { CategoryDocument } from "../Types/types";

const categorySchema = new mongoose.Schema<CategoryDocument>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  alias: { type: String, required: true, trim: true },
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
