ispy.render = function() {
  if ( ispy.renderer !== null ) {
    ispy.renderer.render(ispy.scene, ispy.camera);
  }
}

ispy.animate = function() {
  requestAnimationFrame(ispy.animate);
  ispy.controls.update();
  ispy.render();
  ispy.stats.update();
}

ispy.lookAtOrigin = function() {
  ispy.camera.lookAt(new THREE.Vector3(0,0,0));
}

ispy.setCameraHome = function() {
  var home_x = -18.1;
  var home_y = 8.6;
  var home_z = 14.0;

  ispy.camera.position.x = home_x*0.5;
  ispy.camera.position.y = home_y*0.5;
  ispy.camera.position.z = home_z*0.5;

  ispy.camera.setZoom(1);
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
}

ispy.setXY = function() {
  ispy.camera.position = new THREE.Vector3(0,0,ispy.camera.position.length());
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
}

ispy.setZX = function() {
  ispy.camera.position = new THREE.Vector3(0,ispy.camera.position.length(),0);
  ispy.camera.up = new THREE.Vector3(1,0,0);
  ispy.lookAtOrigin();
}

ispy.setYZ = function() {
  ispy.camera.position = new THREE.Vector3(-ispy.camera.position.length(),0,0);
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
}

ispy.setOrthographic = function() {
  ispy.camera.toOrthographic();
}

ispy.setPerspective = function() {
  ispy.camera.toPerspective();
}

ispy.zoom = function(step) {
  var zoom = ispy.camera.zoom;
  ispy.camera.setZoom(zoom+step);
}

ispy.showSettings = function() {
  console.log('show settings');
}

ispy.inverted_colors = false;

ispy.invertColors = function() {

  if ( ispy.inverted_colors ) {
    // Set back to black
    ispy.renderer.setClearColor(0x000000,1);
    ispy.inverted_colors = false;
  } else {
    ispy.renderer.setClearColor(0xffffff,1);
    ispy.inverted_colors = true;
  }

  // Yeeash I really need to clean up the class, ids, and css

  $('#titlebar').toggleClass('white').toggleClass('black');
  $('#toolbar').toggleClass('white').toggleClass('black');

  $('#treeview').toggleClass('white').toggleClass('black');
  $('#treeview td.group').toggleClass('white').toggleClass('black');
  $('#treeview td.collection').toggleClass('white').toggleClass('black');


  $('#display').toggleClass('white').toggleClass('black');
  $('#tableview').toggleClass('white').toggleClass('black');

  $('.modal-content').toggleClass('white').toggleClass('black');
  $('.modal-title').toggleClass('white').toggleClass('black');
}

ispy.openAboutWindow = function() {
  console.log('open about window');
}

ispy.data_groups = ["Detector", "Tracking", "ECAL", "HCAL", "Muon", "Physics Objects"];

ispy.addGroups = function() {
  var group_table = $('#treeview table');
  ispy.data_groups.forEach(function(g) {
    group_table.append("<tr id='"+ g +"'><td class='group black'>"+ g +"</td></tr>")
  });
}

ispy.POINT = 0;
ispy.LINE = 1;
ispy.BOX = 2;
ispy.SOLIDBOX = 3;
ispy.SCALEDBOX = 4;
ispy.SCALEDSOLIDBOX = 6;
ispy.MODEL = 7;
ispy.TRACK = 8;
ispy.POLYLINE = 9;

ispy.detector_description = {
  "TrackerBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Barrels",
    fn: ispy.makeModelTrackerBarrel, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 1.0}},
  "TrackerEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Endcaps",
    fn: ispy.makeModelTrackerEndcap, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Barrel",
    fn: ispy.makeModelEcalBarrel, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_plus": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: ispy.makeModelEcalEndcapPlus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_minus": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: ispy.makeModelEcalEndcapMinus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "HcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Barrel",
    fn: ispy.makeModelHcalBarrel, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Endcaps",
    fn: ispy.makeModelHcalEndcap, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalOuter3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Outer",
    fn: ispy.makeModelHcalOuter, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalForward3D_plus": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: ispy.makeModelHcalForwardPlus, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalForward3D_minus": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: ispy.makeModelHcalForwardMinus, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "DTs3D_V1": {type: ispy.BOX, on: true, group: "Detector", name: "Drift Tubes (muon)",
    fn: ispy.makeDT, style: {color: [1, 0.6, 0], opacity: 0.5, linewidth: 0.9}},
  "CSC3D_V1": {type: ispy.BOX, on: true, group: "Detector", name: "Cathode Strip Chambers (muon)",
    fn: ispy.makeCSC, style: {color: [0.6, 0.7, 0], opacity: 0.5, linewidth: 0.8}}
};

ispy.event_description = {
  "EBRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Barrel Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "EERecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Endcap Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "ESRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "ECAL", name: "Preshower Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [1, 0.2, 0], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "HBRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HERecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HFRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.6, 1, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HORecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
    fn: ispy.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},

  "Tracks_V1": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},
  "Tracks_V2": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},
  "Tracks_V3": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},

  /*
    need to fix these
  "DTRecHits_V1": {type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Hits",
    fn: ispy.makeDTRecHits, style: {color: [0, 1, 0], opacity: 1.0, linewidth: 2}},
  */

