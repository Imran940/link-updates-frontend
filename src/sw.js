self.addEventListener("push", (e) => {
  const options = {
    body: e.data.text(),
  };
  e.waitUntil(self.registration.showNotification("Push Notification", options));
});
