import mongoose from 'mongoose'

const feedSchema = new mongoose.Schema({
    _id: String,
    amount: Number,
    date: Date,
    guardian: String,
    type: String,
})

export default mongoose.model('Feed', feedSchema)