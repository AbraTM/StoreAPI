require('dotenv').config();
require('express-async-errors')
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const app = express();


//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send("<h1>STORE API</h1> <a href ='/api/v1/products'>Products</a>")
})

app.use('/api/v1/products', productsRouter)


app.use(notFound)
app.use(errorHandler)

const Port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(Port, console.log(`Server is listening on port ${Port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()