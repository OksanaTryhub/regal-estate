import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/user.model.js";
import ctrlWrapper from "./../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (userExists) {
    throw HttpError(409, "Email or username already in use");
  }

  // const emailExists = await User.findOne({ email });
  // const usernameExists = await User.findOne({ username });

  // if (emailExists) {
  //   throw HttpError(409, "Email already in use");
  // }
  // if (usernameExists) {
  //   throw HttpError(409, "Username already in use");
  // }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json({
      username: result.username,
      email: result.email,
    });
  } catch (error) {
    next();
    // res.status(500).json({
    //   message: error.message,
    // });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};

export const authControllers = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
