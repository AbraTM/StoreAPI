require('dotenv').config()

const connectDB = require('./db/connect')
const Products = require('./models/products')
const dataP = require('./data.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(dataP)
        console.log("Success")
        process.exit(0)
    } catch (error) {
        console.log("Error")
        process.exit(-1)
    }

    
}

start()