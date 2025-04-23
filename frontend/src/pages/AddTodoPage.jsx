import React, { useState } from "react";
import "../styles/AddTodoPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTodoPage = ({ AddNewTodo }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const createNewTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      title: title || "Untitled",
      todos: [],
    };

    const id = await AddNewTodo(newTodo);

    toast.success("Added ToDo successfully");

    return navigate(`/todo/${id}`);
  };

  const cancel = () => {
    return navigate("/");
  };

  return (
    <div className="todo-container">
      <div>
        <form onSubmit={createNewTodo}>
          <label htmlFor="title">Add a ToDo</label>
          <hr />
          <span
            role="textbox"
            className="title-input diff-font"
            contentEditable
            onInput={(e) => setTitle(e.target.innerText)}
          ></span>

          <div className="button-container">
            <button
              className="del-button"
              type="button"
              name="cancel"
              onClick={cancel}
            >
              Cancel
            </button>
            <button className="submit-button" type="submit" name="create">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoPage;
