// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');

// POST: /api/feedback
router.post('/', async (req, res) => {
  const { feedback, email } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required.' });
  }

  try {
    // Save to DB
    const newFeedback = new Feedback({ feedback, email });
    await newFeedback.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pavanikodali999@gmail.com',
        pass: 'appv wsog alzn uuer',
      },
    });

    const mailOptions = {
      from: email || 'no-reply@expenzo.com',
      to: 'pavanikodali999@gmail.com',
      subject: 'New Feedback from Expenzo',
      text: `Email: ${email || 'Anonymous'}\n\nFeedback:\n${feedback}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback received and email sent!' });

  } catch (error) {
    console.error('Feedback Error:', error.message);
    res.status(500).json({ message: 'Failed to send feedback.' });
  }
});

module.exports = router;
