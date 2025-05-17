import React from 'react';
import '../css/Category.css';

const Category = () => {
  return (
    <div className="category-container">
      <button className="home-btn" onClick={() => window.location.href = '/'}>
        HOME
      </button>
      <h1 className="category-title">Choose a Category</h1>
      <div className="category-list">
        <div className="category-item">
        <img src="/images/s1.jpg" alt="Question 1" className="faq-image" />
          
          <h3>Expense Tracking</h3>
          <p>Track your daily expenses.</p>
        </div>
        <div className="category-item">
        <img src="/images/s2.webp" alt="Question 1" className="faq-image" />
          
          <h3>Spending Analysis</h3>
          <p>Get insights into your spending habits.</p>
        </div>
        <div className="category-item">
        <img src="/images/s3.jpg" alt="Question 1" className="faq-image" />
          
          <h3>Budget Alerts</h3>
          <p>Set alerts to stay on budget.</p>
        </div>
        <div className="category-item">
        <img src="/images/s4.jpg" alt="Question 1" className="faq-image" />
          
          <h3>Goal Settings</h3>
          <p>Set financial goals and track progress.</p>
        </div>
        <div className="category-item">
        <img src="/images/s5.webp" alt="Question 1" className="faq-image" />
          
          <h3>Savings Tracking</h3>
          <p>Monitor your savings over time.</p>
        </div>
        <div className="category-item">
        <img src="/images/s7.jpg" alt="Question 1" className="faq-image" />
          
          <h3>Feedback</h3>
          <p>Provide feedback to improve the app.</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
