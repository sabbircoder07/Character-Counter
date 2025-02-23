import { DENSITY_PER_PAGE } from "./config.js";

export const state = {
  character: "",
  word: "",
  sentence: "",
  charDensityList: [],
  readingTime: 0,
  page: 0,
  resultsPerPage: DENSITY_PER_PAGE,
};

export const analyzeText = function (text) {
  try {
    if (!text) return;
    const startTime = performance.now();
    const finalText = text.trim().toLocaleLowerCase();
    state.character = finalText.split("").filter((char) => char != " ").length;
    state.word = finalText.split(" ").length;
    state.sentence = finalText.split(".").filter((char) => char != "").length;

    const obj = {};
    for (const char of finalText) {
      obj[char] = (obj[char] || 0) + 1;
    }
    let sortedObject = Object.entries(obj)
      .sort(([, a], [, b]) => b - a)
      .filter(([x]) => x !== " ");
    state.charDensityList = sortedObject;
    const endTime = performance.now();
    state.readingTime = (endTime - startTime).toFixed(2);
    console.log(state.readingTime);
  } catch (err) {
    throw err;
  }
};

export const getTextDensityByPage = function (page = state.page) {
  try {
    // Set the current page number in the application state
    state.page = page;
    // Calculate the start and end indices of the slice of countries to retrieve
    const start = 0;
    const end = page * state.resultsPerPage;

    // Retrieve the slice of countries from the application state
    return state.charDensityList.slice(start, end);
  } catch (err) {
    // Handle any errors that occur during the execution of the function
    throw err;
  }
};
