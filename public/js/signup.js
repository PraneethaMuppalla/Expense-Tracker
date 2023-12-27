const axiosInstance = axios.create({
  baseURL: "http://16.171.239.191:3000/",
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
    window.location.href = `./login.html`;
  } catch (err) {
    if (err.response && err.response.status === 409) {
      window.location.href = `./login.html`;
      nameEl.value = "";
      emailEl.value = "";
      passwordEl.value = "";
    } else {
      errorToast("Some error occured. Please try again.");
    }
  }
}

signUpFormEl.addEventListener("submit", submitSignUpForm);

// // <<--------------------- code to get toast messages ------------------------>>>>
// const urlParams = new URLSearchParams(window.location.search);
// console.log("urlParams" + urlParams);
// const successParam = urlParams.get("success");
// const errorParam = urlParams.get("error");
// if (errorParam && errorParam === "1") {
//   errorToast("You are not registered. Please Sign up with us.");
//   const newUrl = window.location.href.split("?")[0];
//   history.replaceState(null, "", newUrl);
// }
