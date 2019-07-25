import mongoose from "mongoose";
const DB_URL = process.env.MONGO_URI;

export const connectDb = () => {
  return mongoose
    .connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      console.log("mongoDB connected!");
    })
    .catch(e => {
      console.error(e);
    });
};
