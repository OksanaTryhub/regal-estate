import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/user.model.js";
import ctrlWrapper from "./../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();
const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

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
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 23 * 60 * 60 * 1000 })
      .status(201)
      .json({
        // token,
        // user: {
        //   username: newUser.username,
        //   email: newUser.email,
        // },
        username: newUser.username,
        email: newUser.email,
      });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: error.message,
    // });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, validUser.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: validUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 23 * 60 * 60 * 1000 })
      .status(200)
      .json(
        rest
        // {
        // token,
        // user: rest,
        // }
      );
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true, maxAge: 23 * 60 * 60 * 1000 })
        .status(200)
        .json(
          rest
          // {
          // token,
          // user: rest,
          // }
        );
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = await User.create({
        username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });

      const payload = {
        id: newUser._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true, maxAge: 23 * 60 * 60 * 1000 })
        .status(200)
        .json({
          token,
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const authControllers = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  google,
};
