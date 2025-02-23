import * as model from "./model.js";
import textAnalyzeView from "./views/textAnalyzeView.js";
import * as config from "./config.js";

const controlTextAnalyze = function () {
  try {
    // Render the new mode on the page
    const analyzeText = textAnalyzeView.getAnalyzeText();
    if (!analyzeText) return;

    textAnalyzeView.renderSpinner();

    setTimeout(function () {
      model.analyzeText(analyzeText);
      const data = model.state;
      textAnalyzeView.render(data);
      const dataDensity = model.getTextDensityByPage(1);
      textAnalyzeView.renderDensity(dataDensity);
      textAnalyzeView.clearSpinner();
    }, config.SHOW_COUNTRIES_SEC * 1000);
  } catch (err) {
    console.log(err);
    textAnalyzeView.renderErrorTextAnalyze();
  }
};

const controlTextDensity = function () {
  try {
    const analyzeText = textAnalyzeView.getAnalyzeText();
    if (!analyzeText) return;
    model.analyzeText(analyzeText);
    const data = model.getTextDensityByPage(1);
    textAnalyzeView.renderDensity(data);
  } catch (err) {
    textAnalyzeView.renderErrorTextAnalyzeDensity();
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  try {
    const data = model.getTextDensityByPage(goToPage);
    textAnalyzeView.renderDensity(data);
  } catch (err) {
    // Display an error message to the user if an error occurs
    textAnalyzeView.renderErrorTextAnalyzeDensity();
    console.log(err);
  }
};

const init = function () {
  textAnalyzeView.addHandlerAnalyzeText(controlTextAnalyze);
  //textAnalyzeView.addHandlerTextDensity(controlTextDensity);
  textAnalyzeView.addHandlerSeeMoreClick(controlPagination);
  textAnalyzeView.addHandlerPageClickHandlerModeBtn();
  textAnalyzeView.addHandlerModePageLoad();
};

init();
