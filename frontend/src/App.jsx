import React, { useState, useEffect } from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import "./styles/App.css";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import AddTodoPage from "./pages/AddTodoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export const Context = React.createContext();
export const Token = React.createContext();

const App = () => {
    const [lastId, setLastId] = useState("");
    const [token, setToken] = useState("");

    // refresh access token
    const refreshAccessToken = async () => {
        try {
            const token = await fetch(
                `${import.meta.env.VITE_API}/api/user/refresh-access-token`,
                {
                    method: "POST",
                    "Content-Type": "application/json",
                }
            );
            const { accessToken } = await token.json();
            return accessToken;
        } catch (error) {
            console.log(error);
        }
    };

    // add todo
    const addTodo = async (newTodo, currToken = token) => {
        try {
            console.log(currToken);
            const res = await fetch(`${import.meta.env.VITE_API}/api/todo`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            console.log(res.status);
            if (res.status === 403) {
                const newToken = await refreshAccessToken();
                setToken(newToken);
                return addTodo(newTodo, newToken);
            }

            const { id } = await res.json();
            console.log(id);
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    // add task
    const addNewTask = async (newTaskData, id, currToken = token) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API}/api/todo/${id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${currToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTaskData),
                }
            );

            if (res.status === 403) {
                const newToken = await refreshAccessToken();
                setToken(newToken);
                addNewTask(newTaskData, id, newToken);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // update task
    const updateTask = async (id, todoId, currToken = token) => {
        const todoIdJSON = { todoId };

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API}/api/todo/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${currToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todoIdJSON),
                }
            );

            if (res.status === 403) {
                const newToken = await refreshAccessToken();
                setToken(newToken);
                return updateTask(id, todoId, newToken);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // update title
    const updateTitle = async (title, id, currToken = token) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API}/api/todo/title/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${currToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: title }),
                }
            );

            if (res.status === 403) {
                const newToken = await refreshAccessToken();
                setToken(newToken);
                updateTitle(title, id, newToken);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //login user
    const loginUser = async (loginDetails) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API}/api/user/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginDetails),
                }
            );
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    //signup user
    const signupUser = async (signupDetails) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API}/api/user/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupDetails),
                }
            );
            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    };

    //logout user
    const logoutUser = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API}/api/user/logout`);
            setToken("");
        } catch (error) {
            console.log(error);
        }
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout logout={logoutUser} />}>
                <Route
                    index
                    element={
                        <Context.Provider value={[lastId, setLastId]}>
                            <HomePage refresh={refreshAccessToken} />
                        </Context.Provider>
                    }
                />
                <Route
                    path="/add-todo"
                    element={<AddTodoPage AddNewTodo={addTodo} />}
                />
                <Route
                    path="/todo/:id"
                    element={
                        <Context.Provider value={[lastId, setLastId]}>
                            <TodoPage
                                addNewTask={addNewTask}
                                updateIsDone={updateTask}
                                updateTitle={updateTitle}
                                refresh={refreshAccessToken}
                            />
                        </Context.Provider>
                    }
                />
                <Route
                    path="/login"
                    element={<LoginPage loginUser={loginUser} />}
                />
                <Route
                    path="/signup"
                    element={<SignupPage signupUser={signupUser} />}
                />
            </Route>
        )
    );

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API}/api/user/refresh-access-token`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (res.ok) {
                    const { accessToken } = await res.json();
                    setToken(accessToken);
                }
            } catch (err) {
                console.log("Token refresh failed:", err);
            }
        };

        refreshAccessToken();
    }, []);

    return (
        <Token.Provider value={[token, setToken]}>
            <RouterProvider router={router} />
        </Token.Provider>
    );
};

export default App;
