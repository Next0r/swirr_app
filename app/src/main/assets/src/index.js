const target = {
  latitude: 50.13149691189219,
  longitude: 18.701269794815275,
};

const gpsEntityScale = {
  x: 4,
  y: 4,
  z: 4,
};

const createGPSCamera = () => {
  const camera = document.createElement("a-camera");

  const gpsAttribute = document.createAttribute("gps-camera");

  camera.setAttributeNode(gpsAttribute);
  camera.setAttribute("fov", "50");

  camera.id = "gps-camera";

  return camera;
};

const createGPSEntity = () => {
  const entity = document.createElement("a-entity");

  const gltfAttribute = document.createAttribute("gltf-model");
  gltfAttribute.value =
    "https://appassets.androidplatform.net/assets/res/palace.gltf";

  const gpsEntityPlaceAttribute = document.createAttribute("gps-entity-place");
  gpsEntityPlaceAttribute.value = `latitude: ${target.latitude}; longitude: ${target.longitude};`;

  entity.setAttributeNode(gltfAttribute);
  entity.setAttributeNode(gpsEntityPlaceAttribute);
  entity.setAttribute("scale", gpsEntityScale);

  entity.id = "gps-model";

  return entity;
};

const createNFTCamera = () => {
  const camera = document.createElement("a-entity");

  const cameraAttribute = document.createAttribute("camera");
  cameraAttribute.value = "fov:50";

  camera.setAttributeNode(cameraAttribute);

  camera.setAttribute("position", "0 1.6 0");
  camera.setAttribute("look-controls");

  camera.id = "nft-camera";

  return camera;
};

AFRAME.registerComponent("controller", {
  init: function () {
    const scene = document.querySelector("#scene");

    // start from location based AR
    scene.appendChild(createGPSCamera());
    scene.appendChild(createGPSEntity());

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
