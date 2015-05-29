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

  ispy.inset_camera.up = ispy.camera.up;
  ispy.inset_camera.position.subVectors(ispy.camera.position, ispy.controls.target);
  ispy.inset_camera.position.setLength(10);
  ispy.inset_camera.lookAt(ispy.inset_scene.position);

  ispy.render();
  ispy.stats.update();

  if ( ispy.animating ) {
    TWEEN.update();
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
  $('#perspective').toggleClass('active');
  $('#orthographic').toggleClass('active');
  ispy.camera.toOrthographic();
};

ispy.setPerspective = function() {
  $('#perspective').toggleClass('active');
  $('#orthographic').toggleClass('active');
  ispy.camera.toPerspective();
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

ispy.showAxes = function() {
  ispy.show_axes = !ispy.show_axes;
  if (!ispy.show_axes) {
    $('#axes').hide();
  } else {
    $('#axes').show();
  }
};

ispy.invertColors = function() {
  ispy.inverted_colors = !ispy.inverted_colors;

  if ( !ispy.inverted_colors ) {
    ispy.renderer.setClearColor(0x000000,0);
  } else {
    ispy.renderer.setClearColor(0xffffff,0);
  }

  // Yeeesh I really need to clean up the class, ids, and css

  $('body').toggleClass('white').toggleClass('black');

  $('#event-info').toggleClass('white').toggleClass('black');

  $('#titlebar').toggleClass('white').toggleClass('black');
  $('#toolbar').toggleClass('white').toggleClass('black');

  $('#treeview').toggleClass('white').toggleClass('black');
  $('#treeview td.group').toggleClass('white').toggleClass('black');
  $('#treeview td.collection').toggleClass('white').toggleClass('black');

  $('#display').toggleClass('white').toggleClass('black');
  $('#tableview').toggleClass('white').toggleClass('black');

  $('#browser-table').toggleClass('white').toggleClass('black');
  $('#browser-table th').toggleClass('white').toggleClass('black');
  $('#browser-files').toggleClass('white').toggleClass('black');

  $('.modal-content').toggleClass('white').toggleClass('black');
  $('.modal-title').toggleClass('white').toggleClass('black');

  $('#table-data-eventObject').toggleClass('white').toggleClass('black');
};

ispy.showStats = function() {
  ispy.show_stats = !ispy.show_stats;

  if ( ispy.show_stats ) {
    $('#stats').show();
  } else {
    $('#stats').hide();
  }
};

ispy.updateRendererInfo = function() {
  var info = ispy.renderer.info;

  var html = "<strong>"+ ispy.renderer_name + " info: </strong>";
  html += "<dl>";

  for ( var i in info ) {
    html += "<dt><strong>"+ i +"</strong></dt>";
    for ( var j in info[i] ) {
      html += "<dd>" + j + ": " + info[i][j] + "</dd>";
    }
  }

  $("#renderer-info").html(html);
};

ispy.onWindowResize = function() {
  var w = $('#display').innerWidth();
  var h = $('#display').innerHeight();

  ispy.camera.aspect	= w/h;
  ispy.camera.updateProjectionMatrix();
  ispy.renderer.setSize(w,h);
  ispy.render();
};

ispy.onMouseMove = function(e) {
  e.preventDefault();

  var container = $("canvas");

  var w = $('#display').innerWidth();
  var h = $('#display').innerHeight();

  var offsetX = $('#display').offset().left;
  var offsetY = $('#display').offset().top;

  ispy.mouse.x = ((e.clientX-offsetX) / w)*2 - 1;
  ispy.mouse.y = -((e.clientY-offsetY) / h)*2 +1;

  var vector = new THREE.Vector3(ispy.mouse.x,ispy.mouse.y,0.5).unproject(ispy.camera);
  ispy.raycaster.set(ispy.camera.position, vector.subVectors(vector, ispy.camera.position).normalize());
  var intersects = ispy.raycaster.intersectObject(ispy.scene.getObjectByName("Physics"), true);

  // Make sure invisible objects in front won't interfere:
  var i = 0; while(i < intersects.length && !intersects[i].object.visible) ++i;
  if ( intersects[i] ) {

    if ( ispy.intersected != intersects[i].object) {
      if ( ispy.intersected ) {
        ispy.intersected.material.color.setHex(ispy.intersected.current_color);
        // Check METs
        if(ispy.intersected.name === "" && ispy.intersected.parent.name === "METs_V1"){
          ispy.highlightTableRow(ispy.intersected.parent.name, ispy.intersected.parent.userData, false);
        }else {
          ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);
        }
      }
      container.css('cursor','pointer');
      ispy.intersected = intersects[i].object;
      // Check METs
      if(ispy.intersected.name === "" && ispy.intersected.parent.name === "METs_V1"){
        ispy.highlightTableRow(ispy.intersected.parent.name, ispy.intersected.parent.userData, true);
      }else {
        ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, true);
      }      ispy.intersected.current_color = ispy.intersected.material.color.getHex();
      ispy.intersected.material.color.setHex(0xcccccc);
    }
  } else {
      if ( ispy.intersected ){
        container.css('cursor','auto');
        // Check METs
        if(ispy.intersected.name === "" && ispy.intersected.parent.name === "METs_V1"){
          ispy.highlightTableRow(ispy.intersected.parent.name, ispy.intersected.parent.userData, false);
        }else {
          ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);
        }        ispy.intersected.material.color.setHex(ispy.intersected.current_color);
        ispy.intersected = null;
    }
  }
};

