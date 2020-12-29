const express = require('express')
const router = new express.Router()
const Test = require('../models/test')
const auth = require('../middleware/auth')

router.post('/tests', auth, async (req, res) => {
    // const test = new Test(req.body)
    const test = new Test({
        ...req.body,
        owner: req.user._id
    })

    try {
        await test.save()
        res.redirect('/tests')
    } catch (e) {
        res.status(400).send()
    }
})

// GET /tests?solution=1&sortBy=question:asc&limit=10&skip=0
router.get('/tests', auth, async (req, res) => {
    try {
        // Option A:
        // const tests = await Test.find({owner: req.user._id})
        // res.send(tests)

        // Option B:
        // await req.user.populate({path:'tests', match}).execPopulate()
        // res.send(req.user.tests)

        const match = {}
        const sort = {}
        if (req.query.solution) {
            match.solution = parseInt(req.query.solution)
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1: 1
        }

        await req.user.populate({
            path: 'tests',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tests)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tests/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const test = await Test.findOne({ _id, owner: req.user._id })

        if (!test) {
            return res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tests/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['question', 'answer1', 'answer2', 'answer3', 'answer4', 'solution']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const test = await Test.findOne({ _id: req.params.id, owner: req.user._id })

        if (!test) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            test[update] = req.body[update]
        })
        
        await test.save()
        res.send(test)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tests/:id', auth, async (req, res) => {
    try {
        const test = await Test.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!test) {
            res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router