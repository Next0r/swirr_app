const {
  createGPSCamera,
  createGPSEntity,
  createNFTCamera,
  createNFTEntity,
  createScene,
} = require("./ar-element-generator");

window.onload = function () {
  document.body.appendChild(createScene());
};

AFRAME.registerComponent("controller", {
  init: function () {
    const scene = document.querySelector("#scene");

    // start from location based AR
    scene.appendChild(createGPSCamera());
    scene.appendChild(createGPSEntity());

    // insert nft entity
    scene.appendChild(createNFTEntity());

    // handle image marker found
    scene.addEventListener("markerFound", function () {
      scene.removeChild(document.querySelector("#gps-camera"));
      scene.removeChild(document.querySelector("#gps-model"));
      scene.appendChild(createNFTCamera());
    });

    // handle image marker lost
    scene.addEventListener("markerLost", function () {
      scene.removeChild(document.querySelector("#nft-camera"));
      scene.appendChild(createGPSCamera());
      scene.appendChild(createGPSEntity());
    });
  },

  tick: function () {},
});
