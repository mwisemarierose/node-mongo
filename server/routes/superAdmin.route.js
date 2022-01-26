import express from "express";
import userController from "../controllers/user.controllers";
import Vendor from "../controllers/vendor.controller";
import verifyLogin from "../middleware/Authorization";
import SuperAdmin from "../controllers/superAdmin.controller";

const routes=express();

routes.get('/users', SuperAdmin.getAllUsers)
routes.patch('/role', verifyLogin , SuperAdmin.changeRoles)
routes.patch('/status', verifyLogin , SuperAdmin.changeStatus)
routes.delete('/delete', SuperAdmin.deleteUser)
routes.patch('/disactivate', SuperAdmin.DisableUsers)
// routes.patch('/updatedisactivate', userController.userUpdate)
// routes.get('/myProfile', userController.viewProfile)

export default routes;