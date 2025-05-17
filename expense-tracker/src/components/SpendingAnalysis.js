import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../css/SpendingAnalysis.css';
import { Link } from 'react-router-dom';
import { getExpenses, addExpense } from '../api';

const SpendingAnalysis = () => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchAllExpenses();
    }, []);

    const fetchAllExpenses = async () => {
        try {
            const res = await getExpenses();
            setExpenses(res.data);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        if (!category || !amount || !date) return;

        const newExpense = {
            name: 'Added via Analysis',
            category,
            amount: parseFloat(amount),
            date
        };

        try {
            const res = await addExpense(newExpense);
            setExpenses([...expenses, res.data]);
            setCategory('');
            setAmount('');
            setDate('');
        } catch (error) {
            console.error("Failed to add expense", error);
        }
    };

    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Spending Analysis ($)',
                data: Object.values(categoryTotals),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <h1>Expenzo</h1>
                </div>
            </header>
            <br></br>

            <nav>
                <Link to="/dashboard">Dashboard</Link>
            </nav>

            <main className="spending-page">
                <div className="spending-card">
                    <h2>Spending Analysis</h2>

                    {/* Add Expense Form */}
                    <form onSubmit={handleAddExpense} className="spending-form">
                        <label htmlFor="category">Category:</label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />

                        <label htmlFor="amount">Amount ($):</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />

                        <label htmlFor="date">Date:</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <button type="submit">Add Expense</button>
                    </form>

                    <div className="spending-list">
                        <h3>Spending Breakdown</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Total Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(categoryTotals).map(([cat, amt], index) => (
                                    <tr key={index}>
                                        <td>{cat}</td>
                                        <td>{amt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="spending-chart">
                        <h3>Spending Chart</h3>
                        <Bar data={chartData} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default SpendingAnalysis;
