ispy.addDetector = function() {

    for ( let key in ispy.detector_description ) {

	const data = ispy.detector.Collections[key];
	
	if ( ! data || data.length === 0 ) {
      
	    continue;
	
	}

	const descr = ispy.detector_description[key];

	// If something is already disabled via the toggle then this
	// should override what comes from the description
	// -- However it is not used in addSelectionRow()? - C
	const visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;
	ispy.addSelectionRow(descr.group, key, descr.name, [], visible);

	const obj = new THREE.Object3D();
	
	obj.name = key;
	obj.visible = visible;
	
	ispy.scene.getObjectByName(descr.group).add(obj);

	const ocolor = new THREE.Color(descr.style.color);
	//const transp = descr.style.opacity < 1.0 ? true : false;
	const transp = true; // Make true for all?
	
	switch(descr.type) {

	case ispy.BOX:

	    let box_material = new THREE.LineBasicMaterial({
		color:ocolor, 
		transparent: transp,
		linewidth:descr.style.linewidth, 
		depthWrite: false,
		opacity:descr.style.opacity,
		clippingPlanes: ispy.local_planes
	    });
	    
	    let box_geometries = [];
	    
	    for ( var i = 0; i < data.length; i++ ) {
	
		box_geometries.push(descr.fn(data[i]));
        
	    }
	    
	    let box = new THREE.LineSegments(
		THREE.BufferGeometryUtils.mergeBufferGeometries(box_geometries),
		box_material
	    );
	    
	    box.name = key;
	    box.renderOrder = 1;
	    ispy.scene.getObjectByName(key).add(box);

	    break;

	case ispy.SOLIDBOX:

	    let solidbox_material = new THREE.MeshBasicMaterial({
		color:ocolor,
		transparent: transp,
		opacity:descr.style.opacity,
		depthTest: false,
		clippingPlanes: ispy.local_planes
	    });
        
	    solidbox_material.side = THREE.DoubleSide;

	    let boxes = [];
	    let lines = [];

	    for ( let i = 0; i < data.length; i++ ) {
		
		const bl = descr.fn(data[i]);
		
		if ( bl.length === 0 )
		    continue;

		boxes.push(bl[0]);
		lines.push(bl[1]);
        
	    }

	    let meshes = new THREE.Mesh(
		THREE.BufferGeometryUtils.mergeBufferGeometries(boxes),
		solidbox_material
	    );

	    meshes.name = key;
	    meshes.renderOrder = 1;
	    ispy.scene.getObjectByName(key).add(meshes);

	    let line_material = new THREE.LineBasicMaterial({
		    color:0x000000,
		    transparent: false,
		    linewidth:1,
		    depthTest: false
		});

	    let line_mesh = new THREE.LineSegments(
		THREE.BufferGeometryUtils.mergeBufferGeometries(lines),
		line_material
	    );

	    line_mesh.name = key;
	    ispy.scene.getObjectByName(key).add(line_mesh);

	    break;
	
	}
    
    }
    
};