ispy.onMouseDown = function(e) {

  if(ispy.intersected){
    console.log(ispy.scene, ispy.scene.getObjectByName(""));
    console.log("ÄSSÄÄ: " + ispy.intersected.name, ispy.intersected);
    // METs ruin eeeeeverything...
    if(ispy.intersected.name === "" && ispy.intersected.parent.name === "METs_V1"){
      ispy.displayEventObjectData(ispy.intersected.parent.name, ispy.intersected.parent.userData);
    }else{
      ispy.displayEventObjectData(ispy.intersected.name, ispy.intersected.userData);
    }
  }

};

document.addEventListener('keydown', function(e) {
  e.preventDefault();

  // Instead of a button, make output of 3D to JSON a "secret" key binding
  // If shift + e then export
  if ( e.which === 69 && e.shiftKey ) {
    ispy.exportScene();
  }

  // up arrow
  if ( e.which === 38 && e.shiftKey ) {
    ispy.zoom(0.5);
  }

  // down
  if ( e.which === 40 && e.shiftKey ) {
    ispy.zoom(-0.5);
  }

  // shift+a to toggle animation
  if ( e.which === 65 && e.shiftKey ) {
    ispy.toggleAnimation();
  }
  /*
  // right
  if ( e.which === 39 && e.shiftKey ) {
    console.log('right');
  }

  // left
  if ( e.which === 37 && e.shiftKey ) {
    console.log('left');
  }
  */
});


ispy.data_groups = ["Detector", "Imported", "Provenance", "Tracking", "ECAL", "HCAL", "Muon", "Physics"];
ispy.table_caption = '<caption>Click on a name under "Provenance", "Tracking", "ECAL", "HCAL", "Muon", and "Physics" to view contents in table</caption>';

ispy.toggleCollapse = function(g) {
  // If the objects under the group category have not been loaded then
  // do not toggle the chevron. We don't want to have it in the wrong
  // state when the group is eventually populated
  var children = $('tr.'+g);
  if ( children.length === 0 ) {
    return;
  }

  children.toggle();
  $('i.'+g).toggleClass('glyphicon-chevron-right').toggleClass('glyphicon-chevron-down');
};

