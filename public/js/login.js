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
      passwordEl: loginPasswordEl.value,
    };
    const response = await axiosInstance.post("/login", loginUser);
  } catch (err) {
    console.error(err);
  }
}

loginFormEl.addEventListener("submit", submitLoginForm);
