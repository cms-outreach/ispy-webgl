ispy.addGroups = function() {

    ispy.treegui.addFolder("Detector");
    ispy.treegui.addFolder("Imported");

    ispy.data_groups.forEach(function(g) {

	ispy.treegui.addFolder(g);

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

    const row_obj = {
	show: visible,
	key: key
    };

    let folder = ispy.treegui.__folders[group];
    let sb = folder.__folders[name];

    if ( sb !== undefined ) {

	ispy.treegui.__folders[group].removeFolder(sb);

    } else {

	sb = folder.addFolder(name);
	
	sb.add(row_obj, 'show').onChange(function() {

	    ispy.toggle(key);

	});

	sb.add(row_obj, 'key');

    } 

};
