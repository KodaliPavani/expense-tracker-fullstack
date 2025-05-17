const User = require("../models/User");
const nodemailer = require('nodemailer');

// Signup
exports.registerUser = async (req, res) => {
  const { fullname, email, service, password } = req.body;
  if (!fullname || !email || !service || !password) {
    return res.status(400).send("::400::All fields are required.");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("::400::Email already exists.");
    }

    const user = new User({ fullname, email, service, password });
    await user.save();
    res.status(200).json({ message: "You are registered successfully." });

  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // corrected variable
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful.", userId: user._id });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pavanikodali999@gmail.com',
        pass: 'appv wsog alzn uuer' // your app password
      }
    });

    const mailOptions = {
      from: 'pavanikodali999@gmail.com',
      to: user.email,
      subject: 'Expenzo - Password Recovery',
      text: `Hi ${user.fullname},\n\nHere is your password: ${user.password}\n\nIf you did not request this, please change your password immediately.`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password sent to your registered email." });

  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};