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

  // Add a parent object for each group
  yae.data_groups.forEach(function(g) {
    var obj_group = new THREE.Object3D();
    obj_group.name = g;
    yae.scene.add(obj_group);
  })

  yae.renderer.domElement.addEventListener('mousedown', yae.onDocumentMouseDown, false);

  yae.addGroups();
  yae.addDetector();
}

yae.render = function() {
  if ( yae.renderer !== null ) {
    yae.renderer.render(yae.scene, yae.camera);
  }
}

yae.animate = function() {
  requestAnimationFrame(yae.animate);
  yae.controls.update();
  yae.render();
}

yae.lookAtOrigin = function() {
  yae.camera.lookAt(new THREE.Vector3(0,0,0));
}

yae.setCameraHome = function() {
  var home_x = -18.1;
  var home_y = 8.6;
  var home_z = 14.0;

  yae.camera.position.x = home_x;
  yae.camera.position.y = home_y;
  yae.camera.position.z = home_z;

  yae.camera.setZoom(1);
  yae.camera.up = new THREE.Vector3(0,1,0);
  yae.lookAtOrigin();
}

yae.setXY = function() {
  yae.camera.position = new THREE.Vector3(0,0,yae.camera.position.length());
  yae.camera.up = new THREE.Vector3(0,1,0);
  yae.lookAtOrigin();
}

yae.setZX = function() {
  yae.camera.position = new THREE.Vector3(0,yae.camera.position.length(),0);
  yae.camera.up = new THREE.Vector3(1,0,0);
  yae.lookAtOrigin();
}

yae.setYZ = function() {
  yae.camera.position = new THREE.Vector3(-yae.camera.position.length(),0,0);
  yae.camera.up = new THREE.Vector3(0,1,0);
  yae.lookAtOrigin();
}

yae.setOrthographic = function() {
  yae.camera.toOrthographic();
}

yae.setPerspective = function() {
  yae.camera.toPerspective();
}

yae.zoom = function(step) {
  var zoom = yae.camera.zoom;
  yae.camera.setZoom(zoom+step);
}

yae.showSettings = function() {
  console.log('show settings');
}

yae.openAboutWindow = function() {
  console.log('open about window');
}

yae.data_groups = ["Detector", "Tracking", "ECAL", "HCAL", "Muon", "Physics Objects"];

yae.addGroups = function() {
  var group_table = $('#treeview table');
  yae.data_groups.forEach(function(g) {
    group_table.append("<tr id='"+ g +"'><td class='group'>"+ g +"</td></tr>")
  });
}

yae.POINT = 0;
yae.LINE = 1;
yae.BOX = 2;
yae.PATH = 3;
yae.MODEL = 4;
yae.TRACK = 5;
yae.SHAPE = 6;

yae.detector_description = {
  "TrackerBarrel3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "Tracker Barrels",
    fn: yae.makeModelTrackerBarrel, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 1.0}},
  "TrackerEndcap3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "Tracker Endcaps",
    fn: yae.makeModelTrackerEndcap, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "ECAL Barrel",
    fn: yae.makeModelEcalBarrel, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_plus": {type: yae.MODEL, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: yae.makeModelEcalEndcapPlus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_minus": {type: yae.MODEL, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: yae.makeModelEcalEndcapMinus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "HcalBarrel3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Barrel",
    fn: yae.makeModelHcalBarrel, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalEndcap3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Endcaps",
    fn: yae.makeModelHcalEndcap, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalOuter3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Outer",
    fn: yae.makeModelHcalOuter, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalForward3D_plus": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: yae.makeModelHcalForwardPlus, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalForward3D_minus": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: yae.makeModelHcalForwardMinus, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "DTs3D_V1": {type: yae.BOX, on: false, group: "Detector", name: "Drift Tubes (muon)",
    fn: yae.makeDT, style: {color: [1, 0.6, 0], opacity: 0.3, linewidth: 0.9}},
  "CSC3D_V1": {type: yae.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers (muon)",
    fn: yae.makeCSC, style: {color: [0.6, 0.7, 0], opacity: 0.3, linewidth: 0.8}}
};

yae.event_description = {
/*
  "EBRecHits_V2": {type: yae.BOX, on: true, group: "ECAL", name: "Barrel Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05},
  "EERecHits_V2": {type: yae.BOX, on: true, group: "ECAL", name: "Endcap Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05},
  "ESRecHits_V2": {type: yae.BOX, on: false, group: "ECAL", name: "Preshower Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [1, 0.2, 0], opacity: 0.5, linewidth: 1}, scale: 0.05},
  "HBRecHits_V2": {type: yae.BOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1},
  "HERecHits_V2": {type: yae.BOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1},
  "HFRecHits_V2": {type: yae.BOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.6, 1, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1},
  "HORecHits_V2": {type: yae.BOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1},
  "Tracks_V1": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    dataref: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}},
  "Tracks_V2": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    dataref: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}},
  "Tracks_V3": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    dataref: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}},
*/
  /*
    need to fix these
  "DTRecHits_V1": {type: yae.LINE, on: true, group: "Muon", name: "DT Rec. Hits",
    fn: yae.makeDTRecHits, style: {color: [0, 1, 0], opacity: 1.0, linewidth: 2}},
  */

/*
  "DTRecSegment4D_V1": {type: yae.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
    fn: yae.makeDTRecSegments, style: {color: [1, 1, 0, 1], linewidth: 3}},
  "CSCSegments_V1": {type: yae.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: yae.makeCSCSegments, style: {color: [1, 0.6, 1, 1], linewidth: 3}},
  "RPCRecHits_V1": {type: yae.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
    fn: yae.makeRPCRecHits, style: {color: [0.8, 1, 0, 1], linewidth: 3}},
  "CSCRecHit2Ds_V2": {type: yae.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
    fn: yae.makeCSCRecHit2Ds_V2, style: {color: [0.6, 1, 0.9, 1], linewidth: 2}},
*/
  "MuonChambers_V1": {type: yae.BOX, on: true, group: "Muon", name: "Matching muon chambers",
    fn: yae.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.3, linewidth: 0.8}}
