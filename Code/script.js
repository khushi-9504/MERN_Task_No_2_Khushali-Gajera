// script.js

const expenses = [];

const addExpenseButton = document.getElementById("add-expense");
const balancesList = document.getElementById("balances-list");

addExpenseButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    // Add expense to the list
    expenses.push({ name, amount });
    updateBalances();
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
});

function updateBalances() {
    const balances = {};

    // Calculate balances
    expenses.forEach(({ name, amount }) => {
        if (!balances[name]) balances[name] = 0;
        balances[name] += amount;
    });

    const totalAmount = expenses.reduce((sum, { amount }) => sum + amount, 0);
    const perPerson = totalAmount / Object.keys(balances).length;

    balancesList.innerHTML = "";

    // Display balances
    for (const person in balances) {
        const balance = (balances[person] - perPerson).toFixed(2);
        const li = document.createElement("li");
        li.textContent = `${person}: ${balance >= 0 ? `owes ${balance}` : `is owed ${-balance}`}`;
        balancesList.appendChild(li);
    }
}
