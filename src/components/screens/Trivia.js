import React, { useState } from "react";
import { Timer } from "../../components/Timer";
import { ANSWER_FEEDBACK_DELAY_MS } from "../../constants/config";
import "./screens.css";

export function Trivia({
  preguntaData,
  preguntaActual,
  totalPreguntas,
  categoryColor,
  tema,
  responder,
  isRunning,
  setTiempoTotal,
}) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  if (!preguntaData) return null;

  const handleSelect = (i) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);

    setTimeout(() => {
      responder(i);
      setSelected(null);
      setLocked(false);
    }, ANSWER_FEEDBACK_DELAY_MS);
  };

  return (
    <div className="trivia-container">
      <Timer isRunning={isRunning} onTimeUpdate={setTiempoTotal} />

      <div className="meta" style={{ color: categoryColor }}>
        <p className="meta-text">
          {tema.toUpperCase()} | PREGUNTA {preguntaActual + 1} DE{" "}
          {totalPreguntas}
        </p>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${((preguntaActual + 1) / totalPreguntas) * 100}%`,
              background: `linear-gradient(90deg, ${categoryColor}, #764ba2)`,
            }}
          />
        </div>
      </div>

      <h2>{preguntaData.pregunta}</h2>

      <div className="options">
        {preguntaData.opciones.map((opcion, i) => {
          const isSelected = selected === i;
          const isCorrect = preguntaData.correcta === i;
          const className = `option-button ${isSelected && isCorrect ? "correct" : ""} ${isSelected && !isCorrect ? "incorrect" : ""}`;

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={locked}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Trivia;
