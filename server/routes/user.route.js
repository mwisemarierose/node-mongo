import express from "express";
import Admin from "../controllers/admin.controller";
import userController from "../controllers/user.controllers";
import Vendor from "../controllers/vendor.controller";
import verifyLogin from "../middleware/Authorization";


const routes=express();

routes.post('/signup', userController.signup)
routes.post('/signin', userController.signin)
routes.get('/clients',verifyLogin ,Vendor. getAllclients)
routes.post('/forgotPassword', userController.forgetPassword)
routes.post('/resetPassword', userController.resetPassword)
// routes.patch('/updatedisactivate', userController.userUpdate)
 routes.patch('/updateProfile', userController.updateProfile);
 routes.patch('/admin/role', verifyLogin, Admin.changeRoles);
 routes.get('/admin/users', verifyLogin, Admin.getAllUsers);


export default routes;
