from flask import Flask, request, jsonify
import numpy as np
from joblib import load
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'best_digit_recognition_model.pkl')

def load_model():
    model = load(model_path)
    return model

@app.route('/api/predict_digit', methods=['POST'])
def predict_digit():
    try:
        data = request.get_json()
        pixels = data['pixels']
        print('Pixels reçus:', pixels[:100])

        if len(pixels) != 784:
            return jsonify({'error': 'Invalid input data'}), 400

        input_data = np.array(pixels).reshape(1, -1)
        print('Input data:', input_data)

        model = load_model()
        prediction = model.predict(input_data)
        print('Prédiction:', prediction)

        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        print(f"Erreur lors de la prédiction: {str(e)}")
        return jsonify({'error': 'Erreur lors de la prédiction'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
