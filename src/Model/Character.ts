import mongoose from "mongoose";
import { CharacterDocument } from "../Types/types";

const characterSchema = new mongoose.Schema<CharacterDocument>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  name: { type: String, required: true, trim: true },
  level: { type: Number, required: true },
  serverName: { type: String, required: true, trim: true },
  className: { type: String, required: true, trim: true },
  isGoldCharacter: { type: Boolean, required: true, default: false },
});
const Character = mongoose.model("Character", characterSchema);
export default Character;
