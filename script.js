// // script.js

// // Add your JavaScript code here

// // Function to edit an expense
// function editExpense(index, newAmount, newCategory) {
//     if (!isNaN(newAmount) && newAmount > 0) {
//         let oldExpense = expenseHistory[index];
//         let oldAmount = oldExpense.amount;
//         let oldCategory = oldExpense.category;
//         // Update expenses for the old category
//         switch (oldCategory) {
//             case 'Groceries':
//                 groceriesBudget -= oldAmount;
//                 break;
//             case 'Utilities':
//                 utilitiesBudget -= oldAmount;
//                 break;
//             case 'Entertainment':
//                 entertainmentBudget -= oldAmount;
//                 break;
//             // Add more cases for other categories as needed
//         }
//         // Update expenses for the new category
//         switch (newCategory) {
//             case 'Groceries':
//                 groceriesBudget += newAmount;
//                 break;
//             case 'Utilities':
//                 utilitiesBudget += newAmount;
//                 break;
//             case 'Entertainment':
//                 entertainmentBudget += newAmount;
//                 break;
//             // Add more cases for other categories as needed
//         }
//         // Update expense history
//         expenseHistory[index].amount = newAmount;
//         expenseHistory[index].category = newCategory;
//         updateUI();
//     } else {
//         alert('Please enter a valid positive number for the expense amount.');
//     }
// }

// // Function to delete an expense
// function deleteExpense(index) {
//     let deletedExpense = expenseHistory.splice(index, 1)[0];
//     // Update expenses for the deleted category
//     let deletedAmount = deletedExpense.amount;
//     let deletedCategory = deletedExpense.category;
//     switch (deletedCategory) {
//         case 'Groceries':
//             groceriesBudget -= deletedAmount;
//             break;
//         case 'Utilities':
//             utilitiesBudget -= deletedAmount;
//             break;
//         case 'Entertainment':
//             entertainmentBudget -= deletedAmount;
//             break;
//         // Add more cases for other categories as needed
//     }
//     updateUI();
// }

// // Function to edit a financial goal
// function editGoal(index, newName, newAmount) {
//     if (newName.trim() === '' || isNaN(newAmount) || newAmount <= 0) {
//         alert('Please enter a valid goal name and a positive number for the goal amount.');
//         return;
//     }
//     financialGoals[index].name = newName;
//     financialGoals[index].amount = newAmount;
//     updateUI();
// }

// // Function to delete a financial goal
// function deleteGoal(index) {
//     financialGoals.splice(index, 1);
//     updateUI();
// }

// // Event listener for editing expenses
// $(document).on('click', '.editExpenseBtn', function () {
//     let index = $(this).data('index');
//     let newAmount = parseFloat(prompt('Enter the new amount for the expense:'));
//     let newCategory = prompt('Enter the new category for the expense:');
//     editExpense(index, newAmount, newCategory);
// });

// // Event listener for deleting expenses
// $(document).on('click', '.deleteExpenseBtn', function () {
//     let index = $(this).data('index');
//     if (confirm('Are you sure you want to delete this expense?')) {
//         deleteExpense(index);
//     }
// });

// // Event listener for editing financial goals
// $(document).on('click', '.editGoalBtn', function () {
//     let index = $(this).data('index');
//     let newName = prompt('Enter the new name for the financial goal:');
//     let newAmount = parseFloat(prompt('Enter the new amount for the financial goal:'));
//     editGoal(index, newName, newAmount);
// });

// // Event listener for deleting financial goals
// $(document).on('click', '.deleteGoalBtn', function () {
//     let index = $(this).data('index');
//     if (confirm('Are you sure you want to delete this financial goal?')) {
//         deleteGoal(index);
//     }
// });

// // Initialize UI
// $(document).ready(function () {
//     updateUI();
// });

