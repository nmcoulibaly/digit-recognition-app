const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const predictionController = require('./controllers/predictionController');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

connectDB();

app.post('/api', predictionController.predictDigit);

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
