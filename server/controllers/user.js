import models from "../models";

const { User } = models;

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
};

export const getUser = async (req, res) => {
  let candidate = await User.findOne({ _id: req.user._id });
  if (candidate) {
    res.status(200).send(candidate);
  } else {
    res.status(404).send({
      message: "The user is not found!"
    });
  }
};
