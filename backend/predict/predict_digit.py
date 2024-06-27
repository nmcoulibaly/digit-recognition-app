# predict_digit.py

import sys
import joblib
import numpy as np

# Chargement du modèle depuis le fichier .pkl
model = joblib.load('best_digit_recognition_model.pkl')

# Fonction pour effectuer la prédiction
def predict_digit(pixels):
    # Convertir les pixels en un tableau numpy 1D
    pixels_array = np.array(pixels).reshape(1, -1)  # Assurez-vous que les pixels sont correctement formatés

    # Effectuer la prédiction
    prediction = model.predict(pixels_array)

    return prediction[0]

# Récupérer les pixels à prédire passés en argument
if __name__ == '__main__':
    pixels = list(map(int, sys.argv[1:]))  # Les arguments sont passés en tant que chaînes de caractères, les convertir en entiers
    prediction = predict_digit(pixels)
    print(prediction)
