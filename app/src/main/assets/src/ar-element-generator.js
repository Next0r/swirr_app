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
    ["gltf-model", "gps-entity-place", "scale", "rotation"],
    [
      "https://appassets.androidplatform.net/assets/res/palace.gltf",
      "latitude: 50.13184874227085; longitude: 18.701184365104936;",
      "3 3 3",
      "0 150 0",
    ]
  );
};

const createZapparCamera = () => {
  return createElement(
    "a-entity",
    "zappar-camera",
    ["camera", "zappar-camera"],
    ["fov:50", ""]
  );
};

const createZapparAsset = () => {
  const assets = createElement("a-assets", "assets");
  const assetItem = createElement(
    "a-asset-item",
    "target-file",
    ["src"],
    ["https://appassets.androidplatform.net/assets/res/image.zpt"]
  );

  assets.appendChild(assetItem);
  return assets;
};

const createZapparImageGroup = () => {
  return createElement(
    "a-entity",
    "image-group",
    ["zappar-image"],
    ["target: #target-file"]
  );
};

const createZapparModelEntity = () => {
  return createElement(
    "a-entity",
    "zappar-model",
    ["gltf-model", "scale", "position", "rotation", "zappar-smooth"],
    [
      "https://appassets.androidplatform.net/assets/res/palace.gltf",
      "1 1 1",
      "0 0 0",
      "0 0 0",
      "",
    ]
  );
};

module.exports = {
  createScene: createScene,
  createGPSCamera: createGPSCamera,
  createGPSEntity: createGPSEntity,
  createZapparCamera: createZapparCamera,
  createZapparAsset: createZapparAsset,
  createZapparImageGroup: createZapparImageGroup,
  createZapparModelEntity: createZapparModelEntity,
};
