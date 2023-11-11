import axios from "axios";
// const API_SERVER = process.env.REACT_APP_API_SERVER;
export const createUser = (payload) =>
  axios.post(`${import.meta.env.VITE_API_SERVER_URL}/create-user`, payload);

export const findUser = (payload) =>
  axios.post(`${import.meta.env.VITE_API_SERVER_URL}/find-user`, payload);
