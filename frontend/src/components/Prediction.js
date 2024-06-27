import React from 'react';

const Prediction = ({ prediction }) => {
  return (
    <div className="prediction">
      <h2>Résultat de la prédiction :</h2>
      <p>{prediction}</p>
    </div>
  );
};

export default Prediction;