ispy.addGroups = function() {
  var group_table = $('#treeview table');
  ispy.data_groups.forEach(function(g) {
    var n = g;
    var html = "<tr id='"+ g +"'>";

    html += "<td class='group black'><a class='expand' onclick='ispy.toggleCollapse(\"" + g + "\");' href='#'>";
    //html += "<td class='group black'><a class='expand' href='#'>";
    html += "<i class='"+g+" expand glyphicon glyphicon-chevron-down'></i></a>";
    html += n +"</td>";

    //html += "<td class='group black'><a href='#' data-toggle='modal' data-target='#info-"+ g +"'>";
    //html += "<i class='info glyphicon glyphicon-info-sign'></i></a></td>";
    html += "</tr>";
    group_table.append(html);
  });
};

ispy.POINT = 0;
ispy.LINE = 1;
ispy.BOX = 2;
ispy.SOLIDBOX = 3;
ispy.SCALEDBOX = 4;
ispy.SCALEDSOLIDBOX = 5;
ispy.MODEL = 6;
ispy.TRACK = 7;
ispy.POLYLINE = 8;
ispy.SHAPE = 9;
ispy.TEXT = 10;

// Hmmm, IIRC objects are unordered. However, at least Chrome and Firefox fetch things in
// the reverse order than specified here. Therefore e.g. Tracker appears at the top of
// row of the tree view and CSC at the bottom. Which is what we want.

ispy.detector_description = {
  "RPCMinusEndcap3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (-)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "RPCPlusEndcap3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (+)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "RPCBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (barrel)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "CSC3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers",
    fn: ispy.makeCSC, style: {color: [0.6, 0.7, 0.1], opacity: 0.5, linewidth: 1}},
  "DTs3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Drift Tubes",
    fn: ispy.makeDT, style: {color: [0.8, 0.4, 0], opacity: 0.5, linewidth: 1}},

  "HcalForwardMinus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: ispy.makeModelHcalForwardMinus, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardPlus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: ispy.makeModelHcalForwardPlus, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalOuter3D_MODEL": {type: ispy.MODEL, on: true, group: "Detector", name: "HCAL Outer",
    fn: ispy.makeModelHcalOuter, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalOuter3D_V1": {type: ispy.BOX, on: true, group: "Detector", name: "HCAL Outer",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Endcaps",
    fn: ispy.makeModelHcalEndcap, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalEndcapMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (-)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalEndcapPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (+)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Barrel",
   fn: ispy.makeModelHcalBarrel, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Barrel",
   fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "EcalEndcapMinus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: ispy.makeModelEcalEndcapMinus, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalEndcapPlus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: ispy.makeModelEcalEndcapPlus, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Barrel", // Don't load ECAL by default while developing..
    fn: ispy.makeModelEcalBarrel, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},

  "EcalEndcapMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalEndcapPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "ECAL Barrel", // Don't load ECAL by default while developing..
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},

  "TrackerEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Endcaps",
    fn: ispy.makeModelTrackerEndcap, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "TrackerBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Barrels",
    fn: ispy.makeModelTrackerBarrel, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},

  "SiStripTECMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "SiStripTECPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "SiStripTIDMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "SiStripTIDPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "SiStripTOB3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Outer Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "SiStripTIB3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},

  "PixelEndcapMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "PixelEndcapPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "PixelBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
};

