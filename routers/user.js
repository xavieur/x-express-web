const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
<<<<<<< HEAD
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
||||||| merged common ancestors
        const user = User.findUserByCredentials(req.body.email, req.body.password)
        const token = user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
=======
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
>>>>>>> origin/master
        res.status(400).send()
    }
})

<<<<<<< HEAD
router.post('/users/logout', auth, async (req, res) => {
||||||| merged common ancestors
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

=======
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

>>>>>>> origin/master
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
<<<<<<< HEAD
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
||||||| merged common ancestors
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        user.save()

        /* const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) */

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
=======
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
>>>>>>> origin/master
    } catch (e) {
        res.status(400).send(e)
    }
})

<<<<<<< HEAD
router.delete('/users/me', auth, async (req, res) => {
||||||| merged common ancestors
router.delete('/users/:id', auth, async (req, res) => {
=======
router.delete('/users/:id', async (req, res) => {
>>>>>>> origin/master
    try {
<<<<<<< HEAD
        await req.user.remove()
        res.send(req.user)
||||||| merged common ancestors
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }

        res.send(user)
=======
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
>>>>>>> origin/master
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router