const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://16.171.239.191:3000/",
  timeout: 3000,
  headers: { Authorization: token },
});

const formEl = document.getElementById("form");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const descriptionEl = document.getElementById("description");
const tbodyEl = document.getElementById("tbody");
const buyPremiumBtn = document.getElementById("buyPremium");
const leaderBoardLink = document.getElementById("leaderBoard");
const reportLink = document.getElementById("reports");
const paginationCont = document.getElementById("pagination");
const rowsEl = document.getElementById("rows");
let numOfRows = rowsEl.value;
async function deleteExpense(id) {
  try {
    const response = await axiosInstance.delete(
      `/expenses/delete-expense/${id}`
    );
    const rowEl = document.getElementById(`rowEl${id}`);
    tbodyEl.removeChild(rowEl);
    successToast("Successfully deleted", 3000);
  } catch (err) {
    console.error(err);
    errorToast("Some error occured. Please try again.");
  }
}

function renderEachExpense(each) {
  let tr = document.createElement("tr");
  tr.id = `rowEl${each.id}`;
  let td1 = document.createElement("td");
  const dateFromBe = new Date(each.date);
  td1.textContent = `${dateFromBe.getFullYear()}-${
    dateFromBe.getMonth() + 1
  }-${dateFromBe.getDate()}`;

  let td2 = document.createElement("td");
  td2.textContent = each.category;

  let td3 = document.createElement("td");
  td3.textContent = each.expenses;

  let td4 = document.createElement("td");
  td4.textContent = each.description;

  let td5 = document.createElement("td");
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-sm btn btn-danger m-0";
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    deleteExpense(each.id);
  };

  // let editBtn = document.createElement("button");
  // editBtn.className = "editDelete btn btn-success edit";
  // editBtn.appendChild(document.createTextNode("Edit"));

  td5.appendChild(deleteBtn);
  //td4.appendChild(editBtn);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tbodyEl.appendChild(tr);
}

async function addExpense(e) {
  try {
    e.preventDefault();

    const newExpense = {
      expenses: amountEl.value,
      category: categoryEl.value,
      description: descriptionEl.value,
    };
    const response = await axiosInstance.post(
      "/expenses/add-expense",
      newExpense
    );
    renderEachExpense(response.data);
    amountEl.value = "";
    categoryEl.value = "";
    descriptionEl.value = "";
  } catch (err) {
    errorToast("Some error occured. Please try again.");
  }
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
}) {
  paginationCont.innerHTML = "";
  if (hasPreviousPage) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.classList.add("btn", "btn-secondary", "me-2");
    prevBtn.addEventListener("click", () =>
      getExpenses(previousPage, numOfRows)
    );
    paginationCont.appendChild(prevBtn);
  }
  const currentBtn = document.createElement("button");
  currentBtn.textContent = currentPage + 1 + " of " + lastPage;
  currentBtn.classList.add("btn", "btn-secondary", "me-2");
  currentBtn.addEventListener("click", () =>
    getExpenses(currentPage, numOfRows)
  );
  paginationCont.appendChild(currentBtn);

  if (hasNextPage) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.classList.add("btn", "btn-secondary", "me-2");
    nextBtn.addEventListener("click", () => getExpenses(nextPage, numOfRows));
    paginationCont.appendChild(nextBtn);
  }
}

async function getExpenses(page, rows) {
  try {
    tbodyEl.innerHTML = "";
    const result = await axiosInstance.get(
      `/expenses/get-expenses?page=${page}&rows=${rows}`
    );
    const { expenses, ...pagesDes } = result.data;
    expenses.forEach((expense) => {
      renderEachExpense(expense);
    });
    showPagination(pagesDes);
  } catch (err) {
    console.error(err);
    errorToast("Some error occured.We can't fetch expenses. Please try again.");
  }
}

async function purchasePremium(e) {
  try {
    const response = await axiosInstance.get("/purchase/premiumMembership");
    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        const res = await axiosInstance.post(
          "/purchase/updateTransactionStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          }
        );
        console.log(res);
        successToast("Welcome to our Premium Membership", 2000);

        isPremiumUser();
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  } catch (err) {
    console.error(err);
    errorToast("Some error occured");
  }
}

async function isPremiumUser() {
  try {
    const res = await axiosInstance.get("/isPremiumUser");
    if (res.data.isPremiumUser) {
      buyPremiumBtn.innerHTML = "Premium Member ";
      buyPremiumBtn.removeEventListener("click", purchasePremium);
      leaderBoardLink.removeAttribute("click");
      leaderBoardLink.href = "./leaderBoard.html";
      reportLink.removeAttribute("click");
      reportLink.href = "./report.html";
    }
  } catch (err) {
    console.error(err);
  }
}

buyPremiumBtn.addEventListener("click", purchasePremium);
formEl.addEventListener("submit", addExpense);
rowsEl.addEventListener("change", () => {
  numOfRows = rowsEl.value;
  getExpenses(0, numOfRows);
});
window.addEventListener("DOMContentLoaded", () => getExpenses(0, numOfRows));
window.addEventListener("DOMContentLoaded", isPremiumUser);

// <<--------------------- code to get toast messages ------------------------>>>>
const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams" + urlParams);
const successParam = urlParams.get("success");
const errorParam = urlParams.get("error");
if (successParam && successParam === "1") {
  successToast("Login Successful.", 2000);
  const newUrl = window.location.href.split("?")[0];
  history.replaceState(null, "", newUrl);
}
if (errorParam && errorParam === "1") {
  errorToast("You are already registered. Please log in.");
  const newUrl = window.location.href.split("?")[0];
  history.replaceState(null, "", newUrl);
}