ispy.event_description = {
  "EERecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Endcap Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "ESRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "ECAL", name: "Preshower Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [1, 0.2, 0], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "EBRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Barrel Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},

  "HFRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.6, 1, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HORecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HERecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HBRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},

  "Tracks_V1": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0.1], opacity: 0.7, lineCaps: "square", linewidth: 3}, min_pt: 1.},
  "Tracks_V2": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0.1], opacity: 0.7, lineCaps: "square", linewidth: 3}, min_pt: 1.},
  "Tracks_V3": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0.1], opacity: 0.7, lineCaps: "square", linewidth: 3}, min_pt: 1.},

  "TrackDets_V1": {type: ispy.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "TrackingRecHits_V1": {type:ispy.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
    fn:ispy.makeTrackingRecHits, style: {color: [1, 1, 0], size: 0.05}},
  "SiStripClusters_V1": {type: ispy.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
    fn: ispy.makeTrackingClusters, style:{color: [0.8, 0.2, 0.0], size: 0.05}},
  "SiPixelClusters_V1": {type: ispy.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
    fn: ispy.makeTrackingClusters, style:{color: [1.0, 0.4, 0.0], size: 0.05}},

  "Event_V1":{type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent},
  "Event_V2":{type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent},

  "DTRecHits_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
    fn: ispy.makeDTRecHits, style: {color: [0, 1, 0], opacity: 0.5, linewidth: 2}},

  "DTRecSegment4D_V1": {type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
    fn: ispy.makeDTRecSegments, style: {color: [1, 1, 0, 1], opacity: 1.0, linewidth: 3}},

  "RPCRecHits_V1": {type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
    fn: ispy.makeRPCRecHits, style: {color: [0.8, 1, 0, 1], opacity: 1.0, linewidth: 3}},

  "CSCStripDigis_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
    fn: ispy.makeCSCStripDigis, style: {color: [1.0, 0.2, 1.0], opacity: 0.5, linewidth: 1}},
  "CSCWireDigis_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
    fn: ispy.makeCSCWireDigis, style: {color: [1.0, 0.6, 1.0], opacity: 0.5, linewidth: 1}},

  /* this only exists in my test file
  "MatchingCSCs_V1": {type: ispy.BOX, on: true, group: "Muon", name: "Matching CSCs",
    fn: ispy.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.3, linewidth: 2}},
  */

  "CSCRecHit2Ds_V2": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
    fn: ispy.makeCSCRecHit2Ds_V2, style: {color: [0.6, 1, 0.9, 1], opacity: 1.0, linewidth: 2}},
  "CSCSegments_V1": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], opacity: 1.0, linewidth: 3}},
  "CSCSegments_V2": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], opacity: 1.0, linewidth: 3}},

  "MuonChambers_V1": {type: ispy.BOX, on: true, group: "Muon", name: "Matching muon chambers",
    fn: ispy.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.5, linewidth: 1}},

  "METs_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
    fn: ispy.makeMET, style: {color: [1, 1, 0], opacity: 1.0}},
  "Jets_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Jets",
    fn: ispy.makeJet, style: {color: [1, 1, 0], opacity: 0.3}},
  "Photons_V1": {type: ispy.LINE, on: false, group: "Physics", name: "Photons (Reco)",
     fn: ispy.makePhoton, style: {color: [0.8, 0.8, 0], opacity: 1.0, linewidth: 2}},

  "GlobalMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics", name: "Global Muons (Reco)",
    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}},
  "StandaloneMuons_V1": {type: ispy.POLYLINE, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}},
  "StandaloneMuons_V2": {type: ispy.TRACK, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}},
  "TrackerMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics", name: "Tracker Muons (Reco)",
    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}},

  "GsfElectrons_V1": {type: ispy.TRACK, on: true, group: "Physics", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 3}, min_pt: 1},
  "GsfElectrons_V2": {type: ispy.TRACK, on: true, group: "Physics", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 3}},
};

ispy.disabled = [];

for (var key in ispy.detector_description) {
  if ( ! ispy.detector_description[key].on ) {
    ispy.disabled[key] = true;
  }
}

for (var key in ispy.event_description) {
  if ( ! ispy.event_description[key].on ) {
    ispy.disabled[key] = true;
  }
}

ispy.toggle = function(group, key) {
  ispy.disabled[key] = !ispy.disabled[key];

  // For provenance (for now, just event information)
  // we display as simple HTML so therefore not part of the scene
  if ( group === 'Provenance' ) {
    if ( ispy.disabled[key] ) {
      $('#event-info').hide();
    } else {
      $('#event-info').show();
    }
  }

  ispy.scene.getObjectByName(group).children.forEach(function(c) {
    if ( c.name === key ) {
      c.visible = !ispy.disabled[key];
    }
  });
};

