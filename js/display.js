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
yae.SCALEDSOLIDBOX = 3;
yae.PATH = 4;
yae.MODEL = 5;
yae.TRACK = 6;
yae.POLYLINE = 7;
yae.SHAPE = 8;

yae.detector_description = {
  "TrackerBarrel3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "Tracker Barrels",
    fn: yae.makeModelTrackerBarrel, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 1.0}},
  "TrackerEndcap3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "Tracker Endcaps",
    fn: yae.makeModelTrackerEndcap, style: {color: [1, 1, 0], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_MODEL": {type: yae.MODEL, on: true, group: "Detector", name: "ECAL Barrel",
    fn: yae.makeModelEcalBarrel, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_plus": {type: yae.MODEL, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: yae.makeModelEcalEndcapPlus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "EcalEndcap3D_minus": {type: yae.MODEL, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: yae.makeModelEcalEndcapMinus, style: {color: [0, 1, 1], opacity: 0.5, linewidth: 0.5}},
  "HcalBarrel3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Barrel",
    fn: yae.makeModelHcalBarrel, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalEndcap3D_MODEL": {type: yae.MODEL, on: false, group: "Detector", name: "HCAL Endcaps",
    fn: yae.makeModelHcalEndcap, style: {color: [0.8, 1, 0], opacity: 0.5, linewidth: 0.5}},
  "HcalOuter3D_MODEL": {type: yae.MODEL, on: true, group: "Detector", name: "HCAL Outer",
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
  "EBRecHits_V2": {type: yae.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Barrel Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "EERecHits_V2": {type: yae.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "Endcap Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "ESRecHits_V2": {type: yae.SCALEDSOLIDBOX, on: false, group: "ECAL", name: "Preshower Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [1, 0.2, 0], opacity: 0.5, linewidth: 1}, scale: 0.05, min_energy: 0.5},
  "HBRecHits_V2": {type: yae.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HERecHits_V2": {type: yae.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HFRecHits_V2": {type: yae.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.6, 1, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},
  "HORecHits_V2": {type: yae.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
    fn: yae.makeRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, scale: 0.1, min_energy: 0.5},

  "Tracks_V1": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},
  "Tracks_V2": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},
  "Tracks_V3": {type: yae.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: yae.makeTracks, style: {color: [1, 0.7, 0], opacity: 0.7, lineCaps: "square", linewidth: 2}, min_pt: 0.5},

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
    fn: yae.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.3, linewidth: 0.8}},
  "GsfElectrons_V1": {type: yae.TRACK, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    dataref: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: yae.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}, min_pt: 0.5},

/*
  "GsfElectrons_V2": {type: yae.PATH, on: true, group: "Physics Objects", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: yae.makeTrackCurves, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 2}},
  "Photons_V1": {type: yae.LINE, on: false, group: "Physics Objects", name: "Photons (Reco)",
     fn: yae.makePhotons, style: {color: [0.8, 0.8, 0], opacity: 1.0, linewidth: 2}},
*/
  "TrackerMuons_V1": {type: yae.POLYLINE, on: true, group: "Physics Objects", name: "Tracker Muons (Reco)",
    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V1": {type: yae.POLYLINE, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "StandaloneMuons_V2": {type: yae.TRACK, on: false, group: "Physics Objects", name: "Stand-alone Muons (Reco)",
    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
    fn: yae.makeTracks, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
  "GlobalMuons_V1": {type: yae.POLYLINE, on: true, group: "Physics Objects", name: "Global Muons (Reco)",
    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
    fn: yae.makeTrackPoints, style: {color: [1, 0, 0.2], opacity: 1.0, linewidth: 2}},
/*
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

for (var key in yae.event_description) {
  if ( ! yae.event_description[key].on ) {
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

yae.addSelectionRow = function(group, key, name, visible) {
  var dc = "Detector";
  if ( group != "Detector" ) {
    dc = "Event";
  }

  var on = !yae.disabled[key] ? ' checked="true"' : "";

  var html = "<tr class='" + dc + "'>";
  html += "<td class='collection'>"+ name +"</td>";
  html += "<td class='collection'>";
  html += "<input type='checkbox' " + on + "onchange='yae.toggle(\""+ group + "\",\"" + key + "\");'>";
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

      // If something is already disabled via the toggle then this
      // should override what comes from the description
      var visible = ! yae.disabled[key] ? descr.on = true : descr.on = false;
      yae.addSelectionRow(descr.group, key, descr.name, visible);

      switch(descr.type) {

        case yae.BOX:

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

            var box = descr.fn(data[i], material);
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
              var shapes = yae.makeShapes(models[j], material);

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

    var extra = null;
    var assoc = null;

    if (descr.extra) {
        extra = event["Collections"][descr.extra];
    }

    if (descr.assoc) {
      assoc = event["Associations"][descr.assoc];
    }

    var visible = ! yae.disabled[key] ? descr.on = true : descr.on = false;
    yae.addSelectionRow(descr.group, key, descr.name, visible);

    switch(descr.type) {

      case yae.BOX:

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
          var box = descr.fn(data[i], material);
          if ( box != null ) {
            box.forEach(function(l) {
              l.name = key;
              l.visible = visible;
              yae.scene.getObjectByName(descr.group).add(l);
            });
          }
        }
      break;

      case yae.SCALEDSOLIDBOX:

        var mcolor = new THREE.Color();
        mcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

        var transp = false;
        if ( descr.style.opacity < 1.0 ) {
          transp = true;
        }
        var material = new THREE.MeshBasicMaterial({color:mcolor, transparent: transp,
                                                    opacity:descr.style.opacity});
        material.side = THREE.DoubleSide;

        for ( var i = 0; i < data.length; i++ ) {
          var sbox = descr.fn(data[i], material, descr.scale);
          if ( sbox != null ) {
            sbox.forEach(function(s) {
              s.name = key;
              s.visible = visible;
              yae.scene.getObjectByName(descr.group).add(s);
            });
          }
        }
      break;

      case yae.TRACK:
      case yae.POLYLINE:

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
          yae.scene.getObjectByName(descr.group).add(t);
        });
        break;
    }
  }
}
