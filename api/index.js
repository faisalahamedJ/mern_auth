import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MangoDB connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

const api = express();

api.listen("3000", () => {
  console.log("Server listening on port 3000!!");
});

api.use("/api/user", userRoutes);
