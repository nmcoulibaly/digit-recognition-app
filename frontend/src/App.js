import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Prediction from './components/Prediction';
import * as tf from "@tensorflow/tfjs";
import "./App.css";

function App() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true); // Nouvel état pour suivre le chargement du modèle

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(
          'https://maneprajakta.github.io/Digit_Recognition_Web_App/'
        );
        setModel(loadedModel);
        setLoadingModel(false); // Met à jour l'état du chargement du modèle une fois chargé
      } catch (error) {
        console.error('Failed to load model:', error);
      }
    };

    loadModel();
  }, []); // Appel une seule fois au chargement de l'application

  const predictDigit = async () => {
    if (!model) {
      console.warn('Le modèle n\'est pas encore chargé.');
      return;
    }

    try {
      const canvas = document.querySelector('.canvas');
      const image = tf.browser.fromPixels(canvas);
      const resized = tf.image.resizeBilinear(image, [224, 224]);
      const batched = resized.expandDims(0);
      const logits = model.predict(batched);
      const classes = await logits.argMax(-1).data();
      setPrediction(classes[0]);
    } catch (error) {
      console.error('Failed to predict:', error);
    }
  };

  return (
    <div className="App">
      <h1>Reconnaissance de chiffres avec TensorFlow.js</h1>
      <Canvas predictDigit={predictDigit} />
      {prediction !== null && <Prediction prediction={prediction} />}
      {/* {loadingModel ? (
        <p>Chargement du modèle...</p>
      ) : (
        <>
          <Canvas predictDigit={predictDigit} />
          {prediction !== null && <Prediction prediction={prediction} />}
        </>
      )} */}
    </div>
  );
}

export default App;
