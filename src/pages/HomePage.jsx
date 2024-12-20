import React from 'react';
import '../styles/HomePage.css';
import TodoCard from '../components/TodoCard';
import AddTodoCard from '../components/AddTodoCard';
import todos from '../todos.json';

const HomePage = () => {
  return (
    <div className='container'>
      {todos.map((todo) => (
        <TodoCard todo={todo}/>
      ))}
      <AddTodoCard/>
    </div>
  );
}

export default HomePage;