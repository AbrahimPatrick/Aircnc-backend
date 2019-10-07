const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack9:omnistack9@omnistack9-q8iqy.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (criação e edição)
// app.put('/users/:id', (req, res) => {
// app.post('/users', (req, res) => {
  // return res.send('Hello world');
  // return res.json({ message: "Hello World" });
  // return res.json({ idade: req.query.idade });
  // return res.json({ id: req.params.id });
  // return res.json(req.body);
// });

