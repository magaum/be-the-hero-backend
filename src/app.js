const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');
const app = express();

app.use(cors());
// define tipo de request esperado para aplicação
app.use(express.json());
app.use(routes);
app.use(errors())

module.exports = app;