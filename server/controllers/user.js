import models from '../models';
import { userRoles } from '../utils/user-roles';

const { User } = models;

export const getAll = async (req, res) => {
	const users = await User.find();
	res.status(200).send({ users });
};

export const getById = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		res.status(200).send({ user });
	} catch (e) {
		res.status(404).send({
			message: 'The user is not found!'
		});
	}
};

export const deleteById = async (req, res) => {
	try {
		const user = await User.findOneAndRemove({ _id: req.params.id });
		res.status(200).send({
			message: 'User has been successfully deleted!'
		});
	} catch (e) {
		res.status(404).send({
			message: 'The user is not found!'
		});
	}
};

export const getUserRoles = async (req, res) => {
	res.status(200).send({ roles: userRoles });
};

export const updateById = async (req, res) => {
	const user = await User.findOneAndUpdate({ _id: req.body.id }, req.body, {
		new: true
	});
	res.status(200).send({ user });
};
