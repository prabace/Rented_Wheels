const BASE_URL = 'http://localhost:8080'; // Update with your backend server URL

const sendEmail = async (toEmail, body, subject) => {
  try {
    await fetch(`${BASE_URL}/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toEmail,
        body,
        subject,
      }),
    });
    console.log('Email sent!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

export default {
  sendEmail,
};