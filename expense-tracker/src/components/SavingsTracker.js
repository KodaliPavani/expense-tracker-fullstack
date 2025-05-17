import React, { useState, useEffect } from 'react';
import '../css/SavingsTracker.css';
import { Link } from 'react-router-dom';
import { getSavings, addSaving, updateSaving, deleteSaving } from '../api';

function SavingsTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    goal: '',
    saved: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const res = await getSavings();
      setEntries(res.data);
    } catch (err) {
      console.error('Error fetching savings:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateSaving(editId, form);
      } else {
        await addSaving(form);
      }
      fetchSavings();
      setForm({ goal: '', saved: '', description: '' });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error('Error saving entry:', err);
    }
  };

  const handleEdit = (entry) => {
    setForm(entry);
    setEditId(entry._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (!confirm) return;

    try {
      await deleteSaving(id);
      fetchSavings();
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  return (
    <section className="savings-section">
      <header className="savings-header">
        <h1>Expenzo</h1>
      </header>
      <nav className="savings-nav">
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="savings-container">
        <h2 className="savings-title">{isEditing ? 'Edit Entry' : 'Track Your Savings'}</h2>
        <form className="savings-form" onSubmit={handleSubmit}>
          <label htmlFor="goal">Goal ($):</label>
          <input
            type="number"
            id="goal"
            value={form.goal}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="saved">Saved ($):</label>
          <input
            type="number"
            id="saved"
            value={form.saved}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">{isEditing ? 'Update Entry' : 'Add Entry'}</button>
        </form>

        <div className="savings-entries">
          <h2 className="savings-subtitle">Your Savings Entries</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry._id} className="savings-entry">
                <p><strong>Goal:</strong> ${entry.goal}</p>
                <p><strong>Saved:</strong> ${entry.saved}</p>
                <p><strong>Description:</strong> {entry.description}</p>
                <button className="edit-btn" onClick={() => handleEdit(entry)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(entry._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SavingsTracker;
