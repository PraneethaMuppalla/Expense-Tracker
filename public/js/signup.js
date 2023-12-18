const axiosInstance = axios.create({
  baseUrl: "http://localhost:3000",
});

const signUpFormEl = document.getElementById("form");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");

async function submitSignUpForm(e) {
  try {
    e.preventDefault();
    const newUser = {
      name: nameEl.value,
      email: emailEl.value,
      passwordEl: passwordEl.value,
    };
    const response = await axiosInstance.post("/sign-up", newUser);
  } catch (err) {
    console.error(err);
  }
}

signUpFormEl.addEventListener("submit", submitSignUpForm);
