// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g. 'gmail', 'outlook', etc.
    auth: {
        user: 'gracevalentine655@gmail.com', // Your email
        pass: '@254grace' // Your email password (or app-specific password if using 2FA)
    }
});

// Endpoint to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'gracevalentine655@gmail.com', // Replace with your recipient email
        subject: `Message from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email: ' + error.toString() });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

// Endpoint to handle callback requests
app.post('/send-callback', (req, res) => {
    const { name, phone } = req.body;

    // Here you would typically handle the callback request, such as saving to a database
    // For demonstration, we'll just respond with a success message
    res.status(200).json({ message: 'Callback request received successfully!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
