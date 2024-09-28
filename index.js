import express from 'express'
import dotenv from 'dotenv'
import conectarDb from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authMiddleware from './midleware.js'

dotenv.config()
conectarDb()

const app = express()


app.use(cookieParser())
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use( cors());
app.use(express.urlencoded({ extended: true }));


app.use('/usuarios',usuarioRoutes )
app.use('/carrito',authMiddleware, cartRoutes )


app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`)
})