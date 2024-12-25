import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './styles/App.css';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TodoPage, { todoLoader } from './pages/TodoPage';
import AddTodoPage from './pages/AddTodoPage';

const App = () => {
  // add todo
  const addTodo = async (newTodo) => {
    try {
      const res = await fetch('/api/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });   
      const { id } = await res.json();
      return id;   
    } catch (error) {
      console.log(error);
    }
  } 

  // add task 
  const addNewTask = async (newTaskData, id) => {
    try {
      await fetch(`/api/api/todo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskData)
      });
    } catch (error) {
      console.log(error);
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>} loader={todoLoader}/>
        <Route path='/add-todo' element={<AddTodoPage AddNewTodo={addTodo}/>}/>
        <Route path='/todo/:id' element={<TodoPage addNewTask={addNewTask}/>} loader={todoLoader}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
