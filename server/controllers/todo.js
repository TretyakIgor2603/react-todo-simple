import models from "../models";
import { Base64 } from "js-base64";

const { Task } = models;

// get
// create
// update
// delete

export const get = async (req, res) => {
  const query = {};
  const searchTerm = req.query.search;

  const count = await Task.countDocuments()
  let totalTasks = count


  if (searchTerm) {
    const term = new RegExp(Base64.decode(searchTerm));
    query.title = { $regex: term, $options: "i" };

    const results = await Task.find(query)
    totalTasks = results.length;
  }

  Task.find(query)
    .skip(+req.query.offset)
    .limit(+req.query.limit)
    .sort({date:-1})
    .then(tasks =>
      res.status(200).send({
        tasks: {
          data: tasks,
          allLength: totalTasks
        }
      })
    );
};

export const create = (req, res) => {
  const { title } = req.body;
  new Task({ title }).save().then(task => res.status(200).send(task));
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

// how remove multiple items ?
export const remove = (req, res) => {
  Task.findByIdAndRemove(req.body.id).then(() => res.sendStatus(200));
};
