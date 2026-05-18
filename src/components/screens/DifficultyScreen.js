import { Button } from "../Button";
import { DIFFICULTY_ENUMERATOR, BUTTON_LABELS } from "../../constants/config";

export function DifficultyScreen({ onSelectDifficulty, onBack }) {
  return (
    <section className="screen-panel screen-center">
      <h1>Elige la dificultad</h1>
      <div className="difficulty-grid">
        {DIFFICULTY_ENUMERATOR.map(({ value, label }) => (
          <Button
            key={value}
            onClick={() => onSelectDifficulty(value)}
            label={label}
          />
        ))}
      </div>
      <Button
        className="ghost-button"
        onClick={onBack}
        label={BUTTON_LABELS.BACK}
      />
    </section>
  );
}
