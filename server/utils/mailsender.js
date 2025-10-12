const nodemailer = require("nodemailer");


const mailSender = async (email , title , body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
               user :process.env.MAIL_USER, 
               pass :process.env.MAIL_PASS,
            }
        })

        let info =  await transporter.sendMail({
            from: `Study Notion`, // You can put your name here as well
            to: `${email}`, // Correct way to pass the email as a string
            subject: `${title}`, // Correct way to pass the subject as a string
            html: `${body}`, // Correct way to pass the body as a string
        })
        console.log(info);
       
    }
       catch (err) {
        console.log(err.message);
        throw new Error("Error in sending mail. Please try again later."); // Throw an error for the controller to catch
    }
    }

module.exports = mailSender;