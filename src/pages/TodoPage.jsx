import React, { useState, useContext, useEffect } from "react";
import "../styles/TodoReuse.css";
import TodoComp from "../components/TodoComp";
import { IconContext } from "react-icons";
import { IoAddCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import { Context } from "../App";
import { Token } from "../App";

const TodoPage = ({ addNewTask, updateIsDone, updateTitle, refresh }) => {
  const { id } = useParams();
  const [lastId, setLastId] = useContext(Context);
  const [token, setToken] = useContext(Token);
  const [todo, setTodo] = useState({ title: "", todos: [] });
  const [title, setTitle] = useState("");
  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    todoGet();
  }, [token]);

  const todoGet = async () => {
    try {
      const res = await fetch(`/api/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        await refresh();
      }

      const data = await res.json();
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  setLastId(todo._id);

  return (
    <>
      <div className="todo-container">
        <div>
          <span
            role="textbox"
            className="title-input"
            contentEditable
            onInput={(e) => setTitle(e.target.innerText)}
            onBlur={() => updateTitle(title, id)}
          >
            {todo.title}
          </span>
          <hr />
          {todo.todos.map((task) => (
            <TodoComp key={task._id} task={task} updateIsDone={updateIsDone} />
          ))}

          <button
            className="placeholder-button"
            onClick={() => {
              setAddTask(true);
            }}
          >
            <IconContext.Provider
              value={{ className: "add-task", size: "4rem" }}
            >
              <IoAddCircle />
            </IconContext.Provider>
          </button>
        </div>
      </div>
      {addTask && (
        <AddTask
          setAddTask={setAddTask}
          addNewTask={addNewTask}
          todoGet={todoGet}
        />
      )}
    </>
  );
};

export default TodoPage;
