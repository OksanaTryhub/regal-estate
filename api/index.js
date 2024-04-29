import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

dotenv.config();
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("DB connection on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);

//if use Create-react-app - '/client/build'
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// app.use((err, req, res, next) => {
//   const { status = 500, message = "ERROR template message" } = err;
//   console.log(err);
//   res.status(status).json({ message });
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server ERROR";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