$(document).ready(function () {
    // Initialize localStorage data
    if (!localStorage.getItem('income')) {
        localStorage.setItem('income', '0');
    }
    if (!localStorage.getItem('expenses')) {
        localStorage.setItem('expenses', '0');
    }
    if (!localStorage.getItem('goals')) {
        localStorage.setItem('goals', '[]');
    }
    if (!localStorage.getItem('expenseHistory')) {
        localStorage.setItem('expenseHistory', '[]');
    }

    // Display initial data
    displayFinancialData();
    displayGoals();
    displayExpenseHistory();

    // Function to display financial data
    function displayFinancialData() {
        var income = parseFloat(localStorage.getItem('income'));
        var expenses = parseFloat(localStorage.getItem('expenses'));
        var balance = income - expenses;
        $("#income").text("₹" + income.toLocaleString());
        $("#expenses").text("₹" + expenses.toLocaleString());
        $("#balance").text("₹" + balance.toLocaleString());
    }

    // Function to display financial goals
    function displayGoals() {
        var goals = JSON.parse(localStorage.getItem('goals'));
        $("#goalList").empty(); // Clear existing goals
        goals.forEach(function (goal) {
            var goalItem = "<div class='goal-item'><p><strong>" + goal.name + ":</strong> ₹" + parseFloat(goal.amount).toLocaleString() + "</p></div>";
            $("#goalList").append(goalItem);
        });
    }

    // Function to display expense history
    function displayExpenseHistory() {
        var expenseHistory = JSON.parse(localStorage.getItem('expenseHistory'));
        $("#expenseHistoryBody").empty(); // Clear existing history
        expenseHistory.forEach(function (expense) {
            var expenseRow = "<tr><td>" + expense.date + "</td><td>" + expense.category + "</td><td>₹" + parseFloat(expense.amount).toLocaleString() + "</td><td><button class='btn btn-danger btn-sm deleteExpenseBtn' data-index='" + expense.index + "'>Delete</button></td></tr>";
            $("#expenseHistoryBody").append(expenseRow);
        });
    }

    // Function to add income
    $("#addIncomeBtn").click(function () {
        var incomeAmount = parseFloat($("#incomeAmount").val());
        if (incomeAmount) {
            var currentIncome = parseFloat(localStorage.getItem('income'));
            var newIncome = currentIncome + incomeAmount;
            localStorage.setItem('income', newIncome);
            displayFinancialData();
            $("#incomeAmount").val(""); // Clear input field
            showSuccessMessage("Income added successfully!");
        } else {
            showErrorMessage("Please enter a valid income amount.");
        }
    });

    // Function to add expense
    $("#addExpenseBtn").click(function () {
        var expenseAmount = parseFloat($("#expenseAmount").val());
        var expenseCategory = $("#expenseCategory").val();
        if (expenseAmount && expenseCategory) {
            var currentExpenses = parseFloat(localStorage.getItem('expenses'));
            var newExpenses = currentExpenses + expenseAmount;
            localStorage.setItem('expenses', newExpenses);
            displayFinancialData();
            var expenseHistory = JSON.parse(localStorage.getItem('expenseHistory'));
            var today = new Date().toLocaleDateString();
            expenseHistory.push({ date: today, category: expenseCategory, amount: expenseAmount, index: expenseHistory.length });
            localStorage.setItem('expenseHistory', JSON.stringify(expenseHistory));
            displayExpenseHistory();
            $("#expenseAmount").val(""); // Clear input fields
            showSuccessMessage("Expense added successfully!");
        } else {
            showErrorMessage("Please enter both expense amount and category.");
        }
    });

    // Function to add financial goal
    $("#addGoalBtn").click(function () {
        var goalName = $("#goalName").val();
        var goalAmount = parseFloat($("#goalAmount").val());
        if (goalName && goalAmount) {
            var goals = JSON.parse(localStorage.getItem('goals'));
            goals.push({ name: goalName, amount: goalAmount });
            localStorage.setItem('goals', JSON.stringify(goals));
            displayGoals();
            $("#goalName").val("");
            $("#goalAmount").val("");
            showSuccessMessage("Goal added successfully!");
        } else {
            showErrorMessage("Please provide both goal name and amount.");
        }
    });

    // Function to delete expense
    $(document).on("click", ".deleteExpenseBtn", function () {
        var index = $(this).data("index");
        var expenseHistory = JSON.parse(localStorage.getItem('expenseHistory'));
        var deletedExpense = expenseHistory.splice(index, 1)[0];
        localStorage.setItem('expenseHistory', JSON.stringify(expenseHistory));
        var currentExpenses = parseFloat(localStorage.getItem('expenses'));
        var newExpenses = currentExpenses - deletedExpense.amount;
        localStorage.setItem('expenses', newExpenses);
        displayFinancialData();
        displayExpenseHistory();
        showSuccessMessage("Expense deleted successfully!");
    });

    // Function to show success message
    function showSuccessMessage(message) {
        $(".alert").remove(); // Clear existing messages
        var successMessage = "<div class='alert alert-success'>" + message + "</div>";
        $("main").prepend(successMessage);
    }

    // Function to show error message
    function showErrorMessage(message) {
        $(".alert").remove(); // Clear existing messages
        var errorMessage = "<div class='alert alert-danger'>" + message + "</div>";
        $("main").prepend(errorMessage);
    }

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);

    // Get references to the authentication elements
    const auth = firebase.auth();
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const userDisplayName = document.getElementById('user-display-name');

    // Add login event listener
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                userDisplayName.textContent = `Welcome, ${user.displayName || user.email}`;
            })
            .catch((error) => {
                console.error('Login failed:', error.message);
            });
    });

    // Add logout event listener
    logoutButton.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                // Sign-out successful
                userDisplayName.textContent = 'Logged out';
            })
            .catch((error) => {
                console.error('Logout failed:', error.message);
            });
    });

    // Add an authentication state change listener
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            userDisplayName.textContent = `Welcome, ${user.displayName || user.email}`;
        } else {
            // User is signed out
            userDisplayName.textContent = 'Logged out';
        }
    });

});
