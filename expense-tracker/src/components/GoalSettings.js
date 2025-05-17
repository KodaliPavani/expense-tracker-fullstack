import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/GoalSettings.css';
import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal
} from '../api';

const GoalSettings = () => {
  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      title: goalTitle,
      amount: goalAmount,
      deadline: goalDeadline,
      description: goalDescription,
    };

    try {
      if (editingGoalId) {
        const res = await updateGoal(editingGoalId, goalData);
        setGoals(goals.map(goal => (goal._id === editingGoalId ? res.data : goal)));
        setEditingGoalId(null);
      } else {
        const res = await addGoal(goalData);
        setGoals([...goals, res.data]);
      }

      // Clear form fields
      setGoalTitle('');
      setGoalAmount('');
      setGoalDeadline('');
      setGoalDescription('');
    } catch (err) {
      console.error("Error saving goal:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmDelete) return;
  
    try {
      await deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };
  

  const startEditing = (goal) => {
    setGoalTitle(goal.title);
    setGoalAmount(goal.amount);
    setGoalDeadline(goal.deadline.split('T')[0]);
    setGoalDescription(goal.description);
    setEditingGoalId(goal._id);
  };

  return (
    <div className="goal-settings-container">
      <header className="goal-header">
        <h1>ExpenseTracking</h1>
      </header>
      <br />
      <nav>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </nav>

      <main className="goal-main">
        <section className="goal-form-section">
          <h2>{editingGoalId ? "Edit Goal" : "Set Your Financial Goals"}</h2>
          <form className="goal-form" onSubmit={handleSubmit}>
            <label htmlFor="goalTitle">Goal Title:</label>
            <input
              type="text"
              id="goalTitle"
              placeholder="e.g. Save for a car"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              required
            />

            <label htmlFor="goalAmount">Goal Amount ($):</label>
            <input
              type="number"
              id="goalAmount"
              placeholder="Enter the amount"
              min="0"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />

            <label htmlFor="goalDeadline">Goal Deadline:</label>
            <input
              type="date"
              id="goalDeadline"
              value={goalDeadline}
              onChange={(e) => setGoalDeadline(e.target.value)}
              required
            />

            <label htmlFor="goalDescription">Description:</label>
            <textarea
              id="goalDescription"
              rows="4"
              placeholder="Describe your goal"
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
            />

            <button type="submit">
              {editingGoalId ? "Update Goal" : "Add Goal"}
            </button>
          </form>
        </section>

        <section className="goal-list-section">
          <h2>Your Goals</h2>
          <ul className="goal-list">
            {goals.map((goal) => (
              <li key={goal._id} className="goal-list-item">
                <strong>Goal:</strong> {goal.title} <br />
                <strong>Amount:</strong> ${goal.amount} <br />
                <strong>Deadline:</strong> {new Date(goal.deadline).toLocaleDateString()} <br />
                <strong>Description:</strong> {goal.description} <br />
                <button onClick={() => startEditing(goal)}>Edit</button>
                <button onClick={() => handleDelete(goal._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default GoalSettings;
