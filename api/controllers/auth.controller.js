import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req?.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { username, email, password } = req?.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User doesn't exists"));
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser?.password
    );
    if (!validPassword) return next(errorHandler(401, "Invalid credential"));

    const { password: hashedPassword, ...rest } = validUser?._doc;
    const token = jwt.sign({ id: validUser?._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: false, expires: expiryDate })
      .status(201)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
