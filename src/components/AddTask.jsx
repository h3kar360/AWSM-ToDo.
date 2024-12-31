import React, { useState } from "react";
import "../styles/AddTask.css";
import { RxCross2 } from "react-icons/rx";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ setAddTask, addNewTask }) => {
  const { id } = useParams();

  const [taskName, setTaskName] = useState("");
  const [dateTime, setDateTime] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    const choosenDateTime = dateTime !== "" ? `${dateTime}:00.000+00:00` : "";

    const addTaskData = {
      todo: taskName,
      date: choosenDateTime,
    };

    addNewTask(addTaskData, id);

    toast.success("Task added successfully");
    setAddTask(false);
  };

  return (
    <div className="background-overlay">
      <form onSubmit={addTask} className="add-task-form">
        <div className="add-task-title">Add Task</div>
        <label htmlFor="taskName" className="add-task-label">
          Task
        </label>
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
          required
        />
        <div style={{ marginTop: "2rem" }}>
          <label htmlFor="dateTime" className="add-task-label">
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            value={dateTime}
            onChange={(e) => {
              setDateTime(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="add-task-button">
          Add Task
        </button>
        <button className="position-cross" onClick={() => setAddTask(false)}>
          <IconContext.Provider value={{ color: "grey", size: "1.5rem" }}>
            <RxCross2 />
          </IconContext.Provider>
        </button>
      </form>
    </div>
  );
};

export default AddTask;
