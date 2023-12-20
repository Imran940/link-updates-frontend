import axios from "axios";

export const pushNotification = (payload, token) =>
  axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}/push-notification`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const saveTokenForNotiification = (payload, token) =>
  axios.post(`${import.meta.env.VITE_API_SERVER_URL}/save-token`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const toggleNotification = (payload, token) =>
  axios.put(
    `${import.meta.env.VITE_API_SERVER_URL}/turn_on-or-turn_off-notification`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateInvitedUser = (payload, token) =>
  axios.put(
    `${import.meta.env.VITE_API_SERVER_URL}/update-or-delete-invited-user`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const sendUserInvitation = (payload, token) =>
  axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}/send-invitation`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );