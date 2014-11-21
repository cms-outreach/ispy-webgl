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
yae.TRACK = 4;

yae.data_description = {
  "DTs3D_V1": {type: yae.BOX, on: false, group: "Detector", name: "Drift Tubes (muon)",
    fn: yae.makeDT, style: {color: [1, 0.6, 0], opacity: 0.3, linewidth: 0.9}},
  "CSC3D_V1": {type: yae.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers (muon)",
    fn: yae.makeCSC, style: {color: [0.6, 0.7, 0], opacity: 0.3, linewidth: 0.8}},
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

      }
  }
}
