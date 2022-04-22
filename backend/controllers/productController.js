import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


// @description     Fetch all products
// @route           GET /api/products
// @access          Public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}) //returns all the products
    
    res.json(products)
})


// @description     Fetch single product
// @route           GET /api/products/:id
// @access          Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @description     Delete product
// @route           DELETE /api/products/:id
// @access          Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product Removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @description     create product
// @route           POST /api/products
// @access          Private/Admin
const createProduct = asyncHandler(async(req, res) => {
     const product = new Product({
         name: 'Sample name',
         price: 0,
         user: req.user._id,
         image: '/images/sample.jpg',
         brand: 'Sample brand',
         category: 'Sample category',
         countInStock: 0,
         numReviews: 0,
         description: 'Sample description'
     })

     const createdProduct = await product.save()
     res.status(201).json(product)
})

// @description     update product
// @route           PUT /api/products/:id
// @access          Private/Admin
const updateProduct = asyncHandler(async(req, res) => {


    const createdProduct = await product.save()
    res.status(201).json(product)
})


export {
    getProducts,
    getProductById,
    deleteProduct
}