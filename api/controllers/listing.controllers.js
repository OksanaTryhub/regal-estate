import HttpError from "../helpers/HttpError.js";
import { Listing } from "../models/listing.model.js";
import ctrlWrapper from "./../utils/ctrlWrapper.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(HttpError(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(HttpError(401, "You can only delete your own listing!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted...");
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(HttpError(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(HttpError(401, "You can only update your own listing!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(HttpError(404, "Listing not found!"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const listingControllers = {
  createListing: ctrlWrapper(createListing),
  deleteListing: ctrlWrapper(deleteListing),
  updateListing: ctrlWrapper(updateListing),
  getListing: ctrlWrapper(getListing),
};
