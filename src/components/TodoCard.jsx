import React from 'react';
import '../styles/TodoCard.css';
import { HiArrowSmallRight } from "react-icons/hi2";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const TodoCard = ({ todo }) => {

  return (
    <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
      <div className='card-container todo-card'>  
      <div>
        <div className='todo-title'>{todo.title}</div>
        <IconContext.Provider
        value={{ className: 'arrow-card', size: '2rem' }}>
          <HiArrowSmallRight/>
        </IconContext.Provider>        
      </div>        
      </div>     
    </Link> 
  );
}

export default TodoCard;