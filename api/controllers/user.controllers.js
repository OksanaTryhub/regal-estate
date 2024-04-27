import bcrypt from "bcryptjs";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "./../utils/ctrlWrapper.js";
import { User } from "../models/user.model.js";
import { Listing } from "../models/listing.model.js";

const test = async (req, res) => {
  try {
    res.send("Hello test");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(HttpError(404, "User not found! Try again..."));
    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  let { email, username, password, avatar } = req.body;
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return next(HttpError(401, "You can only update your own account!"));
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    throw HttpError(409, "Username already in use");
  }

  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    throw HttpError(409, "Email already in use");
  }

  try {
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return next(HttpError(401, "You can only delete your own account!"));
  }

  try {
    const { username } = await User.findByIdAndDelete(userId);

    res.clearCookie("access_token");
    res.status(200).json({
      username,
      message: "User has been deleted...",
    });
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id === userId) {
    try {
      const listings = await Listing.find({ userRef: userId });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(HttpError(401, "You can only view your own listings!"));
  }
};

export const userControllers = {
  test: ctrlWrapper(test),
  getUser: ctrlWrapper(getUser),
  updateUser: ctrlWrapper(updateUser),
  deleteUser: ctrlWrapper(deleteUser),
  getUserListings: ctrlWrapper(getUserListings),
};
