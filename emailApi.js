var nodemailer = require('nodemailer');
require('dotenv').config();



var methods ={



transporter: nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_SECRET
  }
}),

mailOptions : {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: '',
  text: ''
},

setMailOptions :function(subject,text)
{
	methods.mailOptions.subject = subject;
	methods.mailOptions.text = text;
},


};



exports.data = methods;