import models from "../models";
import { Base64 } from "js-base64";

const { Task } = models;

export const get = async (req, res) => {
  const searchTerm = req.query.search;
  const query = {};
  query.title = {
    $regex: new RegExp(Base64.decode(searchTerm)),
    $options: "i"
  };
  query.userId = req.user._id;
  const tasksTotal = await Task.countDocuments(query);

  Task.find(query)
    .skip(+req.query.offset)
    .limit(+req.query.limit)
    .sort({ date: -1 })
    .then(async tasks =>
      res.status(200).send({
        tasks: {
          data: tasks,
          total: tasksTotal
        }
      })
    );
};

export const create = (req, res) => {
  if (req.body.length) {
    req.body.map(task => {
      delete task.id;
      task.userId = req.user._id;
      return task;
    });
    Task.insertMany(req.body, (error, tasks) => {
      console.log(error);
      tasks && res.status(200).send(tasks);
    });
  } else {
    const { title } = req.body;
    new Task({ title, userId: req.user._id })
      .save()
      .then(task => res.status(200).send(task))
      .catch(err => res.status(500).send({ message: err.message }));
  }
};

export const update = (req, res) => {
  if (req.query.complete) {
    Task.findById(req.body.id, (err, task) => {
      if (err) {
        return res.status(404).send({
          message: "Todo was not found!"
        });
      } else {
        task.done = !task.done;
        task.save().then(() => res.sendStatus(200));
      }
    });
  }
};

export const remove = (req, res) => {
  Task.findByIdAndRemove(req.body.id).then(() => res.sendStatus(200));
};
