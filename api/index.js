import express from "express";

const api = express();

api.listen("3000", () => {
  console.log("Server listening on port 3000!!");
});
