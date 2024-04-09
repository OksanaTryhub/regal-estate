import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server in running on port 3000");
});
