import mongoose from "mongoose";
import { AccountDocument } from "../Types/types";

const accountSchema = new mongoose.Schema<AccountDocument>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  characterOrder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
  contentsOrder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
});
const Account = mongoose.model("Account", accountSchema);
export default Account;
