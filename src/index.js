const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const port = process.env.PORT || 3333
const app = express();

app.use(cors());
// define tipo de request esperado para aplicação
app.use(express.json());
app.use(routes);


app.listen(port)