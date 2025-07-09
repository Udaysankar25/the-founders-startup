import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP host
    port: 587, // TLS port
    secure: false, // use TLS (STARTTLS)
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your App Password (not regular Gmail password)
    },
  });

  // Optional: verify the connection configuration
  try {
    await transporter.verify();
    console.log('✅ Email transporter is ready');
  } catch (err) {
    console.error('❌ Error verifying transporter:', err);
    return;
  }

  const mailOptions = {
    from: `"Founder Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
    // html: `<p>${message}</p>` // Optional: for HTML emails
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
  }
};

export default sendEmail;
