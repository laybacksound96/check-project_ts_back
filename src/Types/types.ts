import { Types } from "mongoose";

export interface CharacterDocument extends Document {
  _id: Types.ObjectId;
}
export interface ContentDocument extends Document {
  _id: Types.ObjectId;
}

export interface AccountDocument extends Document {
  _id: Types.ObjectId;
  owner: UserDocument["_id"];
  characterOrder: CharacterDocument["_id"][];
  contentsOrder: ContentDocument["_id"][];
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  user_id: string;
  user_name: string;
  discriminator: string;
  global_name?: string;
  banner_color?: string;
  avatar?: string;
  accounts: AccountDocument["_id"][];
  sheetName?: string;
}
