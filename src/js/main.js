// This file is intentionally left blank.
document.addEventListener('DOMContentLoaded', function () {
    // input with id "username" on change
    document.getElementById('username').addEventListener('input', function () {
        const username = this.value;
        // regex to check if username has atleast 1 capital letter, 1 special character, 1 number and is atleast 8 characters long
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
        if (regex.test(username)) {
            // set the username input border to green
            this.style.borderColor = 'green';
        } else {
            // set the username input border to red
            this.style.borderColor = 'red';
        }
    });
    // Example for a canvas with id="barChart"
    document.getElementById('download-btn').addEventListener('click', function () {
        var canvas = document.getElementById('barChart');
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
    });

    var chartTab = document.getElementById('chart-tab');
    var barChart;

    chartTab.addEventListener('click', function () {
        var ctx = document.getElementById('barChart').getContext('2d');
        const { income, expenses } = getMonthlyIncomeExpenses();

        // Destroy previous chart instance if it exists
        if (barChart) {
            barChart.destroy();
        }

        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [{
                    label: 'Income',
                    data: income,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                }, {
                    label: 'Expenses',
                    data: expenses,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    function getMonthlyIncomeExpenses() {
        const months = [
            'jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ];
        const income = [];
        const expenses = [];

        months.forEach(month => {
            const incomeInput = document.getElementById(`income-${month}`);
            const expensesInput = document.getElementById(`expenses-${month}`);
            income.push(incomeInput ? Number(incomeInput.value) || 0 : 0);
            expenses.push(expensesInput ? Number(expensesInput.value) || 0 : 0);
        });

        return { income, expenses };
    }
});