ispy.makeDisc = function(ir, or, pos, slices) {
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

ispy.makeCylinder = function(r, len, pos, slices, segments) {
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

/*
ispy.makeCylinder = function(rT, rB, height, rSeg, hSeg, openEnded) {
  return new THREE.CylinderGeometry(rT, rB, height, rSeg, hSeg, openEnded);
}
*/

ispy.makeTube = function(ir, or, len, pos, slices, segments) {
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

ispy.makeSolidBox = function(data, geometry, ci) {
  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
  var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
  var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
  var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

  var box = new THREE.Geometry();
  box.vertices = [f1,f2,f3,f4,b1,b2,b3,b4];

  // front
  box.faces.push(new THREE.Face3(0,1,2));
  box.faces.push(new THREE.Face3(0,2,3));

  // back
  box.faces.push(new THREE.Face3(4,5,6));
  box.faces.push(new THREE.Face3(4,6,7));

  // top
  box.faces.push(new THREE.Face3(4,5,1));
  box.faces.push(new THREE.Face3(4,1,0));

  // bottom
  box.faces.push(new THREE.Face3(2,6,7));
  box.faces.push(new THREE.Face3(2,3,7));

  // left
  box.faces.push(new THREE.Face3(1,5,7));
  box.faces.push(new THREE.Face3(1,3,7));

  // right
  box.faces.push(new THREE.Face3(4,6,2));
  box.faces.push(new THREE.Face3(4,0,2));

  box.computeFaceNormals();
  box.computeVertexNormals();

  geometry.merge(box);
}

ispy.makeScaledSolidBox = function(data, geometry, ci, scale) {
  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
  var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
  var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
  var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

  var box = new THREE.Geometry();

  box.vertices.push(f1);
  box.vertices.push(f2);
  box.vertices.push(f3);
  box.vertices.push(f4);

  box.faces.push(new THREE.Face3(0,1,2));
  box.faces.push(new THREE.Face3(0,2,3));

  b1.sub(f1);
  b2.sub(f2);
  b3.sub(f3);
  b4.sub(f4);

  b1.normalize();
  b2.normalize();
  b3.normalize();
  b4.normalize();

  b1.multiplyScalar(scale);
  b2.multiplyScalar(scale);
  b3.multiplyScalar(scale);
  b4.multiplyScalar(scale);

  b1.addVectors(f1,b1);
  b2.addVectors(f2,b2);
  b3.addVectors(f3,b3);
  b4.addVectors(f4,b4);

  box.vertices.push(b1);
  box.vertices.push(b2);
  box.vertices.push(b3);
  box.vertices.push(b4);

  box.faces.push(new THREE.Face3(0,1,2));
  box.faces.push(new THREE.Face3(0,2,3));
  box.faces.push(new THREE.Face3(4,5,6));
  box.faces.push(new THREE.Face3(4,6,7));
  box.faces.push(new THREE.Face3(4,5,1));
  box.faces.push(new THREE.Face3(4,1,0));
  box.faces.push(new THREE.Face3(2,6,7));
  box.faces.push(new THREE.Face3(2,3,7));
  box.faces.push(new THREE.Face3(1,5,7));
  box.faces.push(new THREE.Face3(1,3,7));
  box.faces.push(new THREE.Face3(4,6,2));
  box.faces.push(new THREE.Face3(4,0,2));

  box.computeFaceNormals();
  box.computeVertexNormals();

  geometry.merge(box);
}

ispy.makeWireframeBox = function(data, ci) {
  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
  var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
  var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
  var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

  // With THREE.LinePieces the Line is made
  // by connecting pairs of vertices instead
  // of one continuous line
  var box = new THREE.Geometry();
  box.vertices.push(f1,f2);
  box.vertices.push(f2,f3);
  box.vertices.push(f3,f4);
  box.vertices.push(f4,f1);

  box.vertices.push(b1,b2);
  box.vertices.push(b2,b3);
  box.vertices.push(b3,b4);
  box.vertices.push(b4,b1);

  box.vertices.push(b1,f1);
  box.vertices.push(b3,f3);
  box.vertices.push(b2,f2);
  box.vertices.push(b4,f4);

  return box;
}

ispy.makeWireFace = function(data, ci) {
  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var box = new THREE.Geometry();
  box.vertices.push(f1,f2);
  box.vertices.push(f2,f3);
  box.vertices.push(f3,f4);
  box.vertices.push(f4,f1);

  return box;
}

ispy.makeTrackerPiece = function(data) {
  return ispy.makeWireFace(data, 1);
}

ispy.makeShapes = function(data) {
  points = data[0];
  lines = data[1];
  shapes = [];

  var line = new THREE.Geometry();

  for ( var i = 0; i < lines.length; i++ ) {
    var l = lines[i];
    line.vertices.push(points[l.p1]);
    line.vertices.push(points[l.p2]);
  }

  return line;
}

ispy.makeModelTrackerBarrel = function(data) {
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

    wfs.push(ispy.makeCylinder(r, l, -l / 2, slices, 2));
    //var barrel = ispy.makeCylinder(r, r, l, slices, 1, true);
    //barrel.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
    //wfs.push(barrel);
  }

  return wfs;
}

ispy.makeModelTrackerEndcap = function(data) {
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

    wfs.push(ispy.makeDisc(ecri, ecro, ecp, slices));
    wfs.push(ispy.makeDisc(ecri, ecro, -ecp, slices));
  }
  return wfs;
}

ispy.makeModelEcalBarrel = function(data) {
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

ispy.makeModelEcalEndcapMinus = function(data) {
  return [ispy.makeTube(0.35, 1.5, 0.05, 3.2, 24, 2)];
}

ispy.makeModelEcalEndcapPlus = function(data) {
  return [ispy.makeTube(0.35, 1.5, -0.05, -3.2, 24, 2)];
}

ispy.makeModelEcalPreshower = function(data) {
  return [ispy.makeDisc(0.4, 1.3, 3.025, 24), ispy.makeDisc(0.4, 1.3, 3.075, 24),
          ispy.makeDisc(0.4, 1.3, -3.025, 24), ispy.makeDisc(0.4, 1.3, -3.075, 24)];
}

ispy.makeModelHcalBarrel = function(data) {
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

ispy.makeModelHcalForward = function(data) {
  return [ispy.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2), ispy.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];
}

ispy.makeModelHcalForwardPlus = function(data) {
  return [ispy.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2)];
}

ispy.makeModelHcalForwardMinus = function(data) {
  return [ispy.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];
}

ispy.makeModelHcalOuter = function(data) {
  return [ispy.makeTube(3.9, 4.1, 3, -1.5, 48, 8), ispy.makeCylinder(4.2, 2.5, 1.5, 24, 7),
          ispy.makeCylinder(4.2, 3, 4.1, 24, 6), ispy.makeCylinder(4.2, -2.5, -1.5, 24, 7),
          ispy.makeCylinder(4.2, -3, -4.1, 24, 6)];
}

ispy.makeModelHcalEndcap = function(data) {
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

ispy.makeScaledWireframeBox = function(data, material, ci, scale) {
  var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
  var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
  var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
  var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

  var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
  var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
  var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
  var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

  b1.sub(f1);
  b2.sub(f2);
  b3.sub(f3);
  b4.sub(f4);

  b1.normalize();
  b2.normalize();
  b3.normalize();
  b4.normalize();

  b1.multiplyScalar(scale);
  b2.multiplyScalar(scale);
  b3.multiplyScalar(scale);
  b4.multiplyScalar(scale);

  b1.addVectors(f1,b1);
  b2.addVectors(f2,b2);
  b3.addVectors(f3,b3);
  b4.addVectors(f4,b4);

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

  return [new THREE.Line(front,material),
          new THREE.Line(back,material),
          new THREE.Line(s1,material),
          new THREE.Line(s2,material),
          new THREE.Line(s3,material),
          new THREE.Line(s4,material)];
}

ispy.makeTrackPoints = function(data, extra, assoc, material) {
  if ( ! assoc ) {
    throw "No association!";
  }

  var muons = [];
  for ( var i = 0; i < data.length; i++ ) {
    muons[i] = new THREE.Geometry();
  }

  var mi = 0;
  for ( var j = 0; j < assoc.length; j++ ) {
    mi = assoc[j][0][1];
    pi = assoc[j][1][1];
    muons[mi].vertices.push(new THREE.Vector3(extra[pi][0][0],extra[pi][0][1],extra[pi][0][2]));
  }

  var lines = [];
  for ( var k = 0; k < muons.length; k++ ) {
    lines.push(new THREE.Line(muons[k], material));
  }

  return lines;
}

ispy.makeTracks = function(tracks, extras, assocs, material) {
  if ( ! assocs ) {
    throw "No association!";
  }

  var ti, ei;
  var p1, d1, p2, d2;
  var distance, scale, curve;
  var curves = [];

  for ( var i = 0; i < assocs.length; i++ ) {
    ti = assocs[i][0][1];
    ei = assocs[i][1][1];

    p1 = new THREE.Vector3(extras[ei][0][0],extras[ei][0][1],extras[ei][0][2]);
    d1 = new THREE.Vector3(extras[ei][1][0],extras[ei][1][1],extras[ei][1][2]);
    d1.normalize();

    p2 = new THREE.Vector3(extras[ei][2][0],extras[ei][2][1],extras[ei][2][2]);
    d2 = new THREE.Vector3(extras[ei][3][0],extras[ei][3][1],extras[ei][3][2]);
    d2.normalize();

    // What's all this then?
    // Well, we know the beginning and end points of the track as well
    // as the directions at each of those points. This in-principle gives
    // us the 4 control points needed for a cubic bezier spline.
    // The control points from the directions are determined by moving along 0.25
    // of the distance between the beginning and end points of the track.
    // This 0.25 is nothing more than a fudge factor that reproduces closely-enough
    // the NURBS-based drawing of tracks done in iSpy. At some point it may be nice
    // to implement the NURBS-based drawing but I value my sanity.

    distance = p1.distanceTo(p2);
    scale = distance*0.25;

    p3 = new THREE.Vector3(p1.x+scale*d1.x, p1.y+scale*d1.y, p1.z+scale*d1.z);
    p4 = new THREE.Vector3(p2.x-scale*d2.x, p2.y-scale*d2.y, p2.z-scale*d2.z);

    curve = new THREE.CubicBezierCurve3(p1,p3,p4,p2);

    var tg = new THREE.Geometry();
    tg.vertices = curve.getPoints(16);

    curves.push(new THREE.Line(tg,material));
  }

  return curves;
}

ispy.makeRecHit_V2 = function(data, geometry, scale) {
  var energy = data[0];
  if ( energy > 0.5 ) { // make this a setting
    return ispy.makeScaledSolidBox(data, geometry, 5, scale*energy);
  }
}

ispy.makeDT = function(dt) {
  return ispy.makeWireframeBox(dt, 1);
}

ispy.makeCSC = function(csc) {
  return ispy.makeWireframeBox(csc, 1);
}

ispy.makeMuonChamber = function(chamber) {
  return ispy.makeWireframeBox(chamber, 1);
}

ispy.makeHcal = function(hb) {
  return ispy.makeWireframeBox(hb, 1);
}

// Should either 1) use BufferGeometry or 2) use border positions to make wireframe
// or 3) something else
ispy.makeEcal = function(ecal) {
  return ispy.makeWireframeBox(ecal, 1);
}

ispy.makeRPC = function(rpc) {
  return ispy.makeWireFace(rpc, 1);
}

ispy.makeMET = function(data, style) {
  /*
    "METs_V1": [["phi", "double"],["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
  */
  var pt = data[1];

  if ( pt < 1.0 ) { //make this a setting
    return null;
  }

  var px = data[2];
  var py = data[3];

  var dir = new THREE.Vector3(px,py,0);
  dir.normalize();

  var color = new THREE.Color();
  color.setRGB(style.color[0], style.color[1], style.color[2]);

  // dir, origin, length, hex, headLength, headWidth
  var origin = new THREE.Vector3(0,0,0);
  var length = pt*0.1;

  var met = new THREE.ArrowHelper(dir,origin,length,color.getHex(),0.25,0.15);

  return met;
}

ispy.makeJet = function(data, style) {
  var et = data[0];

  if ( et < 5.0 ) { //make this a setting
    return null;
  }

  var theta = data[2];
  var phi = data[3];

  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  var cp = Math.cos(phi);
  var sp = Math.sin(phi);

  var maxZ = 4.0;
  var maxR = 2.0;

  var length1 = ct ? maxZ / Math.abs(ct) : maxZ;
  var length2 = st ? maxR / Math.abs(st) : maxR;
  var length = length1 < length2 ? length1 : length2;
  var radius = 0.3 * (1.0 /(1 + 0.001));

  // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
  var geometry = new THREE.CylinderGeometry(radius,0.0,length,8,1,true);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,length*0.5,0));
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));

  var jcolor = new THREE.Color();
  jcolor.setRGB(style.color[0], style.color[1], style.color[2]);

  var transp = false;
  if ( style.opacity < 1.0 ) {
    transp = true;
  }

  var material = new THREE.MeshBasicMaterial({color:jcolor, transparent: transp, opacity:style.opacity});
  material.side = THREE.DoubleSide;

  var jet = new THREE.Mesh(geometry, material);
  jet.lookAt(new THREE.Vector3(length*0.5*st*cp, length*0.5*st*sp, length*0.5*ct))

  return jet;
}

