const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

// Route pour prédire un chiffre manuscrit
router.post('/predict_digit', predictionController.predictDigit);

module.exports = router;
