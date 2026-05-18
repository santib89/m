import "./App.css";
import { useEffect, useState } from "react";
import { getCategories, getQuestions } from "./services/api";
import {
  DEFAULT_QUESTION_COUNT,
  SCREEN_KEYS,
  ERROR_MESSAGES,
  COLOR_PALETTE,
} from "./constants/config";
import { StartScreen } from "./components/screens/StartScreen";
import { DifficultyScreen } from "./components/screens/DifficultyScreen";
import { ThemeScreen } from "./components/screens/ThemeScreen";
import { ResultScreen } from "./components/screens/ResultScreen";
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

  const reiniciarTrivia = () =>
    update({
      preguntaActual: 0,
      respuestasCorrectas: 0,
      tiempoTotal: 0,
      pantalla: SCREEN_KEYS.TRIVIA,
    });

  const screen = {
    [SCREEN_KEYS.INICIO]: <StartScreen onPlay={iniciarJuego} />,
    [SCREEN_KEYS.DIFICULTAD]: (
      <DifficultyScreen
        onSelectDifficulty={seleccionarDificultad}
        onBack={volverAlInicio}
      />
    ),
    [SCREEN_KEYS.TEMA]: (
      <ThemeScreen
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
        onStartTrivia={comenzarTrivia}
        loadingQuestions={loadingQuestions}
        disabled={disabled}
        apiError={apiError}
        onBack={() => update({ pantalla: SCREEN_KEYS.DIFICULTAD })}
      />
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
      <ResultScreen
        categoryColor={categoryColor}
        tema={tema}
        tiempoTotal={tiempoTotal}
        respuestasCorrectas={respuestasCorrectas}
        totalQuestions={questions.length}
        onRestart={reiniciarTrivia}
        onExit={volverAlInicio}
      />
    ),
  };

  return <div className="App">{screen[pantalla]}</div>;
}

export default App;
