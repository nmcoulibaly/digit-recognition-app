import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [predictedDigit, setPredictedDigit] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    setIsDrawing(true);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handlePredict = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');

    axios.post('/predict', { imageData })
      .then(response => {
        setPredictedDigit(response.data.digit);
      })
      .catch(error => {
        console.error('Erreur lors de la prédiction:', error);
      });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPredictedDigit(null);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={280} height={280}
        style={{ border: '1px solid black', marginBottom: '10px' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      <div>
        <button onClick={handlePredict}>Prédire</button>
        <button onClick={clearCanvas}>Effacer</button>
      </div>
      {predictedDigit !== null && (
        <div>
          <h2>Résultat:</h2>
          <p>Chiffre prédit: {predictedDigit}</p>
        </div>
      )}
    </div>
  );
};

export default Canvas;
