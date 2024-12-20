import React, { useState } from 'react';
import '../styles/AddTodoPage.css';
import { useNavigate } from 'react-router-dom';

const AddTodoPage = ({ AddNewTodo }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const createNewTodo = async (e) => {
        e.preventDefault();

        const newTodo = {
            title: title || 'Untitled',
            todos: []
        }

        

        const id = await AddNewTodo(newTodo);

        return navigate(`/todo/${id}`);
    }

  return (
    <div className='todo-container'>
        <div>
            <form onSubmit={createNewTodo}>
                <label htmlFor="title">Add a Task Title</label>
                <hr />
                <span role='textbox' className='title-input diff-font' contentEditable onInput={(e) => setTitle(e.target.innerText)}>
              
                </span>
                <button className='submit-button' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  );
}

export default AddTodoPage;