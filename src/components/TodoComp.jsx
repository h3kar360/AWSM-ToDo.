import React, { useState } from 'react';
import '../styles/TodoComp.css';
import { RxCross2 } from "react-icons/rx";
import { IconContext } from 'react-icons';

const TodoComp = () => {
    
    const [selOption, setSelOption] = useState('');

  return (
    <div className='todoComp-container'>
        <div>
            <label className={`radio ${selOption === 'done' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    name="todo-radio"
                    value="done"
                    onChange={(e) => setSelOption(e.target.value)}
                />
                <span className="custom-radio"></span>
            </label>
            <div>
                <div className='text'>
                    Eat poop
                </div>
                <div className='date-time'>
                    10-0-9 10.00
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