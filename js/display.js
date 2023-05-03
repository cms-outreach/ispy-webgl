import { Color, Vector2 } from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

import {
    inverted_colors,
    render,
    renderer,
    renderer_name,
    scene,
    camera,
    raycaster,
    zoomIn,
    zoomOut,
    exportScene,
    current_view
} from "./setup.js";

import { current_event } from "./objects-add.js";
import { event_description } from "./objects-config.js";
import { nextEvent, prevEvent } from "./files-load.js";

let intersected = null;
let currentCollection;

function updateRendererInfo() {

    var info = renderer.info;

    var html = "<strong>"+ renderer_name + " info: </strong>";
    
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

    document.getElementById('renderer-info').innerHTML = html;

};

function updateRenderer(type) {

    if ( type === renderer_name ) {
	
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

    useRenderer(type);

    // Fix this
    var ncontrols = new TrackballControls(camera, renderer.domElement);
    ncontrols.rotateSpeed = 3.0;
    ncontrols.zoomSpeed = 0.5;
    controls = ncontrols;
    
    updateRendererInfo();

};

// Given an object3d this returns the ids of its children
function getObjectIds(obj) {

    const ids = [];

    obj.children.forEach(function(c) {
	    
	    ids.push(c.id);

	});

    return ids;

};

function onMouseMove(e) {
  
    e.preventDefault();

    const container = document.querySelector('canvas');

    const display = document.getElementById('display');
    const w = display.clientWidth;
    const h = display.clientHeight;

    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    const offsetX = display.getBoundingClientRect().left + window.pageXOffset - left;
    const offsetY = display.getBoundingClientRect().top + window.pageYOffset - top;

    const pointer = new Vector2();
    
    pointer.x = ((e.clientX-offsetX) / w)*2 - 1;
    pointer.y = -((e.clientY-offsetY) / h)*2 +1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(scene.getObjectByName("Physics"), true);

    if ( intersected ) {

	// Undo selection stuff
	container.style.cursor = 'auto';
	
	if ( ! intersected.selected ) {
	
	    const original_color = new Color(
		event_description[current_view][intersected.name].style.color
	    );

	    intersected.material.color = original_color;

	} else {

	    intersected.material.color.setHex(0xcccccc);

	}

	intersected = null;
	
    }
    
    if ( intersects.length > 0 ) {

	const res = intersects.filter(function(res) {

	    return res && res.object;
	    
	})[0];
	
	if ( res && res.object ) {

	    // Selection stuff happens
	    intersected = res.object;

	    container.style.cursor = 'pointer';
	    
	    var original_color = intersected.material.color;
	    intersected.material.color.setHex(0xcccccc);

	    displayCollection(
		intersected.name, "Physics", 
		event_description[current_view][intersected.name].name, 
		getObjectIds(scene.getObjectByName(intersected.name))
	    );
	    
	}

    }

};

let selected_objects = new Map();
let hidden_objects = [];
let shift_pressed;

function onMouseDown(e) {
    
    if ( intersected ) {
	
	// We only want to do this for muons and electrons since
	// it's only to show what objects are selected for invariant mass.
	if ( intersected.name.includes('Muon') ||
	     intersected.name.includes('Electron') ) {

	    if ( intersected.selected ) {
	    
		const original_color = new Color(
		    event_description[current_view][intersected.name].style.color
		);
		
		intersected.material.color = original_color;
		intersected.selected = false;

		if ( selected_objects.has(intersected.id) ) {

		    selected_objects.delete(intersected.id);
		
		}
	    
	    
	    } else {

		intersected.material.color.setHex(0x808080);
		intersected.selected = true;
		displayEventObjectData();
	    
	    }

	}
	
    }

};

document.addEventListener('keyup', function(e) {

    if ( e.shiftKey || e.key  === 'Shift' ) {
	
	shift_pressed = false;
	
    }

});

document.addEventListener('keydown', function(e) {
    
    // Instead of a button, make output of 3D to JSON a "secret" key binding
    // If shift + e then export
    if ( e.which === 69 && e.shiftKey ) {
	
	exportScene();
	
    }
    
    // up arrow
    if ( e.which === 38 && e.shiftKey ) {
	
	zoomIn();
	
    }
    
    // down
    if ( e.which === 40 && e.shiftKey ) {
	
	zoomOut();
	
    }
    
    // right
    if ( e.which === 39 ) {

	nextEvent();

    }

    // left
    if ( e.which === 37 ) {

	prevEvent();

    }

    // shift+a to toggle animation
    if ( e.which === 65 && e.shiftKey ) {
	
	toggleAnimation();
	
    }

    if ( e.shiftKey || e.key === 'Shift' ) {
	
	shift_pressed = true;
	
    }

    // M
    if ( e.which === 77 ) {
	
	showMass();
	
    }

    // H
    if ( e.which === 72 ) {

	if ( intersected && intersected.name.includes('Jet') ) {

	    intersected.material.color = new Color(
		event_description[current_view][intersected.name].style.color
	    );

	    intersected.visible = false;
	    hidden_objects.push(intersected);

	}
	  	
    }

    // S
    if ( e.which === 83 ) {

	const hidden_object = hidden_objects.pop();

	if ( hidden_object ) {

	    hidden_object.visible = true;

	}
	
    }
    
});

const mMuon2 = 0.10566*0.10566;
const mElectron2 = 0.511e-3*0.511e-3;

function displayCollection(key, group, name, objectIds) {
 
    currentCollection = key;
 
    const type = current_event.Types[key];
    const collection = current_event.Collections[key];
    const collectionTable = $('#collection-table');
  
    collectionTable.empty();
    collectionTable.append('<caption>' + group + ': ' + name + '</caption>');
    collectionTable.append('<thead> <tr>');
    
    const collectionTableHead = collectionTable.find('thead').find('tr');  
    const color_class = inverted_colors ? 'group white' : 'group black';

    collectionTableHead.append($('<th class="'+ color_class +'" data-sort="int"><i class="fa fa-sort"></i>index</th>'));
    
    for ( let t in type ) {

	let dataSort = type[t][1] === "double" ? "float" : type[t][1];
	collectionTableHead.append($('<th class="'+ color_class +'" data-sort="' + dataSort + '"><i class="fa fa-sort"></i> ' + type[t][0] + '</th>'));
  
    }

    let index = 0;
    
    for ( let c in collection ) {
	
	//let row_content = "<tr id='" + key.concat(index++) + "' onmouseenter='ispy.highlightObject(\"" + objectIds[c] + "\")' onmouseout='ispy.unHighlightObject()'>";

	let row_content = "<tr id='" + key.concat(index++) + "' >";
	
	let i = index-1;
	row_content += "<td>"+ i + "</td>";
	
	for ( let v in collection[c] ) {
  
	    row_content += "<td>"+collection[c][v]+"</td>";

	}

	let rc = $(row_content);
	collectionTable.append(rc);

	/* FIXME

	document.getElementById(key.concat(index++)).onmouseenter = function() {
	    
	    highlightObject(objectIds[c])

	};
	
	document.getElementById(key.concat(index++)).onmouseout = unHighlightObject;
	*/
	
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

function showMass() {

    var m = 0;
    var sumE = 0;
    var sumPx = 0;
    var sumPy = 0;
    var sumPz = 0;
    
    selected_objects.forEach(function(o, key) {

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

    document.getElementById('invariant-mass').innerHTML = m.toFixed(2);
    //document.getElementById('invariant-mass-modal').style.display = 'block';
    $('#invariant-mass-modal').modal('show');
    
    selected_objects.clear();

};

function displayEventObjectData() {

    const key = intersected.name;
    
    const isMuon = key.includes('Muon');
    const isElectron = key.includes('Electron');

    if ( ! ( isMuon || isElectron ) ) {

	return;

    }

    const objectUserData = intersected.userData;
    const type = current_event.Types[key];
    const eventObjectData = current_event.Collections[key][objectUserData.originalIndex];
    
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

    intersected.four_vector = {'E':E, 'px':px, 'py':py, 'pz':pz};
    intersected.ptype = ptype;
    
    selected_objects.set(intersected.id, intersected);
    
};

function highlightTableRow(key, objectUserData, doEffect) {
 
    if ( ( currentCollection == key && doEffect ) || ! doEffect ) {
	
	var selector = "#" + key.concat(objectUserData.originalIndex);
	var row = $(selector);

	if ( row ) {
	    
	    if ( doEffect ) {
		
		var color = ispy.inverted_colors ? "#dfdfdf" : "#777";
		row.css("background-color", color);
		row.scrollintoview();

	    } else {
		
		row.removeAttr("style");
	    
	    }
    
	}
  
    }

};

function highlightObject(objectId) {

    var selected = scene.getObjectById(Number(objectId), true);

    if ( selected ) {
    
	if ( highlighted != selected && selected.visible ) {
      
	    if ( highlighted ) {

		highlighted.material.color.setHex(highlighted.current_color);
      
	    }

	    highlighted = selected;
	    highlighted.current_color = highlighted.material.color.getHex();
	    highlighted.material.color.setHex(0xcccccc);
    
	}
  
    }

};

function unHighlightObject() {
    
    if ( highlighted ) {
	
	highlighted.material.color.setHex(highlighted.current_color);
	highlighted = null;
  
    }

};

export {
    selected_objects,
    onMouseMove,
    onMouseDown,
    displayCollection,
    getObjectIds,
    updateRendererInfo
};
