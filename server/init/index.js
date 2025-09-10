import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../src/models/category.model.js';
import { bannerData, categoryData, colorData, productData, sizeData } from './data.js';
import Banner from '../src/models/banner.model.js';
import Size from '../src/models/size.model.js';
import Color from '../src/models/color.model.js';
import Product from '../src/models/product.model.js';
dotenv.config();

main().catch(error => console.log("error in connecting", error));

async function main() {
    const MongoURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CODE}.mongodb.net/EazyCart?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;
    await mongoose.connect(MongoURI);
    console.log('successfully connected');
}

const initDb = async ()=>{
    // await Category.deleteMany({});
    // await Category.insertMany(categoryData);
    // await Banner.deleteMany({});
    // await Banner.insertMany(bannerData);
    // await Size.deleteMany({});
    // await Size.insertMany(sizeData);
    // await Color.deleteMany({});
    // await Color.insertMany(colorData);
    await Product.deleteMany({});
    await Product.insertMany(productData);
    
    console.log("Data successfully initialized");
}

initDb();