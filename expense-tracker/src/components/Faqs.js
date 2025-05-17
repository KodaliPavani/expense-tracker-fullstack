import React from 'react';
import '../css/Faqs.css';

const Faqs = () => {
  return (
    <div>
      
      <div className="logo-container">
          <img className="logo" src="/images/expenzologo.jpeg" alt="Expenzo Logo" />
          <h1>Expenzo</h1>
        </div>
      
      <div className="faq-container">
      <button className="home-btn" onClick={() => window.location.href = '/'}>
        HOME
      </button>
        <h1>FAQ</h1>
        <p className="subheading">Take Control of Your Finances, One Expense at a Time!</p>
        <hr />

        <div className="faq-grid">
          <div className="faq-item">
            <h3>What is an expense tracker app?</h3>
            <p>
              An expense tracker app helps you monitor and manage your spending by allowing you
              to record your expenses, categorize them, and analyze your financial habits.

            </p>
            <br></br>
            <br></br>
            <img src="/images/16.jpg" alt="Question 1" className="faq-image" />
          </div>

          <div className="faq-item">
            <h3>How do I get started with the app?</h3>
            <p>
              Download the app from the App Store or Google Play, create an account, and start
              adding your income and expenses. You can also set up categories and budgets to help
              organize your finances.
            </p>
            
            <img src="/images/plan.png" alt="Question 1" className="faq-image" />
          </div>

          <div className="faq-item">
            <h3>Is the app free to use?</h3>
            <p>
              The app may offer a free version with basic features, while advanced features might
              require a subscription or one-time purchase. Check the pricing section for details.
            </p>
            <br></br>
            <br></br>
            <br></br>
            <img src="/images/25.jpg" alt="Question 1" className="faq-image" />
          </div>

          <div className="faq-item">
            <h3>Can I track income as well as expenses?</h3>
            <p>
              Yes, the app allows you to record both income and expenses, giving you a complete
              picture of your financial situation.
            </p>
            <br></br>

            <img src="/images/prjct.jpg" alt="Question 1" className="faq-image" />
          </div>

          <div className="faq-item">
            <h3>How do I categorize my expenses?</h3>
            <p>
              You can choose from predefined categories or create custom categories to better
              reflect your spending habits.
            </p>
            <br></br>
            <img src="/images/financial.jpg" alt="Question 1" className="faq-image" />
          </div>

          <div className="faq-item">
            <h3>Can I set a budget for different categories?</h3>
            <p>
              Yes, you can set monthly budgets for each category and track your spending against
              those budgets.
            </p>
            <br></br>
            <br></br>
            <img src="/images/secure.png" alt="Question 1" className="faq-image" />
          </div>
        </div>
      </div>

      <footer className="faq-footer">
        Copyright@Expense Tracker - All Rights Reserved
      </footer>
    </div>
  );
};

export default Faqs;
