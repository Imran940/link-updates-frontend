import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InviteModal from "./InviteModal";
import { BellFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { toggleNotification } from "../../functions/user";
import { Popconfirm } from "antd";

export default function Header() {
  const accessToken = localStorage.getItem("accessToken");
  const { role, token, tokenStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [PopConfirmVisible, setPopConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const reminderOn = tokenStatus == "on";

  const handleNotificationState = async () => {
    if (!tokenStatus) return;
    try {
      setLoading(true);
      const response = await toggleNotification(
        { isSet: !reminderOn },
        accessToken
      );
      setLoading(false);
      setPopConfirmVisible(false);
      toast(response.data, { type: "success" });
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: {
          tokenStatus: reminderOn ? "off" : "on",
        },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setPopConfirmVisible(false);
      toast("something happened wrong", { type: "error" });
    }
  };
  return (
    <header className="shadow sticky z-50 top-0">
      <InviteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>
          {!accessToken ? (
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className=" d-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="d-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              {role == "admin" ? (
                <span
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer"
                >
                  Invite
                </span>
              ) : (
                <div className="cursor-pointer">
                  <BellFilled style={{ color: reminderOn ? "red" : "green" }} />

                  <Popconfirm
                    open={PopConfirmVisible}
                    okButtonProps={{
                      title: reminderOn ? "Turn Off" : "Turn On",
                      loading: loading,
                      style: {
                        background: reminderOn ? "red" : "green",
                        color: "white",
                      },
                    }}
                    onCancel={(e) => {
                      e?.stopPropagation();
                      setPopConfirmVisible(false);
                    }}
                    title={`Are you sure that you want to turn ${
                      reminderOn ? "Turn Off " : "Turn On"
                    }Notification`}
                    onConfirm={handleNotificationState}
                  >
                    {!tokenStatus ? null : (
                      <span
                        className={`${
                          reminderOn
                            ? "hover:text-red-600"
                            : "hover:text-green-600"
                        }`}
                        onClick={() => setPopConfirmVisible(true)}
                      >
                        {tokenStatus == "on"
                          ? "Turn Off "
                          : tokenStatus == "off"
                          ? "Turn On"
                          : ""}
                      </span>
                    )}
                  </Popconfirm>
                </div>
              )}

              <span
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  dispatch({
                    type: "SIGN_OUT_SUCCESS",
                  });
                  navigate("/login");
                }}
              >
                Log Out
              </span>
            </div>
          )}
          {/* <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {role == "admin" ? (
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                        isActive ? "text-orange-700" : "text-grey-700"
                      } hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
              ) : (
                isLogin && (
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                          isActive ? "text-orange-700" : "text-grey-700"
                        } hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                )
              )}

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-700" : "text-grey-700"
                    } hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/github"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-700" : "text-grey-700"
                    } hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Github
                </NavLink>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
}
