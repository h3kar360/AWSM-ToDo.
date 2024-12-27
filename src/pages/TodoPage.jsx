import React, { useState, useContext } from 'react';
import '../styles/TodoReuse.css';
import TodoComp from '../components/TodoComp';
import { IconContext } from 'react-icons';
import { IoAddCircle } from "react-icons/io5";
import { useLoaderData, useParams } from 'react-router-dom';
import AddTask from '../components/AddTask';
import { Context } from '../App';

const TodoPage = ({ addNewTask, updateIsDone, updateTitle }) => {
  const { id } = useParams();
  const [lastId, setLastId] = useContext(Context);
  const [title, setTitle] = useState('');
  const [addTask, setAddTask] = useState(false);
  const todo = useLoaderData();

  setLastId(todo._id);

  return (
    <>
      <div className='todo-container'>
        <div>
            <span role='textbox' 
             className='title-input' 
             contentEditable 
             onInput={(e) => setTitle(e.target.innerText)}
             onBlur={() => updateTitle(title, id)}>
              {todo.title}
            </span>
            <hr />
            {              
              todo.todos.map((task) => (                
                <TodoComp key={task._id} task={task} updateIsDone={updateIsDone}/>
              ))
            }
            
            <button className='placeholder-button' onClick={() => {setAddTask(true)}}>
                <IconContext.Provider
              value={{ className: 'add-task', size: '4rem' }}
              >              
                <IoAddCircle/>    
              </IconContext.Provider>
            </button>            
        </div>
      </div>
      {addTask ? <AddTask setAddTask={setAddTask} addNewTask={addNewTask}/> : ''}
    </>    
  );  
}

const todoLoader = async ({ params }) => {
  try {
    const res = await fetch(`/api/api/todo/${params.id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { TodoPage as default, todoLoader};