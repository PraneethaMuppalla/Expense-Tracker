const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const formEl = document.getElementById("form");
const emailEl = document.getElementById("email");

async function submitForm(e) {
  e.preventDefault();
  try {
    let email = {
      email: emailEl.value,
    };
    const response = await axiosInstance.post(
      "/password/forgotpassword",
      email
    );
  } catch (err) {
    console.error(err);
    errorToast("Some error occured. Please try again.");
  }
}

formEl.addEventListener("submit", submitForm);
