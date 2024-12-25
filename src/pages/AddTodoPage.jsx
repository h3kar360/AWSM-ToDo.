import React, { useState } from 'react';
import '../styles/AddTodoPage.css';
import { useNavigate } from 'react-router-dom';

const AddTodoPage = ({ AddNewTodo }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [isDel, setIsDel] = useState(false);

    const createNewTodo = async (e) => {
        e.preventDefault();

        const newTodo = {
            title: title || 'Untitled',
            todos: []
        };   

        const id = await AddNewTodo(newTodo);

        return isDel ? null : navigate(`/todo/${id}`);
    }

    const chooseNav = () => {
        setIsDel(() => true);
        return navigate('/');
    }

  return (
    <div className='todo-container'>
        <div>
            <form onSubmit={createNewTodo}>
                <label htmlFor="title">Add a Task</label>
                <hr />
                <span role='textbox' className='title-input diff-font' contentEditable onInput={(e) => setTitle(e.target.innerText)}>
              
                </span>
                
                <div className='button-container'>
                    <button className='del-button' onClick={chooseNav}>Cancel</button>
                    <button className='submit-button' type='submit'>Create</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default AddTodoPage;