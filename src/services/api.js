import {
  API_BASE_URL,
  TYPE_QUESTION,
  API_CATEGORY_URL,
} from "../constants/config";

const decodeHtml = (text) => {
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/html").documentElement.textContent;
};

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const getCategories = async () => {
  const response = await fetch(API_CATEGORY_URL);
  const data = await response.json();
  return data.trivia_categories || [];
};

export const getQuestions = async ({ categoryId, difficulty, amount = 10 }) => {
  const url = `${API_BASE_URL}?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${TYPE_QUESTION}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.response_code !== 0 || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((item) => {
    const correctAnswer = decodeHtml(item.correct_answer);
    const options = shuffleArray([
      correctAnswer,
      ...item.incorrect_answers.map((answer) => decodeHtml(answer)),
    ]);

    return {
      pregunta: decodeHtml(item.question),
      opciones: options,
      correcta: options.findIndex((option) => option === correctAnswer),
      categoria: item.category,
    };
  });
};
