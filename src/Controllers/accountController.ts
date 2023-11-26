import { Request, Response } from "express";
import User from "../Model/User";
import { isValidObjectId } from "mongoose";

interface IBody {
  userId?: string;
}
export const putAccount = async (req: Request, res: Response) => {
  const { userId }: IBody = req.body;
  if (!isValidObjectId(userId) || !userId) return res.status(400).json({ message: "올바르지 않거나 없는 user_id" });
  return res.status(200).json(req.body);
};
