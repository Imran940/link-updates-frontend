import axios from "axios";

export const pushNotification = (payload) =>
  axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}/push-notification`,
    payload
  );
