
import { body } from "express-validator";
import Mailgen from "mailgen";
import nodemailer from 'nodemailer'


const sendMail = async(options)=>{

    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
           
            name: 'Task Manager',
            link: 'https://mailgen.js/'
           

        }
    });


let emailHtml = mailGenerator.generate(options.mailgenContent);
let emailText = mailGenerator.generatePlaintext(options.mailgenContent);

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port:  process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user:   process.env.MAILTRAP_SMTP_USER,
      pass:     process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail  = {
    from: 'mail.taskmanager@eg.com',
    to: options.email, 
    subject: options.subject, 
    text: emailText, 
    html: emailHtml, 
  };

  try {
   await   transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed",error);
  }




}



const emailVerificationMailgenContent = (username , verificatiionUrl)=>{

    return {
        body:{
            name:username,
            intro:"Welcome to our app we are exitewd to have you on board",
            action: {
                instructions: 'To get started with our app, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificatiionUrl,
                }
            },

 outro:
  'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }

}

const forgotPasswordMailgenContent = (username , passwordResetUrl)=>{

    return {
        body:{
            name:username,
            intro:"We got a request to reset your password",
            action: {
                instructions: 'To change your password click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                    link: passwordResetUrl,
                }
            },

 outro:
  'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }

}









// sendmail({
// email:user.email,
// subject:"aaa"
// mailgncontent:emailverificationmailgencontent(username,user.verificationurl)
// })