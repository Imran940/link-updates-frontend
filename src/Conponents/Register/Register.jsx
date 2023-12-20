import React, { useEffect, useState } from "react";
import { createUser } from "../../functions/auth";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};
function Register() {
  const [values, setValues] = useState(defaultValues);
  const { role } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const invited_token = location.search.split("?token=")[1];

  useEffect(() => {
    if (accessToken) {
      navigate(role == "admin" ? "/" : "/about");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(invited_token);
      await createUser({ ...values, ...(invited_token && { invited_token }) });
      setValues(defaultValues);
      navigate("/login");
      toast("Registration done successfully");
    } catch (err) {
      console.log(err);
      toast(err.response.data, { type: "error" });
    }
  };

  const handleInputChange = (e) =>
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));

  const { name, email, password } = values;
  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
            {/* <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
            /> */}

            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
          <div class="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div class="text-grey-dark mt-6">
          Already have an account?
          <a
            class="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default Register;
