import models from '../models';

const { User } = models;

export const getUsers = async (req, res) => {
	if (req.params.id) {
		try {
			const user = await User.findOne({ _id: req.params.id });
			res.status(200).send({ success: true, data: user });
		} catch (e) {
			res.status(404).send({
				success: false,
				message: 'The user is not found!'
			});
		}
	} else {
		const users = await User.find();
		res.status(200).send({ users });
	}
};
