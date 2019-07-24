import mongoose from "mongoose";
import keys from "../config/keys";

import Task from "./task";

const connectDb = () => {
  return mongoose
    .connect(keys.mongoUrl, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      console.log("mongoDB connected!");
    })
    .catch(e => {
      console.error(e);
    });
};

const models = { Task };

export { connectDb };

export default models;
