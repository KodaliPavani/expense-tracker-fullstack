import React from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">📊</div>
        <div className="title-bar">EXPENSE TRACKER</div>
        <nav className="nav-links">
          <a href="/exp">Expense Tracking</a>
          <a href="/spending">Spending Analysis</a>
          <a href="/budget">Budget Alerts</a>
          <a href="/goal">Goal Settings</a>
          <a href="track">Savings Tracking</a>
          <a href="/feedback">Feedback</a>
        </nav>
        <button className="logout-btn">
          <a href="/">logout</a>
        </button>
      </aside>

      <main className="main-content">
        <header className="welcome-banner">
          <h1>Welcome to the Personal Finance Management App</h1>
          <p>
            Track your expenses, manage your budget, and take control of your financial future.
          </p>
        </header>

        <section className="features-section">
          <div className="feature-card">
            <div className="feature-title">Expense Tracking</div>
            <div />
            <img className='image' src='./images/3.jpg' alt='Expense Tracking Illustration' />
            <p>
              Track your daily expenses with ease and get detailed reports on your spending habits.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-title">Budget Management</div>
            <div />
            <img className='image' src='./images/budg.jpeg' alt='Budget Management Illustration' />
            <p>
              Set up budgets and monitor your progress to ensure you stay within your financial limits.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;