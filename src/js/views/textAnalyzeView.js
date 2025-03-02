import { analyzeText } from "../model";
import bgImageLights from "/src/assets/images/bg-light-theme.png";
import bgImageDark from "/src/assets/images/bg-dark-theme.png";
import logLights from "/src/assets/images/logo-light-theme.svg";
import logDark from "/src/assets/images/logo-dark-theme.svg";
import iconLights from "/src/assets/images/icon-sun.svg";
import iconDark from "/src/assets/images/icon-moon.svg";

export class TextAnalyzeView {
  _loaderParentContainer = document.querySelector(".loader-parent-container");
  _modeBtn = document.querySelector("#mode-btn");
  _parentElement = document.querySelector(".main__container--analyze-details");
  _parentElementDensity = document.querySelector(
    ".main__container--density-list"
  );
  _textAnalyzeTime = document.querySelector(".main__container--time");
  _parentElementPagination = document.querySelector(
    ".main__container--density-pagination"
  );
  _parentElementSpinner = document.querySelector(
    ".main__container--analyze-details"
  );
  _analyzeText = document.querySelector("#input__analyze-text");
  _errorMessage = "Please enter text to analyze.";
  _errorMessageDensity =
    "No characters found. Start typing to see letter density.";

  render(data) {
    if (data.length === 0) return;
    this._data = data;
    let markup = "";
    markup = this._generateMarkup();
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderDensity(data) {
    if (data.length === 0) return;
    this._dataDensity = data;
    let markupDensity = "";
    markupDensity = this._generateMarkupDensity();
    this._clearMarkupDensity();
    this._parentElementDensity.insertAdjacentHTML("beforeend", markupDensity);
    this._generateDensityBar();
    let markupPagination = "";
    markupPagination = this._generateMarkupPagination();
    this._clearMarkupPagination();
    this._parentElementPagination.insertAdjacentHTML(
      "beforeend",
      markupPagination
    );
  }

  _clearMarkup() {
    this._parentElement.innerHTML = "";
  }
  _clearMarkupDensity() {
    this._parentElementDensity.innerHTML = "";
  }

  _clearMarkupPagination() {
    this._parentElementPagination.innerHTML = "";
  }

  getAnalyzeText() {
    const analyzeText = document
      .querySelector("#input__analyze-text")
      .value.trim();
    if (!analyzeText) {
      this.renderErrorTextAnalyze();
      this.renderErrorTextAnalyzeDensity();
      this._clearMarkupPagination();
      return;
    } else return analyzeText;
  }

  addHandlerAnalyzeText(handler) {
    this._analyzeText.addEventListener("input", handler);
  }

  addHandlerTextDensity(handler) {
    this._analyzeText.addEventListener("input", handler);
  }

  addHandlerModePageLoad() {
    window.addEventListener("load", function (e) {
      e.preventDefault();
      const btn = document.querySelector(".header__mode-container--button");
      document.body.style.backgroundImage = `url("${bgImageDark}")`;
      document.body.style.color = "#ffffff";
      document.querySelector(".header__brand--logo").src = `${logDark}`;
      document.querySelector(
        ".header__mode-container--icon"
      ).src = `${iconLights}`;
      document.querySelector(
        ".header__mode-container--button"
      ).style.backgroundColor = "#343a40";
      document.querySelector("#input__analyze-text").style.backgroundColor =
        "#343a40";
      document.querySelector("#input__analyze-text").style.border =
        "1px solid #343a40";
      document.querySelectorAll(".progress").forEach((progress) => {
        progress.style.backgroundColor = "#343a40";
      });
      btn.setAttribute("data-current-mode", "dark");
    });
  }

  addHandlerPageClickHandlerModeBtn() {
    this._modeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".header__mode-container--button");
      if (!btn) return;
      const currentMode = btn.getAttribute("data-current-mode");
      if (currentMode === "light") {
        document.body.style.backgroundImage = `url("${bgImageDark}")`;
        document.body.style.color = "#ffffff";
        document.querySelector(".header__brand--logo").src = `${logDark}`;
        document.querySelector(
          ".header__mode-container--icon"
        ).src = `${iconLights}`;
        document.querySelector(
          ".header__mode-container--button"
        ).style.backgroundColor = "#343a40";
        document.querySelector("#input__analyze-text").style.backgroundColor =
          "#343a40";
        document.querySelector("#input__analyze-text").style.border =
          "1px solid #343a40";
        document.querySelectorAll(".progress").forEach((progress) => {
          progress.style.backgroundColor = "#343a40";
        });
        btn.setAttribute("data-current-mode", "dark");
      } else {
        document.body.style.backgroundImage = `url("${bgImageLights}")`;
        document.body.style.color = "#1c2022";
        document.querySelector(".header__brand--logo").src = `${logLights}`;
        document.querySelector(
          ".header__mode-container--icon"
        ).src = `${iconDark}`;
        document.querySelector(
          ".header__mode-container--button"
        ).style.backgroundColor = "#f1f3f5";
        document.querySelector("#input__analyze-text").style.backgroundColor =
          "#f1f3f5";
        document.querySelector("#input__analyze-text").style.border =
          "1px solid #f1f3f5";
        document.querySelectorAll(".progress").forEach((progress) => {
          progress.style.backgroundColor = "#f1f3f5";
        });
        btn.setAttribute("data-current-mode", "light");
      }
    });
  }

  addHandlerSeeMoreClick(handler) {
    this._parentElementPagination.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__see-more");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  renderSpinner = function () {
    this._parentElementSpinner.innerHTML = "";
    let markup = `<div class="loader-container">
    <div class="loader"></div>
    </div>`;
    this._loaderParentContainer.innerHTML = "";
    this._loaderParentContainer.insertAdjacentHTML("beforeend", markup);
  };
  clearSpinner = function () {
    this._loaderParentContainer.innerHTML = "";
  };

  renderErrorTextAnalyze(message = this._errorMessage) {
    this._textAnalyzeTime.innerHTML = 0;
    const errorMarkup = `
    <div class="main__container--analyze-characters">
            <span class="main__container--analyze-characters-text">00</span>
            <span class="main__container--analyze-characters-lebel"
              >Total Characters</span
            >
          </div>
          <div class="main__container--analyze-word">
            <span class="main__container--analyze-word-text">00</span>
            <span class="main__container--analyze-word-lebel"> Word Count</span>
          </div>
          <div class="main__container--analyze-sentence">
            <span class="main__container--analyze-sentence-text">00</span>
            <span class="main__container--analyze-sentence-lebel"
              >Sentence Count</span
            >
          </div>
  `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", errorMarkup);
  }

  renderErrorTextAnalyzeDensity(message = this._errorMessageDensity) {
    const errorMarkup = `
    <div class="message">
      <p class="message-text">${message}</p>
    </div>
  `;
    this._parentElementDensity.innerHTML = "";
    this._parentElementDensity.insertAdjacentHTML("beforeend", errorMarkup);
  }

  _generateMarkup() {
    if (this._data.readingTime > 0) {
      this._textAnalyzeTime.innerHTML = this._data.readingTime;
    }
    return `<div class="main__container--analyze-characters">
            <span class="main__container--analyze-characters-text">${this._data.character
              .toString()
              .padStart(2, "0")}</span>
            <span class="main__container--analyze-characters-lebel"
              >Total Characters</span
            >
          </div>
          <div class="main__container--analyze-word">
            <span class="main__container--analyze-word-text">${this._data.word
              .toString()
              .padStart(2, "0")}</span>
            <span class="main__container--analyze-word-lebel"> Word Count</span>
          </div>
          <div class="main__container--analyze-sentence">
            <span class="main__container--analyze-sentence-text">${this._data.sentence
              .toString()
              .padStart(2, "0")}</span>
            <span class="main__container--analyze-sentence-lebel"
              >Sentence Count</span
            >
          </div>`;
  }
  _generateDensityBar() {
    const progress = document.querySelectorAll(".progress-done");
    progress.forEach(function (progress) {
      progress.style.width = progress.getAttribute("data-done") + "%";
      progress.style.opacity = 1;
    });
  }
  _generateMarkupDensity() {
    let res = this._dataDensity;
    console.log(res);
    if (res.length > 0)
      return `${res
        .map(
          (char, index) =>
            `
            <div class="progress-bar">
            <span>${
              char[0] === " " ? "Space" : char[0].toLocaleUpperCase()
            }</span>
            <div class="progress">
              <div class="progress-done" data-done="${(
                (char[1] / this._data.character) *
                100
              ).toFixed(2)}">
              
              </div>
            </div>
            <span>${char[1]}(${((char[1] / this._data.character) * 100).toFixed(
              2
            )}%)</span>
          </div>
          `
        )
        .join("")}`;
    else return `${this._errorMessageDensity}`;
  }

  _generateMarkupPagination() {
    let resDensityData = Object.entries(this._data.charDensityList);

    if (resDensityData.length === 0) return;

    const numOfPages = Math.ceil(
      resDensityData.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numOfPages > 1)
      return `<button data-goto="${numOfPages}" class="btn btn__see-more">See More ⇩</button>`;
    return "";
  }
}

export default new TextAnalyzeView();
