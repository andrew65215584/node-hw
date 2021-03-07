const apiKey =
  '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';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(apiKey);

 class EmailServices {
  async sendVerificationEmail(recipientEmail, token) {
    const msg = {
      to: recipientEmail, // Change to your recipient
      from: 'andrew@ventur.digital', // Change to your verified sender
      subject: 'Its verification email for hw-06',
      //   text: `Please go by the link <a target="_blank"  href=""></a> to activate your account for node hw-06`,
      html:
        `<p>Please go by the link <a target="_blank" href="http://localhost:3000/api/users/confirm/${token}">Click here</a> to activate your account for node hw-06</p>`,
    };
    const answer = await sgMail.send(msg)
    console.log("🚀 ~ file: email.js ~ line 16 ~ EmailServices ~ sendVerificationEmail ~ answer", answer)
      
  }
}
module.exports =  EmailServices;