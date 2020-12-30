const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('../db/mongoose')
const postRouter = require('../routers/post')
const userRouter = require('../routers/user')
const testRouter = require('../routers/test')

const Test = require('../models/test')
const Post = require('../models/post')

const auth = require('../middleware/auth')

const port = process.env.PORT

// express server app
const server = express();

// listen for requests
server.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})

// register view engine
server.set('view engine', 'ejs');

// middleware & static files
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))

server.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
})

server.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.render('index', { title: 'List of posts', posts: posts });
  } catch (e) {
    res.render('index', { title: 'List of posts', posts: [] });
  }
})

server.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

server.get('/post/create', (req, res) => {
  res.render('post-create', { title: 'Create a new post' });
})

server.get('/post-edit/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const post = await Post.findById(_id)

    if (!post) {
      return res.status(404).send()
    }

    res.render('post-edit', { title: 'Edit post', post });
  } catch (e) {
    res.status(500).send()
  }
})

server.get('/tests', async (req, res) => {
  try {
    const tests = await Test.find({})
    res.render('tests', { title: 'List of tests', tests: tests });
  } catch (e) {
    res.render('tests', { title: 'List of tests', tests: [] });
  }
})

server.get('/test/create', (req, res) => {
  res.render('test-create', { title: 'Create a new test' }); // owner: req.user
})

server.get('/test-edit/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const test = await Test.findById(_id)

    if (!test) {
      return res.status(404).send()
    }

    res.render('test-edit', { title: 'Edit test', test });
  } catch (e) {
    res.status(500).send()
  }
})

server.get('/interfaz', (req, res) => {
  res.render('interfaz', { title: 'Interacción con el servidor' });
})

server.get('/user-login', (req, res) => {
  res.render('user-login', { title: 'Login' })
})

server.get('/user-create', (req, res) => {
  res.render('user-create', { title: 'Create a new user' });
})

server.use(cors())
server.use(express.json())
server.use('/api', postRouter)
server.use('/api', userRouter)
server.use('/api', testRouter)

// 404 page
server.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})