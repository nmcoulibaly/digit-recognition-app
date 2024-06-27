const { exec } = require('child_process');
const path = require('path');
const Image = require('../models/Image');  // Importez le modèle Image que vous avez créé

// Fonction pour traiter la prédiction d'une image dessinée par l'utilisateur
const predictDigit = async (req, res) => {
    // Récupérer les données de l'image dessinée par l'utilisateur depuis le corps de la requête
    const { pixels } = req.body;

    // Exécuter le script Python pour prédire avec le modèle .pkl
    const scriptPath = path.join(__dirname, '..', 'predict_digit.py');
    const command = `python ${scriptPath} ${pixels.join(' ')}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'exécution du script: ${error.message}`);
            return res.status(500).json({ error: 'Erreur lors de la prédiction' });
        }
        if (stderr) {
            console.error(`Erreur de script: ${stderr}`);
            return res.status(500).json({ error: 'Erreur lors de la prédiction' });
        }

        const prediction = parseInt(stdout.trim());  // Convertir la sortie en entier

        // Enregistrez l'image et la prédiction dans la base de données MongoDB
        const newImage = new Image({
            pixels: pixels,
            prediction: prediction
        });

        newImage.save()
            .then(savedImage => {
                res.status(201).json({
                    prediction: savedImage.prediction,
                    imageId: savedImage._id  // Envoyer l'ID de l'image enregistrée
                });
            })
            .catch(err => {
                console.error('Erreur lors de l\'enregistrement de l\'image et de la prédiction:', err);
                res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'image et de la prédiction' });
            });
    });
};

module.exports = { predictDigit };