ispy.makePhoton = function(data) {
  /*
     Draw a line representing the inferred photon trajectory from the vertex (IP?) to the extent of the ECAL
     "Photons_V1": [["energy", "double"],["et", "double"],["eta", "double"],["phi", "double"],["pos", "v3d"]
  */
  var lEB = 3.0;  // half-length of the EB (m)
  var rEB = 1.24; // inner radius of the EB (m)

  var eta = data[2];
  var phi = data[3];

  var px = Math.cos(phi);
  var py = Math.sin(phi);
  var pz = (Math.pow(Math.E, eta) - Math.pow(Math.E, -eta))/2;

  var t = 0.0;

  var x0 = data[4][0];
  var y0 = data[4][1];
  var z0 = data[4][2];

  if ( Math.abs(eta) > 1.48 ) { // i.e. not in the EB, so propagate to ES
    t = Math.abs((lEB - z0)/pz);
  } else { // propagate to EB
    var a = px*px + py*py;
    var b = 2*x0*px + 2*y0*py;
    var c = x0*x0 + y0*y0 - rEB*rEB;
    t = (-b+Math.sqrt(b*b-4*a*c))/2*a;
  }

  var pt1 = new THREE.Vector3(x0, y0, z0);
  var pt2 = new THREE.Vector3(x0+px*t, y0+py*t, z0+pz*t);

  var photon = new THREE.Geometry();

  photon.vertices.push(pt1);
  photon.vertices.push(pt2);

  return [photon];
}

