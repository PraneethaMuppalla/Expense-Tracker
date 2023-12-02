let listEl = document.getElementById("expensesList");
let formEl = document.querySelector("form");
let expensesEl = document.getElementById("expenses");
let descriptionEl = document.getElementById("description");
let categoryEl = document.getElementById("category");

let existingExpenses = localStorage;
console.log(localStorage);
listEl.addEventListener("click", deleteUser);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let newItem = {
    category: categoryEl.value,
    expenses: expensesEl.value,
    description: descriptionEl.value,
  };
  localStorage.setItem(categoryEl.value, JSON.stringify(newItem));
  const li = document.createElement("li");
  li.id = categoryEl.value;
  li.textContent = `${expensesEl.value}  ${descriptionEl.value}  ${categoryEl.value}`;
  li.className = "list-group-item fw-bold  align-items-center";
  let delButton = document.createElement("button");
  delButton.style.display = "inline";
  delButton.className = "del-btn btn btn-danger float-right";
  delButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");
  //editButton.style.display = "inline";
  editButton.className = "edit-btn btn btn-info float-right";
  editButton.appendChild(document.createTextNode("Edit"));
  li.appendChild(delButton);
  li.appendChild(editButton);
  listEl.appendChild(li);
  expensesEl.value = "";
  descriptionEl.value = "";
  categoryEl.value = "";
});
function deleteUser(e) {
  if (e.target.classList.contains("del-btn")) {
    if (confirm("Are you sure?")) {
      const liItem = e.target.parentElement;
      console.log(liItem);
      listEl.removeChild(liItem);
      localStorage.removeItem(liItem.id);
    }
  } else if (e.target.classList.contains("edit-btn")) {
    if (confirm("Are you sure?")) {
      const liItem = e.target.parentElement;
      const itemfromLocal = localStorage.getItem(`${liItem.id}`);
      const parsedItem = JSON.parse(itemfromLocal);
      expensesEl.value = parsedItem.expenses;
      descriptionEl.value = parsedItem.description;
      categoryEl.value = liItem.id;
      localStorage.removeItem(liItem.id);
      listEl.removeChild(liItem);
    }
  }
}