/*
  "GsfElectrons_V1": {type: yae.TRACK, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    dataref: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}},
  "GsfElectrons_V2": {type: yae.PATH, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    dataref: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}},
  "Photons_V1": {type: yae.LINE, on: false, group: "Physics Objects", name: "Photons (Reco)",
     fn: yae.makePhotons, style: {color: [0.8, 0.8, 0], opacity: 1.0, linewidth: 2}},
  "TrackerMuons_V1": {type: yae.TRACK, on: true, group: "Physics Objects", name: "Tracker Muons (Reco)",
    dataref: "Points_V1", assoc: "MuonTrackerPoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V1": {type: yae.TRACK, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    dataref: "Points_V1", assoc: "MuonStandalonePoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V2": {type: yae.TRACK, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    dataref: "Extras_V1", assoc: "MuonTrackExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "GlobalMuons_V1": {type: yae.TRACK, on: true, group: "Physics Objects", name: "Global Muons (Reco)",
    dataref: "Points_V1", assoc: "MuonGlobalPoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "METs_V1": {type: yae.SHAPE, on: false, group: "Physics Objects", name: "Missing Et (Reco)",
    fn: yae.makeMET, style: {color: [1, 1, 0], opacity: 1.0}},
  "Jets_V1": {type: yae.SHAPE, on: false, group: "Physics Objects", name: "Jets",
    fn: yae.makeJet, style: {color: [1, 1, 0], opacity: 1.0}}
*/
};

yae.disabled = new Array();

for (var key in yae.detector_description) {
  if ( ! yae.detector_description[key].on ) {
    yae.disabled[key] = true;
  }
}

yae.toggle = function(group, key) {
  yae.disabled[key] = !yae.disabled[key];

  yae.scene.getObjectByName(group).children.forEach(function(c) {
    if ( c.name === key ) {
      c.visible = !yae.disabled[key];
    }
  });
}

yae.addSelectionRow = function(group, key, name) {
  var dc = "Detector";
  if ( group != "Detector" ) {
    dc = "Event";
  }

  var html = "<tr class='" + dc + "'>";
  html += "<td class='collection'>"+ name +"</td>";
  html += "<td class='collection'>";
  html += "<input type='checkbox' onchange='yae.toggle(\""+ group + "\",\"" + key + "\");'>";
  html += "</td>";
  html += "</tr>";
  $('#'+group).after(html);
}

yae.addDetector = function() {
  for ( var key in yae.detector_description ) {

      var data = yae.detector["Collections"][key];
      if ( ! data || data.length === 0 ) {
        continue;
      }

      var descr = yae.detector_description[key];
      yae.addSelectionRow(descr.group, key, descr.name);

      // If something is already disabled via the toggle then this
      // should override what comes from the description
      var visible = ! yae.disabled[key] ? descr.on = true : descr.on = false;

      switch(descr.type) {

        case yae.BOX:
          for ( var i = 0; i < data.length; i++ ) {

            var box = descr.fn(data[i], descr.style);
            if ( box != null ) {

              box.forEach(function(l) {
                l.name = key;
                l.visible = visible;
                yae.scene.getObjectByName(descr.group).add(l);
              });
            }
          }
        break;

        case yae.MODEL:
          for ( var i = 0; i < data.length; i++ ) {
            var models = descr.fn(data[i], descr.style);

            for ( var j = 0; j < models.length; j++ ) {
              var shapes = yae.makeShapes(models[j], descr.style);

              shapes.forEach(function(s) {
                s.name = key;
                s.visible = visible;
                yae.scene.getObjectByName(descr.group).add(s);
              });
            }
          }
        break;
      }
  }
}

yae.addEvent = function(event) {
  // remove all but the geometry from the
  // scene before rendering
  yae.scene.children.forEach(function(c) {
    if ( c.name != "Detector" ) {
      yae.scene.getObjectByName(c.name).children.length = 0;
    }
  });

  // remove selectors for last event
  $("tr.Event").remove();

  for ( var key in yae.event_description ) {
    var data = event["Collections"][key];
    if ( ! data || data.length === 0 ) {
      continue;
    }

    var descr = yae.event_description[key];
    yae.addSelectionRow(descr.group, key, descr.name);

    var visible = ! yae.disabled[key] ? descr.on = true : descr.on = false;

    switch(descr.type) {

      case yae.BOX:
        for ( var i = 0; i < data.length; i++ ) {
          var box = descr.fn(data[i], descr.style);
          if ( box != null ) {
            box.forEach(function(l) {
              l.name = key;
              l.visible = visible;
              yae.scene.getObjectByName(descr.group).add(l);
            });
          }
        }
      break;
    }
  }
}
