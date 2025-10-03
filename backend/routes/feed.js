import express from 'express'
import Feed from '../models/feed.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const feed = await Feed.find()
    res.json(feed)
})

router.post('/', async (req, res) => {
    const newFeed = new Feed(req.body)
    await newFeed.save()
    res.status(201).json(newFeed)
})

export default router