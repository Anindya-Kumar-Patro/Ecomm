const Product = require('../models/Product')

const ErrorHandler = require('../util/errorHandler.js')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.create(req.body) 
    res.status(201).json({
        success: true,
        product
    })
})

//Get all products

exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        count:products.length, 
        products
    })
})

// Get specific product

exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('product doesnt exsist', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Update product details

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators:true,
        useFindAndModify:false

    })

    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message: 'Product deleted successfully'
    })
})