import models from '../models';

const { User } = models;

export const getUsers = async (req, res) => {
	if (req.params.id) {
		let user = await User.findOne({ _id: req.user._id });
		user
			? res.status(200).send(user)
			: res.status(404).send({ message: 'The user is not found!' });
	} else {
		const users = await User.find();
		res.status(200).send({ users });
	}
};
