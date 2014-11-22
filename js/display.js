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

yae.showEventLoader = function() {
  alert('coming soon!');
};

yae.previousEvent = function() {
  console.log('previous event');
};

yae.nextEvent = function() {
  console.log('next event');
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

yae.makeDisc = function(ir, or, pos, slices) {
  var lines = [];
  var points = [];

  for (var i = 0; i < slices; i++) {
    var sa = Math.sin(i / slices * 2 * Math.PI);
    var ca = Math.cos(i / slices * 2 * Math.PI);

    points.push({x: ir * sa, y: ir * ca, z: pos});
    points.push({x: or * sa, y: or * ca, z: pos});

    var ix1 = i * 2;
    var ix2 = ((i + 1) % slices) * 2;

    lines.push({p1: ix1 + 0, p2: ix1 + 1});
    lines.push({p1: ix1 + 0, p2: ix2 + 0});
    lines.push({p1: ix1 + 1, p2: ix2 + 1});
  }

  return [points, lines];
}

yae.makeCylinder = function(r, len, pos, slices, segments) {
  var lines = [];
  var points = [];
  for (var s = 0; s < segments; s++) {
    for (var i = 0; i < slices; i++) {
      var sa = Math.sin(i / slices * 2 * Math.PI);
      var ca = Math.cos(i / slices * 2 * Math.PI);
      var p = s/(segments - 1) * len + pos;
      points.push({x: r * sa, y: r * ca, z: p});

      var ix1 = (s * slices + i);
      var ix2 = (s * slices + ((i + 1) % slices));

      lines.push({p1: ix1, p2: ix2});

      if (s > 0) {
        var ix3 = ((s - 1) * slices + i);
        lines.push({p1: ix3 + 0, p2: ix1 + 0});
      }
    }
  }

  return [points, lines];
}

yae.makeTube = function(ir, or, len, pos, slices, segments) {
  var lines = [];
  var points = [];

  for ( var s = 0; s < segments; s++ ) {
    for ( var i = 0; i < slices; i++ ) {
      var sa = Math.sin(i / slices * 2 * Math.PI);
      var ca = Math.cos(i / slices * 2 * Math.PI);
      var p = s/(segments - 1) * len + pos;
      points.push({x: ir * sa, y: ir * ca, z: p});
      points.push({x: or * sa, y: or * ca, z: p});

      var ix1 = (s * slices + i) * 2;
      var ix2 = (s * slices + ((i + 1) % slices)) * 2;

      lines.push({p1: ix1 + 0, p2: ix1 + 1});
      lines.push({p1: ix2 + 0, p2: ix2 + 1});
      lines.push({p1: ix1 + 0, p2: ix2 + 0});
      lines.push({p1: ix1 + 1, p2: ix2 + 1});

      if (s > 0) {
        var ix3 = ((s - 1) * slices + i) * 2;
        lines.push({p1: ix3 + 0, p2: ix1 + 0});
        lines.push({p1: ix3 + 1, p2: ix1 + 1});
      }
    }
  }

  return [points, lines];
}

yae.makeWireframeBox = function(data, style, ci) {

  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
  var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
  var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
  var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

  var wfcolor = new THREE.Color();
  wfcolor.setRGB(style.color[0], style.color[1], style.color[2]);

  var material = new THREE.LineBasicMaterial({color:wfcolor,
                                              linewidth:style.linewidth,
                                              opacity:style.opacity});

  var front = new THREE.Geometry();
  front.vertices.push(f1);
  front.vertices.push(f2);
  front.vertices.push(f3);
  front.vertices.push(f4);
  front.vertices.push(f1);

  var back = new THREE.Geometry();
  back.vertices.push(b1);
  back.vertices.push(b2);
  back.vertices.push(b3);
  back.vertices.push(b4);
  back.vertices.push(b1);

  var s1 = new THREE.Geometry();
  s1.vertices.push(f1);
  s1.vertices.push(b1);

  var s2 = new THREE.Geometry();
  s2.vertices.push(f2);
  s2.vertices.push(b2);

  var s3 = new THREE.Geometry();
  s3.vertices.push(f3);
  s3.vertices.push(b3);

  var s4 = new THREE.Geometry();
  s4.vertices.push(f4);
  s4.vertices.push(b4);

  var box = [new THREE.Line(front,material),
             new THREE.Line(back,material),
             new THREE.Line(s1,material),
             new THREE.Line(s2,material),
             new THREE.Line(s3,material),
             new THREE.Line(s4,material)];

  return box;
}

yae.makeShapes = function(data, style) {
  points = data[0];
  lines = data[1];
  shapes = [];

  var wfcolor = new THREE.Color();
    wfcolor.setRGB(style.color[0], style.color[1], style.color[2]);
  var material = new THREE.LineBasicMaterial({color:wfcolor, linewidth:style.linewidth, opacity: style.opacity});

  for ( var i = 0; i < lines.length; i++ ) {
    var l = lines[i];
    var line = new THREE.Geometry();
    var p1 = points[l.p1];
    var p2 = points[l.p2];
    line.vertices.push(points[l.p1]);
    line.vertices.push(points[l.p2]);
    shapes.push(new THREE.Line(line,material));
  }

  return shapes;
}

yae.makeModelTrackerBarrel = function(data, style) {
  var radii = [0.046, 0.07, 0.1,
               0.24, 0.27, 0.32, 0.37, 0.40, 0.43, 0.47, 0.51,
               0.62, 0.70, 0.78, 0.88, 0.97, 1.08];
  var lengths = [0.53, 0.53, 0.53,
                 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3,
                 2.18, 2.18, 2.18, 2.18, 2.18, 2.18];

  var slices = 24;
  var wfs = new Array();

  for (var i = 0; i < radii.length; i++) {
    var r = radii[i];
    var l = lengths[i];

    wfs.push(yae.makeCylinder(r, l, -l / 2, slices, 2));
  }

  return wfs;
}

yae.makeModelTrackerEndcap = function(data, style) {
  var ecradii =    [0.145, 0.145, 0.50, 0.47, 0.50, 0.47, 0.50, 0.47,
                    1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06,
                    1.08, 1.06, 1.08, 1.06, 1.08, 1.06];
  var ecintradii = [0.07,  0.07,  0.40, 0.25, 0.40, 0.25, 0.40, 0.25,
                    0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
                    0.30, 0.30, 0.30, 0.30, 0.30, 0.30];
  var ecpos =      [0.35,  0.48,  0.76, 0.83, 0.89, 0.96, 1.02, 1.09,
                    1.27, 1.34, 1.41, 1.48, 1.55, 1.62, 1.69, 1.76, 1.83, 1.90, 2.00, 2.08,
                    2.20, 2.28, 2.40, 2.48, 2.60, 2.68];

  var slices = 24;
  var wfs = new Array();

  for (var i = 0; i < ecradii.length; i++) {
    var ecro = ecradii[i];
    var ecri = ecintradii[i];
    var ecp = ecpos[i];

    wfs.push(yae.makeDisc(ecri, ecro, ecp, slices));
    wfs.push(yae.makeDisc(ecri, ecro, -ecp, slices));
  }
  return wfs;
}

yae.makeModelEcalBarrel = function(data, style) {
  var hr = data[0];
  var pos = data[1];
  var fr = data[2];
  var hpos = data[3];
  var slices = 24;

  var points = [];
  var lines = [];

  for (var a = 0; a < slices; a++) {
    var sa = Math.sin(a / slices * 2 * Math.PI);
    var ca = Math.cos(a / slices * 2 * Math.PI);

    for (var i = 0; i < pos.length; i++) {
      points.push({x: hr * ca, y: hr * sa, z: hpos[i]});
    }
    for (var i = 0; i < pos.length; i++) {
      points.push({x: fr[i] * ca, y: fr[i] * sa, z: pos[i]});
    }

    for (var i = 0; i < pos.length; i++) {
      var so1 = a * pos.length * 2;
      var so2 = ((a + 1) % slices) * pos.length * 2;
      var ix1 = i;
      if (i < pos.length - 1) {
        lines.push({p1: so1 + ix1, p2: so1 + ix1 + 1});
      }
      lines.push({p1: so1 + ix1, p2: so2 + ix1});

      var so1 = a * pos.length * 2;
      var so2 = ((a + 1) % slices) * pos.length * 2;
      var ix1 = i + pos.length;
      if (i < pos.length - 1) {
        lines.push({p1: so1 + ix1, p2: so1 + ix1 + 1});
      }
      lines.push({p1: so1 + ix1, p2: so2 + ix1});
    }
  }

  return [[points, lines]];
}

yae.makeModelEcalEndcapMinus = function(data, style) {
  return [yae.makeTube(0.35, 1.5, 0.05, 3.2, 24, 2)];
}

yae.makeModelEcalEndcapPlus = function(data, style) {
  return [yae.makeTube(0.35, 1.5, -0.05, -3.2, 24, 2)];
}

yae.makeModelEcalPreshower = function(data, style) {
  return [yae.makeDisc(0.4, 1.3, 3.025, 24), yae.makeDisc(0.4, 1.3, 3.075, 24),
          yae.makeDisc(0.4, 1.3, -3.025, 24), yae.makeDisc(0.4, 1.3, -3.075, 24)];
}

yae.makeModelHcalBarrel = function(data, style) {
  var points = [];
  var lines = [];

  var or = 2.9;
  var ir = 1.8;
  var slices = 72;
  var len = 5;
  var lslices = 20;

  var maxa = Math.atan(len / or);

  for (var pos = 0; pos <= lslices; pos++) {
    var a = pos / lslices * maxa;
    var po = or * Math.tan(a);
    var pi = ir * Math.tan(a);

    for (var i = 0; i < slices; i++) {
      var sa = Math.sin(i / slices * 2 * Math.PI);
      var ca = Math.cos(i / slices * 2 * Math.PI);

      points.push({x: or * ca, y: or * sa, z: po});
      points.push({x: ir * ca, y: ir * sa, z: pi});

      points.push({x: or * ca, y: or * sa, z: -po});
      points.push({x: ir * ca, y: ir * sa, z: -pi});

      var ix1 = (pos * slices + i) * 4;
      var ix2 = (pos * slices + ((i + 1) % slices)) * 4;

      //tan
      lines.push({p1: ix1 + 0, p2: ix2 + 0});
      lines.push({p1: ix1 + 1, p2: ix2 + 1});
      if (pos > 0) {
        lines.push({p1: ix1 + 2, p2: ix2 + 2});
        lines.push({p1: ix1 + 3, p2: ix2 + 3});
      }

      //rad
      lines.push({p1: ix1 + 0, p2: ix1 + 1});
      if (pos > 0) {
        lines.push({p1: ix1 + 2, p2: ix1 + 3});
      }

      //axial
      if (pos < lslices) {
        var ix3 = ((pos + 1) * slices + i) * 4;
        lines.push({p1: ix1 + 0, p2: ix3 + 0});
        lines.push({p1: ix1 + 2, p2: ix3 + 2});
      }

    }
  }

  return [[points, lines]];
}

yae.makeModelHcalForward = function(data, style) {
  return [yae.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2), yae.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];
}

