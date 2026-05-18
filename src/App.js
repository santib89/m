import "./App.css";
import { useEffect, useState } from "react";
import { getCategories, getQuestions } from "./services/api";
import { Button } from "./components/Button";
import { OptionBox } from "./components/OptionBox";
import {
  DIFFICULTY_ENUMERATOR,
  DEFAULT_QUESTION_COUNT,
  SCREEN_KEYS,
  ERROR_MESSAGES,
  BUTTON_LABELS,
  COLOR_PALETTE,
  RESULTS_TEXT,
} from "./constants/config";
import { Trivia } from "./components/screens/Trivia";

const initialState = {
  pantalla: SCREEN_KEYS.INICIO,
  dificultad: "",
  categories: [],
  selectedCategoryId: "",
  tema: "",
  questions: [],
  preguntaActual: 0,
  respuestasCorrectas: 0,
  loadingQuestions: false,
  apiError: "",
  tiempoTotal: 0,
};

function App() {
  const [state, setState] = useState(initialState);
  const update = (patch) => setState((prev) => ({ ...prev, ...patch }));
  const {
    pantalla,
    dificultad,
    categories,
    selectedCategoryId,
    tema,
    questions,
    preguntaActual,
    respuestasCorrectas,
    loadingQuestions,
    apiError,
    tiempoTotal,
  } = state;

  useEffect(() => {
    getCategories()
      .then((categories) =>
        setState((prev) => ({ ...prev, categories, apiError: "" })),
      )
      .catch(() => update({ apiError: ERROR_MESSAGES.CATEGORY_LOAD }));
  }, []);

  const resetProgress = (patch = {}) =>
    update({
      questions: [],
      preguntaActual: 0,
      respuestasCorrectas: 0,
      ...patch,
    });

  const selectedCategory = categories.find(
    (category) => category.id.toString() === selectedCategoryId,
  );
  const categoryColor = selectedCategory
    ? COLOR_PALETTE[categories.indexOf(selectedCategory) % COLOR_PALETTE.length]
    : COLOR_PALETTE[0];
  const disabled = !selectedCategoryId || loadingQuestions;
  const preguntaData = questions[preguntaActual];

  const iniciarJuego = () => update({ pantalla: SCREEN_KEYS.DIFICULTAD });
  const seleccionarDificultad = (nivel) =>
    resetProgress({
      dificultad: nivel,
      selectedCategoryId: "",
      tema: "",
      apiError: "",
      pantalla: SCREEN_KEYS.TEMA,
    });
  const handleCategoryChange = (selectedCategoryId) =>
    resetProgress({
      selectedCategoryId,
      tema:
        categories.find(
          (category) => category.id.toString() === selectedCategoryId,
        )?.name ?? "",
    });

  const comenzarTrivia = async () => {
    if (!selectedCategoryId || !dificultad)
      return update({ apiError: ERROR_MESSAGES.MISSING_SELECTION });
    update({ loadingQuestions: true, apiError: "" });
    try {
      const questions = await getQuestions({
        categoryId: selectedCategoryId,
        difficulty: dificultad,
        amount: DEFAULT_QUESTION_COUNT,
      });
      if (!questions.length)
        return update({ apiError: ERROR_MESSAGES.NO_QUESTIONS });
      update({
        questions,
        preguntaActual: 0,
        respuestasCorrectas: 0,
        pantalla: SCREEN_KEYS.TRIVIA,
      });
    } catch {
      update({ apiError: ERROR_MESSAGES.LOAD_QUESTIONS });
    } finally {
      update({ loadingQuestions: false });
    }
  };

  const responder = (indiceOpcion) => {
    const pregunta = questions[preguntaActual];
    if (!pregunta) return;
    const correcta = indiceOpcion === pregunta.correcta;
    const siguiente = preguntaActual + 1;
    update({
      respuestasCorrectas: respuestasCorrectas + (correcta ? 1 : 0),
      preguntaActual: siguiente < questions.length ? siguiente : preguntaActual,
      pantalla: siguiente < questions.length ? pantalla : SCREEN_KEYS.RESULTADO,
    });
  };

  const volverAlInicio = () =>
    setState((prev) => ({ ...initialState, categories: prev.categories }));

  const screen = {
    [SCREEN_KEYS.INICIO]: (
      <section className="screen-center">
        <h1>TRIVIA</h1>
        <p>Comienza a jugar</p>
        <button className="button button-large" onClick={iniciarJuego}>
          {BUTTON_LABELS.PLAY}
        </button>
      </section>
    ),
    [SCREEN_KEYS.DIFICULTAD]: (
      <section className="screen-center">
        <h1>Elige la dificultad</h1>
        <div className="difficulty-grid">
          {DIFFICULTY_ENUMERATOR.map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => seleccionarDificultad(value)}
              label={label}
            />
          ))}
        </div>
        <button className="ghost-button" onClick={volverAlInicio}>
          {BUTTON_LABELS.BACK}
        </button>
      </section>
    ),
    [SCREEN_KEYS.TEMA]: (
      <section className="screen-padding">
        <h1>Elige un tema</h1>
        <p>Selecciona la categoría para la trivia.</p>
        {apiError && <p className="api-error">{apiError}</p>}
        <OptionBox
          label="Categoría"
          options={categories}
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          placeholder={
            categories.length
              ? "Selecciona una categoría"
              : "Cargando categorías..."
          }
        />
        <button
          className={`button ${disabled ? "button--disabled" : ""}`}
          onClick={comenzarTrivia}
          disabled={disabled}
        >
          {loadingQuestions
            ? "Cargando preguntas..."
            : BUTTON_LABELS.START_QUIZ}
        </button>
        <button
          className="ghost-button"
          onClick={() => update({ pantalla: SCREEN_KEYS.DIFICULTAD })}
        >
          {BUTTON_LABELS.BACK}
        </button>
      </section>
    ),
    [SCREEN_KEYS.TRIVIA]: preguntaData ? (
      <Trivia
        preguntaData={preguntaData}
        preguntaActual={preguntaActual}
        totalPreguntas={questions.length}
        categoryColor={categoryColor}
        tema={tema}
        responder={responder}
        isRunning
        setTiempoTotal={(time) => update({ tiempoTotal: time })}
      />
    ) : null,
    [SCREEN_KEYS.RESULTADO]: (
      <section className="screen-center">
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
            {respuestasCorrectas}/{questions.length}
          </p>
          <p className="muted">respuestas correctas</p>
        </div>
        <div className="percent-box">
          <p className="percent-value">
            {Math.round((respuestasCorrectas / questions.length) * 100)}%
          </p>
          <p className="muted">
            {respuestasCorrectas / questions.length >= 0.8
              ? RESULTS_TEXT.EXCELLENT
              : respuestasCorrectas / questions.length >= 0.6
                ? RESULTS_TEXT.GOOD
                : RESULTS_TEXT.PRACTICE}
          </p>
        </div>
        <button className="button" onClick={volverAlInicio}>
          {BUTTON_LABELS.NEW_GAME}
        </button>
      </section>
    ),
  };

  return <div className="App">{screen[pantalla]}</div>;
}

export default App;
