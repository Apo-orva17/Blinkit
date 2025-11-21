//resend is the lib that we will use to send emails for verification
//purpose to check if the email is legit or not

import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config();


//if the resendAPI key in not present
if(!process.env.RESEND_API){
  console.log("provide RESEND_API in the .env file")
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail=async ({ sendTo, subject, html})=>{
try{
 const { data, error } = await resend.emails.send({
    from: 'Blinkit <onboarding@resend.dev>',
    to: sendTo,
    subject: subject,
    html: html,
  });
  if(error){
    return console.error({ error });
  }

  return data
}
catch(error){
console.log(error)
}
}
export default sendEmail