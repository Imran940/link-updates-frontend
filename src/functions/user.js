import axios from "axios";

export const pushNotification = (payload) =>
  axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}/push-notification`,
    payload
  );

export const saveTokenForNotiification = (payload) =>
  axios.post(`${import.meta.env.VITE_API_SERVER_URL}/save-token`, payload);
