import React, { useState, useEffect } from 'react';
import '../css/BudgetAlert.css';
import { Link } from 'react-router-dom';
import { setBudgetAlert, getBudgetAlert, deleteBudgetAlert } from '../api';

const BudgetAlert = () => {
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [alertThreshold, setAlertThreshold] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const userId = localStorage.getItem('userId'); // Assuming login stores it

    useEffect(() => {
        if (userId) {
            getBudgetAlert(userId).then((res) => {
                if (res.data) {
                    setMonthlyBudget(res.data.monthlyBudget);
                    setAlertThreshold(res.data.alertThreshold);
                    setAlertMessage('Loaded saved alert.');
                }
            }).catch(err => console.error(err));
        }
    }, [userId]);

    const handleSaveAlert = async (e) => {
        e.preventDefault();
        if (!monthlyBudget || !alertThreshold) {
            setAlertMessage("Please fill out both fields.");
            return;
        }

        try {
            await setBudgetAlert({ userId, monthlyBudget, alertThreshold });
            setAlertMessage(`Alert set for ${alertThreshold}% of $${monthlyBudget}`);
        } catch (err) {
            console.error(err);
            setAlertMessage("Error saving alert.");
        }
    };

    const handleDeleteAlert = async () => {
        if (window.confirm("Delete your budget alert?")) {
            try {
                await deleteBudgetAlert(userId);
                setMonthlyBudget('');
                setAlertThreshold('');
                setAlertMessage("Budget alert deleted.");
            } catch (err) {
                console.error(err);
                setAlertMessage("Error deleting alert.");
            }
        }
    };

    return (
        <>
            <header className="expense-header"><h2>Expenzo</h2></header>
            <nav className="nav-bar"><Link to="/dashboard">Dashboard</Link></nav>

            <div className="alert-container">
                <h2>Set Budget Alerts</h2>
                <form onSubmit={handleSaveAlert}>
                    <label>Monthly Budget ($)</label>
                    <input
                        type="number"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                        placeholder="Enter your monthly budget"
                        required
                    />
                    <label>Alert Threshold (%)</label>
                    <input
                        type="number"
                        value={alertThreshold}
                        onChange={(e) => setAlertThreshold(e.target.value)}
                        placeholder="Enter alert threshold"
                        required
                    />
                    <button type="submit">Save Alert</button>
                </form>

                <button onClick={handleDeleteAlert} className="delete-btn">
                    Delete Alert
                </button>

                {alertMessage && <div className="alert-message">{alertMessage}</div>}
            </div>
        </>
    );
};

export default BudgetAlert;
