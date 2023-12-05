// ----------- MODALS: settings

ispy.invertColors = function() {

    ispy.inverted_colors = ! ispy.inverted_colors;

    if ( ! ispy.inverted_colors ) {
    
	ispy.renderer.setClearColor(0x232323,1);

    } else {

	ispy.renderer.setClearColor(0xefefef,1);
	
    }

    // Yeeesh I really need to clean up the class, ids, and css

    $('body').toggleClass('white').toggleClass('black');

    $('#event-info').toggleClass('white').toggleClass('black');
    
    $('#titlebar').toggleClass('white').toggleClass('black');
    $('#toolbar').toggleClass('white').toggleClass('black');
    
    $('#treeview').toggleClass('white').toggleClass('black');
    $('#treeview td.group').toggleClass('white').toggleClass('black');
    $('#treeview td.collection').toggleClass('white').toggleClass('black');

    $('#display').toggleClass('white').toggleClass('black');

    $('#tableview').toggleClass('white').toggleClass('black');
    $('#tableview table thead th').toggleClass('white').toggleClass('black');

    $('#browser-table').toggleClass('white').toggleClass('black');
    $('#browser-table th').toggleClass('white').toggleClass('black');
    $('#browser-files').toggleClass('white').toggleClass('black');
    
    $('#obj-table').toggleClass('white').toggleClass('black');
    $('#obj-table th').toggleClass('white').toggleClass('black');
    $('#obj-files').toggleClass('white').toggleClass('black');
    
    $('.modal-content').toggleClass('white').toggleClass('black');
    $('.modal-title').toggleClass('white').toggleClass('black');
    
    $('#table-data-eventObject').toggleClass('white').toggleClass('black');

};

ispy.setTransparency = function(t) {

    ispy.importTransparency = t;
    $('#trspy').html(t);

    let imported = ispy.scene.getObjectByName('Imported');

    imported.children.forEach(function(obj) {
    
	obj.children.forEach(function(c) {
      
	    c.material.transparent = true;
	    c.material.opacity = t;
    
	});
	    
    });

};

// ---------------------------------
// ----------- MODALS: info

ispy.updateRendererInfo = function() {

    var info = ispy.renderer.info;

    var html = "<strong>"+ ispy.renderer_name + " info: </strong>";
    html += "<dl>";

    html += "<dt><strong> render </strong></dt>";
  
    for ( let prop in info.render ) {
    
	html += "<dd>" + prop + ": " + info.render[prop] + "</dd>";
  
    }

    if ( info.memory ) {
    
	html += "<dt><strong> memory </strong></dt>";
    
	for ( let prop in info.memory ) {
     
	    html += "<dd>" + prop + ": " + info.memory[prop] + "</dd>";
    
	}
  
    }

    $("#renderer-info").html(html);

};

// ---------------------------------

ispy.updateRenderer = function(type) {

    if ( type === ispy.renderer_name ) {
	
	alert(type + ' is already in use');
	return;
  
    }

    if ( type === 'WebGLRenderer' ) {
    
	if ( ! ispy.hasWebGL() ) {
      
	    alert('WebGL is not available');
    
	}
  
    }

    document.getElementById('display').removeChild(ispy.renderer.domElement);
    document.getElementById('axes').removeChild(ispy.inset_renderer.domElement);

    ispy.useRenderer(type);

    var controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 0.5;
    ispy.controls = controls;
    
    ispy.updateRendererInfo();

};

ispy.onWindowResize = function() {

    if ( ispy.stereo ) {

	var d = $('#display').css({
		'width' : window.innerWidth + 'px',
		'height' : window.innerHeight + 'px',
		'position': 'absolute',
		'left': '0px',
		'top': '0px',
		'z-index': 1000
	    })[0];

	d.height = window.innerHeight;
	d.width = window.innerWidth;

    } else {

	$('#display').removeAttr('style');

    }

    var w = $('#display').innerWidth();
    var h = $('#display').innerHeight();

    if ( ispy.is_perspective ) {

	ispy.camera.aspect = w/h;

    } else {

	ispy.camera.left = -w/2;
	ispy.camera.right = w/2;
	ispy.camera.top = h/2;
	ispy.camera.bottom = -h/2;

    }

    ispy.camera.updateProjectionMatrix();
    ispy.renderer.setSize(w,h);
    ispy.render();

};

