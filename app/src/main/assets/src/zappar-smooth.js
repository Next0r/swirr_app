const ZapparSmooth = {
  _maxPosQueueSize: 5,
  _maxRotQueueSize: 10,
  _zapparModel: null,
  _zapparImageGroup: null,
  _posQueue: [],
  _rotQueue: [],

  init() {
    this._zapparModel = document.querySelector("#zappar-model");
    this._zapparImageGroup = document.querySelector("#image-group");
  },

  _averageVector3Queue(queue) {
    let mean = new THREE.Vector3(0, 0, 0);

    queue.forEach((value) => {
      mean.add(value);
    });

    return mean.divideScalar(queue.length);
  },

  smooth() {
    let pos = new THREE.Vector3();
    let quat = new THREE.Quaternion();
    let scale = new THREE.Vector3();

    this._zapparImageGroup.object3D.matrix.decompose(pos, quat, scale);

    // smooth position
    if (this._posQueue.length >= this._maxPosQueueSize) {
      this._posQueue.shift();
    }
    this._posQueue.push(pos);
    let meanPos = this._averageVector3Queue(this._posQueue);

    // apply smoothed position
    this._zapparModel.setAttribute("position", meanPos);

    // smooth rotation
    this._zapparModel.object3D.setRotationFromQuaternion(quat);
    let rot = this._zapparModel.getAttribute("rotation");

    if (this._rotQueue.length >= this._maxRotQueueSize) {
      this._rotQueue.shift();
    }
    this._rotQueue.push(new THREE.Vector3(rot.x, rot.y, rot.z));
    let meanRot = this._averageVector3Queue(this._rotQueue);

    // apply smoothed rotation
    this._zapparModel.setAttribute("rotation", meanRot);
  },
};

module.exports = {
  ZapparSmooth: ZapparSmooth,
};
