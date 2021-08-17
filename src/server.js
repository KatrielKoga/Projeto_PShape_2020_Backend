const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

var corsOptions = {
	origin: 'https://personalshape.herokuapp.com',
	optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3333);
