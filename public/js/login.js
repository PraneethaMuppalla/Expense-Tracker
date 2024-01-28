const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const loginFormEl = document.getElementById("loginForm");
const loginEmailEl = document.getElementById("loginEmail");
const loginPasswordEl = document.getElementById("loginPassword");

async function submitLoginForm(e) {
  try {
    e.preventDefault();
    const loginUser = {
      email: loginEmailEl.value,
      password: loginPasswordEl.value,
    };
    const response = await axiosInstance.post("/login", loginUser);
    loginEmailEl.value = "";
    loginPasswordEl.value = "";
    localStorage.setItem("token", response.data.token);
    window.location.href = "./home.html?success=1";
    alert("Login successful");
  } catch (err) {
    if (err.response && err.response.status === 404) {
      window.location.href = "./signup.html?error=1";
    } else if (err.response && err.response.status === 401) {
      errorToast("Password is incorrect.");
    } else {
      errorToast("Some error occured. Please try again.");
    }
  }
}

loginFormEl.addEventListener("submit", submitLoginForm);

// <<--------------------- code to get toast messages ------------------------>>>>
const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams" + urlParams);
const successParam = urlParams.get("success");
const errorParam = urlParams.get("error");
if (successParam && successParam === "1") {
  successToast("Registration Successful. Please Login", 2000);
  const newUrl = window.location.href.split("?")[0];
  history.replaceState(null, "", newUrl);
}
if (errorParam && errorParam === "1") {
  errorToast("You are already registered. Please log in.");
  const newUrl = window.location.href.split("?")[0];
  history.replaceState(null, "", newUrl);
}
