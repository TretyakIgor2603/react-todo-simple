import models from "../models";
import { body, validationResult } from "express-validator/check";

const { User } = models;

export const validate = method => {
  switch (method) {
    case "login": {
      return [
        body("email")
          .if(body('email').exists())
            .isEmail()
            .withMessage("Email not valid"),
        body("password")
          .exists()
          .withMessage("Password is required")
      ];
    }
  }
};

export const userExist = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    // Пользователь существует, ошибка!
    res.status(409).send({
      message: "Email is already exist!"
    });
  } else {
    res.status(200).send({
      message: "E-mail is free!"
    });
  }
};

export const register = async function(req, res) {
  const response = {};
  const { nickname, email, password, autoLogin } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    res.status(409).send({
      message: "Email is already exist!"
    });
  } else {
    const user = await new User({ nickname, email, password }).save();
    response.user = user;
    autoLogin && (response.token = await user.generateAuthToken());
    res.status(201).send(response);
  }
};

export const login = async function(req, res) {
  try {
    const errors = validationResult(req);
    console.log(errors)
    if (errors || errors.length) {
      console.log('ERRORRR')
      throw errors.errors;
    }
    console.log('object')
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user === null) throw "User not found";

    let comparePasswords = await user.comparePassword(password);
    if (!comparePasswords) throw "Wrong password!";

    res.status(200).send({ token: await user.generateAuthToken() });
  } catch (errors) {
    res.status(401).send({ message: "Invalid credentials", errors });
  }
};