// Given an object3d this returns the ids of its children
ispy.getObjectIds = function(obj) {

    const ids = [];

    obj.children.forEach(function(c) {
	    
	    ids.push(c.id);

	});

    return ids;

};

ispy.onMouseMove = function(e) {
  
    e.preventDefault();

    const container = $("canvas");

    const w = $('#display').innerWidth();
    const h = $('#display').innerHeight();

    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    const offsetX = $('#display').offset().left - left;
    const offsetY = $('#display').offset().top - top;

    const pointer = new THREE.Vector2();
    
    pointer.x = ((e.clientX-offsetX) / w)*2 - 1;
    pointer.y = -((e.clientY-offsetY) / h)*2 +1;

    ispy.raycaster.setFromCamera(pointer, ispy.camera);
    const intersects = ispy.raycaster.intersectObject(ispy.scene.getObjectByName("Physics"), true);
    
    if ( ispy.intersected ) {

	// Undo selection stuff
	container.css('cursor', 'auto');
	    
	ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);

	if ( ! ispy.intersected.selected ) {
	
	    const original_color = new THREE.Color(
		ispy.event_description[ispy.current_view][ispy.intersected.name].style.color
	    );

	    ispy.intersected.material.color = original_color;

	} else {

	    ispy.intersected.material.color.setHex(0xcccccc);

	}

	ispy.intersected = null;
	
    }
    
    if ( intersects.length > 0 ) {

	const res = intersects.filter(function(res) {

	    return res && res.object;
	    
	})[0];
	
	if ( res && res.object ) {

	    // Selection stuff happens
	    ispy.intersected = res.object;
	    
	    container.css('cursor', 'pointer');

	    var original_color = ispy.intersected.material.color;
	    ispy.intersected.material.color.setHex(0xcccccc);
	    
	    ispy.displayCollection(
		ispy.intersected.name, "Physics", 
		ispy.event_description[ispy.current_view][ispy.intersected.name].name, 
		ispy.getObjectIds(ispy.scene.getObjectByName(ispy.intersected.name))
	    );
	    
	    ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, true);
	    
	}

    }

};

ispy.selected_objects = new Map();
ispy.hidden_objects = [];

ispy.onMouseDown = function(e) {
    
    if ( ispy.intersected ) {
	
	// We only want to do this for muons and electrons since
	// it's only to show what objects are selected for invariant mass.
	if ( ispy.intersected.name.includes('Muon') ||
	     ispy.intersected.name.includes('Electron') ) {

	    if ( ispy.intersected.selected ) {
	    
		const original_color = new THREE.Color(
		    ispy.event_description[ispy.current_view][ispy.intersected.name].style.color
		);
		
		ispy.intersected.material.color = original_color;
		ispy.intersected.selected = false;

		if ( ispy.selected_objects.has(ispy.intersected.id) ) {

		    ispy.selected_objects.delete(ispy.intersected.id);
		
		}
	    
	    
	    } else {

		ispy.intersected.material.color.setHex(0x808080);
		ispy.intersected.selected = true;
		ispy.displayEventObjectData();
	    
	    }

	}
	
    }

};

document.addEventListener('keyup', function(e) {

    if ( e.shiftKey || e.key  === 'Shift' ) {
	
	ispy.shift_pressed = false;
	
    }

});

document.addEventListener('keydown', function(e) {
    
    // Instead of a button, make output of 3D to JSON a "secret" key binding
    // If shift + e then export
    if ( e.which === 69 && e.shiftKey ) {
	
	ispy.exportScene();
	
    }
    
    // up arrow
    if ( e.which === 38 && e.shiftKey ) {
	
	ispy.zoomIn();
	
    }
    
    // down
    if ( e.which === 40 && e.shiftKey ) {
	
	ispy.zoomOut();
	
    }
    
    // right
    if ( e.which === 39 ) {

	ispy.nextEvent();

    }

    // left
    if ( e.which === 37 ) {

	ispy.prevEvent();

    }

    // shift+a to toggle animation
    if ( e.which === 65 && e.shiftKey ) {
	
	ispy.toggleAnimation();
	
    }

    if ( e.shiftKey || e.key === 'Shift' ) {
	
	ispy.shift_pressed = true;
	
    }

    // M
    if ( e.which === 77 ) {
	
	ispy.showMass();
	
    }

    // H
    if ( e.which === 72 ) {

	ispy.hide = true;

	if ( ispy.intersected && ispy.intersected.name.includes('Jet') ) {

	    ispy.intersected.material.color = new THREE.Color(
		ispy.event_description[ispy.current_view][ispy.intersected.name].style.color
	    );

	    ispy.intersected.visible = false;
	    ispy.hidden_objects.push(ispy.intersected);

	}
	  	
    }

    // S
    if ( e.which === 83 ) {

	ispy.show = true;

	const hidden_object = ispy.hidden_objects.pop();

	if ( hidden_object ) {

	    hidden_object.visible = true;

	}
	
    }
    
});

