import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const connectDb = async()=>{
    const MongoURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;
    try{
        await mongoose.connect(MongoURI);
    }
    catch(error){
        console.log("db connection failed", error.message);
        console.log("database connected");
        process.exit(1);
    }
}
export default connectDb;