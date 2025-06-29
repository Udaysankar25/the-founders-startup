import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Founder Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
    // html: `<p>${message}</p>` // Optional: send HTML email
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to ${to}`);
};

export default sendEmail;
