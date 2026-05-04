import { useEffect, useState } from "react";
import "./Timer.css";

export function Timer({ isRunning, resetKey, onTimeUpdate }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        const nuevo = prev + 1;

        if (onTimeUpdate) onTimeUpdate(nuevo);

        return nuevo;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // reset cuando cambia pregunta
  useEffect(() => {
    setTime(0);
  }, [resetKey]);

  let className = "timer";

  if (time <= 5) className += " danger";
  else if (time <= 10) className += " warning";

  return (
    <div className="timer-container">
      <div className={className}>{time}</div>
    </div>
  );
}
