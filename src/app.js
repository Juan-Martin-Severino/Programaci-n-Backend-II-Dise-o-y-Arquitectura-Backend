import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import sessionRoutes from "./routes/session.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'
import { initializePassport } from './config/passport.config.js'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import { __dirname } from './utils/path.js'
import { initMongoDB } from './db/dbMongo.js'
import { initializePassport } from './config/passport.config.js'


const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())


mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/api/session", sessionRoutes);
app.use("/api/users", userRoutes);
app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)

initMongoDB()



app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})