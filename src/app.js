const express = require('express')

require('../db/mongoose')
const taskRouter = require('../routers/task')
const userRouter = require('../routers/user')
const testRouter = require('../routers/test')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get('/', (req, res) => {
  const blogs = [
    { title: 'Pastel de zanahoria', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Zhulien de champiñones', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Shakshuka', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  ];
  res.render('index', { title: 'Home', blogs:blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('blog-create', { title: 'Create a new blog' });
});

app.get('/test/create', (req, res) => {
  res.render('test-create', { title: 'Create a new blog' });
});

app.use(express.json())
app.use('/api', taskRouter)
app.use('/api', userRouter)
app.use('/api', testRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

