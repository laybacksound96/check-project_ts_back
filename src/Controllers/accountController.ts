import { Request, Response } from "express";
import User from "../Model/User";
import { isValidObjectId } from "mongoose";

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
  CharacterInfo?: ICharacterInfo;
}
export const putAccount = async (req: Request, res: Response) => {
  const { userId, CharacterInfo }: IBody = req.body;
  if (!isValidObjectId(userId) || !userId) return res.status(400).json({ message: "올바르지 않거나 없는 user_id" });
  if (!CharacterInfo) return res.status(400).json({ message: "CharacterInfo가 없음" });
  // - @TODO: 중복추가방지 로직 추가해야

  return res.status(200).json(req.body);
};
