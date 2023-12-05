self.addEventListener("push", (e) => {
  console.log({ data: JSON.parse(e.data.text()) });
  const notification = JSON.parse(e.data.text()).notification;
  console.log({ notification });
  e.waitUntil(
    self.registration.showNotification(notification.title, {
      ...notification,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: "vibration-sample",
    })
  );
});
