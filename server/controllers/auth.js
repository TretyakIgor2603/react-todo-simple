import models from "../models";
import { body, validationResult } from "express-validator/check";

const { User } = models;

export const validate = method => {
  switch (method) {
    case "login": {
      return [
        body("email")
          .if(body("email").exists())
          .isEmail()
          .withMessage("Email not valid"),
        body("password")
          .exists()
          .withMessage("Password is required")
      ];
    }
  }
};

export const checkExistEmail = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  user
    ? res.status(409).send({ message: "E-mail is already exist!" })
    : res.status(200).send({ message: "E-mail is free!" });
};

export const register = async function(req, res) {
  const response = {};
  const { username, email, password, autoLogin } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).send({
      message: "Email is already exist!"
    });
  } else {
    const user = await new User({ username, email, password }).save();
    response.user = user;
    autoLogin && (response.token = await user.generateAuthToken());
    res.status(201).send(response);
  }
};

export const login = async function(req, res) {
  const { errors } = validationResult(req);
  const { email, password } = req.body;

  try {
    if (errors && errors.length) {
      throw errors.errors;
    } else {
      const user = await User.findByCredentials(email, password);
      res.status(200).send({ token: await user.generateAuthToken() });
    }
  } catch (errors) {
    res.status(401).send({ ...errors });
  }
};

export const logout = async function(req, res) {
  req.user.tokens = req.user.tokens.filter(token => {
    return token.token != req.token;
  });
  await req.user.save();
  res.status(200).send({ message: "You have been successfully logged out." });
};
