const Product = require('../models/product');
const dotenv = require('dotenv');

const connectDatabase = require('../config/database')

const products = require('../data/produt.json')

dotenv.config({path:'server/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('Product deleted');
        await Product.insertMany(products);
        console.log('Product inserted');

        process.exit()
    }
    catch(error){
        console.log(error.message);
        process.exit()
    }
}

seedProducts()