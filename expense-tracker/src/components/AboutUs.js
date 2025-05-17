import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AboutUs.css';

function AboutUs() {
    return (
        <div className="about-us">
            
            <h1>EXPENSE TRACKER</h1>
            <nav>
                <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>HOME</Link>
            </nav>

            <div className="features">
                <div className="feature-card">
                    <img className="image" src="./images/1.jpeg" alt="Expense Tracking" />
                    <h3>Expense Tracking</h3>
                    <p>Keep track of your daily expenses with an easy-to-use interface.</p>
                </div>
                <div className="feature-card">
                    <img className="image" src="./images/2.jpeg" alt="Real-time Overview" />
                    <h3>Real-time Overview</h3>
                    <p>Get instant insights into your spending patterns and financial health.</p>
                </div>
                <div className="feature-card">
                    <img className="image" src="./images/3.jpeg" alt="Category Management" />
                    <h3>Category Management</h3>
                    <p>Organize expenses into categories for better tracking and analysis.</p>
                </div>
            </div>

            <div className="features">
                <div className="feature-card">
                    <img className="image" src="./images/4.jpeg" alt="AI Smart Insights" />
                    <h3>AI Smart Insights</h3>
                    <p>Get personalized spending insights and recommendations to improve your financial habits.</p>
                </div>
                <div className="feature-card">
                    <img className="image" src="./images/5.jpeg" alt="Cloud Backup" />
                    <h3>Cloud Backup</h3>
                    <p>Secure cloud backup to never lose your financial data. Access your data across all devices.</p>
                </div>
                <div className="feature-card">
                    <img className="image" src="./images/6.jpeg" alt="Money Challenges" />
                    <h3>Money Challenges</h3>
                    <p>Join community savings challenges and compete with friends to achieve financial goals.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
