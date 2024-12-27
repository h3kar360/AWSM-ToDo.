import React from 'react';
import '../styles/TodoComp.css';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TodoComp = ({ task, updateIsDone }) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    let date;
    let time;

    if(task.date !== null) {
        date = task.date.substring(0, 10);
        time = task.date.substring(11, 16);
    }

    const updateCheck = (e) => { 
        toast.success('Task deleted successfully');     
        setTimeout(() => {
            if(e.target.checked){
                toast.success('Task restored succesfully');
                updateIsDone(id, task._id);
                return navigate(`/todo/${id}`);
            }                
        }, 1200);
    }

  return (
    <div className='todoComp-container'>
        <div>
            <label class="checkbox-container">
                <input type="checkbox"
                 class="checkbox-input"
                 onChange={updateCheck} />
                <span class="checkbox-checkmark"></span>
            </label>
            <div className='value-container'>
                <div className='text'>
                    {task.todo}
                </div>
                <div className='date-time'>
                    <div>
                        {date}
                    </div>
                    <div style={{ marginLeft: '1rem'}}>
                        {time}
                    </div>
                </div>
            </div>            
        </div>
        
    </div>
  )
}

export default TodoComp;