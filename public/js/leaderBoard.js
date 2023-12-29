const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://13.201.116.84:3000/",
  timeout: 3000,
  headers: { Authorization: token },
});

const tbodyEl = document.getElementById("tbody");
function renderEachExpense(each, i) {
  let tr = document.createElement("tr");
  tr.id = `rowEl${each.id}`;
  let td1 = document.createElement("td");
  td1.textContent = i + 1;

  let td2 = document.createElement("td");
  td2.textContent = each.totalExpenses;

  let td3 = document.createElement("td");
  td3.textContent = each.name;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbodyEl.appendChild(tr);
}

async function getLeaderBoard() {
  try {
    const result = await axiosInstance.get("/premium/getLeaderBoard");
    result.data.map((each, i) => {
      renderEachExpense(each, i);
    });
  } catch (err) {
    console.error(err);
    errorToast(
      "Some error occured.We can't fetch leader board. Please try again."
    );
  }
}

window.addEventListener("DOMContentLoaded", getLeaderBoard);
