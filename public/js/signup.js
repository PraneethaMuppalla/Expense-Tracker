const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
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
      password: passwordEl.value,
    };
    const response = await axiosInstance.post("/sign-up", newUser);
    nameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    successToast("Registration Successful. Please Login.");
  } catch (err) {
    if (err.response && err.response.status === 409) {
      errorToast("User already exists. Please Login.");
      nameEl.value = "";
      emailEl.value = "";
      passwordEl.value = "";
    } else {
      console.error(err);
    }
  }
}

signUpFormEl.addEventListener("submit", submitSignUpForm);
