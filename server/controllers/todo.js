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
  query.user_id = req.user.id;
  const tasksTotal = await Task.countDocuments(query);

  Task.find(query)
    .skip(+req.query.offset)
    .limit(+req.query.limit)
    .sort({ date: -1 })
    .then(async tasks => {
      res.status(200).send({
        tasks: {
          data: tasks,
          total: tasksTotal
        }
      });
    });
};

export const create = async (req, res) => {
  if (req.body.length) {
    const reqTasks = req.body;
    reqTasks.map(task => {
      const { id, ...otherProps } = task;
      console.log("otherProps", otherProps);
      otherProps.user_id = req.user.id;
      return task;
    });
    Task.insertMany(reqTasks, function(error, tasks) {
      res.status(200).send(tasks);
    });
  } else {
    const { title } = req.body;
    const task = new Task({ title, user_id: req.user.id }).save();
    res.status(200).send(task);
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
        console.log(task)
        task.done = !task.done;
        task.save().then(() => res.sendStatus(200));
      }
    });
  }
};

export const remove = (req, res) => {
  Task.findByIdAndRemove(req.body.id).then(() => res.sendStatus(200));
};
