import React, { useState } from 'react';
import '../styles/TodoReuse.css';
import TodoComp from './TodoComp';
import { IconContext } from 'react-icons';
import { IoAddCircle } from "react-icons/io5";

const TodoReuse = () => {
    const [title, setTitle] = useState('');

  return (
    <div className='todo-container'>
        <div>
            <span role='textbox' className='title-input' contentEditable onInput={(e) => setTitle(e.target.innerText)}>
              
            </span>
            <hr />
            <TodoComp/>
            <IconContext.Provider
            value={{ className: 'add-task', size: '4rem' }}>
                <IoAddCircle/>
            </IconContext.Provider>
        </div>
    </div>
  );
}

export default TodoReuse;