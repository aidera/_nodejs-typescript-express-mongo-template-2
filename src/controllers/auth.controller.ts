import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import checkValidation from "../services/validation/check-validation";
import responseCodes from "../utils/response-codes";
import errorHandler from "../services/error-handler";

export default {
  signUp: async (req, res, next) => {
    checkValidation(req);

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      const result = await user.save();

      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id.toString(),
        },
        config.get("jwtSecret"),
        { expiresIn: +config.get("tokenExpiresIn") / 3600000 + "h" },
      );

      res.status(201).json({
        message: "User created and you logged in",
        token: token,
        expiresIn: config.get("tokenExpiresIn"),
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    checkValidation(req);

    const email = req.body.email;
    const password = req.body.password;

    try {
      const loadedUser = await User.findOne({ email });
      if (!loadedUser) {
        errorHandler.throw({ statusCode: 404, errorCode: responseCodes.emailOrPasswordIsNotCorrect });
      }
      const isPasswordsEqual = await bcrypt.compare(password, loadedUser.password);

      if (!isPasswordsEqual) {
        errorHandler.throw({ statusCode: 404, errorCode: responseCodes.emailOrPasswordIsNotCorrect });
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        config.get("jwtSecret"),
        { expiresIn: +config.get("tokenExpiresIn") / 3600000 + "h" },
      );

      res.status(200).json({
        message: "You are logged in",
        token: token,
        expiresIn: config.get("tokenExpiresIn"),
      });
    } catch (err) {
      next(err);
    }
  },
};