/*
  "DTRecSegment4D_V1": {type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
    fn: ispy.makeDTRecSegments, style: {color: [1, 1, 0, 1], linewidth: 3}},
  "CSCSegments_V1": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], linewidth: 3}},
  "RPCRecHits_V1": {type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
    fn: ispy.makeRPCRecHits, style: {color: [0.8, 1, 0, 1], linewidth: 3}},
  "CSCRecHit2Ds_V2": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
    fn: ispy.makeCSCRecHit2Ds_V2, style: {color: [0.6, 1, 0.9, 1], linewidth: 2}},
*/

  "MuonChambers_V1": {type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching muon chambers",
    fn: ispy.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.3, linewidth: 0.8}},
  "GsfElectrons_V1": {type: ispy.TRACK, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    dataref: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}, min_pt: 0.5},

/*
  "GsfElectrons_V2": {type: ispy.PATH, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTrackCurves, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}},
  "Photons_V1": {type: ispy.LINE, on: false, group: "Physics Objects", name: "Photons (Reco)",
     fn: ispy.makePhotons, style: {color: [0.8, 0.8, 0], opacity: 1.0, linewidth: 2}},
*/
  "TrackerMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics Objects", name: "Tracker Muons (Reco)",
    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V1": {type: ispy.POLYLINE, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V2": {type: ispy.TRACK, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "GlobalMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics Objects", name: "Global Muons (Reco)",
    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}}
/*
  "METs_V1": {type: ispy.SHAPE, on: false, group: "Physics Objects", name: "Missing Et (Reco)",
    fn: ispy.makeMET, style: {color: [1, 1, 0], opacity: 1.0}},
  "Jets_V1": {type: ispy.SHAPE, on: false, group: "Physics Objects", name: "Jets",
    fn: ispy.makeJet, style: {color: [1, 1, 0], opacity: 1.0}}
*/
};

ispy.disabled = new Array();

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

  ispy.scene.getObjectByName(group).children.forEach(function(c) {
    if ( c.name === key ) {
      c.visible = !ispy.disabled[key];
    }
  });
}

ispy.addSelectionRow = function(group, key, name, visible) {
  var dc = "Detector";
  if ( group != "Detector" ) {
    dc = "Event";
  }

  var on = !ispy.disabled[key] ? ' checked="true"' : "";

  var html = "<tr class='" + dc + "'>";
  html += "<td class='collection black'>"+ name +"</td>";
  html += "<td class='collection'>";
  html += "<input type='checkbox' " + on + "onchange='ispy.toggle(\""+ group + "\",\"" + key + "\");'>";
  html += "</td>";
  html += "</tr>";
  $('#'+group).after(html);
}

ispy.addDetector = function() {
  for ( var key in ispy.detector_description ) {

      var data = ispy.detector["Collections"][key];
      if ( ! data || data.length === 0 ) {
        continue;
      }

      var descr = ispy.detector_description[key];

      // If something is already disabled via the toggle then this
      // should override what comes from the description
      var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
      ispy.addSelectionRow(descr.group, key, descr.name, visible);

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


          for ( var i = 0; i < data.length; i++ ) {
              var boxes = new THREE.Geometry();

              descr.fn(data[i], boxes);

              var lines = new THREE.Line(boxes, material);
              lines.name = key;
              lines.visible = visible;

            ispy.scene.getObjectByName(descr.group).add(lines);
          }
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
              descr.fn(data[i], boxes);
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

          var material = new THREE.LineBasicMaterial({color:mcolor, transparent: transp,
                                                      linewidth:descr.style.linewidth,
                                                      opacity:descr.style.opacity});

          for ( var i = 0; i < data.length; i++ ) {
            var models = descr.fn(data[i]);

            for ( var j = 0; j < models.length; j++ ) {
              var shapes = ispy.makeShapes(models[j], material);

              shapes.forEach(function(s) {
                s.name = key;
                s.visible = visible;
                ispy.scene.getObjectByName(descr.group).add(s);
              });
            }
          }
        break;
      }
  }
}

ispy.addEvent = function(event) {
  // remove all but the geometry from the
  // scene before rendering
  ispy.scene.children.forEach(function(c) {
    if ( c.name != "Detector" ) {
      ispy.scene.getObjectByName(c.name).children.length = 0;
    }
  });

  // remove selectors for last event
  $("tr.Event").remove();

  for ( var key in ispy.event_description ) {
    var data = event["Collections"][key];
    if ( ! data || data.length === 0 ) {
      continue;
    }

    var descr = ispy.event_description[key];

    var extra = null;
    var assoc = null;

    if (descr.extra) {
        extra = event["Collections"][descr.extra];
    }

    if (descr.assoc) {
      assoc = event["Associations"][descr.assoc];
    }

    var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
    ispy.addSelectionRow(descr.group, key, descr.name, visible);

    switch(descr.type) {

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
            descr.fn(data[i], boxes);
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

        var tcolor = new THREE.Color();
        tcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }

        var material = new THREE.LineBasicMaterial({color:tcolor,
                                                    transparent: transp,
                                                    linewidth:descr.style.linewidth,
                                                    linecap:'butt',
                                                    opacity:descr.style.opacity});

        var tracks = descr.fn(data, extra, assoc, material);
        tracks.forEach(function(t) {
          t.name = key;
          t.visible = visible;
          ispy.scene.getObjectByName(descr.group).add(t);
        });
        break;
    }
  }
}
