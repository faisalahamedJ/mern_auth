import express from "express";
import mangoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mangoose
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
