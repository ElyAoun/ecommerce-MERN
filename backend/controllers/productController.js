import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


// @description     Fetch all products
// @route           GET /api/products
// @access          Public
const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 3 //max products per page
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? { ///products?keyword=...
        name: {
            $regex: req.query.keyword,
            $options: 'i' //case insensitive
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword }) //get total number of products
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page-1)) //returns all the products
    
    res.json({products, page, pages: Math.ceil(count / pageSize )})
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
     res.status(201).json(createdProduct)
})

// @description     update product
// @route           PUT /api/products/:id
// @access          Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @description     create new review
// @route           POST /api/products/:id/reviews
// @access          Private
const  createProductReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewd')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item)=>item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
}