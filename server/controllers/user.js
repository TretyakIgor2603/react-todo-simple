import models from "../models";
import { userRoles } from "../utils/user-roles";

const { User } = models;

export const getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
};

export const getById = async (req, res) => {
  const currentUser = req.user;
  const userId = req.params.id;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== userRoles.Admin) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).send({ user });
  } catch (e) {
    res.status(404).send({
      message: "The user is not found!"
    });
  }
};

export const deleteById = async (req, res) => {
  const currentUser = req.user;
  const userId = req.params.id;

  // // only allow admins to access other user records
  // if (userId !== currentUser.id && currentUser.role !== userRoles.Admin) {
  // 	return res.status(401).send({ message: 'Unauthorized' });
  // }

  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    res.status(200).send({ message: "User has been successfully deleted!" });
  } catch (e) {
    res.status(404).send({
      message: "The user is not found!"
    });
  }
};

export const getUserRoles = async (req, res) => {
  res.status(200).send({ roles: Object.keys(userRoles) });
};
