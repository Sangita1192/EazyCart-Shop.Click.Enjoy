import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from 'morgan';
import router from "./src/app.js";
import connectDb from "./src/config/dbconfig.js";

const app = express();

connectDb();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));


app.use("/api", router);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})