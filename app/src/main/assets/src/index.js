window.onload = () => {
  //   console.log("hello world!");

  let nft = undefined;

  AFRAME.registerComponent("controller", {
    init: function () {
      const cameraEntity = document.querySelector("#camera"); //.object3D.children[0];

      const camera = cameraEntity.getObject3D("camera");

      //   console.log();

      //   camera.far = 20000;

      console.log(camera.far);

      const redBox = document.querySelector("#red_box");
      console.log(redBox.object3D);

      nft = document.querySelector("#nft_element");

      //   console.log(nft.getAttribute("position"));
    },

    tick: function () {
    //   console.log(nft.getAttribute("position").z);
    },
  });

};