const mMuon2 = 0.10566*0.10566;
const mElectron2 = 0.511e-3*0.511e-3;

ispy.displayCollection = function(key, group, name, objectIds) {
 
    ispy.currentCollection = key;
 
    const type = ispy.current_event.Types[key];
    const collection = ispy.current_event.Collections[key];

    const collectionTable = $('#collection-table');

    collectionTable.empty();
    collectionTable.append('<caption>' + group + ': ' + name + '</caption>');
    collectionTable.append('<thead> <tr>');
    
    const collectionTableHead = collectionTable.find('thead').find('tr');
    const color_class = ispy.inverted_colors ? 'group white' : 'group black';

    collectionTableHead.append($('<th class="'+ color_class +'" data-sort="int"><i class="fa fa-sort"></i>index</th>'));

    let charge_index = -1;
    let i = 0;
    
    for ( let t in type ) {

	if ( type[t][0] === 'charge' ) {

	    charge_index = i;

	}

	i += 1

	let dataSort = type[t][1] === "double" ? "float" : type[t][1];
	collectionTableHead.append($('<th class="'+ color_class +'" data-sort="' + dataSort + '"><i class="fa fa-sort"></i> ' + type[t][0] + '</th>'));
  
    }

    let index = 0;
    
    for ( let c in collection ) {
	
	let row_content = "<tr id='" +
	    key.concat(index++) +  
	    "' onclick='ispy.clickRow(\""+objectIds[c]+"\")' onmouseenter='ispy.highlightObject(\"" + objectIds[c] + "\")' onmouseout='ispy.unHighlightObject()'>";

	let i = index-1;
	row_content += "<td>"+ i + "</td>";
	
	for ( let v in collection[c] ) {

	    if ( v === charge_index.toString() ) {

		row_content += "<td> </td>";

	    } else {
	    
		row_content += "<td>"+collection[c][v]+"</td>";

	    }
	    
	}

	let rc = $(row_content);
	collectionTable.append(rc);
  
    }

    collectionTable.stupidtable({
	   
	    "v3d":function(a,b) {

		const aV3 = a.split(",");
		const bV3 = b.split(",");

		if ( aV3.length === 3 && bV3.length === 3 ) {

		    const aLength = Math.sqrt(aV3[0] * aV3[0] + aV3[1] * aV3[1] + aV3[2] * aV3[2]);
		    const bLength = Math.sqrt(bV3[0] * bV3[0] + bV3[1] * bV3[1] + bV3[2] * bV3[2]);
		    
		    return aLength - bLength;
		}

		return 1;
    
	    }
	}).bind('aftertablesort', function(event, data){
	
		collectionTableHead.find('th').find('i').removeClass().addClass('fa fa-sort');
		const newClass = "fa fa-sort-" + data.direction;
		collectionTableHead.find('th').eq(data.column).find('i').removeClass().addClass(newClass);
  
	    });
    
};

ispy.showMass = function() {

    var m = 0;
    var sumE = 0;
    var sumPx = 0;
    var sumPy = 0;
    var sumPz = 0;
    
    ispy.selected_objects.forEach(function(o, key) {

	sumE  += o.four_vector.E;
	sumPx += o.four_vector.px;
	sumPy += o.four_vector.py;
	sumPz += o.four_vector.pz;

	// This is cheating. Should get colors from event_description config.
	if ( o.ptype === 'Electron' ) {

	    o.material.color.setHex(0x19ff19);

	}

	if ( o.ptype === 'Muon' ) {

	    o.material.color.setHex(0xff0000);

	}

	o.selected = false;
	
    });
    
    m = sumE*sumE;
    m -= (sumPx*sumPx + sumPy*sumPy + sumPz*sumPz);
    m = Math.sqrt(m);
    
    $('#invariant-mass').html(m.toFixed(2));
    $('#invariant-mass-modal').modal('show');
    
    ispy.selected_objects.clear();

};

