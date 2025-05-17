// src/api.js
import axios from 'axios';

// User-related API instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api/users'
});

// Expense-related API instance
const EXPENSE_API = axios.create({
  baseURL: 'http://localhost:5000/api/expenses'
});

// ----- USER APIs -----
export const signUp = (data) => API.post('/signUp', data);
export const signIn = (data) => API.post('/signIn', data);
export const forgotPassword = (email) => API.get(`/forgotpassword/${email}`);

// ----- EXPENSE APIs -----
export const getExpenses = () => EXPENSE_API.get('/');
export const addExpense = (data) => EXPENSE_API.post('/', data);
export const updateExpense = (id, data) => EXPENSE_API.put(`/${id}`, data);
export const deleteExpense = (id) => EXPENSE_API.delete(`/${id}`);

// ----- GOAL APIs -----
export const getGoals = () => axios.get('http://localhost:5000/api/goals');
export const addGoal = (data) => axios.post('http://localhost:5000/api/goals', data);
export const updateGoal = (id, data) => axios.put(`http://localhost:5000/api/goals/${id}`, data);
export const deleteGoal = (id) => axios.delete(`http://localhost:5000/api/goals/${id}`);

// ----- BUDGET ALERT APIs -----
export const setBudgetAlert = (data) => axios.post('http://localhost:5000/api/budget-alerts', data);
export const getBudgetAlert = (userId) => axios.get(`http://localhost:5000/api/budget-alerts/${userId}`);
export const deleteBudgetAlert = (userId) => axios.delete(`http://localhost:5000/api/budget-alerts/${userId}`);

// ----- SAVINGS APIs -----
export const getSavings = () => axios.get('http://localhost:5000/api/savings');
export const addSaving = (data) => axios.post('http://localhost:5000/api/savings', data);
export const updateSaving = (id, data) => axios.put(`http://localhost:5000/api/savings/${id}`, data);
export const deleteSaving = (id) => axios.delete(`http://localhost:5000/api/savings/${id}`);

// Add at the bottom of api.js
export const submitFeedback = (data) => axios.post('http://localhost:5000/api/feedback', data);

// ----- CONTACT API -----


export default API;
