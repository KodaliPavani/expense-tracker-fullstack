import React, { useEffect, useState } from 'react';
import '../css/ExpenseTracking.css';
import { Link } from 'react-router-dom';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../api';


const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', amount: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
    if (!form.name || !form.category || !form.amount || !form.date) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (!datePattern.test(form.date)) {
      alert('Please enter date in DD/MM/YYYY format.');
      return;
    }
  
    if (editingId) {
      await updateExpense(editingId, form);
      setEditingId(null);
    } else {
      await addExpense(form);
    }
  
    setForm({ name: '', category: '', amount: '', date: '' });
    fetchExpenses();
  };
  

  const handleEdit = (expense) => {
    setForm(expense);
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="expense-app">
      <header className="app-header"><h1>Expense Tracker</h1></header>
      <nav><Link to="/dashboard" className="nav-link">Dashboard</Link></nav>

      <div className="form-section">
        <h2>{editingId ? 'Edit Expense' : 'Track Your Expenses'}</h2>
        {['name', 'category', 'amount', 'date'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
  type="text"
  name={field}
  value={form[field]}
  onChange={handleChange}
  placeholder={field === 'date' ? 'DD/MM/YYYY' : `Enter ${field}`}
/>

          </div>
        ))}
        <button className="add-button" onClick={handleSubmit}>
          {editingId ? 'Update' : 'Add'} Expense
        </button>
      </div>

      <div className="history-section">
        <h2>Expense History</h2>
        <table>
          <thead>
            <tr>
              <th>Expense Name</th><th>Category</th><th>Amount</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.name}</td><td>{exp.category}</td><td>{exp.amount}</td><td>{exp.date}</td>
                <td>
                  <button onClick={() => handleEdit(exp)}>Edit</button>
                  <button onClick={() => handleDelete(exp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer><p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p></footer>
    </div>
  );
};

export default ExpenseTracking;
