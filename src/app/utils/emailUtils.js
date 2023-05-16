import mailer from '../utils/mailer.js';

const sendEmail = (emailSubject = '', emailMessage = '') => {
  if (emailSubject && emailMessage) {
    mailer('', emailSubject, { text: emailMessage });
  }
};

export default sendEmail;
