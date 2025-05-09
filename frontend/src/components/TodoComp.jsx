import React from "react";
import "../styles/TodoComp.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TodoComp = ({ task, updateIsDone, setChecked }) => {
  const { id } = useParams();
  let date;
  let time;

  if (task.date !== null) {
    date = task.date.substring(0, 10);
    time = task.date.substring(11, 16);
  }

  const updateCheck = (e) => {
    toast.success("Task deleted successfully");
    setTimeout(() => {
      if (e.target.checked) {
        toast.success("Task restored succesfully");
        updateIsDone(id, task._id);
        setChecked(true);
      }
    }, 1200);
  };

  return (
    <div className="todoComp-container">
      <div>
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            onChange={updateCheck}
          />
          <span className="checkbox-checkmark"></span>
        </label>
        <div className="value-container">
          <div className="text">{task.todo}</div>
          <div className="date-time">
            <div>{date}</div>
            <div style={{ marginLeft: "1rem" }}>{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComp;
