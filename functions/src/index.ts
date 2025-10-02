import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgrid?.key || process.env.API_KEY_SENDGRID || '');

export const sendWelcomeEmail = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to send email.');
  }

  const { userName, userEmail } = data;

  if (!userName || !userEmail) {
    throw new functions.https.HttpsError('invalid-argument', 'userName and userEmail are required.');
  }

  const templateId = functions.config().sendgrid?.template_id || process.env.DYNAMIC_TEMPLATE_ID || '';
  const sender = functions.config().sendgrid?.sender || process.env.PUBLIC_SENDGRID_SENDER || '';

  if (!templateId || !sender) {
    throw new functions.https.HttpsError('failed-precondition', 'SendGrid configuration is missing.');
  }

  const msg = {
    to: userEmail,
    from: sender,
    templateId: templateId,
    dynamicTemplateData: {
      userName: userName,
    },
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: 'Welcome email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email.');
  }
});