
ispy.removeObject = function(key){
  var parent, child;
  for(child = ispy.scene.getObjectByName(key); child; child = ispy.scene.getObjectByName(key)){
    parent = child.parent;
    parent.remove(child);
  }
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

  // Clear the object_ids:
  for ( var key in ispy.object_ids){
    ispy.object_ids[key] = [];
  }

  ispy.current_event = event;
  // Clear table from last event and show default caption
  var collectionTable = $('#collection-table');
  collectionTable.empty();
  collectionTable.append(ispy.table_caption);

  // remove selectors for last event
  $("tr.Event").remove();

  for ( var key in ispy.event_description ) {
    var data = event.Collections[key];
    if ( ! data || data.length === 0 ) {
      continue;
    }

    var descr = ispy.event_description[key];

    var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;

    if(descr.type === ispy.TEXT){
      descr.fn(data);
    } else {
      ispy.addObject(key)
    }

    ispy.addSelectionRow(descr.group, key, descr.name, visible);

  }
};


ispy.addObject = function(key, range){

  // To enable calling the function with only one parameter:
  range = typeof range !== 'undefined' ? range : {};

  switch(ispy.event_description[key].type){
    case ispy.BOX:
      ispy.addBox(key);
      break;
    case ispy.SOLIDBOX:
      ispy.addSolidBox(key);
      break;
    case ispy.SCALEDSOLIDBOX:
      ispy.addScaleSolidBox(key, range);
      break;
    case ispy.TRACK:
    case ispy.POLYLINE:
      ispy.addTrack(key, range);
      break;
    case ispy.POINT:
      ispy.addPoint(key);
      break;
    case ispy.SHAPE:
      ispy.addShape(key, range);
      break;
    case ispy.LINE:
      ispy.addLine(key, range);
      break;
  }
};

ispy.addBox = function(key){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;

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
};

ispy.addSolidBox = function(key){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;

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
};

ispy.addScaleSolidBox = function(key, range){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
  if(!range.min && !range.max){
    range.selector = 0;
    range.min = 0.5;
    range.max = undefined;
  }
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
    descr.fn(data[i], boxes, descr.scale, range);
  }

  var meshes = new THREE.Mesh(boxes, material);
  meshes.name = key;
  meshes.visible = visible;

  ispy.scene.getObjectByName(descr.group).add(meshes);
};

ispy.addTrack = function(key, range){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
  if(!range.min && !range.max){
    range.selector = 0;
    range.min = undefined;
    range.max = undefined;
  }
  var objectIds = [];
  var extra = ispy.current_event.Collections[descr.extra];
  var assoc = ispy.current_event.Associations[descr.assoc];
  var tracks = descr.fn(data, extra, assoc, descr.style, range);
  tracks.forEach(function(t, i) {
    if(t !== undefined) {
      t.name = key;
      t.visible = visible;
      // originalIndex works as a link between the original
      // data and THREE objects:
      t.userData.originalIndex = i;

      objectIds.push(t.id);
      ispy.scene.getObjectByName(descr.group).add(t);
    } else {
      objectIds.push(undefined);
    }
  });
  if(descr.group === "Physics"){
    ispy.object_ids[key] = objectIds;
  }
};

ispy.addPoint = function(key){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
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
};

ispy.addShape = function(key, range){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
  if(!range.min && !range.max){
    range.selector = 0;
    range.min = key === "METs_V1" ? 1.0 : 5.0;
    range.max = undefined;
  }
  var objectIds = [];
  for ( var i = 0; i < data.length; i++ ) {
    var shape = descr.fn(data[i], descr.style, range);
    if ( shape !== null ) {
      shape.name = key;
      shape.visible = visible;
      // originalIndex works as a link between the original
      // data and THREE objects:
      shape.userData.originalIndex = i;
      objectIds.push(shape.id);
      ispy.scene.getObjectByName(descr.group).add(shape);
    } else {
      objectIds.push(undefined);
    }
  }
  if(descr.group === "Physics"){
    ispy.object_ids[key] = objectIds;
  }
};

ispy.addLine = function(key, range){
  var data = ispy.current_event.Collections[key];
  var descr = ispy.event_description[key];
  var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
  if(!range.min && !range.max){
    range.selector = 0;
    range.min = undefined;
    range.max = undefined;
  }
  var lcolor = new THREE.Color();
  lcolor.setRGB(descr.style.color[0], descr.style.color[1], descr.style.color[2]);

  var objectIds = [];
  var transp = false;
  if ( descr.style.opacity < 1.0 ) {
    transp = true;
  }

  for ( var i = 0; i < data.length; i++ ) {
    var lines = descr.fn(data[i], range);
    if(lines) {
      lines.forEach(function (l) {
        var line = new THREE.Line(l, new THREE.LineBasicMaterial({
          color: lcolor, transparent: transp,
          linewidth: descr.style.linewidth,
          opacity: descr.style.opacity
        }));
        line.name = key;
        line.visible = visible;
        // originalIndex works as a link between the original
        // data and THREE objects:
        line.userData.originalIndex = i;
        objectIds.push(line.id);
        ispy.scene.getObjectByName(descr.group).add(line);
      });
    } else {
      objectIds.push(undefined);
    }

  }
  if(descr.group === "Physics"){
    ispy.object_ids[key] = objectIds;
  }
};