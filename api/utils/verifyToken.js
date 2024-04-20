import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../helpers/HttpError.js";

dotenv.config();
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(HttpError(401, "Unauthorized"));
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return next(HttpError(403, "Forbidden - TOKEN is not verified"));
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
