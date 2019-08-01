import models from "../models";

const { User } = models;

export const userExist = async (req, res) => {
  console.log(req.body.email);
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
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    const comparePasswords = candidate.comparePassword(password);

    if (comparePasswords) {
      res.status(200).send({ token: await candidate.generateAuthToken() });
    } else {
      res.status(401).send({ message: "Wrong password!" });
    }
  } else {
    res.status(404).send({ message: "The user is not found!" });
  }
};
