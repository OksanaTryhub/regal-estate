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

export const listingControllers = {
  createListing: ctrlWrapper(createListing),
};
