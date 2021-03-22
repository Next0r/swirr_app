const { createElement } = require("./html-element-generator");

const Interface = {
  _gpsIconAnimationInterval: null,
  _gpsIconImage: 0,
  _gpsIconAnimationSpeed: 500,

  _nftIconAnimationInterval: null,
  _nftIconRotation: 0,
  _nftIconAnimationSpeed: 25,
  _nftIconRotationFactor: 5,

  animateGPSIcon: () => {
    const gpsIcon = document.querySelector("#gps-icon");

    if (!gpsIcon) {
      return;
    }

    gpsIcon.setAttribute("src", "./res/satellite/sat_0.png");
    Interface._gpsIconImage = 0;

    Interface._gpsIconAnimationInterval = setInterval(() => {
      let nextImage = Interface._gpsIconImage + 1;
      if (nextImage > 2) {
        nextImage = 0;
      }

      Interface._gpsIconImage = nextImage;

      gpsIcon.setAttribute("src", `./res/satellite/sat_${nextImage}.png`);
    }, Interface._gpsIconAnimationSpeed);
  },

  setGPSIconDisabled: () => {
    const gpsIcon = document.querySelector("#gps-icon");

    if (!gpsIcon || Interface._gpsIconAnimationInterval == null) {
      return;
    }

    clearInterval(Interface._gpsIconAnimationInterval);
    Interface._gpsIconAnimationInterval = null;

    gpsIcon.setAttribute("src", "./res/satellite/sat_3.png");
  },

  animateNFTIcon: () => {
    /**
     * @type {HTMLImageElement}
     */
    const nftIcon = document.querySelector("#nft-icon");

    if (!nftIcon) {
      return;
    }

    nftIcon.setAttribute("src", "./res/arrow_repeat.png");
    nftIcon.style.transform = "rotate(0deg)";
    Interface._nftIconRotation = 0;

    Interface._nftIconAnimationInterval = setInterval(() => {
      let nextRotation =
        Interface._nftIconRotation + Interface._nftIconRotationFactor;

      if (nextRotation > 360) {
        nextRotation = 0;
      }

      Interface._nftIconRotation = nextRotation;
      nftIcon.style.transform = `rotate(${nextRotation}deg)`;
    }, Interface._nftIconAnimationSpeed);
  },

  setNFTIconReady: () => {
    const nftIcon = document.querySelector("#nft-icon");

    if (!nftIcon) {
      return;
    }

    if (Interface._nftIconAnimationInterval !== null) {
      clearInterval(Interface._nftIconAnimationInterval);
      Interface._nftIconAnimationInterval = null;
    }

    nftIcon.setAttribute("src", "./res/x_circle.png");
    nftIcon.style.transform = "rotate(0deg)";
  },

  setNFTIconActive: () => {
    const nftIcon = document.querySelector("#nft-icon");

    if (!nftIcon) {
      return;
    }

    if (Interface._nftIconAnimationInterval !== null) {
      clearInterval(Interface._nftIconAnimationInterval);
      Interface._nftIconAnimationInterval = null;
    }

    nftIcon.setAttribute("src", "./res/check_circle.png");
    nftIcon.style.transform = "rotate(0deg)";
  },

  add: () => {
    const interfaceContainer = createElement("div", "interface-container");
    const gpsInfoBox = createElement("div", "gps-info-box");
    const nftInfoBox = createElement("div", "nft-info-box");

    const gpsIcon = createElement("img", "gps-icon");
    const nftIcon = createElement("img", "nft-icon");

    gpsInfoBox.appendChild(gpsIcon);
    nftInfoBox.appendChild(nftIcon);

    interfaceContainer.appendChild(gpsInfoBox);
    interfaceContainer.appendChild(nftInfoBox);

    document.body.appendChild(interfaceContainer);
  },

  remove: () => {},
};

module.exports = {
  Interface: Interface,
};