ispy.addToScene = function(event, view) {

    ispy.scene = ispy.scenes[view];

    // Remove data from scene
    ispy.data_groups.forEach(g => {

	ispy.scene.getObjectByName(g).children.length = 0;

    });
    
    for ( let key in ispy.event_description[view] ) {
	
	const data = event.Collections[key];
    
	if ( ! data || data.length === 0 )
	    continue;

	const descr = ispy.event_description[view][key];

	let extra = null;
	let assoc = null;

	if ( descr.extra ) {
	    
	    extra = event.Collections[descr.extra];
    
	}

	if ( descr.assoc ) {
	    
	    assoc = event.Associations[descr.assoc];

	    if ( ! assoc || assoc.length === 0 ) 
		continue;
	    
	}
	
	// objectIds contain the ids of 'Physics' THREE objects. Ids are
	// used when displaying event data in table-view so that we are
	// able to connect the data somehow with THREE objects.
	const objectIds = [];
	const visible = ! ispy.disabled[key] ? descr.on = true : descr.on = false;

	const obj = new THREE.Object3D();
	
	obj.name = key;
	obj.visible = visible;
	
	ispy.scene.getObjectByName(descr.group).add(obj);

	let ocolor = null;
	const transp = true;

	if ( descr.style.color !== undefined ) {
	    
	    ocolor = new THREE.Color();
	    ocolor.setStyle(descr.style.color);

	}

	const is_physics_obj = descr.group === 'Physics' ? true : false;
		
	switch(descr.type) {
	    
	case ispy.BOX:

	    const boxes = [];

	    for ( let i = 0; i < data.length; i++ ) {
		
		boxes.push(descr.fn(data[i]));

	    }

	    const line = new THREE.LineSegments(
		THREE.BufferGeometryUtils.mergeBufferGeometries(boxes),
		new THREE.LineBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    linewidth:descr.style.linewidth,
		    opacity:descr.style.opacity
		})
	    );

	    line.name = key;
	    ispy.scene.getObjectByName(key).add(line);

	    break;

	case ispy.SOLIDBOX:
	    
	    const sboxes = [];
	    const slines = [];
	    
	    for ( let j = 0; j < data.length; j++ ) {
          
		let bl = descr.fn(data[j]);

		if ( bl.length === 1 ) {
		    sboxes.push(bl[0]);
		}
		
		if ( bl.length === 2 ) {
		    sboxes.push(bl[0]);
		    slines.push(bl[1]);
		}
        
	    }
	    
	    const solidbox_material = new THREE.MeshBasicMaterial({
		color:ocolor,
		transparent: transp,
		opacity:descr.style.opacity,
		depthTest: false,
		depthWrite: false
	    });
	    
	    solidbox_material.side = THREE.DoubleSide;
	    
	    const smeshes = new THREE.Mesh(
		THREE.BufferGeometryUtils.mergeBufferGeometries(sboxes),
		solidbox_material
	    );

	    smeshes.name = key;
	    ispy.scene.getObjectByName(key).add(smeshes);

	    if ( slines.length > 0 ) {
	    
		const sline_material = new THREE.LineBasicMaterial({
                    color:0xcccccc,
                    transparent: false,
                    linewidth:1,
                    depthTest: false  
                });

		const sline_mesh = new THREE.LineSegments(
		    THREE.BufferGeometryUtils.mergeBufferGeometries(slines),
		    sline_material
		);

		sline_mesh.name = key;    
		ispy.scene.getObjectByName(key).add(sline_mesh);

	    }
	    
	    break;

	case ispy.SCALEDSOLIDBOX:

	    const ss_boxes = [];
	    let maxEnergy = 0.0;

	    for ( let k = 0; k < data.length; k++ ) {

		let energy = data[k][0];
		
		if ( energy > maxEnergy )
		    maxEnergy = energy;
        
	    }

	    for ( let l = 0; l < data.length; l++ ) {
		
		descr.fn(data[l], ss_boxes, maxEnergy, descr.selection);
        
	    }

	    if ( ss_boxes.length > 0 ) {

		const ssb_material = new THREE.MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
		ssb_material.side = THREE.DoubleSide;
		
		const ssb_meshes = new THREE.Mesh(
		    THREE.BufferGeometryUtils.mergeBufferGeometries(ss_boxes),
		    ssb_material
		);

		ssb_meshes.name = key;
		ispy.scene.getObjectByName(key).add(ssb_meshes);

	    }
		
	    break;

	case ispy.SCALEDSOLIDTOWER:

	    const sst_boxes = [];
	    let maxE = 0.0;
	    
	    for ( let ee = 0; ee < data.length; ee++ ) {

		let energy = data[ee][0];
		
		if ( energy > maxE )
		    maxE = energy;
        
	    }

	    for ( var m = 0; m < data.length; m++ ) {
          
		descr.fn(data[m], sst_boxes, maxE, descr.selection);
        
	    }

	    if ( sst_boxes.length > 0 ) {

		const sst_material = new THREE.MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
		sst_material.side = THREE.DoubleSide;

		var sst_meshes = new THREE.Mesh(
		    THREE.BufferGeometryUtils.mergeBufferGeometries(sst_boxes),
		    sst_material
		);
	    
		sst_meshes.name = key;
		ispy.scene.getObjectByName(key).add(sst_meshes);

	    }
	    
	    break;

	case ispy.STACKEDTOWER:
	    
	    const eboxes = [];
	    const hboxes = [];
	    
	    for ( let n = 0; n < data.length; n++ ) {

		descr.fn(data[n], eboxes, hboxes, descr.scale, descr.selection);

	    }

	    const ematerial = new THREE.MeshBasicMaterial({
		    color: new THREE.Color(descr.style.ecolor),
		    transparent: transp,
		    opacity: descr.style.opacity
		});

	    const hmaterial = new THREE.MeshBasicMaterial({
		    color: new THREE.Color(descr.style.hcolor),
                    transparent: transp,
                    opacity: descr.style.opacity
		});
	    
	    ematerial.side = THREE.DoubleSide;
	    hmaterial.side = THREE.DoubleSide;

	    const emeshes = new THREE.Mesh(
		THREE.BufferGeometryUtils.mergeBufferGeometries(eboxes),
		ematerial
	    );
	    
	    const hmeshes = new THREE.Mesh(
		THREE.BufferGeometryUtils.mergeBufferGeometries(hboxes),
		hmaterial
	    );

	    emeshes.name = key;
	    hmeshes.name = key;

	    if ( is_physics_obj && visible ) {
		
		emeshes.layers.enable(2);
		hmeshes.layers.enable(2);

	    }
	    
	    ispy.scene.getObjectByName(key).add(emeshes);
	    ispy.scene.getObjectByName(key).add(hmeshes);

	    break;

	case ispy.ASSOC:
	    
	    const objs = descr.fn(data, extra, assoc, descr.style, descr.selection);

	    if ( objs !== undefined ) {

		objs.forEach(function(obj, index) {
		    
		    // For event info we want each of the children to have the
		    // same name as the parent. this is so picking on an object works
		    obj.name = key;

		    if ( is_physics_obj && visible ) {

			obj.layers.enable(2);

		    }
		    
		    // originalIndex works as a link between the original
		    // data and THREE objects:
		    obj.userData.originalIndex = index;
		    objectIds.push(obj.id);
		    ispy.scene.getObjectByName(key).add(obj);
		    
		});
		
	    }
	    
	    break;

	case ispy.POINT:
	    
	    const points = new THREE.Points(
		descr.fn(data),
		new THREE.PointsMaterial({
		    color:ocolor, 
		    size:descr.style.size
		}));
	    
	    points.name = key;
	    ispy.scene.getObjectByName(key).add(points);
        
	    break;

	case ispy.SHAPE:

	    for ( let si = 0; si < data.length; si++ ) {
          
		const shape = descr.fn(data[si], descr.style, descr.selection);
          
		if ( shape !== null ) {
            
		    shape.name = key;

		    shape.traverse(function(s) {

			s.name = key;
			
			if ( is_physics_obj && visible ) {

			    s.layers.enable(2);

			}

		    });
		   		    
		    // originalIndex works as a link between the original
		    // data and THREE objects:
		    shape.userData.originalIndex = si;
		    objectIds.push(shape.id);
		    ispy.scene.getObjectByName(key).add(shape);
		
		}
        
	    }
	    
	    break;

	case ispy.LINE:
	    
	    for ( let li = 0; li < data.length; li++ ) {

		descr.fn(data[li]).forEach(function(g) {

		    if ( ispy.use_line2 ) {
		    
			const line2 = new THREE.Line2(g, new THREE.LineMaterial({
			    color:ocolor,
			    transparent:transp,
			    linewidth:descr.style.linewidth*0.001,
			    opacity:descr.style.opacity
			}));
            
			line2.name = key;
			line2.computeLineDistances();
            
			// originalIndex works as a link between the original
			// data and THREE objects:
		    
			line2.userData.originalIndex = li;
			objectIds.push(line2.id);
			ispy.scene.getObjectByName(key).add(line2);

		    } else {
			
			const line = new THREE.Line(g, new THREE.LineBasicMaterial({
			    color:ocolor,
			    transparent:transp,
			    opacity:descr.style.opacity
			}));

			line.name = key;
            
			// originalIndex works as a link between the original
			// data and THREE objects:
		    
			line.userData.originalIndex = li;
			objectIds.push(line.id);
			ispy.scene.getObjectByName(key).add(line);

		    }
			    
		});
	    
	    }
	    
	    break;
	
	case ispy.TEXT:

	    descr.fn(data);

	    break;
	    
	}

	// Everything in the event is part of the 3D view so we only have to add
	// the rows in the controls GUI when the view is 3D.
	// Properties will be changed over the 3 views and their corresponding scenes
	// in the same place in the controls GUI.
	if ( view === '3D' )
	    ispy.addSelectionRow(descr.group, key, descr.name, objectIds, visible);

    }

};

ispy.addEvent = function(event) {

    console.log(ispy.camera.position);
    
    ispy.current_event = event;
    // Clear table from last event and show default caption
    $('#collection-table').empty();
    $('#collection-table').append(ispy.table_caption);

    // remove selectors for last event
    $("tr.Event").remove();

    // Clear the subfolders for event information in the treegui
    ispy.clearSubfolders();
    
    ispy.views.forEach(v => {

	ispy.addToScene(event, v);

    });

    ispy.showView(ispy.current_view);
    
};