ispy.addSelectionRow = function(group, key, name, objectIds, visible) {
  var dc = 'Detector';
  if ( group !== 'Detector' ) {
    if ( group !== 'Imported' ) {
      dc = 'Event'; // this means it gets cleared from the tree view when an event is loaded
    } else {
      dc = 'Imported';
    }
  }

  var on = !ispy.disabled[key] ? "checked" : "";

  var html = "<tr class='" + dc + " "+ group +"'>";

  var cc = "black";
  if (ispy.inverted_colors) {
    cc = "white";
  }

  if ( group !== 'Detector' && group !== 'Imported' ) {
    html += "<td class='collection "+ cc +"' onclick='ispy.displayCollection(\""+key+"\",\""+ group + "\",\"" + name +"\",[" + objectIds + "])'>" + name + "</td>";
  } else {
    html += "<td class='collection "+ cc +"'>"+ name +"</td>";
  }

  html += "<td class='collection'>";
  html += "<input type='checkbox' " + on + " onchange='ispy.toggle(\""+ group + "\",\"" + key + "\");'>";
  html += "</td>";
  html += "</tr>";

  $('#'+group).after(html);
};

ispy.addDetector = function() {
  for ( var key in ispy.detector_description ) {

      var data = ispy.detector.Collections[key];
      if ( ! data || data.length === 0 ) {
        continue;
      }

      var descr = ispy.detector_description[key];

      // If something is already disabled via the toggle then this
      // should override what comes from the description
      // -- However it is not used in addSelectionRow()? - C
      var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
      ispy.addSelectionRow(descr.group, key, descr.name, [], visible);

      switch(descr.type) {

        case ispy.BOX:

          var bcolor = new THREE.Color();
          bcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

          var transp = false;
          if ( descr.style.opacity < 1.0 ) {
            transp = true;
          }

          var material = new THREE.LineBasicMaterial({color:bcolor, transparent: transp,
                                                      linewidth:descr.style.linewidth,
                                                      opacity:descr.style.opacity});

          var geometry = new THREE.Geometry();

          for ( var i = 0; i < data.length; i++ ) {
            var box = descr.fn(data[i]);
            geometry.merge(box);
          }

          var line = new THREE.Line(geometry, material, THREE.LinePieces);
          line.name = key;
          line.visible = visible;
          ispy.scene.getObjectByName(descr.group).add(line);

        break;

        case ispy.SOLIDBOX:

          var bcolor = new THREE.Color();
          bcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

          var transp = false;
          if ( descr.style.opacity < 1.0 ) {
            transp = true;
          }

          var material = new THREE.MeshBasicMaterial({color:bcolor,
                                                      transparent: transp,
                                                      linewidth: descr.style.linewidth,
                                                      opacity:descr.style.opacity});
          material.side = THREE.DoubleSide;

          var boxes = new THREE.Geometry();

          for ( var i = 0; i < data.length; i++ ) {
              var box = descr.fn(data[i]);
              boxes.merge(box);
          }

          var meshes = new THREE.Mesh(boxes, material);
          meshes.name = key;
          meshes.visible = visible;

          ispy.scene.getObjectByName(descr.group).add(meshes);

        break;

        case ispy.MODEL:
          var mcolor = new THREE.Color();
          mcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

          var transp = false;
          if ( descr.style.opacity < 1.0 ) {
            transp = true;
          }

          var material = new THREE.LineBasicMaterial({color:mcolor,transparent: transp,
                                                      linewidth: descr.style.linewidth,
                                                      opacity:descr.style.opacity});

          for ( var i = 0; i < data.length; i++ ) {
            var models = descr.fn(data[i]);

            for ( var j = 0; j < models.length; j++ ) {
              var shape = ispy.makeShapes(models[j]);
              var line = new THREE.Line(shape, material, THREE.LinePieces);
              line.name = key;
              line.visible = visible;
              ispy.scene.getObjectByName(descr.group).add(line);
            }
          }

        break;
      }
  }
};

