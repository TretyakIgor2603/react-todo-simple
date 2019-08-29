import models from '../models';
import { Base64 } from 'js-base64';

const { Task } = models;

export const get = async (req, res) => {
	const { page, search } = req.query;
	const perPage = +req.query.per_page;
	const skip = +page * perPage - perPage;

	const query = {
		title: {
			$regex: new RegExp(Base64.decode(search)),
			$options: 'i'
		},
		user_id: req.user.id
	};
	const tasksTotal = await Task.countDocuments(query);

	const tasks = await Task.find(query)
		.sort({ created_at: -1 })
		.skip(skip)
		.limit(perPage)

	return res.status(200).send({
		success: true,
		data: {
			tasks,
			total: tasksTotal
		}
	});
};

export const create = async (req, res) => {
	if (req.body.length) {
		const reqTasks = req.body;
		const tasksWithUserId = reqTasks.map(task => {
			const { id, ...otherProps } = task;
			otherProps.user_id = req.user.id;
			return otherProps;
		});
		const tasks = await Task.insertMany(tasksWithUserId);
		return res.status(200).send({ success: true, data: tasks });
	} else {
		const { title } = req.body;
		const task = new Task({ title, user_id: req.user.id }).save();
		return res.status(200).send({ success: true, data: task });
	}
};

export const update = async (req, res) => {
	const task = req.body;
	if (task) {
		const updatedTask = await Task.findByIdAndUpdate(
			task.id,
			{ $set: task },
			{ upsert: true, new: true }
		);
		res.status(200).send({
			success: true,
			message: 'Task has been successfully updated!',
			data: updatedTask
		});
	}
};

export const remove = async (req, res) => {
	try {
		const task = await Task.findByIdAndRemove(req.params.id);
		if (!task) throw new Error();

		res.status(200).send({
			success: true,
			message: 'Task has been successfully removed!'
		});
	} catch (e) {
		res.status(404).send({
			success: false,
			message: `Task ${req.params.id} not found!`
		});
	}
};
