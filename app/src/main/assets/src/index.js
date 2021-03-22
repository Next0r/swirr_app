const {
  createGPSCamera,
  createGPSEntity,
  createNFTCamera,
  createNFTEntity,
  createScene,
} = require("./ar-element-generator");
const { Interface } = require("./interface");
const { SplashScreen } = require("./splash-screen");

window.onload = function () {
  // setTimeout(() => {
  //   Interface.setGPSIconDisabled();
  //   Interface.setNFTIconReady();
  // }, 3000);

  SplashScreen.add();
  SplashScreen.setStartButtonListener(() => {
    SplashScreen.remove(() => {
      document.body.appendChild(createScene());
      Interface.add();
      Interface.animateGPSIcon();
      Interface.animateNFTIcon();
    });
  });
};

AFRAME.registerComponent("controller", {
  init: function () {
    const scene = document.querySelector("#scene");

    // start from location based AR
    scene.appendChild(createGPSCamera());
    scene.appendChild(createGPSEntity());

    // insert nft entity
    // setTimeout(() => {
    scene.appendChild(createNFTEntity());
    // }, 1000);

    window.addEventListener("arjs-nft-loaded", function () {
      Interface.setNFTIconReady();
    });

    // handle image marker found
    scene.addEventListener("markerFound", function () {
      scene.removeChild(document.querySelector("#gps-camera"));
      scene.removeChild(document.querySelector("#gps-model"));
      scene.appendChild(createNFTCamera());
      Interface.setGPSIconDisabled();
      Interface.setNFTIconActive();
    });

    // handle image marker lost
    scene.addEventListener("markerLost", function () {
      scene.removeChild(document.querySelector("#nft-camera"));
      scene.appendChild(createGPSCamera());
      scene.appendChild(createGPSEntity());
      Interface.setNFTIconReady();
      Interface.animateGPSIcon();
    });
  },

  tick: function () {},
});