ispy.addEvent = function(event) {
  // remove all but the geometry from the
  // scene before rendering
  ispy.scene.children.forEach(function(c) {
    if ( c.name !== 'Detector' ) {
      if ( c.name !== 'Imported' ) {
        ispy.scene.getObjectByName(c.name).children.length = 0;
      }
    }
  });

  ispy.current_event = event;
  // Clear table from last event and show default caption
  $('#collection-table').empty();
  $('#collection-table').append(ispy.table_caption);

  // remove selectors for last event
  $("tr.Event").remove();

  for ( var key in ispy.event_description ) {
    var data = event.Collections[key];
    if ( ! data || data.length === 0 ) {
      continue;
    }

    var descr = ispy.event_description[key];

    var extra = null;
    var assoc = null;

    if (descr.extra) {
        extra = event.Collections[descr.extra];
    }

    if (descr.assoc) {
      assoc = event.Associations[descr.assoc];
    }

    var objectIds = [];
    var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;


    switch(descr.type) {

      case ispy.BOX:

        var bcolor = new THREE.Color();
        bcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }

        var material = new THREE.LineBasicMaterial({color:bcolor, transparent: transp,
                                                    linewidth:descr.style.linewidth,
                                                    opacity:descr.style.opacity});

        var geometry = new THREE.Geometry();

        for ( var i = 0; i < data.length; i++ ) {
          var box = descr.fn(data[i]);
          geometry.merge(box);
        }

        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        line.name = key;
        line.visible = visible;
        ispy.scene.getObjectByName(descr.group).add(line);

      break;

      case ispy.SOLIDBOX:

        var bcolor = new THREE.Color();
        bcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }

        var material = new THREE.MeshBasicMaterial({color:bcolor,
                                                    transparent: transp,
                                                    linewidth: descr.style.linewidth,
                                                    opacity:descr.style.opacity});
        material.side = THREE.DoubleSide;

        var boxes = new THREE.Geometry();

        for ( var i = 0; i < data.length; i++ ) {
            var box = descr.fn(data[i]);
            boxes.merge(box);
        }

        var meshes = new THREE.Mesh(boxes, material);
        meshes.name = key;
        meshes.visible = visible;

        ispy.scene.getObjectByName(descr.group).add(meshes);

      break;

      case ispy.SCALEDSOLIDBOX:

        var mcolor = new THREE.Color();
        mcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }
        var material = new THREE.MeshBasicMaterial({color:mcolor, transparent: transp,
                                                    opacity:descr.style.opacity});
        material.side = THREE.DoubleSide;

        var boxes = new THREE.Geometry();

        for ( var i = 0; i < data.length; i++ ) {
          descr.fn(data[i], boxes, descr.scale);
        }

        var meshes = new THREE.Mesh(boxes, material);
        meshes.name = key;
        meshes.visible = visible;

        ispy.scene.getObjectByName(descr.group).add(meshes);

      break;

      case ispy.TRACK:
      case ispy.POLYLINE:

        var tracks = descr.fn(data, extra, assoc, descr.style);
        tracks.forEach(function(t, i) {
          t.name = key;
          t.visible = visible;
          t.userData.originalIndex = i;
          t.userData.objectId = t.id;
          objectIds.push(t.id);
          ispy.scene.getObjectByName(descr.group).add(t);
        });
      break;

      case ispy.POINT:
        // We make a buffer geometry, use a point cloud, and
        // add to the scene.
        var pcolor = new THREE.Color();
        pcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var material = new THREE.PointCloudMaterial({color:pcolor, size:descr.style.size});
        var geometry = descr.fn(data);
        var points = new THREE.PointCloud(geometry, material);

        points.name = key;
        points.visible = visible;
        ispy.scene.getObjectByName(descr.group).add(points);
      break;

      case ispy.SHAPE:

        for ( var i = 0; i < data.length; i++ ) {
          var shape = descr.fn(data[i], descr.style);
          if ( shape !== null ) {
            shape.name = key;
            shape.visible = visible;
            shape.userData.originalIndex = i;
            // METs ruin everything. :(
            var shapeId = key === "METs_V1" ? shape.id + 1 : shape.id;
            shape.userData.objectId = shapeId;
            objectIds.push(shapeId);
            ispy.scene.getObjectByName(descr.group).add(shape);
          }
        }
      break;

      case ispy.LINE:

        var lcolor = new THREE.Color();
        lcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }

        for ( var i = 0; i < data.length; i++ ) {
          var lines = descr.fn(data[i]);

          lines.forEach(function(l, i) {
            var line = new THREE.Line(l, new THREE.LineBasicMaterial({
              color:lcolor, transparent:transp,
              linewidth:descr.style.linewidth,
              opacity:descr.style.opacity
            }));
            line.name = key;
            line.visible = visible;
            line.userData.originalIndex = i;
            line.userData.objectId = line.id;
            objectIds.push(line.id);
            ispy.scene.getObjectByName(descr.group).add(line);
          });
        }
      break;

      case ispy.TEXT:
        descr.fn(data);
      break;
    }

    ispy.addSelectionRow(descr.group, key, descr.name, objectIds, visible);

  }
};


