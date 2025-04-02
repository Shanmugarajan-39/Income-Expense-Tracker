const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");

// const dummyData = [
//   { id: 1, description: "Flowers", amount: -20 },
//   { id: 2, description: "Salary", amount: 2000 },
//   { id: 3, description: "Books", amount: -203 },
//   { id: 4, description: "Camera", amount: -250 },
//   { id: 5, description: "Movie", amount: -200 },
// ];

// let transactions = dummyData;

const localStorageTransaction = JSON.parse(localStorage.getItem("trans"));

let transactions = localStorage.getItem("trans ") !== null ? localStorage : [];

// load transaction

function loadTranscationDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");

  item.innerHTML = `
    ${transaction.description} 
    <span>${sign} ${Math.abs(transaction.amount)}</span>
   <button class="btn-del" onclick="removeTrans(${transaction.id})">X</button>
   `;
  trans.appendChild(item);
}

//       Remove Transactions

function removeTrans(id) {
  if (confirm("Are you sure you want to delete the Transaction ?")) {
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  } else {
    return;
  }
}

// update amount

function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.innerHTML = `₹  ${total}`;

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  inc_amt.innerHTML = `₹  ${income}`;

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  exp_amt.innerHTML = `₹  ${Math.abs(expense)}`;
}

// Config

function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTranscationDetails);
  updateAmount();
}

// submit btn

function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() == "" || amount.value.trim() == "") {
    alert("Please enter the transaction and amount");
  } else {
    const transaction = {
      id: uniqueId(),
      description: description.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    loadTranscationDetails(transaction);
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
}



function uniqueId(){
  return Math.floor(Math.random()*1000000)
}

form.addEventListener("submit", addTransaction);

function updateLocalStorage() {
  localStorage.setItem("trans",JSON.stringify(transactions));
}

//page load

window.addEventListener("load", function () {
  config();
});