yae.makeModelHcalForwardPlus = function(data, style) {
  return [yae.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2)];
}

yae.makeModelHcalForwardMinus = function(data, style) {
  return [yae.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];
}

yae.makeModelHcalOuter = function(data, style) {
  return [yae.makeTube(3.9, 4.1, 3, -1.5, 48, 8), yae.makeCylinder(4.2, 2.5, 1.5, 24, 7),
          yae.makeCylinder(4.2, 3, 4.1, 24, 6), yae.makeCylinder(4.2, -2.5, -1.5, 24, 7),
          yae.makeCylinder(4.2, -3, -4.1, 24, 6)];
}

yae.makeModelHcalEndcap = function(data, style) {
  var points = [];
  var lines = [];

  var or = 2.9;
  var ir = 0.4;

  var slices = 72;
  var len = 1.5;
  var pos = 4;

  var ori = pos / (pos + len) * or;
  var iro = (pos + len) / pos * ir;

  for (var i = 0; i < slices; i++) {
    var sa = Math.sin(i / slices * 2 * Math.PI);
    var ca = Math.cos(i / slices * 2 * Math.PI);

    points.push({x: ori * ca, y: ori * sa, z: pos});
    points.push({x: ir * ca, y: ir * sa, z: pos});
    points.push({x: or * ca, y: or * sa, z: pos + len});
    points.push({x: iro * ca, y: iro * sa, z: pos + len});

    points.push({x: ori * ca, y: ori * sa, z: -pos});
    points.push({x: ir * ca, y: ir * sa, z: -pos});
    points.push({x: or * ca, y: or * sa, z: -pos - len});
    points.push({x: iro * ca, y: iro * sa, z: -pos - len});

    var ix1 = i * 8;
    var ix2 = ((i + 1) % slices) * 8;

    //maybe this slice thing should be abstracted
    //radial
    lines.push({p1: ix1 + 0, p2: ix1 + 1});
    lines.push({p1: ix1 + 2, p2: ix1 + 3});
    lines.push({p1: ix1 + 4, p2: ix1 + 5});
    lines.push({p1: ix1 + 6, p2: ix1 + 7});

    //tangential
    lines.push({p1: ix1 + 0, p2: ix2 + 0});
    lines.push({p1: ix1 + 1, p2: ix2 + 1});
    lines.push({p1: ix1 + 2, p2: ix2 + 2});
    lines.push({p1: ix1 + 3, p2: ix2 + 3});
    lines.push({p1: ix1 + 4, p2: ix2 + 4});
    lines.push({p1: ix1 + 5, p2: ix2 + 5});
    lines.push({p1: ix1 + 6, p2: ix2 + 6});
    lines.push({p1: ix1 + 7, p2: ix2 + 7});

    //well, still radial, but the other radius
    lines.push({p1: ix1 + 0, p2: ix1 + 2});
    lines.push({p1: ix1 + 4, p2: ix1 + 6});
  }

  return [[points, lines]];
}

yae.makeDT = function(dt, style) {
  return yae.makeWireframeBox(dt, style, 1);
}

yae.makeCSC = function(csc, style) {
  return yae.makeWireframeBox(csc, style, 1);
}

yae.POINT = 0;
yae.LINE = 1;
yae.BOX = 2;
yae.SCALEDBOX = 3;
yae.MODEL = 4;
yae.TRACK = 5;

yae.data_description = {
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

yae.disabled = new Array();

for (var key in yae.data_description) {
  if ( ! yae.data_description[key].on ) {
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
  var html = "<tr>";
  html += "<td class='collection'>"+ name +"</td>";
  html += "<td class='collection'>";
  html += "<input type='checkbox' onchange='yae.toggle(\""+ group + "\",\"" + key + "\");'>";
  html += "</td>";
  html += "</tr>";
  $('#'+group).after(html);
}

yae.addDetector = function() {
  // Iterate over objects specified in yae.data_description
  // and if they are in the detector geometry add them to the scene
  for ( var key in yae.data_description ) {

      var data = yae.detector["Collections"][key];
      if ( ! data || data.length === 0 ) {
        continue;
      }

      var descr = yae.data_description[key];
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
          console.log(key, descr.name);

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
