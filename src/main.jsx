import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import About from "./Conponents/About/About.jsx";
import Home from "./Conponents/Home/Home.jsx";
import Github, { githubInfoLoader } from "./Conponents/Github/Github.jsx";
import Login from "./Conponents/Login/Login.jsx";
import Register from "./Conponents/Register/Register.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.js";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      {/* <Route path="about" element={<About />} /> */}
      <Route loader={githubInfoLoader} path="github" element={<Github />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
