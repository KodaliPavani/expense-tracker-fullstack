import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import AboutUs from './components/AboutUs';
import Faqs from './components/Faqs';
import ExpenseTracking from './components/ExpenseTracking';
import BudgetAlert from './components/BudgetAlerts';
import SpendingAnalysis from './components/SpendingAnalysis';
import Dashboard from './components/Dashboard';
import GoalSettings from './components/GoalSettings';
import SavingsTracker from './components/SavingsTracker';
import Feedback from './components/Feedback';
import Category from './components/Category';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/faq' element={<Faqs />} />
        <Route path='/exp' element={<ExpenseTracking />} />
        <Route path='/budget' element={<BudgetAlert />} />
        <Route path='/spending' element={<SpendingAnalysis />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category' element={<Category />} />
        <Route path='/goal' element={<GoalSettings />} />
        <Route path='/track' element={<SavingsTracker />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
