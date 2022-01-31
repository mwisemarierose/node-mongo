 import userModel from "../models/body/user.model";
import validation from "../helpers/validation";
import authenticate from "../helpers/authenticate";
import User from "../models/db/user.model";
import Mongoose from "mongoose";
import sendEmail from "../helpers/sendEmail";
import jwt from "jsonwebtoken"
// import sgMail from '@sendgrid/mail'


class userController {
    static signup(req,res) {
        const { names, email,password } = req.body;
        const lowEmail = email.toLowerCase()
        const {error}= validation.registerValidation(userModel.createUser(req));

        if (error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                status: 400
            })
        }

        User.find({email:lowEmail},(error,result) => {
            if (result.length){
                return res.status(409).json({
                    message:'email is already used,please use another',
                    status:409
                })
            }

            const hashpassword =authenticate.hashpassword(password);
            const user = new User ({
                _id: new Mongoose.Types.ObjectId(),
                names: names,
                email: lowEmail,
                password: hashpassword,
                status: 'active'
            });
            user 
            .save() 
            .then(() => {
                res.status(201).json({
                    message:'woooow,acount has been created',
                    status:201,
                });
                sendEmail(email, names)
                
            }).catch(err =>{
                res.status(500).json({
                    message: 'oh no, there is something wrong, check your internet or call support',
                    status: 500
                });
            })
        })  

    }

    static signin(req,res){
        const {email,password}=req.body;
        const lowEmail = email.toLowerCase();

        User.find({email:lowEmail},(error,result) => {

           if(result.length){
            const compared =authenticate.comparePassword(password,result[0].password)
            
            if(compared){
            res.status(200).json({
                message: 'you are logged in successfully',
                status: 200,
                token:authenticate.generateToken(result[0])
            });
            }else{
                res.status(400).json({
                    message:'incorrect email or password',
                    status:403,
                });
            }
           }else{
            res.status(400).json({
                message:'incorrect email or password',
                status:403,
            });
            }
               
        }) ;

    }
     static forgetPassword=(req,res)=>{
        try {
            const {email}=req.body;
            User.findOne({email},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({error:"user of this email does not exists"})
                }
                
                const token=jwt.sign({_id: user._id},process.env.RESET_PASSWORD_ID,{expiresIn:'20m'});
                req.token = token
                req.user = user
              
                const mailOption= {
                    from:process.env.EMAIL,
                    to: email,
                    subject: 'Account Activation Link',
                    html:`
                    <h2>please click on given link to resent your password</h2>
                    <a href="http://localhost:3001/Resetpassword/" ${token} >Click here to reset Password</a>
                    `
                };
                const userData={
                    user,
                    resentLink:token
                }
       
        return User.updateOne({_id: user._id},userData, (err,success)=>{
            if(err){
                return res.status(400).json({error:err})
            }else{
                sendEmail(mailOption,token);
                if(err){
                    return res.json({
                       message:"error"
                    })
                }
                return res.json({message:'Email has been sent, kindly follow the instructions',userData});
              
            }
        })
            })
        } catch (error) {
        
            
        }
    }
   
    static resetPassword=(req,res)=>{
        const{resentLink,newPassword}=req.body;
        if(resentLink){
            jwt.verify(resentLink,process.env.RESET_PASSWORD_ID,function(error,decodedToken){
                if(error){
                    return res.json({
                        error:"incorrect token or it is expired"
                    })
                }
                User.findOneAndUpdate({resentLink}, {password: newPassword},(err, user)=>{
                    if(err || !user){
                        return res.status(400).json({error:' user of this token does not exists'})
                    }

                    res.status(201).json({
                        message: 'Password has been reset successful'
                    })
                })
            })
        }
        else{
            return res.status(400).json({error:'Authentication Error'})
        }    
    }            
   
   static updateProfile(req,res) {
       const { id } = req.query;
       const {  names,email }= req.body;
       const {error}= validation.registerValidation(userModel.createUser(req));

        if (error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                status: 400
            })
        }
       User.findByIdAndUpdate(id, {
           names:names,
           email:email
       },(err,result)=>{
           if(result){
               res.status(201).json({
                   message:'updated',
                user:result
               })
           }
       })
   }

}

export default userController;