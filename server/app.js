import express from "express";
import bodyParser from "body-parser";
import mongoConnect from "./config/db.config";
import usersRoutes from "./routes/user.route";
import superAdminRoutes from './routes/superAdmin.route';

const app= express();

const port=process.env.PORT|| 4000 ;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({type:"*/*"}))

app.use('/api', usersRoutes);
app.use('/api', superAdminRoutes);

app.get('/',(req,res) =>{
    res.status(200).json({
        message :"let's get started with TestApi",
        status:200
    })
})

app.use((req,res) =>{
    res.status(404).json({
        message:"endpoint not found",
        status:404
    })
})

app.listen(port,console.log(`server is running on http:/localhost:${port}`))
mongoConnect();