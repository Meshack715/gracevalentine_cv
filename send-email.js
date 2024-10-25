// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address from env variables
        pass: process.env.GMAIL_PASS, // Your Gmail password or app password
      },
    });

    // Email options
    let mailOptions = {
      from: email, // User's email as sender
      to: process.env.GMAIL_USER, // Your email to receive the message
      subject: `Request Callback from ${name}`,
      text: message, // The message entered by the user
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
