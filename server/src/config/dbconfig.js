import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MongoURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;

mongoose.connect(MongoURI)
    .then(()=>{
        console.log("database connected");
    })
    .catch((error)=>{
        console.log("Error in db connection", error.message);
    })