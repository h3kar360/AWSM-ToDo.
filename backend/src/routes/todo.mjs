import { Router } from "express";
import { MainTodos } from "../mongoose/schemas/todos.mjs";
import { authToken } from "../utils/middleware.mjs";

const router = Router();

router.post("/api/todo", authToken, async (req, res) => {
  const todos = req.body;
  const { userId } = req.user;
  try {
    const userTodos = { userId, ...todos };
    const newTodo = new MainTodos(userTodos);
    const sentData = await newTodo.save();
    return res.status(201).json({ id: sentData.id });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.post("/api/todo/:id", authToken, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { todo, date } = req.body;

  try {
    const addTodos = await MainTodos.findOneAndUpdate(
      { _id: id, userId },
      {
        $push: {
          todos: {
            todo,
            date,
          },
        },
      },
      { new: true }
    );

    return res.status(201).json(addTodos);
  } catch (error) {
    return res.status(400).send("yep from here");
  }
});

router.put("/api/todo/:id", authToken, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { todoId } = req.body;

  try {
    const removeTodo = await MainTodos.findOneAndUpdate(
      { _id: id, userId },
      {
        $pull: {
          todos: {
            _id: todoId,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json(removeTodo);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.delete("/api/todo/:id", authToken, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const { todos } = await MainTodos.findById(id);

    if (todos.length === 0)
      await MainTodos.findOneAndDelete({ _id: id, userId });
    return res.sendStatus(203);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.get("/api/todo/:id", authToken, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const data = await MainTodos.findOne({ _id: id, userId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.get("/api/todo", authToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const data = await MainTodos.find({ userId });
    res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.put("/api/todo/title/:id", authToken, async (req, res) => {
  const { userId } = req.user;
  const { title } = req.body;
  const { id } = req.params;

  try {
    await MainTodos.findOneAndUpdate({ _id: id, userId }, { title: title });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

export default router;
