var yae = yae || {};

yae.version = function() {
  console.log("yae v0.0.1");
}

yae.hasWebGL = function() {
  var canvas = document.createElement('canvas');

  if ( ! canvas.getContext('webgl') ) {
    console.log('no webgl');
  }

  if ( ! canvas.getContext('experimental-webgl') ) {
    console.log('no experimental-webgl');
  }

  if ( ! window.WebGLRenderingContext ) {
    console.log('no WebGLRenderingContext');
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

// This will go to a json file but for now, here.
yae.data_groups = ["Detector", "Tracking", "ECAL", "HCAL", "Muon", "Physics Objects"];

yae.init = function() {
  var screen_canvas = document.getElementById('display');

  var scene = new THREE.Scene();
  yae.scene = scene;

  var width = 850.0;
  var height = 500.0;

  // width, height, fov, near, far, orthoNear, orthoFar
  var camera = new THREE.CombinedCamera(width, height, 70, 1, 100, 1, 48);
  yae.camera = camera;

  var renderer;
  if ( yae.hasWebGL() ) {
    console.log('yae: using webgl');
    renderer = new THREE.WebGLRenderer({antialias:true});
  } else {
    console.log('yae: using canvas');
    renderer = new THREE.CanvasRenderer();
  }

  renderer.setSize(width, height);
  yae.renderer = renderer;
  screen_canvas.appendChild(yae.renderer.domElement);

  // The second argument is necessary to make sure that mouse events are
  // handled only when in the canvas
  var controls = new THREE.TrackballControls(yae.camera, yae.renderer.domElement);
  yae.controls = controls;

  yae.renderer.domElement.addEventListener('mousedown', yae.onDocumentMouseDown, false);

  var group_table = $('#treeview table');
  yae.data_groups.forEach(function(g) {
    group_table.append("<tr><td class='group'>"+ g + "</td></tr>")
  });
}
