import React, { useState } from 'react';
import '../styles/TodoComp.css';
import { RxCross2 } from "react-icons/rx";
import { IconContext } from 'react-icons';

const TodoComp = ({ task }) => {    
    const [selOption, setSelOption] = useState('');

  return (
    <div className='todoComp-container'>
        <div>
            <label class="checkbox-container">
                <input type="checkbox" class="checkbox-input" />
                <span class="checkbox-checkmark"></span>
            </label>

            <div>
                <div className='text'>
                    {task.todo}
                </div>
                <div className='date-time'>
                    {task.date}
                </div>
            </div>
            <IconContext.Provider
             value={{ className: 'x-del', size: '1.5rem'}}>
                <RxCross2/>
            </IconContext.Provider>
        </div>
        
    </div>
  )
}

export default TodoComp;