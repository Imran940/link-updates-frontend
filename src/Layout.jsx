import React, { useEffect } from "react";
import Header from "./Conponents/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const isLogin = localStorage.getItem("isLogin");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      const data =
        localStorage.getItem("data") &&
        JSON.parse(localStorage.getItem("data"));
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: data,
      });
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer style={{ width: "fit-content" }} />
    </>
  );
}

export default Layout;
