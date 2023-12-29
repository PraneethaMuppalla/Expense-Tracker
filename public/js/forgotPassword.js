const axiosInstance = axios.create({
  baseURL: "http://13.201.116.84:3000/",
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
    emailEl.value = "";
    successToast("A link to reset password is sent to your mail");
  } catch (err) {
    if (err.response && err.response.status === 404) {
      errorToast("Email you entered is incorrect. Please try again.");
    } else {
      errorToast("Some error occured. Please try again.");
    }
  }
}

formEl.addEventListener("submit", submitForm);
