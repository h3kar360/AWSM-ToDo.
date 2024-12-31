import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

const MainTodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    default: "Untitled",
  },
  todos: [TodoSchema],
});

export const MainTodos = mongoose.model("MainTodos", MainTodoSchema);
