require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

mongoose.Promise = global.Promise;
const connectDB = async () => {
    try {
        const url = `mongodb://localhost:27017/${process.env.DB_DATABASE}`;
        await mongoose.connect(url, { 
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            useMongoClient: true,
        })
        console.log('MongoDb connect succeeded')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => res.send('Hellow World'))
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
const POST = 5000

app.listen(POST, () => console.log(`Server started on post ${POST}`))