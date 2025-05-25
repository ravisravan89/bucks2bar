document.addEventListener('DOMContentLoaded', () => {
    // Username validation
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            const { value } = e.target;
            // Regex: at least 1 uppercase, 1 special char, 1 number, min 8 chars
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
            e.target.style.borderColor = regex.test(value) ? 'green' : 'red';
        });
    }

    // Download chart as PNG
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const canvas = document.getElementById('barChart');
            if (canvas) {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'chart.png';
                link.click();
            }
        });
    }

    // Chart tab logic
    const chartTab = document.getElementById('chart-tab');
    let barChart;

    if (chartTab) {
        chartTab.addEventListener('click', () => {
            const canvas = document.getElementById('barChart');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
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
                    datasets: [
                        {
                            label: 'Income',
                            data: income,
                            backgroundColor: 'rgba(54, 162, 235, 0.7)'
                        },
                        {
                            label: 'Expenses',
                            data: expenses,
                            backgroundColor: 'rgba(255, 99, 132, 0.7)'
                        }
                    ]
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
    }

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
