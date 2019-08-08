import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    user_id: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

taskSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
