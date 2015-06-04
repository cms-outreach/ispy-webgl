ispy.hasWebGL = function() {
  var canvas = document.createElement('canvas');

  /*
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
  */

  if ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) {
    if ( ! window.WebGLRenderingContext ) {
      return false;
    } else {
      return true;
    }

  } else {
    return false;
  }
};

ispy.lookAtOrigin = function() {
  ispy.camera.lookAt(new THREE.Vector3(0,0,0));
};

ispy.initCamera = function() {
  var home_x = -18.1;
  var home_y = 8.6;
  var home_z = 14.0;

  ispy.camera.position.x = home_x*0.6;
  ispy.camera.position.y = home_y*0.6;
  ispy.camera.position.z = home_z*0.6;

  ispy.camera.setZoom(1);
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

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
  ispy.initCamera();

  var inset_scene = new THREE.Scene();
  ispy.inset_scene = inset_scene;

  // fov, aspect, near, far
  var inset_width = height/5;
  var inset_height = height/5;
  var inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
  ispy.inset_camera = inset_camera;
  ispy.inset_camera.up = ispy.camera.up;

  var renderer;
  var inset_renderer;

  if ( ispy.hasWebGL() ) {
    console.log('ispy: using webgl');

    renderer = new THREE.WebGLRenderer({antialias:true});
    inset_renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});

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

  // Make axes and labels XYZ -> RGB
  // VertexColors doesn't work with CanvasRenderer
  // So use ArrowHelpers instead:

  //var axes = new THREE.AxisHelper(4);
  //axes.material.linewidth = 5;
  //ispy.inset_scene.add(axes);

  var origin = new THREE.Vector3(0,0,0);
  var rx = new THREE.ArrowHelper(new THREE.Vector3(4,0,0), origin, 4, 0xff0000, 0.01, 0.01);
  var gy = new THREE.ArrowHelper(new THREE.Vector3(0,4,0), origin, 4, 0x00ff00, 0.01, 0.01);
  var bz = new THREE.ArrowHelper(new THREE.Vector3(0,0,4), origin, 4, 0x0000ff, 0.01, 0.01);

  rx.line.material.linewidth = 5;
  gy.line.material.linewidth = 5;
  bz.line.material.linewidth = 5;

  ispy.inset_scene.add(rx);
  ispy.inset_scene.add(gy);
  ispy.inset_scene.add(bz);

  ispy.show_axes = true;

  //console.log(THREE.FontUtils);

  var x_geo = new THREE.TextGeometry('X', {size:0.75, height:0.1});
  var x_color = new THREE.Color(0xff0000);
  var x_material = new THREE.MeshBasicMaterial({ color: x_color});
  var x_text = new THREE.Mesh(x_geo, x_material);
  x_text.position.x = 4.5;

  var y_geo = new THREE.TextGeometry('Y', {size:0.75, height:0.1});
  var y_color = new THREE.Color(0x00ff00);
  var y_material = new THREE.MeshBasicMaterial({ color: y_color});
  var y_text = new THREE.Mesh(y_geo, y_material);
  y_text.position.y = 4.5;

  var z_geo = new THREE.TextGeometry('Z', {size:0.75, height:0.1});
  var z_color = new THREE.Color(0x0000ff);
  var z_material = new THREE.MeshBasicMaterial({ color: z_color});
  var z_text = new THREE.Mesh(z_geo, z_material);
  z_text.position.z = 4.5;

  ispy.inset_scene.add(x_text);
  ispy.inset_scene.add(y_text);
  ispy.inset_scene.add(z_text);

  // The second argument is necessary to make sure that mouse events are
  // handled only when in the canvas
  var controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
  ispy.controls = controls;

  // Add a parent object for each group
  ispy.data_groups.forEach(function(g) {
    var obj_group = new THREE.Object3D();
    obj_group.name = g;
    ispy.scene.add(obj_group);
  });

  $('#version').html("v"+ispy.version);

  window.addEventListener('resize', ispy.onWindowResize, false);

  /*
   https://github.com/mrdoob/three.js/pull/421#issuecomment-1792008
    via
   http://stackoverflow.com/questions/15558418/how-do-you-save-an-image-from-a-three-js-canvas
  */
  ispy.get_image_data = false;
  ispy.image_data = null;

  ispy.raycaster = new THREE.Raycaster();
  ispy.raycaster.linePrecision = 0.1; // Previously 0.01, but choosing the object was difficult

  ispy.mouse = new THREE.Vector2();
  ispy.intersected = null;

  ispy.renderer.domElement.addEventListener('mousemove', ispy.onMouseMove, false);
  ispy.renderer.domElement.addEventListener('mousedown', ispy.onMouseDown, false);

  // Are we running an animation?
  ispy.animating = false;
};


ispy.initLight = function() {
  var intensity = 1.0;
  var length = 15.0;

  ispy.light1 = new THREE.DirectionalLight(0xffffff, intensity);
  ispy.light1.position.set(-length, length, length);
  ispy.scene.getObjectByName("Detector").add(ispy.light1);

  ispy.light2 = new THREE.DirectionalLight(0xffffff, intensity);
  ispy.light2.position.set(length, -length, -length);
  ispy.scene.getObjectByName("Detector").add(ispy.light2);
};


ispy.getScript = function(scr) {
  return $.ajax({url: scr, dataType: "script", cache: true});
};

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

    $('#loading').modal('show');

    $.when(ispy.getScript("./geometry/eb.min.js"),
           ispy.getScript("./geometry/ee.min.js"),
           ispy.getScript("./geometry/hb.js"),
           ispy.getScript("./geometry/ho.js"),
           ispy.getScript("./geometry/hehf.js"),
           ispy.getScript("./geometry/pixel.js"),
           ispy.getScript("./geometry/tib.js"),
           ispy.getScript("./geometry/tob.js"),
           ispy.getScript("./geometry/tec.js"),
           ispy.getScript("./geometry/tid.js")
    ).done(function() {
        $.when(
          ispy.addDetector()
        ).done(function() {
          $('#loading').modal('hide');
        });
    });
  }
};

ispy.render = function() {
  if ( ispy.renderer !== null ) {
    ispy.renderer.render(ispy.scene, ispy.camera);

    if ( ispy.get_image_data ){
      ispy.image_data = ispy.renderer.domElement.toDataURL();
      ispy.get_image_data = false;
    }
  }

  if ( ispy.inset_renderer !== null ) {
    ispy.inset_renderer.render(ispy.inset_scene, ispy.inset_camera);
  }
};

ispy.run = function() {
  requestAnimationFrame(ispy.run);
  ispy.controls.update();

  var width = $('#display')[0].offsetWidth;
  var height = $('#display')[0].offsetHeight;

  ispy.camera.aspect = width / height;
  ispy.camera.updateProjectionMatrix();
  ispy.renderer.setSize(width, height);


  ispy.inset_camera.up = ispy.camera.up;
  // ispy.inset_camera.position.subVectors(ispy.camera.position, ispy.controls.target);
  ispy.inset_camera.position.setLength(10);
  ispy.inset_camera.lookAt(ispy.inset_scene.position);

  ispy.render();
  ispy.stats.update();

  if ( ispy.animating ) {
    TWEEN.update();
  }
};
