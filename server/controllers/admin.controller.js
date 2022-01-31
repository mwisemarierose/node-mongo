import validation from '../helpers/validation';
import userModel from '../models/body/user.model';
import User from '../models/db/user.model';
import jwtDecode from 'jwt-decode';


class Admin {

    static async getAllUsers (req, res) {
       const users = await User.find({});
       res.status(200).json({
           status: 200,
           data: users,
       })
    }
    static async changeRoles(req, res) {
        const { role } = req.body;
        const { error } = validation.changeRoleValidation(userModel.changeRole(req));
        if (error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, ''),
                status: 400
            })
        }

        if(role === 'admin' || role === 'super-admin'){
            return res.status(403).json({
                message: 'You are not allowed to take this action!! ):'
            })
        }
        const { id } = req.query;
        const {authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decodedToken = jwtDecode(token);

        if(decodedToken.user.roles !== 'admin'){
            return res.status(401).json({
                message: 'You are not allowed to take this action!! ):',
                status: 401
            })
        }

        User.findByIdAndUpdate(id, { roles: role }, (err, result) => {
            res.status(201).json({
                message: 'You have changed the role of the user',
                user: result
            });
        });

    }

}

export default Admin