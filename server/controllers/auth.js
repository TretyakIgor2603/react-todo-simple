import models from "../models";
const { User } = models;

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
    response.success = true
    response.data = { user }
    autoLogin && (response.data.token = await user.generateAuthToken());
    res.status(201).send(response);
  }
};

export const login = async function(req, res) {
  const { email, password } = req.body;
  const user = await User.findByCredentials(email, password);
  res.status(200).send({ token: await user.generateAuthToken() });
};

export const logout = async function(req, res) {
  req.user.tokens = req.user.tokens.filter(token => {
    return token.token != req.token;
  });
  await req.user.save();
  res.status(200).send({ message: "You have been successfully logged out." });
};
