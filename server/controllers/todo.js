import models from "../models";

const { Task } = models;

export const fetchAll = async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).send({ tasks });
};

export const search = async (req, res) => {
  const term = new RegExp(req.params.term);
  const tasks = await Task.find({ title: { $regex: term, $options: "i" } }, {});
  res.status(200).send({ tasks });
};

export const create = async (req, res) => {
  const { title } = req.body;
  const task = await new Task({ title }).save();
  return res.status(200).send(task);
};

export const removeById = async (req, res) => {
  await Task.findByIdAndRemove(req.body.id);
  return res.sendStatus(200);
};

export const toggleDone = async (req, res) => {
  await Task.findById(req.body.id, (err, task) => {
    if (err || !task) {
      return res.status(404).send({
        message: "Task nod found!"
      });
    }
    task.done = !task.done;
    task.save();
    return res.sendStatus(200);
  });
};
