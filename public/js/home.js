const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const formEl = document.getElementById("form");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const descriptionEl = document.getElementById("description");
const tbodyEl = document.getElementById("tbody");

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
  td1.appendChild(document.createTextNode(each.expenses));

  let td2 = document.createElement("td");
  td2.appendChild(document.createTextNode(each.description));

  let td3 = document.createElement("td");
  td3.appendChild(document.createTextNode(each.category));

  let td4 = document.createElement("td");

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "editDelete btn btn-danger delete";
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.onclick = function () {
    deleteExpense(each.id);
  };

  // let editBtn = document.createElement("button");
  // editBtn.className = "editDelete btn btn-success edit";
  // editBtn.appendChild(document.createTextNode("Edit"));

  td4.appendChild(deleteBtn);
  //td4.appendChild(editBtn);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tbodyEl.appendChild(tr);
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  // add leading zeros to day and month if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  // create the date string in date-month-year format
  const dateStr = `${formattedDay}-${formattedMonth}-${year}`;
  return dateStr;
}

async function addExpense(e) {
  try {
    e.preventDefault();
    const date = getCurrentDate();
    const newExpense = {
      expenses: amountEl.value,
      category: categoryEl.value,
      description: descriptionEl.value,
      date,
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

async function getAllExpenses() {
  try {
    const result = await axiosInstance.get("/expenses/get-all-expenses");
    result.data.forEach((each) => {
      renderEachExpense(each);
    });
  } catch (err) {
    console.error(err);
    errorToast("Some error occured. Please try again.");
  }
}

formEl.addEventListener("submit", addExpense);
window.addEventListener("DOMContentLoaded", getAllExpenses);
