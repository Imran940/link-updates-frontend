import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pushNotification } from "../../functions/user";
import About from "../About/About";

export default function Home() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");
  const { role, email, password } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const handlePushNotification = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const notify_link = document.getElementById("link").value;
      await pushNotification({ email, password, notify_link });
      toast("Sent the notification to all users", { type: "success" });
      document.getElementById("link").value = "";
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response.data, { type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="m-10">
      {role == "admin" ? (
        <div className="mt-[15em] ">
          <form
            onSubmit={handlePushNotification}
            className="flex flex-row justify-center	"
          >
            <input
              type="url"
              id="link"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="https://www.link.com/"
              required
              title="Please enter a proper url"
            />
            <button
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-r-lg
                            hover:opacity-75"
              disabled={loading}
            >
              {loading ? "Pushing..." : "Push"}
            </button>
          </form>
        </div>
      ) : (
        <About />
      )}
    </div>
  );
}
