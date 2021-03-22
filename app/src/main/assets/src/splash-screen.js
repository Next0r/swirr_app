const { createElement } = require("./html-element-generator");

const SplashScreen = {
  add: () => {
    document.body.innerHTML = "";
    const container = createElement("div", "main-container");
    const button = createElement(
      "a",
      "start-button",
      ["href", "class"],
      ["#", "button button-3d button-primary button-rounded button-jumbo"]
    );
    button.innerText = "Start";

    container.appendChild(button);
    document.body.appendChild(container);
  },

  remove: (onRemoveDone = function () {}) => {
    const fadeOverlay = createElement("div", "fade-overlay");
    fadeOverlay.style.opacity = 0;

    document.body.appendChild(fadeOverlay);

    const resolution = 20;
    const animLength = 500;

    for (let i = 1; i <= resolution; i += 1) {
      setTimeout(() => {
        fadeOverlay.style.opacity = 1 * (i / resolution);
      }, (animLength / resolution) * i);
    }

    setTimeout(() => {
      document.body.removeChild(document.querySelector("#main-container"));
      document.body.removeChild(fadeOverlay);
      onRemoveDone();
    }, animLength);
  },

  setStartButtonListener: (listenerFunction = function () {}) => {
    /**
     * @type {HTMLAnchorElement}
     */
    const button = document.querySelector("#start-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", listenerFunction);
  },
};

module.exports = {
  SplashScreen: SplashScreen,
};
