const {
  createGPSCamera,
  createGPSEntity,
  createScene,
  createZapparAsset,
  createZapparImageGroup,
  createZapparCamera,
  createZapparModelEntity,
} = require("./ar-element-generator");
const { Interface } = require("./interface");
const { SplashScreen } = require("./splash-screen");
const { ZapparSmooth } = require("./zappar-smooth");

window.alert = (text) => {
  console.log(`ALERT: ${text}`);
};

window.onload = () => {
  SplashScreen.add();
  SplashScreen.setStartButtonListener(() => {
    SplashScreen.remove(() => {
      document.body.appendChild(createScene());
      Interface.add();
      Interface.animateGPSIcon();
      Interface.setNFTIconReady();
    });
  });
};

AFRAME.registerComponent("controller", {
  init: function () {
    const scene = document.querySelector("#scene");

    // start from location based AR
    scene.appendChild(createGPSCamera());
    scene.appendChild(createGPSEntity());

    // prepare image tracking services
    scene.appendChild(createZapparAsset());
    scene.appendChild(createZapparCamera());
    scene.appendChild(createZapparImageGroup());

    const imageGroup = document.querySelector("#image-group");

    imageGroup.addEventListener("zappar-visible", () => {
      scene.removeChild(document.querySelector("#gps-camera"));
      scene.removeChild(document.querySelector("#gps-model"));
      scene.appendChild(createZapparModelEntity());
      Interface.setGPSIconDisabled();
      Interface.setNFTIconActive();
    });

    imageGroup.addEventListener("zappar-notvisible", () => {
      scene.removeChild(document.querySelector("#zappar-camera"));
      scene.removeChild(document.querySelector("#zappar-model"));
      scene.appendChild(createGPSCamera());
      scene.appendChild(createGPSEntity());
      scene.appendChild(createZapparCamera());
      Interface.setNFTIconReady();
      Interface.animateGPSIcon();
    });
  },

  tick: function () {},
});

AFRAME.registerComponent("zappar-smooth", {
  init: function () {
    ZapparSmooth.init();
  },
  tick: function () {
    ZapparSmooth.smooth();
  },
});
