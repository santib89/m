import { Button } from "../Button";
import { OptionBox } from "../OptionBox";
import { BUTTON_LABELS } from "../../constants/config";

export function ThemeScreen({
  categories,
  selectedCategoryId,
  onCategoryChange,
  onStartTrivia,
  loadingQuestions,
  disabled,
  apiError,
  onBack,
}) {
  return (
    <section className="screen-panel screen-padding">
      <h1>Elige un tema</h1>
      <p>Selecciona la categoría para la trivia.</p>
      {apiError && <p className="api-error">{apiError}</p>}
      <OptionBox
        label="Categoría"
        options={categories}
        value={selectedCategoryId}
        onChange={onCategoryChange}
        placeholder={
          categories.length
            ? "Selecciona una categoría"
            : "Cargando categorías..."
        }
      />
      <Button
        className={disabled ? "button button--disabled" : "button"}
        onClick={onStartTrivia}
        label={
          loadingQuestions
            ? "Cargando preguntas..."
            : BUTTON_LABELS.START_QUIZ
        }
        disabled={disabled}
      />
      <Button
        className="ghost-button"
        onClick={onBack}
        label={BUTTON_LABELS.BACK}
      />
    </section>
  );
}
