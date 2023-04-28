import { Color } from 'three';

import {
    gui,
    subfolders,
    views,
    scenes,
    use_line2
} from "./setup.js";

import {
    detector_description,
    event_description,
    disabled,
    data_groups
} from "./objects-config.js";

import { current_event } from "./objects-add.js";
import { displayCollection, getObjectIds } from "./display.js";

function addGroups() {

    gui.addFolder("Detector");
    gui.addFolder("Imported");
    
    subfolders.Detector = [];
    subfolders.Imported = [];
    
    data_groups.forEach(function(gr) {

	gui.addFolder(gr);
	
	subfolders[gr] = [];
	
    });

};

function clearSubfolders() {

    data_groups.forEach(function(g) {

	let folder = gui.__folders[g];

	subfolders[g].forEach(function(s) {
		
	    folder.removeFolder(folder.__folders[s]);
	    
	});

	subfolders[g] = [];
	    
    });

    
};

function toggle(key) {

    disabled[key] = !disabled[key];

    // For event information we display as simple HTML
    // so therefore not part of the scene
    if ( key.includes('Event') ) {

	let event_text = document.getElementById('event-text');
	disabled[key] ? event_text.style.display = 'none' : event_text.style.display = 'block';
	
    }

    views.forEach(v => {
	
	let obj = scenes[v].getObjectByName(key);

	// Not every object (and therefore key) is present in
	// every scene.
	if ( ! obj )
	    return;
	
	obj.visible = !disabled[key];

	// This is for picking. The raycaster is in layer 2.
	// In-principle this toggle will add other non-pickable
	// objects to the layer but we only check raycasting for
	// Physics objects so this is fine.
	obj.traverse(function(s) {

	    s.layers.toggle(2);

	});

    });
    
};

// In some cases (e.g. animation) we want to explicitly turn some things on/off
// It would probably be nice to: do this by group, support wildcards, etc.
function showObject(key, view, show) {

    const obj = scenes[view].getObjectByName(key);
    
    if ( obj !== undefined ) {
    
	obj.visible = show;
	disabled[key] = !show;

	document.getElementById(key).checked = show;
    
    }

};

function addSelectionRow(group, key, name, objectIds, visible) {

    let opacity = 1.0;
    let color = new Color();
    let linewidth = 1;
    let min_pt = 1.0;
    let min_et = 1.0;
    let min_energy = 1.0;
    let nobjects = 0;

    let view = '3D';
    
    if ( detector_description[view].hasOwnProperty(key) ) {

	let style = detector_description[view][key].style;
	opacity = style.opacity;
	color.set(style.color);
	
    }

    if ( event_description[view].hasOwnProperty(key) ) {
	
	let style = event_description[view][key].style;

	if ( style.hasOwnProperty('opacity') ) {
	
	    opacity = style.opacity;

	}

	if ( style.hasOwnProperty('color') ) {

	    color.set(style.color);

	}

	if ( style.hasOwnProperty('linewidth') ) {

	    linewidth = style.linewidth;

	}

	if ( current_event !== undefined ) {

	    nobjects = current_event.Collections[key].length;
	    
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

    let folder = gui.__folders[group];
    let sf = folder.__folders[name];

    subfolders[group].push(name);
    
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
	    
	    displayCollection(
		key, group, name,
		getObjectIds(scenes[view].getObjectByName(key))
	    );
	    
	};
	
    }

    sf.add(row_obj, 'key');
    
    sf.add(row_obj, 'show').onChange(function() {

	toggle(key);

    });

    // Event is not part of the scene and is
    // handled with css so no need for the rest
    if ( key.includes('Event_') || group.includes('Imported') )
	return;

    sf.add(row_obj, 'opacity', 0, 1).onChange(function() {
	
	views.forEach(v => {
	    
	    let obj = scenes[v].getObjectByName(key);

	    if ( ! obj )
		return;

	    obj.children.forEach(function(o) {

		o.material.opacity = row_obj.opacity;

	    });

	});

    });

    if ( use_line2 ) {
    
	// This conditional could / should be improved
	if ( key.includes('GEMDigis') || key.includes('GEMSegments') || key.includes('GEMRec') ||
	     key.includes('CSCStrip') || key.includes('CSCSegments') || key.includes('CSCRec') ||
	     key.includes('CSCWire') || key.includes('RPCRec') || key.includes('DTRecSegment') ) {

	    sf.add(row_obj, 'linewidth', 1, 5).onChange(function() {

		views.forEach(v => {
		
		    let obj = scenes[v].getObjectByName(key);

		    if ( ! obj )
			return;
		    
		    obj.children.forEach(function(o) {
	    
			o.material.linewidth = row_obj.linewidth*0.001;
	    
		    });

		});

	    });
	
	}

    }

    if ( use_line2 ) {

	if ( key.includes('GlobalMuon') || key.includes('Electron') || key.includes('Photon') ) {
	
	    sf.add(row_obj, 'linewidth', 1, 5).onChange(function() {

		views.forEach(v => {
		
		    let obj = scenes[v].getObjectByName(key);

		    if ( ! obj )
			return;
		    
		    obj.children.forEach(function(o) {
	    
			o.material.linewidth = row_obj.linewidth*0.001;
	    
		    });

		});

	    });

	}
	
    }

    if ( key.includes('Muons_') || key.includes('Electron') || key.includes('Tracks_') ) {

	sf.add(row_obj, 'min_pt').onChange(function() {

	    views.forEach(v => {
	    
		let obj = scenes[v].getObjectByName(key);

		if ( ! obj )
		    return;
		
		obj.children.forEach(function(o) {

		    o.visible = o.userData.pt < row_obj.min_pt ? false : true;

		});

	    });

	});

    }

    if ( key.includes('Jet') ) {

	sf.add(row_obj, 'min_et').onChange(function() {

	    views.forEach(v => {
	    
		let obj = scenes[v].getObjectByName(key);

		if ( ! obj )
		    return;
		
		obj.children.forEach(function(o) {

		    o.visible = o.userData.et < row_obj.min_et ? false : true;
		    
		});

	    });

	});

    }

    if ( key.includes('Photon') ) {

	sf.add(row_obj, 'min_energy').onChange(function() {

	    views.forEach(v => {
	    
		let obj = scenes[v].getObjectByName(key);

		if ( ! obj )
		    return;
		
		obj.children.forEach(function(o) {

		    o.visible = o.userData.energy < row_obj.min_energy ? false : true;

		});

	    });

	});

    }

    sf.addColor(row_obj, 'color').onChange(function() {

	views.forEach(v => {

	    let obj = scenes[v].getObjectByName(key);

	    if ( ! obj )
		return;
	    
	    // Change color in event_decription for objects in
	    // Physics group. Once they are picked (i.e. pointer over)
	    // the color will revert to this new one rather than to the original
	    if ( group.includes('Physics') ) {

		event_description[v][key].style.color = row_obj.color;
		
	    }
	
	    obj.children.forEach(function(o) {

		o.traverse(function(oc) {

		    // Special case to handle
		    if ( oc.type === 'ArrowHelper' ||
			 key.includes('MET') ||
			 key.includes('Proton') ) {
		    
			oc.children.forEach(function(og) {

			    og.material.color = new Color(row_obj.color);

			});
		    
		    } else {
		
			oc.material.color = new Color(row_obj.color);
			
		    }
		    
		});
	    
	    });
	    
	});

    });
    
};

export { addSelectionRow, addGroups, showObject, clearSubfolders };
