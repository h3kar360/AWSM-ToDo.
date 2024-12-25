import React, { useState } from 'react';
import '../styles/AddTask.css';
import { RxCross2 } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import { useParams, useNavigate } from 'react-router-dom';

const AddTask = ({ setAddTask, addNewTask }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const addTask = (e) => {
        e.preventDefault();

        const dateTimeConCat = `${date}T${time}:00`;
        const dateTime = new Date(dateTimeConCat);

        const addTaskData = {
            isDone: false,
            todo: taskName,
            date: dateTime
        }

        if(taskName !== ''){
            addNewTask(addTaskData, id);            
        }
        
        setAddTask(false);
        return navigate(`/todo/${id}`);
    }

  return (
    <div className='background-overlay'>
        <form onSubmit={addTask} className='add-task-form'>
            <div className='add-task-title'>Add Task</div>
            <label htmlFor="taskName" className='add-task-label'>Task</label>
            <input 
            type="text" 
            name='taskName' 
            value={taskName} 
            onChange={(e) => {setTaskName(e.target.value)}}/>
            <div className='date-n-time'>
                <div>
                    <label htmlFor="time" className='add-task-label'>Date</label>
                    <input 
                    type="date" 
                    name='date'
                    value={date} 
                    onChange={(e) => {setDate(e.target.value)}}/> 
                </div>
                <div>
                    <label htmlFor="time" className='add-task-label'>Time</label>
                    <input 
                    type="time" 
                    name="time"
                    value={time} 
                    onChange={(e) => {setTime(e.target.value)}}/> 
                </div>
            </div>
            <button type='submit' className='add-task-button'>Add Task</button>
            <button className='position-cross' onClick={() => setAddTask(false)}>
                <IconContext.Provider
                value={{ color: 'grey', size: '1.5rem'}}>
                    <RxCross2/>
                </IconContext.Provider>
            </button>
        </form>
    </div>
  );
}

export default AddTask;