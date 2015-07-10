
ispy.resetControls = function() {
  ispy.controls.reset();
};

ispy.setXY = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = 0;
  ispy.camera.position.y = 0;
  ispy.camera.position.z = length;
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

ispy.setZX = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = 0;
  ispy.camera.position.y = length;
  ispy.camera.position.z = 0;
  ispy.camera.up = new THREE.Vector3(1,0,0);
  ispy.lookAtOrigin();
};

ispy.setYZ = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = -length;
  ispy.camera.position.y = 0;
  ispy.camera.position.z = 0;
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

ispy.setOrthographic = function() {
  $('#perspective').removeClass('active');
  $('#orthographic').addClass('active');
  $('#stereo').removeClass('active');
  ispy.camera.toOrthographic();
};

ispy.setPerspective = function() {
  $('#perspective').addClass('active');
  $('#orthographic').removeClass('active');
  $('#stereo').removeClass('active');
  ispy.camera.toPerspective();
};

ispy.toStereo = function () {
  if (!ispy.stereo) {
    // Save the normal renderer for later!
    // We want to make a "deep" copy, otherwise some properties
    // don't get set when we return from stero
    ispy.non_stereo_renderer = Object.assign({}, ispy.renderer);
    ispy.non_stereo_controls = Object.assign({}, ispy.controls);

    ispy.renderer = new THREE.StereoEffect(ispy.renderer);
    ispy.stereo = true;

    $('#axes').hide();

    $('#display')[0].addEventListener('click', ispy.toStereo, false);

    // Fake stereo event info by doubling the html
    $('#event-text').toggleClass('stereo-mode');
    info = $('#event-info tr').html();
    ispy.non_stereo_event_info_html = info;
    $('#event-info tr').html(info + info);

    ispy.controls = new THREE.DeviceOrientationControls(ispy.camera, true);
    ispy.controls.autoForward = true;
    ispy.controls.connect();
    ispy.controls.update();

    ispy.camera.position.x = 2;
    ispy.camera.position.y = 2;
    ispy.camera.position.z = -10;
    ispy.lookAtOrigin();

    ispy.onWindowResize();
  } else {
    ispy.renderer = ispy.non_stereo_renderer;
    ispy.controls = ispy.non_stereo_controls;
    ispy.stereo = false;

    info = $('#event-info tr').html(ispy.non_stereo_event_info_html);
    $('#event-text').toggleClass('stereo-mode');

    $('#axes').show();

    $('#display')[0].removeEventListener('click', ispy.toStereo, false);

    ispy.setPerspective();
    ispy.initCamera();
    ispy.onWindowResize();
  }
}

function setOrientationControls(e) {
  if ( !e.alpha ) {
    return;
  }

  window.removeEventListener('deviceorientation', setOrientationControls, true);
}

window.addEventListener('deviceorientation', setOrientationControls, true);

ispy.setStereo = function() {
  $('#perspective').removeClass('active');
  $('#orthographic').removeClass('active');
  $('#stereo').addClass('active');
  ispy.toStereo();
};

ispy.zoom = function(step) {
  var zoom = ispy.camera.zoom;
  ispy.camera.setZoom(zoom+step);
};

ispy.printImage = function() {
  ispy.get_image_data = true;
  ispy.render();
  window.open(ispy.image_data, "toDataURL() image", "width=800, height=400");
};

ispy.exportString = function(output, filename) {
  // This comes from three.js editor
  var blob = new Blob([output], {type: 'text/plain'});
  var objectURL = URL.createObjectURL(blob);

  // Use this to output to file:
  var link = document.createElement('a');
  link.href = objectURL;
  link.download = filename || 'data.txt';
  link.target = '_blank';
  link.click();

  // Use this to output to tab:
  //window.open(objectURL, '_blank');
  //window.focus();
};

ispy.exportScene = function() {
  // The scene is actually made up of several objects,
  // one each for major category: e.g. Detector, ECAL, Physics, etc.
  // This exports a json file for each whether visible or not.
  ispy.scene.children.forEach(function(c) {
    var output = c.toJSON();
    output = JSON.stringify( output, null, '\t' );
    output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
    ispy.exportString(output, c.name+'.json');
  });
};

ispy.exportModel = function() {
  var exporter = new THREE.OBJExporter();
  ispy.scene.children.forEach(function(c) {
     ispy.exportString(exporter.parse(c), c.name+'.obj');
  })
}
