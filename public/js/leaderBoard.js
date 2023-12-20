const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  headers: { Authorization: token },
});

const tbodyEl = document.getElementById("tbody");
function renderEachExpense(each) {
  let tr = document.createElement("tr");
  tr.id = `rowEl${each.id}`;

  let td1 = document.createElement("td");
  td1.textContent = each.totalExpenses;

  let td2 = document.createElement("td");
  td2.textContent = each.user.name;

  tr.appendChild(td1);
  tr.appendChild(td2);

  tbodyEl.appendChild(tr);
}

async function getLeaderBoard() {
  try {
    const result = await axiosInstance.get("/premium/getLeaderBoard");
  } catch (err) {
    console.error(err);
    errorToast(
      "Some error occured.We can't fetch leader board. Please try again."
    );
  }
}

window.addEventListener("DOMContentLoaded", getLeaderBoard);
