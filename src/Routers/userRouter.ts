import express from "express";
import { getUser } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/:user_id", getUser);

export default userRouter;

// await User.create({
//     user_id: "159263938607972352",
//     user_name: "potion_overdose",
//     discriminator: "0",
//     global_name: "412",
//     banner_color: "#ffdaa1",
//     avatar: "c899caf394c3afb53cf85fa8c79ac0b3",
//     accounts: [],
//     sheetName: "412님의 시트",
//   });
