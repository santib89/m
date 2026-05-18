import { Button } from "../Button";
import { BUTTON_LABELS } from "../../constants/config";

export function StartScreen({ onPlay }) {
  return (
    <section className="screen-panel screen-center">
      <h1>TRIVIA</h1>
      <p>Comienza a jugar</p>
      <Button className="button-large" label={BUTTON_LABELS.PLAY} onClick={onPlay} />
    </section>
  );
}
