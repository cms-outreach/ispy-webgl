var yae = yae || {};
yae.version = "0.0.1";

yae.hasWebGL = function() {
  var canvas = document.createElement('canvas');

  if ( ! canvas.getContext('webgl') ) {
    console.log('no webgl');
  } else {
    console.log('webgl');
  }

  if ( ! canvas.getContext('experimental-webgl') ) {
    console.log('no experimental-webgl');
  } else {
    console.log('experimental-webgl');
  }

  if ( ! window.WebGLRenderingContext ) {
    console.log('no WebGLRenderingContext');
  } else {
    console.log('WebGLRenderingContext');
  }

  if ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) {
    if ( ! window.WebGLRenderingContext ) {
      return false;
    } else {
      return true;
    }

  } else {
    return false;
  }
}

yae.setttings = {
  background: "black"
};

yae.init = function() {
  var screen_canvas = document.getElementById('display');

  var scene = new THREE.Scene();
  yae.scene = scene;

  var width = 850.0;
  var height = 500.0;

  // width, height, fov, near, far, orthoNear, orthoFar
  var camera = new THREE.CombinedCamera(width, height, 70, 1, 100, 1, 48);
  yae.camera = camera;
  yae.setCameraHome();

  var renderer;
  if ( yae.hasWebGL() ) {
    console.log('yae: using webgl');
    yae.settings.renderer = "webgl";
    renderer = new THREE.WebGLRenderer({antialias:true});
  } else {
    console.log('yae: using canvas');
    yae.settings.renderer = "canvas";
    renderer = new THREE.CanvasRenderer();
  }

  renderer.setSize(width, height);
  yae.renderer = renderer;
  screen_canvas.appendChild(yae.renderer.domElement);

  // The second argument is necessary to make sure that mouse events are
  // handled only when in the canvas
  var controls = new THREE.TrackballControls(yae.camera, yae.renderer.domElement);
  yae.controls = controls;

  // Add a parent object for each group
  yae.data_groups.forEach(function(g) {
    var obj_group = new THREE.Object3D();
    obj_group.name = g;
    yae.scene.add(obj_group);
  })

  yae.renderer.domElement.addEventListener('mousedown', yae.onDocumentMouseDown, false);
}
