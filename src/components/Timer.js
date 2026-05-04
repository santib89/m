import { useEffect, useState } from "react";

export function Timer({ isRunning }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return <p>⏱️ {time}s</p>;
}
