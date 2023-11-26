// import { verify } from "jsonwebtoken";

// export function validateAuth(auth) {
//   if (!auth) {
//     return false;
//   }
//   const splitedToken = auth.split(" ");
//   if (splitedToken.length !== 2) {
//     return false;
//   }
//   try {
//     const validatedToken = verify(splitedToken[1], process.env.SECRET || "laybacksount_secret");
//     return validatedToken._id;
//   } catch (error) {
//     return false;
//   }
// }
// export function checkAuth(req, res, next) {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   if (!req.headers.authorization) {
//     console.log("Auth error - authorization header가 없음");
//     return next(new NotAuthError("Not authenticated."));
//   }

//   const splitedToken = req.headers.authorization.split(" ");

//   if (splitedToken.length !== 2) {
//     console.log("Auth error - authorization header가 유효하지 않음");
//     return next(new NotAuthError("Not authenticated."));
//   }
//   try {
//     const validatedToken = verify(splitedToken[1], process.env.SECRET);
//     req.token = validatedToken;
//   } catch (error) {
//     console.log("Auth error - token이 유효하지 않음");
//     return next(new NotAuthError("Not authenticated."));
//   }
//   next();
// }