ispy.makeDTRecHits = function(data) {
  /*
    ["wireId", "int"],["layerId", "int"],["superLayerId", "int"],["sectorId", "int"],["stationId", "int"],["wheelId", "int"],
    ["digitime", "double"],["wirePos", "v3d"],
    ["lPlusGlobalPos", "v3d"],["lMinusGlobalPos", "v3d"],["rPlusGlobalPos", "v3d"],["rMinusGlobalPos", "v3d"],
    ["lGlobalPos", "v3d"],["rGlobalPos", "v3d"],
    ["axis", "v3d"],["angle", "double"],["cellWidth", "double"],["cellLength", "double"],["cellHeight", "double"]]
  */

  var pos = new THREE.Vector3(data[7][0], data[7][1], data[7][2]);
  var axis = new THREE.Vector3(data[14][0], data[14][1], data[14][2]);
  var angle = data[15];
  var len = data[17];

  var p1 = new THREE.Vector3(0, -len/2, 0);
  var p2 = new THREE.Vector3(0, len/2, 0);

  //console.log(p1,p2);

  p1.applyAxisAngle(axis, angle);
  p2.applyAxisAngle(axis, angle);

  //console.log(p1,p2);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(pos.add(p1));
  geometry.vertices.push(pos.add(p2));

  var line = new THREE.Line(geometry, material);
  line.name = descr.key;
  line.visible = descr.on;

  //console.log(line);

  return [line];
}

