import React, { useState, useEffect, useContext } from 'react';
import '../styles/HomePage.css';
import TodoCard from '../components/TodoCard';
import AddTodoCard from '../components/AddTodoCard';
import Spinner from '../components/Spinner';
import { Context } from '../App';

const HomePage = () => {
  const [lastId, setLastId] = useContext(Context);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get all of the todos
    const getAllTodos = async () => {
      try {
        const res = await fetch('/api/api/todo');
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // delete the todo that is empty
    const delTodo = async () => {
      try {
        await fetch(`/api/api/todo/${lastId}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.log(error);
      }
    }
    
    getAllTodos();
    delTodo();
  }, []);  
  
  return( 
    <>
      {
        loading ? (
          <Spinner loading={loading} />
        ) : (
          <section className='container'>      
            {todos.map((todo) => (
              <TodoCard key={todo._id} todo={todo}/>
            ))}
            <AddTodoCard/>
          </section>
        )
      }
    </>
  );   
}

export default HomePage;