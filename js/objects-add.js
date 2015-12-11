
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
          linewidth:descr.style.linewidth, depthWrite: false,
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
          linewidth: descr.style.linewidth, depthWrite: false,
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

    // objectIds contain the ids of 'Physics' THREE objects. Ids are
    // used when displaying event data in table-view so that we are
    // able to connect the data somehow with THREE objects.
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
        var maxEnergy = 5.0;

        for ( var j = 0; j < data.length; j++ ) {
          var energy = data[j][0];
          if ( energy > maxEnergy )
            maxEnergy = energy;
        }

        for ( var i = 0; i < data.length; i++ ) {
          descr.fn(data[i], boxes, maxEnergy, descr.selection);
        }

        var meshes = new THREE.Mesh(boxes, material);
        meshes.name = key;
        meshes.visible = visible;

        ispy.scene.getObjectByName(descr.group).add(meshes);

        break;

      case ispy.SCALEDSOLIDTOWER:

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
          descr.fn(data[i], boxes, descr.scale, descr.selection);
        }

        var meshes = new THREE.Mesh(boxes, material);
        meshes.name = key;
        meshes.visible = visible;

        ispy.scene.getObjectByName(descr.group).add(meshes);

        break;

      case ispy.TRACK:
      case ispy.POLYLINE:

        var tracks = descr.fn(data, extra, assoc, descr.style, descr.selection);
        tracks.forEach(function(t, i) {
          t.name = key;
          t.visible = visible;
          // originalIndex works as a link between the original
          // data and THREE objects:
          t.userData.originalIndex = i;
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
          var shape = descr.fn(data[i], descr.style, descr.selection);
          if ( shape !== null ) {
            shape.name = key;
            shape.visible = visible;
            // originalIndex works as a link between the original
            // data and THREE objects:
            shape.userData.originalIndex = i;
            objectIds.push(shape.id);
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

          lines.forEach(function(l) {
            var line = new THREE.Line(l, new THREE.LineBasicMaterial({
              color:lcolor, transparent:transp,
              linewidth:descr.style.linewidth,
              opacity:descr.style.opacity
            }));
            line.name = key;
            line.visible = visible;
            // originalIndex works as a link between the original
            // data and THREE objects:
            line.userData.originalIndex = i;
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
