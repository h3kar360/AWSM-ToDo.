import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './styles/App.css';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TodoPage, { todoLoader } from './pages/TodoPage';
import AddTodoPage from './pages/AddTodoPage';

export const Context = React.createContext();

const App = () => {
  const [lastId, setLastId] = useState('');
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

  // update task
  const updateTask = async (id, todoId) => {
    const todoIdJSON = { todoId };

    try {
      await fetch(`/api/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoIdJSON)
      });
    } catch (error) {
      console.log(error);
    }
  }

  // update title
  const updateTitle = async (title, id) => {
    try {
      await fetch(`/api/api/todo/title/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title })
      })
    } catch (error) {
      console.log(error);
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={
          <Context.Provider value={[lastId, setLastId]}>
            <HomePage/>            
          </Context.Provider>
        } loader={todoLoader}/>
        <Route path='/add-todo' element={<AddTodoPage AddNewTodo={addTodo}/>}/>
        <Route path='/todo/:id' element={
          <Context.Provider value={[lastId, setLastId]}>
            <TodoPage addNewTask={addNewTask} updateIsDone={updateTask} updateTitle={updateTitle}/>
          </Context.Provider>
        } loader={todoLoader}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
