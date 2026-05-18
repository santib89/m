export const API_BASE_URL = "https://opentdb.com/api.php";
//dificultad cantidad de preguntas y tipo de preguntas
export const DIFFICULTY_ENUMERATOR = [
  { label: "FÁCIL", value: "easy" },
  { label: "MEDIA", value: "medium" },
  { label: "DIFÍCIL", value: "hard" },
];

export const TYPE_QUESTION = "multiple";

export const DEFAULT_QUESTION_COUNT = 5;
export const SCREEN_KEYS = {
  INICIO: "inicio",
  DIFICULTAD: "dificultad",
  TEMA: "tema",
  TRIVIA: "trivia",
  RESULTADO: "resultado",
};
export const ANSWER_FEEDBACK_DELAY_MS = 700;
export const BUTTON_LABELS = {
  PLAY: "JUGAR",
  START_QUIZ: "▶ Comenzar Trivia",
  BACK: "← Volver",
  NEW_GAME: "Jugar de Nuevo",
  RESTART: "Reiniciar",
  EXIT: "Salir",
};
export const ERROR_MESSAGES = {
  CATEGORY_LOAD:
    "No se pudieron cargar las categorías. Intenta de nuevo más tarde.",
  MISSING_SELECTION: "Debes elegir categoría y dificultad",
  NO_QUESTIONS: "No se encontraron preguntas para esta categoría y dificultad.",
  LOAD_QUESTIONS: "Hubo un error al cargar las preguntas. Intenta de nuevo.",
};
export const RESULTS_TEXT = {
  EXCELLENT: "¡Excelente trabajo!",
  GOOD: "¡Buen intento!",
  PRACTICE: "¡Sigue practicando!",
};
export const COLOR_PALETTE = [
  "#4ECDC4",
  "#FF6B6B",
  "#95E1D3",
  "#FFE66D",
  "#FF6348",
  "#95A5FF",
  "#FF9FF3",
  "#FFC93C",
  "#6BCB77",
  "#5D5FEF",
  "#F76C6C",
  "#38B6FF",
  "#FEBF63",
];

export const API_CATEGORY_URL = "https://opentdb.com/api_category.php";
