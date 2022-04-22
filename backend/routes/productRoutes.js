import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import { getProducts, getProductById, deleteProduct } from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = new express.Router()

router.get('/', getProducts)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default router