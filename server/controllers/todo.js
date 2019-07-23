import models from "../models";

const Task = models.Task;

const fetchAll = async (req, res) => {
  try {
    await Task.find().then(tasks => {
      return res.status(200).send({ tasks });
    });
  } catch (error) {
    console.error(error.message);
  }
};

const searchTasks = async (req, res) => {
  const term = new RegExp(req.params.term)
  try {
    await Task.find({title: { $regex: term, $options: "i" }}, {})
      .then(tasks => res.status(200).send({tasks}))
      .catch(e => console.error(e));
  } catch (error) {
    console.error(error.message);
  }
};

const create = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await new Task({ title }).save();
    return res.status(200).send(task);
  } catch (error) {
    console.error(error.message);
  }
};

const removeById = async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.body.id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send({
      message: "Task nod found!"
    });
  }
};

const toggleTaskDone = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchAll, create, removeById, toggleTaskDone, searchTasks };
