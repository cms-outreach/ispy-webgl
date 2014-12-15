var ispy = ispy || {};
ispy.detector = {"Collections":{}};
ispy.version = "0.0.1";

ispy.hasWebGL = function() {
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

ispy.init = function() {
  var display = document.getElementById('display');
  var inset = document.getElementById('axes');

  var scene = new THREE.Scene();
  ispy.scene = scene;

  var width = $('#display').innerWidth();
  var height = $('#display').innerHeight();

  // width, height, fov, near, far, orthoNear, orthoFar
  var camera = new THREE.CombinedCamera(width, height, 70, 1, 100, 1, 100);
  ispy.camera = camera;
  ispy.setCameraHome();

  var inset_scene = new THREE.Scene();
  ispy.inset_scene = inset_scene;

  // fov, aspect, near, far
  var inset_width = width/5;
  var inset_height = height/5;
  var inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
  ispy.inset_camera = inset_camera;
  ispy.inset_camera.up = ispy.camera.up;

  var renderer;
  var inset_renderer;

  if ( ispy.hasWebGL() ) {
    console.log('ispy: using webgl');

    renderer = new THREE.WebGLRenderer({antialias:true});
    inset_renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

    ispy.renderer_name = "WebGLRenderer";

  } else {
    console.log('ispy: using canvas');

    renderer = new THREE.CanvasRenderer();
    inset_renderer = new THREE.CanvasRenderer();

    ispy.renderer_name = "CanvasRenderer";
  }

  renderer.setSize(width, height);
  inset_renderer.setSize(inset_width, inset_height);

  ispy.renderer = renderer;
  ispy.inset_renderer = inset_renderer;
  ispy.inset_renderer.alpha = 0.0;

  display.appendChild(ispy.renderer.domElement);
  inset.appendChild(ispy.inset_renderer.domElement);

  ispy.stats = new Stats();
  display.appendChild(ispy.stats.domElement);
  $('#stats').hide();
  ispy.show_stats = false;

  ispy.inverted_colors = false;

  var axes = new THREE.AxisHelper(5);
  axes.material.linewidth = 5;
  ispy.inset_scene.add(axes);
  ispy.show_axes = true;

  // The second argument is necessary to make sure that mouse events are
  // handled only when in the canvas
  var controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
  ispy.controls = controls;

  // Add a parent object for each group
  ispy.data_groups.forEach(function(g) {
    var obj_group = new THREE.Object3D();
    obj_group.name = g;
    ispy.scene.add(obj_group);
  })

  ispy.renderer.domElement.addEventListener('mousedown', ispy.onDocumentMouseDown, false);

  $('#version').html("v"+ispy.version);

  window.addEventListener('resize', ispy.onWindowResize, false);

  /*
   https://github.com/mrdoob/three.js/pull/421#issuecomment-1792008
    via
   http://stackoverflow.com/questions/15558418/how-do-you-save-an-image-from-a-three-js-canvas
  */
  ispy.get_image_data = false;
  ispy.image_data = null;
}

ispy.getScript = function(scr) {
  return $.ajax({url: scr, dataType: "script", cache: true});
}

ispy.initDetector = function() {
  // Loading and rendering the actual geometry when WebGL is available
  // works well. With CanvasRenderer, not so well, so load and render
  // the geometry models.

  if ( ispy.renderer_name === "CanvasRenderer" ) {
    ispy.getScript("./geometry/models.js")
      .done(function() {
        ispy.addDetector();
      });
  } else if ( ispy.renderer_name === "WebGLRenderer" ) {

    $('#progress').modal('show');

    $.when(ispy.getScript("./geometry/eb.js"),
           ispy.getScript("./geometry/ee.js"),
           ispy.getScript("./geometry/hb.js"),
           ispy.getScript("./geometry/ho.js"),
           ispy.getScript("./geometry/hehf.js"),
           ispy.getScript("./geometry/pixel.js"),
           ispy.getScript("./geometry/tib.js"),
           ispy.getScript("./geometry/tob.js"),
           ispy.getScript("./geometry/tec.js"),
           ispy.getScript("./geometry/tid.js"))
           .done(function() {
            $('#progress').modal('hide');
            ispy.addDetector();
          });
  }
}
