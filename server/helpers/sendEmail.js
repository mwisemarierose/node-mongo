import sgMail from '@sendgrid/mail'
import ejs from 'ejs';
 import path from 'path';
require ('dotenv').config();

sgMail.setApiKey(process.env.TESTAPI_KEY_SENDGRIND)

const sendEmail = async (email, names) =>{  
 const template = '../public/template/signup.ejs'
 const data = await ejs.renderFile(path.join(__dirname, template),{email,names});
  
  const mailOptions = {
    from: `"TestApi sysyem"<${process.env.EMAIL}>`,
    to: email,
    subject: "confirm your email",
    html: data
  };
  sgMail
  .send(mailOptions)
  .then(() =>{
      console.log('email sent')

  })
 
  .catch((error) =>{
      console.error(error)
     
  })
}
export default sendEmail;