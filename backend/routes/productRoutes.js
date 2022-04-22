import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = new express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

router.route('/:id')
      .get(getProductById)
      .delete(protect, admin, deleteProduct)
      .put(protect, admin, updateProduct)

export default router