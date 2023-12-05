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
      const notify_link = {
        link: document.getElementById("link").value,
        facebook_link: document.getElementById("facebook_link").value,
        instagram_link: document.getElementById("instagram_link").value,
        twitter_link: document.getElementById("twitter_link").value,
      };
      await pushNotification({ email, password, notify_link });
      toast("Sent the notification to all users", { type: "success" });
      document.getElementById("link").value = "";
      document.getElementById("facebook_link").value = "";
      document.getElementById("instagram_link").value = "";
      document.getElementById("twitter_link").value = "";
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
        <div>
          <form
            onSubmit={handlePushNotification}
            className="flex flex-col gap-5 justify-center items-center	"
          >
            <span className="font-bold font-serif">Enter the links</span>
            <input
              type="url"
              id="link"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="https://www.link.com/"
              required
            />
            <input
              type="url"
              id="facebook_link"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-blue-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="https://www.facebook.com/"
            />
            <input
              type="url"
              id="instagram_link"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-orange-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="https://www.instagram.com/"
            />
            <input
              type="url"
              id="twitter_link"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-blue-400 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="https://www.twitter.com/"
            />
            <button
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded
                            hover:opacity-75"
              disabled={loading}
            >
              {loading ? "Pushing..." : "Push"}
            </button>
          </form>
        </div>
      ) : (
        role == "user" && <About />
      )}
    </div>
  );
}
