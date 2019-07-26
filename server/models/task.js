import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

taskSchema.virtual("id").get(function() {
  return this._id.toHexString();
});
taskSchema.set("toJSON", { virtuals: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
