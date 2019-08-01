import models from "../models";

const { User } = models;

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send({users});
};