import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import feedRoutes from './routes/feed.js';

dotenv.config()

const app = express()
app.use(cors())
app.listen(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/api/feed', feedRoutes)

app.get('/', (req, res) => res.send('API is running'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))