ispy.displayCollection = function(key, group, name, objectIds) {
  ispy.currentCollection = key;
  var type = ispy.current_event.Types[key];
  var collection = ispy.current_event.Collections[key];

  $('#collection-table').empty();
  $('#collection-table').append('<caption>' + group + ': ' + name + '</caption>');
  $('#collection-table').append('<thead> <tr>');

   for ( var t in type ) {
     $("#collection-table thead > tr").append($('<th class="group">').text(type[t][0]));
   }

   for ( var c in collection ) {
     var row_content = "<tr onmouseenter='ispy.highlightObject(\"" + objectIds[c] + "\")' onmouseout='ispy.unHighlightObject()'>";

     for ( v in collection[c] ) {
       row_content += "<td>"+collection[c][v]+"</td>";
     }

     $('#collection-table').append(row_content);
   }

};

ispy.displayEventObjectData = function(key, objectUserData){
  var type = ispy.current_event.Types[key];
  var eventObjectData = ispy.current_event.Collections[key][objectUserData.originalIndex];

  $('#title-data-EventObjects').empty().append(ispy.event_description[key].name);

  var dataTableBody = $('#table-data-eventObject').find("tbody");
  dataTableBody.empty();

  for(var t in type){
    var row_content = "<tr> <td>" + type[t][0] + "</td> <td>" + eventObjectData[t] + "</td> </tr>";
    dataTableBody.append(row_content);
  }

  $('#data-EventObjects').modal('show');
};

ispy.highlightTableRow = function(key, objectUserData, doEffect){
  if((ispy.currentCollection == key && doEffect) || !doEffect){
    var row = $('#collection-table').find('tbody').find('tr').eq(objectUserData.originalIndex);
    if(row){
      if(doEffect){
        var color = ispy.inverted_colors ? "#dfdfdf" : "#777";
        row.css("background-color", color);
        row.scrollintoview();
      }else{
        row.removeAttr("style");
      }
    }
  }
};

ispy.highlightObject = function(objectId){

  var selected = ispy.scene.getObjectById(Number(objectId), true);

  if(selected){
    if(ispy.highlighted != selected && selected.visible){
      if(ispy.highlighted){
        ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
      }
      ispy.highlighted = selected;
      ispy.highlighted.current_color = ispy.highlighted.material.color.getHex();
      ispy.highlighted.material.color.setHex(0xcccccc);
    }
  }
};

ispy.unHighlightObject = function(){
  if(ispy.highlighted){
    ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
    ispy.highlighted = null;
  }
};

/*
$(function(){


});
*/