import { Types } from "mongoose";

export interface AccountDocument extends Document {
  _id: Types.ObjectId;
  owner: UserDocument["_id"];
  alias: string;
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  user_id: string;
  user_name: string;
  discriminator: string;
  global_name?: string;
  banner_color?: string;
  avatar?: string;
  sheetName?: string;
  categoriesOrder: CategoryDocument["_id"][];
}
export interface CategoryDocument extends Document {
  _id: Types.ObjectId;
  owner: UserDocument["_id"];
  alias: string;
  name: string;
  type: "normal" | "custom";
  accountOrder: {
    account_id: AccountDocument["_id"];
    characterOrder: CharacterDocument["_id"];
  }[];
  contentsOrder: ContentDocument["_id"][];
}

export interface ContentDocument extends Document {
  _id: Types.ObjectId;
  category: ContentCategoryDocument["_id"];
  owner: CharacterDocument["_id"];
  isVisble: boolean;
  isChecked: boolean;
  gateSetting: {
    isVisible: boolean;
    difficulty: string;
    isGateVisible: boolean;
  }[];
}
export interface ContentCategoryDocument extends Document {
  _id: Types.ObjectId;
  type: "normal" | "custom";
  contentName: string;
  owner: UserDocument["_id"];
}
export interface ContentConfigDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  categories: [
    {
      categoryName: string;
      contents: [
        {
          name: string;
          data?: [
            {
              difficulty: string;
              gates: [
                {
                  level: number;
                  gold: number;
                }
              ];
            }
          ];
        }
      ];
    }
  ];
}
export interface CharacterDocument extends Document {
  _id: Types.ObjectId;
  owner: AccountDocument["_id"];
  name: string;
  level: number;
  serverName: string;
  className: string;
  isGoldCharacter: boolean;
}