ispy.displayEventObjectData = function() {

    const key = ispy.intersected.name;
    
    const isMuon = key.includes('Muon');
    const isElectron = key.includes('Electron');

    if ( ! ( isMuon || isElectron ) ) {

	return;

    }

    const objectUserData = ispy.intersected.userData;
    const type = ispy.current_event.Types[key];
    const eventObjectData = ispy.current_event.Collections[key][objectUserData.originalIndex];
    
    let pt, eta, phi;
    let E, px, py, pz;
    
    for ( var t in type ) {

	if ( type[t][0] === 'pt' ) {
	    
	    pt = eventObjectData[t];
	
	} else if ( type[t][0] === 'eta' ) {
      
	    eta = eventObjectData[t];
	
	} else if ( type[t][0] === 'phi' ) {
      
	    phi = eventObjectData[t];
    
	}
    }

    let ptype;

    px = pt*Math.cos(phi);
    py = pt*Math.sin(phi);
    pz = pt*Math.sinh(eta);
    
    E = 0;
	
    if ( isMuon ) {
	
	E += mMuon2;
	ptype = 'Muon';
	
    }

    if ( isElectron ) {
	
	E += mElectron2;
	ptype = 'Electron';
	
    }
	
    E += pt*pt*Math.cosh(eta)*Math.cosh(eta);
    E = Math.sqrt(E);

    ispy.intersected.four_vector = {'E':E, 'px':px, 'py':py, 'pz':pz};
    ispy.intersected.ptype = ptype;
    
    ispy.selected_objects.set(ispy.intersected.id, ispy.intersected);
    
};

ispy.highlightTableRow = function(key, objectUserData, doEffect) {
 
    if ( ( ispy.currentCollection == key && doEffect ) || ! doEffect ) {
	
	var selector = "#" + key.concat(objectUserData.originalIndex);
	var row = $(selector);

	if ( row ) {
	    
	    if ( doEffect ) {
		
		var color = ispy.inverted_colors ? "#dfdfdf" : "#777";
		row.css("background-color", color);
		//row.scrollintoview();

	    } else {
		
		row.removeAttr("style");
	    
	    }
    
	}
  
    }

};

ispy.highlightObject = function(objectId) {

    var selected = ispy.scene.getObjectById(Number(objectId), true);

    document.body.style.cursor = "pointer";
    
    if ( selected ) {
    
	if ( ispy.highlighted != selected && selected.visible ) {
      
	    if ( ispy.highlighted ) {

		ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
      
	    }

	    ispy.highlighted = selected;
	    ispy.highlighted.current_color = ispy.highlighted.material.color.getHex();
	    ispy.highlighted.material.color.setHex(0xcccccc);
    
	}
  
    }

};

ispy.unHighlightObject = function() {

    document.body.style.cursor = "default";
    
    if ( ispy.highlighted ) {
	
	ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
	ispy.highlighted = null;
  
    }

};


ispy.clickRow = function(objectId) {

    console.log(objectId);
    
    ispy.intersected = ispy.scene.getObjectById(Number(objectId), true);

    // We only want to do this for muons and electrons since
    // it's only to show what objects are selected for invariant mass.
    if ( ispy.intersected.name.includes('Muon') ||
	 ispy.intersected.name.includes('Electron') ) {
	
	if ( ispy.intersected.selected ) {
	    
	    const original_color = new THREE.Color(
		ispy.event_description[ispy.current_view][ispy.intersected.name].style.color
	    );
	    
	    ispy.intersected.material.color = original_color;
	    ispy.intersected.selected = false;
	    
	    if ( ispy.selected_objects.has(ispy.intersected.id) ) {
		
		ispy.selected_objects.delete(ispy.intersected.id);
		
	    }
	    	    
	} else {

	    ispy.intersected.material.color.setHex(0x808080);
	    ispy.intersected.selected = true;
	    ispy.displayEventObjectData();
	    
	}

    }
};
