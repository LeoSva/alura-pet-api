const express = require('express');
const rotasAtendimento = require('../app/rotas/atendimentoRotas');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

rotasAtendimento(app);

module.exports = app;
