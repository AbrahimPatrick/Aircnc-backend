const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);



mongoose.connect('mongodb+srv://omnistack9:omnistack9@omnistack9-q8iqy.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Banco de dados Reges? São melhores para websocket;
const connectedUsers = {};

io.on('connection', socket => {
  console.log(socket.handshake.query); //Pega parametros enviados
  console.log('Usuário conectado:', socket.id);

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;

  // setTimeout(() => {socket.emit('hello', 'World')}, 4000); Envia
  // socket.on('omni', data => { Recebe
  //   console.log(data);
  // });
});

app.use((req, res, next) => {
  req.io = io; //Disponibiliza a função de websocket para todas as rotas, se quiser user.
  req.connectedUsers = connectedUsers; //Disponibiliza todos os usuários logados no websocket

  return next();
}); //Middleware => 'use' para usabilidade em uma rota. next se usa para funções sem retorno

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

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

