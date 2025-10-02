import emailjs from 'emailjs-com';

const sendWelcomeEmail = async (userName: string, userEmail: string) => { // Add userEmail parameter
  try {
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not set');
      return;
    }

    const templateParams = {
      userName: userName,
      name: userName, // For the {{name}} variable in the subject
      email: userEmail, // Add user's email for the "To" field
    };

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('Welcome email sent successfully:', result.text);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export default sendWelcomeEmail;