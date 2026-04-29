import {
  API_BASE_URL,
  DIFFICULTY_ENUMERATOR,
  TYPE_QUESTION,
  API_CATEGORY_URL,
} from "../constants/config";

export const getCategories = async () => {
  const response = await fetch(API_CATEGORY_URL);
  const data = await response.json();
  return data;
};
