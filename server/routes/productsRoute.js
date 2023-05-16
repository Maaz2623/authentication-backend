import express from 'express'
import { createProduct, deleteProduct } from '../controllers/productsController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/add',auth, createProduct)
router.delete('/delete/:id', deleteProduct)

export default router