import mongoose from "mongoose";
import { AccountDocument } from "../Types/types";

const accountSchema = new mongoose.Schema<AccountDocument>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  alias: { type: String, require: true },
});
const Account = mongoose.model("Account", accountSchema);
export default Account;
