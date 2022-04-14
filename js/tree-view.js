ispy.addGroups = function() {

    ispy.treegui.addFolder("Detector");
    ispy.treegui.addFolder("Imported");

    ispy.subfolders.Detector = [];
    ispy.subfolders.Imported = [];
    
    ispy.data_groups.forEach(function(g) {

	ispy.treegui.addFolder(g);

	ispy.subfolders[g] = [];
	
    });
    
};

ispy.toggle = function(key) {

    ispy.disabled[key] = !ispy.disabled[key];

    // For event information we display as simple HTML
    // so therefore not part of the scene
    if ( key.includes('Event') ) {
    
	if ( ispy.disabled[key] ) {
      
	    $('#event-text').hide();
    
	} else {
      
	    $('#event-text').show();
    
	}
  
    }

    ispy.scene.getObjectByName(key).visible = !ispy.disabled[key];

    // This is for picking. The raycaster is in layer 2.
    // In-principle this toggle will add other non-pickable
    // objects to the layer but we only check raycasting for
    // Physics objects so this is fine.
    ispy.scene.getObjectByName(key).traverse(function(s) {

	s.layers.toggle(2);

    });
    
};

// In some cases (e.g. animation) we want to explicitly turn somethings on/off
// It would probably be nice to: do this by group, support wildcards, etc.
ispy.showObject = function(key, show) {

    const obj = ispy.scene.getObjectByName(key);
    
    if ( obj !== undefined ) {
    
	console.log(key, show);
	obj.visible = show;
	ispy.disabled[key] = !show;
	$('#'+key).prop('checked', show);
    
    }

};

ispy.addSelectionRow = function(group, key, name, objectIds, visible) {

    let opacity = 1.0;
    let color = new THREE.Color();
    let linewidth = 1;
    let min_pt = 1.0;
    let min_et = 1.0;
    let min_energy = 1.0;
    let nobjects = 0;
    
    if ( ispy.detector_description.hasOwnProperty(key) ) {

	let style = ispy.detector_description[key].style;
	opacity = style.opacity;
	color.set(style.color);
	
    }

    if ( ispy.event_description.hasOwnProperty(key) ) {
	
	let style = ispy.event_description[key].style;

	if ( style.hasOwnProperty('opacity') ) {
	
	    opacity = style.opacity;

	}

	if ( style.hasOwnProperty('color') ) {

	    color.set(style.color);

	}

	if ( style.hasOwnProperty('linewidth') ) {

	    linewidth = style.linewidth;

	}

	if ( ispy.current_event !== undefined ) {

	    nobjects = ispy.current_event.Collections[key].length;
	    
	}
	
    }

    // TO-DO: Fetch pt and et from objects-config
    const row_obj = {
	show: visible,
	number: nobjects,
	key: key,
	opacity: opacity,
	color: '#'+color.getHexString(),
	linewidth: linewidth,
	min_pt: 1.0,
	min_et: 10.0,
	min_energy: 10.0
    };

    let folder = ispy.treegui.__folders[group];
    let sf = folder.__folders[name];

    ispy.subfolders[group].push(name);
    
    sf = folder.addFolder(name);

    if ( ! ( group.includes('Detector') ||
	     group.includes('Imported') ||
	     group.includes('Provenance')
	   )
       ) {

	sf.add(row_obj, 'number');

    }
    
    // For Provenance, ECAL, etc. show table when clicking on
    // tab for objects in the gui
    if ( group.includes('Provenance') || group.includes('CAL') ||
	 group.includes('Tracking') || group.includes('Muon') ||
	 group.includes('Physics') ) {
	
	sf.domElement.onclick = function(e) {
	    
	    ispy.displayCollection(
		key, group, name,
		ispy.getObjectIds(ispy.scene.getObjectByName(key))
	    );
	    
	};
	
    }

    sf.add(row_obj, 'key');
    
    sf.add(row_obj, 'show').onChange(function() {

	ispy.toggle(key);

    });

    // Event is not part of the scene and is
    // handled with css so no need for the rest
    if ( key.includes('Event_') || group.includes('Imported') )
	return;

    sf.add(row_obj, 'opacity', 0, 1).onChange(function() {

	let obj = ispy.scene.getObjectByName(key);

	obj.children.forEach(function(o) {

	    o.material.opacity = row_obj.opacity;

	});

    });

    if ( ispy.use_line2 ) {
    
	// This conditional could / should be improved
	if ( key.includes('GEMDigis') || key.includes('GEMSegments') || key.includes('GEMRec') ||
	     key.includes('CSCStrip') || key.includes('CSCSegments') || key.includes('CSCRec') ||
	     key.includes('CSCWire') || key.includes('RPCRec') || key.includes('DTRecSegment') ) {

	    sf.add(row_obj, 'linewidth', 1, 5).onChange(function() {

		let obj = ispy.scene.getObjectByName(key);

		obj.children.forEach(function(o) {
	    
		    o.material.linewidth = row_obj.linewidth*0.001;
	    
		});

	    });
	
	}

    }

    if ( ispy.use_line2 ) {

	if ( key.includes('GlobalMuon') || key.includes('Electron') ) {
	
	    sf.add(row_obj, 'linewidth', 1, 5).onChange(function() {

		let obj = ispy.scene.getObjectByName(key);

		obj.children.forEach(function(o) {
	    
		    o.material.linewidth = row_obj.linewidth*0.001;
	    
		});

	    });

	}
	
    }

    if ( key.includes('Muon') || key.includes('Electron') || key.includes('Tracks_') ) {

	sf.add(row_obj, 'min_pt').onChange(function() {

	    let obj = ispy.scene.getObjectByName(key);

	    obj.children.forEach(function(o) {

		o.visible = o.userData.pt < row_obj.min_pt ? false : true;

	    });

	});

    }

    if ( key.includes('Jet') ) {

	sf.add(row_obj, 'min_et').onChange(function() {

	    let obj = ispy.scene.getObjectByName(key);

	    obj.children.forEach(function(o) {

		o.visible = o.userData.et < row_obj.min_et ? false : true;

	    });

	});

    }

    if ( key.includes('Photon') ) {

	sf.add(row_obj, 'min_energy').onChange(function() {

	    let obj = ispy.scene.getObjectByName(key);

	    obj.children.forEach(function(o) {

		o.visible = o.userData.energy < row_obj.min_energy ? false : true;

	    });

	});

    }

    sf.addColor(row_obj, 'color').onChange(function() {

	let obj = ispy.scene.getObjectByName(key);
	
	// Change color in event_decription for objects in
	// Physics group. Once they are picked (i.e. pointer over)
	// the color will revert to this new one rather than to the original
	if ( group.includes('Physics') ) {

	    ispy.event_description[key].style.color = row_obj.color;

	}
	
	obj.children.forEach(function(o) {

	    o.traverse(function(oc) {

		// Special case to handle
		if ( oc.type === 'ArrowHelper' ) {
		    
		    oc.children.forEach(function(og) {

			og.material.color = new THREE.Color(row_obj.color);

		    });
		    
		} else {
		
		    oc.material.color = new THREE.Color(row_obj.color);

		}
		    
	    });
	    
	});

    });
    
};
