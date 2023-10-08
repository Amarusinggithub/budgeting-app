const totalBudgetInput = document.getElementById("budget");
const addTotalBudgetBtn = document.getElementById("budget-button");
const expenseCategoryNameInput = document.getElementById("category-name");
const expenseCategoryCostInput = document.getElementById("category-cost");
const checkAmountBtn = document.getElementById("amount-button");
const displayBudget = document.getElementById("total-budget");
const displayExpenses = document.getElementById("total-expenses");
const displayBalance = document.getElementById("total-balance");
const displayExpensesList = document.getElementById("expense-list");
let expensesCostArr = [];

function displayTotalBudget() {
    if (!isNaN(totalBudgetInput.value)) {
        displayBudget.value = totalBudgetInput.value;
        displayTotalExpenses();
        displayTotalBalance();
    } else {
        displayBudget.value = "";
    }
    totalBudgetInput.value = "";
    return displayBudget.value;
}

function displayTotalExpenses() {
    let sum = 0;
    const expenseCost = parseFloat(expenseCategoryCostInput.value);
    if (!isNaN(expenseCost)) {
        expensesCostArr.push(expenseCost);
        for (let i = 0; i < expensesCostArr.length; i++) {
            sum += expensesCostArr[i];
        }
        displayExpenses.value = sum;
    } else {
        expenseCategoryCostInput.value = "";
    }
    console.log(sum);
    console.log(expensesCostArr);

    return sum;
}

function displayTotalBalance() {
    const balanceSum = displayBudget.value - displayExpenses.value;
    displayBalance.value = balanceSum;
}

function createDeleteBtn() {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    return deleteButton;
}

function createExpenseDiv() {
    const expense = document.createElement("div");
    expense.className = "expense-div";
    return expense;
}

function createDiv() {
    const div = document.createElement("div");

    return div;
}

function addExpenseToExpenseList() {
    const expense = createExpenseDiv();
    const div = createDiv();
    const deleteButton = createDeleteBtn();

    displayExpensesList.appendChild(expense);

    deleteButton.addEventListener("click", function() {
        deleteButtonFunc(expense);
    });

    expense.append(expenseCategoryNameInput.value);
    div.append(expenseCategoryCostInput.value);
    expense.appendChild(div);
    expense.appendChild(deleteButton);

    expenseCategoryNameInput.value = "";
    expenseCategoryCostInput.value = "";

    return div;
}

function deleteButtonFunc(expense) {
    const expenseCost = parseFloat(expense.querySelector("div").textContent);
    expensesCostArr = expensesCostArr.filter((cost) => cost !== expenseCost);
    const totalExpenses = expensesCostArr.reduce((sum, cost) => sum + cost, 0);
    displayExpenses.value = totalExpenses;
    const totalBudget = parseFloat(displayBudget.value);
    const totalBalance = totalBudget - totalExpenses;
    displayBalance.value = totalBalance;
    displayExpensesList.removeChild(expense);
}

addTotalBudgetBtn.addEventListener("click", displayTotalBudget);
checkAmountBtn.addEventListener("click", displayTotalExpenses);
checkAmountBtn.addEventListener("click", displayTotalBalance);
checkAmountBtn.addEventListener("click", addExpenseToExpenseList);