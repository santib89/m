import { Button } from "../Button";
import { BUTTON_LABELS, RESULTS_TEXT } from "../../constants/config";

export function ResultScreen({
  categoryColor,
  tema,
  tiempoTotal,
  respuestasCorrectas,
  totalQuestions,
  onRestart,
  onExit,
}) {
  const scorePercent = Math.round((respuestasCorrectas / totalQuestions) * 100);
  const resultText =
    respuestasCorrectas / totalQuestions >= 0.8
      ? RESULTS_TEXT.EXCELLENT
      : respuestasCorrectas / totalQuestions >= 0.6
      ? RESULTS_TEXT.GOOD
      : RESULTS_TEXT.PRACTICE;

  return (
    <section className="screen-panel screen-center">
      <h1>¡Juego terminado!</h1>
      <p className="tema" style={{ color: categoryColor }}>
        Tema: {tema}
      </p>
      <div className="time-box">
        <p className="muted">⏱ Tiempo total</p>
        <p className="time-value">
          {Math.floor(tiempoTotal / 60)}m {tiempoTotal % 60}s
        </p>
      </div>
      <div className="score-box">
        <p className="score-value">
          {respuestasCorrectas}/{totalQuestions}
        </p>
        <p className="muted">respuestas correctas</p>
      </div>
      <div className="percent-box">
        <p className="percent-value">{scorePercent}%</p>
        <p className="muted">{resultText}</p>
      </div>
      <div className="actions">
        <Button onClick={onRestart} label={BUTTON_LABELS.RESTART} />
        <Button
          className="ghost-button"
          onClick={onExit}
          label={BUTTON_LABELS.EXIT}
        />
      </div>
    </section>
  );
}
