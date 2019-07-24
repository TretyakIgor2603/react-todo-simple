import models from "../models";
import errorHandler from "../utils/errorHandler";

const Task = models.Task;

const fetchAll = async (req, res) => {
  try {
    await Task.find().then(tasks => {
      return res.status(200).send({ tasks });
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const search = async (req, res) => {
  const term = new RegExp(req.params.term);
  try {
    await Task.find({ title: { $regex: term, $options: "i" } }, {})
      .then(tasks => res.status(200).send({ tasks }))
      .catch(e => console.error(e));
  } catch (error) {
    errorHandler(res, error);
  }
};

const create = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await new Task({ title }).save();
    // Emulation actions
    setTimeout(() => {
      return res.status(200).send(task);
    }, 500);
  } catch (error) {
    errorHandler(res, error);
  }
};

const removeById = async (req, res) => {
  // Emulation actions
  if (Math.random() > 0.3) {
    try {
      await Task.findByIdAndRemove(req.body.id);
      setTimeout(() => {
        return res.sendStatus(200);
      }, 1000);
    } catch (error) {
      errorHandler(res, error, 404);
    }
  } else {
    setTimeout(() => {
      errorHandler(res, "Could not delete task! Try again.");
    }, 1000);
  }
};

const toggleDone = async (req, res) => {
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
    errorHandler(res, error);
  }
};

export { fetchAll, create, removeById, toggleDone, search };
