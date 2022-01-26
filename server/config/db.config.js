import mongoose from "mongoose"
require('dotenv').config();

const connectionURL = process.env.MONGODB_KEY
const mongoConnect=() =>{
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection
        .once('open',() => console.log('database connected successfully'))
        .on('error',(error)=>{
            console.log('error',error);
    })
}

export default mongoConnect ;