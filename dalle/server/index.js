import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalle from './routes/dalleRoutes.js'

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalle)

app.get('/', async (req, res) => {
    res.send('Hello from Dalle')
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(8000, () => console.log("Server has started on port http://localhost:8000/"))
    } catch (err) {
        console.log(err)
    }

}

startServer()