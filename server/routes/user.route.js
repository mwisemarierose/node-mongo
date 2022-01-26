import express from "express";
import userController from "../controllers/user.controllers";
import Vendor from "../controllers/vendor.controller";
import verifyLogin from "../middleware/Authorization";


const routes=express();

routes.post('/signup', userController.signup)
routes.post('/signin', userController.signin)
routes.get('/clients', Vendor. getAllclients)
routes.post('/forgotPassword', userController.forgetPassword)
routes.post('/resetPassword', userController.resetPassword)
// routes.patch('/updatedisactivate', userController.userUpdate)

// routes.get('/myProfile', userController.viewProfile)

export default routes;