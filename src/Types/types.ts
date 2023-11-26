import { Types } from "mongoose";

export interface Account {
  _id: Types.ObjectId;
  // 다른 필요한 Account 속성들을 추가
}

export interface UserDocument extends Document {
  user_id: string;
  user_name: string;
  discriminator: string;
  global_name?: string;
  banner_color?: string;
  avatar?: string;
  accounts: Account["_id"][];
  sheetName?: string;
}
