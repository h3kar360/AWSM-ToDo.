import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './styles/App.css';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import AddTodoPage from './pages/AddTodoPage';

const App = () => {
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/add-todo' element={<AddTodoPage AddNewTodo={addTodo}/>}/>
        <Route path='/todo/:id' element={<TodoPage/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
