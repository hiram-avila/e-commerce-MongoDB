import express from 'express'
import {addItem, obtenerProductos,deleteProductos} from '../controllers/cartController.js'

const router = express.Router()

router.post('/', addItem)
router.get('/', obtenerProductos)
router.delete('/', deleteProductos)







export default router