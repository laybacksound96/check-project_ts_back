import mongoose from "mongoose";
import { UserDocument } from "../Types/types";

const userSchema = new mongoose.Schema<UserDocument>({
  user_id: { type: String, required: true, unique: true, trim: true },
  user_name: { type: String, required: true, trim: true },
  discriminator: { type: String, required: true, trim: true },
  global_name: { type: String, trim: true },
  banner_color: { type: String, trim: true },
  avatar: { type: String },
  sheetName: { type: String, trim: true },
  categoriesOrder: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    default: [],
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
