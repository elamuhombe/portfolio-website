// src/Server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendEmail from './services/SendEmail';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5200;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to send an email
app.post('/send-email', async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  // Validate the request body
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, error: 'Missing required fields: to, subject, and text.' });
  }

  try {
    // Call the sendEmail function
    const emailResponse = await sendEmail({ to, subject, text });
    if (emailResponse.success) {
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } else {
      res.status(500).json({ success: false, error: emailResponse.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'An unexpected error occurred while sending the email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
