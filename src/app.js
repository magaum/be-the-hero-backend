const express = require('express');
const dotenv = require('dotenv')
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');
const app = express();

dotenv.config();

app.use(cors());
// define tipo de request esperado para aplicação
app.use(express.json());
app.use(routes);
app.use(errors())

module.exports = app;