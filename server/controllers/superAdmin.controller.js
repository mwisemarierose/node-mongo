import User from '../models/db/user.model';
import jwtDecode from 'jwt-decode';
import userModel from '../models/body/user.model';
import validation from '../helpers/validation';


class SuperAdmin {

    static async getAllUsers (req, res) {
       const users = await User.find({});
       res.status(200).json({
           status: 200,
           data: users,
       })
    }

    static async changeRoles(req, res) {
        const { role } = req.body;
        const { id } = req.query;
        const {authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const {error}= validation.changeRoleValidation(userModel.changeRole(req));

        if (error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                status: 400
            })
        }
        const decodedToken = jwtDecode(token);

        if(decodedToken.user.roles !== 'super-admin'){
            return res.status(401).json({
                message: 'Oops, you are not allowed to take this action!! )-:',
                status: 401
            })
        }

        User.findByIdAndUpdate(id, { roles: role}, (err, result) => {
            res.status(201).json({
                message: 'You have changed the role of the user',
                user: result
            });
        });

    }
    static async changeStatus(req, res) {
        const { status } = req.body;
        const { id } = req.query;
        const {authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decodedToken = jwtDecode(token);
        const {error}= validation.changeStatusValidation(userModel.changeStatus(req));

        if (error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                status: 400
            })
        }

        if(decodedToken.user.roles !== 'super-admin'){
            return res.status(401).json({
                message: ' you are not allowed to take this action!! )-:',
                status: 401
            });
        }

        User.findByIdAndUpdate(id, { status: status }, (err, result) => {
            res.status(201).json({
                message: ' You have changed status of the user',
                user: result
            });
        });
       
    }
      
    
   static deleteUser =async (req,res)=>{
   
    const {authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);
    const {error}= validation.deleteUser(userModel.deleteUser(req));

    if (error){
        return res.status(400).json({
            message: error.details[0].message.replace(/"/g, ''),
            status: 400
        })
    }

    if(decodedToken.user.roles !== 'super-admin'){
        return res.status(401).json({
            message: ' you are not allowed to take this action!! )-:',
            status: 401
        });
    }
    const deleted = await User.findByIdAndDelete(req.query.id)
    if(deleted){
        return res.status(203).json({
            status: 203,
            message: `user is deleted successfully`
        })
    }
}
   static DisableUsers = function(req,res, next) {
    const {authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);
    const {error}= validation.changeStatusValidation(userModel.disactivateUser(req));

    if (error){
        return res.status(400).json({
            message: error.details[0].message.replace(/"/g, ''),
            status: 400
        })
    }

    if(decodedToken.user.roles !== 'super-admin'){
        return res.status(401).json({
            message: 'Oops, you are not allowed to take this action!! )-:',
            status: 401
        });
    }


        User.findByIdAndUpdate(id,{status: 'inactive' },(error, result) =>
        {
            res.status(201).json({
                message:'you have desactivated this user'
            })
           
          
        });
    
}
}

export default SuperAdmin;
