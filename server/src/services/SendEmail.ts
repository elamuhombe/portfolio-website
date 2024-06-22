import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

// Define the structure of parameters for sending an email
interface EmailParams {
  to: string;
  subject: string;
  text: string;
}

// Define the structure of the response from sending an email
interface EmailResponse {
  success: boolean;
  error?: string;
}

// Async function to send an email using Nodemailer
async function sendEmail(params: EmailParams): Promise<EmailResponse> {
  try {
    // Validate that 'to' is provided
    if (!params.to) {
      throw new Error("Email address of the recipient is required.");
    }

    // Create a transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'elainees.dev',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!, // Gmail username
        pass: process.env.EMAIL_PASSWORD! // Gmail password or app-specific password
      },
    });

    // Define the email options
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER, // Use configured sender email
      to: params.to,
      subject: params.subject,
      text: params.text,
    };

    // Send mail with defined transport object
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    return { success: true }; // Return success response
  } catch (error: any) { // Explicitly type 'error' as 'any' or the expected type
    console.error("An unexpected error occurred while sending email:", error.message);
    return { success: false, error: error.message }; // Return error response
  }
}

export default sendEmail; // Export the sendEmail function for use in other modules