import React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import '../styles/cards.css';
import '../styles/AddTodoCard.css';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const AddTodoCard = () => {
  return (
    <Link to='/add-todo' style={{ textDecoration: 'none' }}>
      <div className='card-container todo-card-add'>        
        <div className='text-add'>Add a new main ToDo</div>
        <IconContext.Provider
         value={{ className: 'card-add-icon', size: '5rem' }}>
            <CiCirclePlus/>
        </IconContext.Provider>
    </div>
    </Link>
  );
}

export default AddTodoCard;