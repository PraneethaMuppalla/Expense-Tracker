function successToast(message, duration) {
  Toastify({
    text: message,
    duration: duration,
    offset: {
      y: 100,
    },
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
function errorToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    offset: {
      y: 100,
    },
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ff5f6d, #ffc371)",
    },
  }).showToast();
}
