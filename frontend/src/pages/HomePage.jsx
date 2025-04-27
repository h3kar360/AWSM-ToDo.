import React, { useState, useEffect, useContext } from "react";
import "../styles/HomePage.css";
import TodoCard from "../components/TodoCard";
import AddTodoCard from "../components/AddTodoCard";
import Spinner from "../components/Spinner";
import { Context, Token } from "../App";
import StartingPortal from "../components/StartingPortal";

const HomePage = ({ refresh }) => {
    const [lastId, setLastId] = useContext(Context);
    const [token, setToken] = useContext(Token);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get all of the todos
        const getAllTodos = async (currToken = token) => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API}/api/todo`,
                    {
                        headers: {
                            Authorization: `Bearer ${currToken}`,
                        },
                    }
                );

                if (res.status === 403 || res.status === 401) {
                    const newToken = await refresh();
                    setToken(newToken);
                    getAllTodos(newToken);
                }

                const data = await res.json();
                setTodos(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        // delete the todo that is empty
        const delTodo = async (currToken = token) => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API}/api/todo/${lastId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${currToken}`,
                        },
                    }
                );

                if (res.status === 403) {
                    const newToken = await refresh();
                    setToken(newToken);
                    delTodo(newToken);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (token !== "") {
            getAllTodos();
            delTodo();
        }
    }, []);

    return (
        <>
            {token === "" ? (
                <StartingPortal />
            ) : loading ? (
                <Spinner loading={loading} />
            ) : (
                <section className="container">
                    {todos.map((todo) => (
                        <TodoCard key={todo._id} todo={todo} />
                    ))}
                    <AddTodoCard />
                </section>
            )}
        </>
    );
};

export default HomePage;
