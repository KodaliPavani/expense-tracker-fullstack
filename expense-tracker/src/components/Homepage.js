import React, { Component } from 'react';
import '../css/Homepage.css';
import { Link } from 'react-router-dom';
import API from '../api';

export class Homepage extends Component {
  showSignin = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("Signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login";
    signin.style.display = "block";
    signup.style.display = "none";
    popup.style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("responseDiv").innerHTML = "";
  }

  showSignUp = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("Signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Signup";
    signin.style.display = "none";
    signup.style.display = "block";
    popup.style.display = "block";

    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("service").value = "";
    document.getElementById("signuppassword").value = "";
    document.getElementById("confirmpassword").value = "";
    document.getElementById("responseDiv").innerHTML = "";
  }

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      document.getElementById("popup").style.display = "none";
    }
  }

  userRegistration = async () => {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let service = document.getElementById("service");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    if (!fullname.value || !email.value || !service.value || !signuppassword.value || !confirmpassword.value) {
      alert("All fields are required.");
      return;
    }

    if (signuppassword.value !== confirmpassword.value) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      fullname: fullname.value,
      email: email.value,
      service: service.value,
      password: signuppassword.value
    };

    try {
      const response = await API.post('/signUp', data);
      alert(response.data.message);
      this.showSignin();
    } catch (error) {
      alert(error.response?.data?.message || "Error connecting to the server.");
    }
  }

  signin = async () => {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let responseDiv = document.getElementById("responseDiv");
  
    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";
  
    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
  
    if (password.value === "") {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }
  
    const data = {
      email: username.value,
      password: password.value
    };
  
    try {
      const response = await API.post('/signIn', data);
      localStorage.setItem("userId", response.data.userId);
      window.location.replace("/dashboard");
    } catch (error) {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${error.response?.data?.message || "Server Error"}</label>`;
    }
  }
  

  forgotPassword = async () => {
    let username = document.getElementById("username");
    let responseDiv = document.getElementById("responseDiv");

    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }

    try {
      const response = await API.get(`/forgotpassword/${username.value}`);
      responseDiv.innerHTML = `<br/><br/><label style="color:green">${response.data.message}</label>`;
    } catch (error) {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${error.response?.data?.message || "Server Error"}</label>`;
    }
  }

  render() {
    return (
      <div className="container">
        <div id="popup" onClick={this.closeSignin}>
          <div className='popupWindow'>
            <div id='popupHeader'>Login</div>
            <div id='signin'>
              <label className='usernameLabel'>Username :</label>
              <input type='text' id='username' />
              <label className='passwordLabel'>Password :</label>
              <input type='password' id='password' />
              <div className='forgotPassword'><label onClick={this.forgotPassword}>Forgot Password?</label></div>
              <button className='signinButton' onClick={this.signin}>Sign In</button>
              <div className='div1' id='responseDiv'></div>
              <div className='div2'>
                Don't have an account?
                <label onClick={this.showSignUp}> SIGNUP NOW </label>
              </div>
            </div>
            <div id='Signup'>
              <label>Full Name:</label>
              <input type='text' id="fullname" />
              <label>Email :</label>
              <input type='email' id="email" />
              <label>Select Service :</label>
              <select id='service'>
                <option value=''></option>
                <option value='Customer'>Customer</option>
              </select>
              <label>Password :</label>
              <input type='password' id="signuppassword" />
              <label>Confirm Password:</label>
              <input type='password' id="confirmpassword" />
              <button className='signupButton' onClick={this.userRegistration}> Register Now</button>
              <div>Already have an account?<span onClick={this.showSignin}> SIGN IN</span></div>
            </div>
          </div>
        </div>

        <header className="header">
        <div className="logo-container">
          <img className="logo" src="/images/expenzologo.jpeg" alt="Expenzo Logo" />
          <h1 className="logo-text">Expenzo</h1>
        </div>
        
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/aboutus" className="nav-link">About Us</Link>
          <Link to="/faq" className="nav-link">FAQ's</Link>
          <Link to="/category" className="nav-link">categories</Link>
        </nav>
        
        <button className="sign-in-button" onClick={this.showSignin}>
          Sign In
        </button>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Track Your Spending at a Glance</h2>
          <p className="hero-description">
            Manage your expenses efficiently and take control of your finances with Expenzo.
          </p>
          <button className="cta-button" onClick={this.showSignUp}>Get Started</button>
        </div>
        <div className="hero-image-container">
          <img className="hero-image" src="/images/eimage.png" alt="Expense tracking illustration" />
        </div>
      </main>

      <section className="features-section">
        <h2 className="section-title">Why Choose Expenzo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Easy Tracking</h3>
            <p>Track all your expenses in one place with our intuitive interface.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your expense data anytime, anywhere from any device.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Smart Reports</h3>
            <p>Get detailed insights with customizable reports and analytics.</p>
          </div>
        </div>
      </section>

        

      <div className="footer">
    <label className='copyrightText'>Copyright&copy; Home Services - All Rights Reserved</label>
    
    <img className='socialmediaIcon' src='./images/facebook.jpg' alt="Facebook" />
    
    <a href="https://www.linkedin.com/in/pavani-kodali-541566324/" className="social-link">
        <img className='socialmediaIcon' src='./images/in.png' alt="LinkedIn" />
    </a>
    
    <img className='socialmediaIcon' src='./images/twi.webp' alt="Twitter" />
</div>
      </div>
    );
  }
}

export default Homepage;
