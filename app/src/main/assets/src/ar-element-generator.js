const { createElement } = require("./html-element-generator.js");

const createScene = () => {
  return createElement(
    "a-scene",
    "scene",
    ["controller", "vr-mode-ui", "renderer", "embedded", "arjs"],
    [
      "",
      "enabled: false;",
      "logarithmicDepthBuffer: true;",
      "",
      "trackingMethod: best; sourceType: webcam; debugUIEnabled: false;",
    ]
  );
};

const createGPSCamera = () => {
  return createElement(
    "a-camera",
    "gps-camera",
    ["gps-camera", "fov"],
    ["", "50"]
  );
};

const createGPSEntity = () => {
  return createElement(
    "a-entity",
    "gps-model",
    ["gltf-model", "gps-entity-place", "scale"],
    [
      "https://appassets.androidplatform.net/assets/res/palace.gltf",
      "latitude: 50.13149691189219; longitude: 18.701269794815275;",
      "4 4 4",
    ]
  );
};

const createNFTCamera = () => {
  return createElement(
    "a-entity",
    "nft-camera",
    ["camera", "position", "look-controls"],
    ["fov:50", "0 1.6 0", ""]
  );
};

const createNFTEntity = () => {
  const modelEntity = createElement(
    "a-entity",
    "nft-model",
    ["gltf-model", "scale", "position", "rotation"],
    [
      "https://appassets.androidplatform.net/assets/res/palace.gltf",
      "85 85 85",
      "-85 -25 -15",
      "-90 0 0",
    ]
  );

  const nftEntity = createElement(
    "a-nft",
    "nft-entity",
    [
      "type",
      "url",
      "smooth",
      "smoothCount",
      "smoothTolerance",
      "smoothThreshold",
    ],
    [
      "nft",
      "https://appassets.androidplatform.net/assets/res/image",
      "true",
      "5",
      "0.01",
      "5",
    ]
  );

  nftEntity.appendChild(modelEntity);

  return nftEntity;
};

module.exports = {
  createScene: createScene,
  createGPSCamera: createGPSCamera,
  createGPSEntity: createGPSEntity,
  createNFTCamera: createNFTCamera,
  createNFTEntity: createNFTEntity,
};