ispy.makeRPCRecHits = function(data) {
  var u1 = new THREE.Vector3(data[0][0], data[0][1], data[0][2]);
  var u2 = new THREE.Vector3(data[1][0], data[1][1], data[1][2]);
  var v1 = new THREE.Vector3(data[2][0], data[2][1], data[2][2]);
  var v2 = new THREE.Vector3(data[3][0], data[3][1], data[3][2]);
  var w1 = new THREE.Vector3(data[4][0], data[4][1], data[4][2]);
  var w2 = new THREE.Vector3(data[5][0], data[5][1], data[5][2]);

  var u = new THREE.Geometry();
  u.vertices.push(u1);
  u.vertices.push(u2);

  var v = new THREE.Geometry();
  v.vertices.push(v1);
  v.vertices.push(v2);

  var w = new THREE.Geometry();
  w.vertices.push(w1);
  w.vertices.push(w2);

  return [u,v,w];
}

ispy.makeCSCRecHit2Ds_V2 = function(data, descr) {
  return ispy.makeRPCRecHits(data, descr);
}

ispy.makeDTRecSegments = function(data) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(data[1][0], data[1][1], data[1][2]));
  geometry.vertices.push(new THREE.Vector3(data[2][0], data[2][1], data[2][2]));
  return [geometry];
}

ispy.makeCSCSegments = function(data, geometry) {
  return ispy.makeDTRecSegments(data, geometry);
}

ispy.makeEvent = function(data) {
  /*
  "Event_V2": [["run", "int"],["event", "int"],["ls", "int"],["orbit", "int"],["bx", "int"],["time", "string"],["localtime", "string"]]
  for what we do here, Event_V1 is the same, i.e. we don't show localtime
  */
  var ei = data[0];
  var run = ei[0], event = ei[1], ls = ei[2], time = ei[5];

  var et = "CMS Experiment at the LHC, CERN<br>";
  et += "Data recorded: " + time + "</br>";
  et += "Run / Event / LS: " + run + " / " + event + " / " + ls + "</br>";

  var ei = $('#event-info');
  ei.html(et);

  $('#display').append(ei);
}
