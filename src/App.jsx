import React, { useState } from "react";
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
  let token = "";

  // refresh access token
  const refreshAccessToken = async () => {
    try {
      const token = await fetch("/api/api/user/refresh-access-token", {
        method: "POST",
        "Content-Type": "application/json",
      });
      const { accessToken } = await token.json();
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  // refresh the page kinda
  const refresh = async () => {
    try {
      const newToken = await refreshAccessToken();
      token = newToken;
    } catch (error) {
      console.log(error);
    }
  };

  // add todo
  const addTodo = async (newTodo) => {
    try {
      const res = await fetch("/api/api/todo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (res.status === 403) {
        await refresh();
        addTodo(newTodo);
        return;
      }

      const { id } = await res.json();
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  // add task
  const addNewTask = async (newTaskData, id) => {
    try {
      const res = await fetch(`/api/api/todo/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData),
      });

      if (res.status === 403) {
        await refresh();
        addNewTask(newTaskData, id);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update task
  const updateTask = async (id, todoId) => {
    const todoIdJSON = { todoId };

    try {
      const res = await fetch(`/api/api/todo/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoIdJSON),
      });

      if (res.status === 403) {
        await refresh();
        updateTask(id, todoId);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update title
  const updateTitle = async (title, id) => {
    try {
      const res = await fetch(`/api/api/todo/title/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });

      if (res.status === 403) {
        await refresh();
        updateTitle(title, id);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //login user
  const loginUser = async (loginDetails) => {
    try {
      const res = await fetch("/api/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //signup user
  const signupUser = async (signupDetails) => {
    try {
      const res = await fetch("/api/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupDetails),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //logout user
  const logoutUser = async () => {
    try {
      await fetch("/api/api/user/logout");
      token = "";
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
              <HomePage refresh={refresh} />
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
                refresh={refresh}
              />
            </Context.Provider>
          }
        />
        <Route path="/login" element={<LoginPage loginUser={loginUser} />} />
        <Route
          path="/signup"
          element={<SignupPage signupUser={signupUser} />}
        />
      </Route>
    )
  );

  return (
    <Token.Provider value={token}>
      <RouterProvider router={router} />
    </Token.Provider>
  );
};

export default App;
