let token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  headers: { Authorization: token },
});

const expnsesEl = document.getElementById("expenses");
const tbodyEl = document.getElementById("tbody");

function renderEachExpense(each) {
  let tr = document.createElement("tr");
  tr.id = `rowEl${each.id}`;
  let td1 = document.createElement("td");
  td1.textContent = each.date;

  let td2 = document.createElement("td");
  td2.textContent = each.category;

  let td3 = document.createElement("td");
  td3.textContent = each.expenses;

  let td4 = document.createElement("td");
  td4.textContent = each.description;

  // let editBtn = document.createElement("button");
  // editBtn.className = "editDelete btn btn-success edit";
  // editBtn.appendChild(document.createTextNode("Edit"));

  //td4.appendChild(editBtn);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  tbodyEl.appendChild(tr);
}

async function getTimelyExpenses() {
  try {
    const option = expnsesEl.value;
    console.log(option);
    tbodyEl.innerHTML = "";
    const response = await axiosInstance.get(`/reports?type=${option}`);
    console.log(response.data);
    response.data.forEach((each) => {
      renderEachExpense(each);
    });
  } catch (err) {
    console.error(err);
    alert("Error occured.Please try after some time");
  }
}

expnsesEl.addEventListener("change", getTimelyExpenses);
document.addEventListener("DOMContentLoaded", getTimelyExpenses);
