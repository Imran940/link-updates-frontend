import React, { useEffect } from "react";
import Header from "./Conponents/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "./functions/auth";

function Layout() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      (async () => {
        try {
          const response = await getUserInfo(accessToken);
          const result = {
            ...response.data.user,
            notify_links: response.data.notify_links || {},
            accessToken,
            token: response.data.deviceToken,
            tokenStatus: response.data.deviceTokenStatus,
          };
          dispatch({
            type: "SIGN_IN_SUCCESS",
            payload: result,
          });
        } catch (err) {
          console.log(err);
          localStorage.removeItem("accessToken");
          toast(err.response.data, { type: "error" });
          navigate("/login");
        }
      })();
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
