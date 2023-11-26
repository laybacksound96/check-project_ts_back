import { Request, Response } from "express";
import User from "../Model/User";
import { isValidObjectId } from "mongoose";

export const getUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  if (!isValidObjectId(user_id)) return res.status(400).json({ message: "올바르지 않은 id" });
  const user = await User.findById(user_id);
  if (!user) return res.status(404).json({ message: "유저를 찾을 수 없음" });
  return res.status(200).json(user);
};
