
ispy.addDetector = function() {

    /*
      Do we want to do this anymore?

    ispy.scene.children.forEach(function(c) {
	    
	    if ( c.name === 'Detector' ) {
		
		ispy.scene.getObjectByName(c.name).children.length = 0;
    
	    }
  
	});
    
    $("tr.Detector").remove();
    */

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

	var obj = new THREE.Object3D();
	
	obj.name = key;
	obj.visible = visible;
	obj.views = [descr.threed, descr.rphi, descr.rhoz];
	
	ispy.scene.getObjectByName(descr.group).add(obj);

	var ocolor = new THREE.Color(descr.style.color);
	var transp = descr.style.opacity < 1.0 ? true : false;
	
	switch(descr.type) {

	case ispy.BOX:

	    var material = new THREE.LineBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    linewidth:descr.style.linewidth, 
		    depthWrite: false,
		    opacity:descr.style.opacity
		});

	    var geometry = new THREE.Geometry();
	    
	    for ( var i = 0; i < data.length; i++ ) {
		
		var box = descr.fn(data[i]);
		geometry.merge(box);
        
	    }

	    var line = new THREE.LineSegments(geometry, material);
	    line.name = key;
	    line.renderOrder = 1;
	    ispy.scene.getObjectByName(key).add(line);

	    break;

	case ispy.SOLIDBOX:

	    var material = new THREE.MeshBasicMaterial({
		    color:ocolor,
		    transparent: transp,
		    opacity:descr.style.opacity
		});
        
	    material.side = THREE.DoubleSide;

	    var boxes = new THREE.Geometry();
	    var lines = new THREE.Geometry();

	    for ( var i = 0; i < data.length; i++ ) {
		
		var bl = descr.fn(data[i]);
		
		if ( bl.length === 0 )
		    continue;

		boxes.merge(bl[0]);
		lines.merge(bl[1]);
        
	    }

	    var meshes = new THREE.Mesh(boxes, material);
	    meshes.name = key;
	    meshes.renderOrder = 1;
	    ispy.scene.getObjectByName(key).add(meshes);

	    var line_material = new THREE.LineBasicMaterial({
		    color:0x000000,
		    transparent: false,
		    linewidth:1,
		    depthWrite: false
		});

	    var line_mesh = new THREE.LineSegments(lines, line_material);
	    line_mesh.name = descr.key;
	    ispy.scene.getObjectByName(key).add(line_mesh);

	    break;

	case ispy.BUFFERBOX:

	    var material = new THREE.LineBasicMaterial({
		    color:ocolor,
		    transparent: transp,
		    linewidth: descr.style.linewidth, 
		    depthWrite: false,
		    opacity:descr.style.opacity
		});

	    var geometry = descr.fn(data);

	    var mesh = new THREE.LineSegments(geometry, material);
	    mesh.name = key;
	    mesh.renderOrder = 1;
	    ispy.scene.getObjectByName(key).add(mesh);

	    break;

	case ispy.MODEL:

	    var material = new THREE.LineBasicMaterial({
		    color:ocolor,
		    transparent: transp,
		    linewidth: descr.style.linewidth, 
		    depthWrite: false,
		    opacity:descr.style.opacity
		});

	    for ( var i = 0; i < data.length; i++ ) {
		
		var models = descr.fn(data[i]);

		for ( var j = 0; j < models.length; j++ ) {
            
		    var shape = ispy.makeShapes(models[j]);
		    var line = new THREE.LineSegments(shape, material);
		    line.name = key;
		    line.renderOrder = 1;
		    ispy.scene.getObjectByName(key).add(line);
          
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
		    if ( c.name !== 'Lights') {
			
			ispy.scene.getObjectByName(c.name).children.length = 0;
		    
		    }
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

	if ( descr.extra ) {
	    
	    extra = event.Collections[descr.extra];
    
	}

	if ( descr.assoc ) {
	    
	    assoc = event.Associations[descr.assoc];
    
	}

	// objectIds contain the ids of 'Physics' THREE objects. Ids are
	// used when displaying event data in table-view so that we are
	// able to connect the data somehow with THREE objects.
	var objectIds = [];
	var visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;

	var obj = new THREE.Object3D();
	
	obj.name = key;
	obj.visible = visible;
	obj.views = [descr.threed, descr.rphi, descr.rhoz];
	
	ispy.scene.getObjectByName(descr.group).add(obj);

	var ocolor = null;

	if ( descr.style.color !== undefined ) {
	    
	    ocolor = new THREE.Color();

	    if ( ispy.inverted_colors && descr.style.altColor !== undefined ) {
		
		ocolor.setStyle(descr.style.altColor);
      
	    } else {
        
		ocolor.setStyle(descr.style.color);
	    
	    }

	    var transp = descr.style.opacity < 1.0 ? true : false;

	}

	console.log(key);

	switch(descr.type) {
	    
	case ispy.BOX:

	    var material = new THREE.LineBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    linewidth:descr.style.linewidth,
		    opacity:descr.style.opacity
		});

	    var geometry = new THREE.Geometry();

	    for ( var i = 0; i < data.length; i++ ) {
		
		var box = descr.fn(data[i]);
		geometry.merge(box);

	    }

	    var line = new THREE.LineSegments(geometry, material);
	    line.name = key;
	    ispy.scene.getObjectByName(key).add(line);

	    break;

	case ispy.SOLIDBOX:
	    
	    var material = new THREE.MeshBasicMaterial({
		    color:ocolor,
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
	    material.side = THREE.DoubleSide;

	    var boxes = new THREE.Geometry();
	    var lines = new THREE.Geometry();

	    for ( var i = 0; i < data.length; i++ ) {
          
		var bl = descr.fn(data[i]);
		boxes.merge(bl[0]);
		lines.merge(bl[1]);
        
	    }

	    var meshes = new THREE.Mesh(boxes, material);
	    meshes.name = key;
	    ispy.scene.getObjectByName(key).add(meshes);

	    var line_material = new THREE.LineBasicMaterial({
                    color:0xcccccc,
                    transparent: false,
                    linewidth:1,
                    depthWrite: false  
                });

            var line_mesh = new THREE.LineSegments(lines, line_material);
            line_mesh.name = descr.key;    
            ispy.scene.getObjectByName(key).add(line_mesh);

	    break;

	case ispy.SCALEDSOLIDBOX:

	    var material = new THREE.MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
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
	    ispy.scene.getObjectByName(key).add(meshes);

	    break;

	case ispy.SCALEDSOLIDTOWER:

	    var material = new THREE.MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
	    material.side = THREE.DoubleSide;

	    var boxes = new THREE.Geometry();
	    
	    for ( var i = 0; i < data.length; i++ ) {
          
		descr.fn(data[i], boxes, descr.scale, descr.selection);
        
	    }

	    var meshes = new THREE.Mesh(boxes, material);
	    meshes.name = key;
	    ispy.scene.getObjectByName(key).add(meshes);

	    break;

	case ispy.STACKEDTOWER:
	    
	    var ematerial = new THREE.MeshBasicMaterial({
		    color: new THREE.Color(descr.style.ecolor),
		    transparent: transp,
		    opacity: descr.style.opacity
		});

	    var hmaterial = new THREE.MeshBasicMaterial({
		    color: new THREE.Color(descr.style.hcolor),
                    transparent: transp,
                    opacity: descr.style.opacity
		});
	    
	    ematerial.side = THREE.DoubleSide;
	    hmaterial.side = THREE.DoubleSide;

	    var eboxes = new THREE.Geometry();
	    var hboxes = new THREE.Geometry();
	    
	    for ( var i = 0; i < data.length; i++ ) {

		descr.fn(data[i], eboxes, hboxes, descr.scale, descr.selection);

	    }

	    var emeshes = new THREE.Mesh(eboxes, ematerial);
	    var hmeshes = new THREE.Mesh(hboxes, hmaterial);

	    emeshes.name = key;
	    hmeshes.name = key;

	    ispy.scene.getObjectByName(key).add(emeshes);
	    ispy.scene.getObjectByName(key).add(hmeshes);

	    break;

	case ispy.ASSOC:
	    
	    var objs = descr.fn(data, extra, assoc, descr.style, descr.selection);
        
	    if ( objs !== undefined ) {

		objs.forEach(function(o, i) {
		    
			// for event info we want each of the children to have the
			// same name as the parent. this is so clicking on an object works
			o.name = key;
		    
			// originalIndex works as a link between the original
			// data and THREE objects:
			o.userData.originalIndex = i;
			objectIds.push(o.id);
			ispy.scene.getObjectByName(key).add(o);
		
		    });
	    
	    }
	    
	    break;

	case ispy.POINT:
	    
	    // We make a buffer geometry, use a point cloud, and add to the scene.
	    var material = new THREE.PointsMaterial({
		    color:ocolor, 
		    size:descr.style.size
		});
	    
	    var geometry = descr.fn(data);
	    var points = new THREE.Points(geometry, material);
	    points.name = key;
	    ispy.scene.getObjectByName(key).add(points);
        
	    break;

	case ispy.SHAPE:

	    for ( var i = 0; i < data.length; i++ ) {
          
		var shape = descr.fn(data[i], descr.style, descr.selection);
          
		if ( shape !== null ) {
            
		    shape.name = key;
            
		    // originalIndex works as a link between the original
		    // data and THREE objects:
		    shape.userData.originalIndex = i;
		    objectIds.push(shape.id);
		    ispy.scene.getObjectByName(key).add(shape);
		
		}
        
	    }
	    
	    break;

	case ispy.LINE:

	    for ( var i = 0; i < data.length; i++ ) {
		
		var lines = descr.fn(data[i]);

		lines.forEach(function(l) {
            
			var line = new THREE.Line(l, new THREE.LineBasicMaterial({
				    color:ocolor, transparent:transp,
				    linewidth:descr.style.linewidth,
				    opacity:descr.style.opacity
				}));
            
			line.name = key;
            
			// originalIndex works as a link between the original
			// data and THREE objects:
			
			line.userData.originalIndex = i;
			objectIds.push(line.id);
			ispy.scene.getObjectByName(key).add(line);
		
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
