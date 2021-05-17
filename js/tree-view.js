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
    
    if ( ispy.detector_description.hasOwnProperty(key) ) {

	let style = ispy.detector_description[key].style;
	opacity = style.opacity;
	color.set(style.color);
	
    }

    if ( ispy.event_description.hasOwnProperty(key) ) {
	
	let style = ispy.event_description[key].style;

	if ( style.hasOwnProperty('opacity') ) {
	
	    opacity = style.opacity;
	    color.set(style.color);

	}

	if ( style.hasOwnProperty('linewidth') ) {

	    linewidth = style.linewidth;

	}
	
    }

    // TO-DO: Fetch pt and et from objects-config
    const row_obj = {
	show: visible,
	key: key,
	opacity: opacity,
	color: color.getHex(),
	linewidth: linewidth,
	min_pt: 1.0,
	min_et: 10.0
    };

    let folder = ispy.treegui.__folders[group];
    let sf = folder.__folders[name];

    ispy.subfolders[group].push(name);
    
    sf = folder.addFolder(name);
    
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

    if ( ispy.use_line2 ) {

	if ( key.includes('GlobalMuon') || key.includes('GsfElectron') ) {
	
	    sf.add(row_obj, 'linewidth', 1, 5).onChange(function() {

		let obj = ispy.scene.getObjectByName(key);

		obj.children.forEach(function(o) {
	    
		    o.material.linewidth = row_obj.linewidth*0.001;
	    
		});

	    });

	}
	
    }

    if ( key.includes('GlobalMuon') || key.includes('GsfElectron') || key.includes('Tracks_') ) {

	sf.add(row_obj, 'min_pt').onChange(function() {

	    let obj = ispy.scene.getObjectByName(key);

	    obj.children.forEach(function(o) {

		o.visible = o.pt < row_obj.min_pt ? false : true;

	    });

	});

    }

    if ( key.includes('Jet') ) {

	sf.add(row_obj, 'min_et').onChange(function() {

	    let obj = ispy.scene.getObjectByName(key);

	    obj.children.forEach(function(o) {

		o.visible = o.et < row_obj.min_et ? false : true;

	    });

	});

    }
    
    sf.addColor(row_obj, 'color').onChange(function() {

	let obj = ispy.scene.getObjectByName(key);

	obj.children.forEach(function(o) {
	    
	    o.material.color = new THREE.Color(row_obj.color);
	    
	});

    });
    
};
