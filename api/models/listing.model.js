import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../utils/handleMongooseError.js";

const listingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular Price is required!"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount Price is required!"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please enter number of bathrooms."],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please enter number of bedrooms."],
    },
    furnished: {
      type: Boolean,
      required: [true, "Please enter whether the housing is furnished."],
    },
    parking: {
      type: Boolean,
      required: [true, "Please enter whether is parking available."],
    },
    type: {
      type: String,
      required: [true, "Please enter the type of housing - sale or rent"],
    },
    offer: {
      type: Boolean,
      required: [true, "Please indicate offer or not"],
    },
    imageUrls: {
      type: Array,
      required: [true, "Upload housing images"],
    },
    userRef: {
      type: String,
      required: [true, "Need userRef in listingSchema!"],
    },
  },
  { versionKey: false, timestamps: true }
);

listingSchema.post("save", handleMongooseError);

const listingCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  regularPrice: Joi.number().required(),
  discountPrice: Joi.number().required(),
  bathrooms: Joi.number().required(),
  bedrooms: Joi.number().required(),
  furnished: Joi.boolean().required(),
  parking: Joi.boolean().required(),
  type: Joi.string().required(),
  offer: Joi.boolean().required(),
  imageUrls: Joi.array().required(),
  userRef: Joi.string().required(),
});

const schemas = {
  listingCreateSchema,
};

const Listing = model("Listing", listingSchema);

export { Listing, schemas };
