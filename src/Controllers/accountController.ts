import { Request, Response } from "express";
import User from "../Model/User";
import { Types, isValidObjectId } from "mongoose";
import Account from "../Model/Account";
import Character from "../Model/Character";
import Category from "../Model/Category";
import ContentCategory from "../Model/ContentCategory";

interface ICharacterInfo {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: Number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
}
interface IBody {
  userId?: string;
  CharacterInfo?: ICharacterInfo[];
}
export const createAccount = async (req: Request, res: Response) => {
  const { userId, CharacterInfo }: IBody = req.body;
  if (!isValidObjectId(userId) || !userId) return res.status(400).json({ message: "올바르지 않거나 없는 user_id" });
  if (!CharacterInfo || CharacterInfo.length === 0) return res.status(400).json({ message: "CharacterInfo가 없음" });
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "없는 계정" });
  const categories = await Category.find({ owner: user._id });

  const sortedCharacterInfo = CharacterInfo.map((item) => ({
    ...item,
    ItemMaxLevel: parseFloat(item.ItemMaxLevel.replace(",", "")),
  })).sort((a, b) => b.ItemMaxLevel - a.ItemMaxLevel);

  const newAccount = await Account.create({ onwer: user._id, alias: `${sortedCharacterInfo[0].CharacterName}의 계정` });

  const accountOrder: { account_id: Types.ObjectId; characterOrder: Types.ObjectId[] } = {
    account_id: newAccount._id,
    characterOrder: [],
  };

  for (const [index, char] of sortedCharacterInfo.entries()) {
    const newCharacter = await Character.create({
      owner: newAccount._id,
      name: char.CharacterName,
      level: char.ItemMaxLevel,
      serverName: char.ServerName,
      className: char.CharacterClassName,
      isGoldCharacter: index < 6,
    });

    accountOrder.characterOrder.push(newCharacter._id);
  }

  for (const category of categories) {
    category.accountOrder.push(accountOrder);
    await category.save();
  }
  // TODO: category.contentsOrder에 최고레벨 캐릭터 기준으로 해금되는 컨텐츠들을 집어넣어줘야함

  return res.status(200).json({});
};
