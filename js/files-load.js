import { Mesh, Line } from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {
    scene,
    scenes,
    import_transparency,
    local_planes
} from "./setup.js";

import { selected_objects } from "./display.js";
import { current_event, addEvent } from "./objects-add.js";
import { addSelectionRow } from "./tree-view.js";
import { disabled } from "./objects-config.js";

let ig_data = null;
let ievent = 0;
let isGeometry = false;
let loaded_local = false;

let event_index, file_name;
let event_list = [];

let local_files;
let selected_gltf, selected_obj;

function openDialog(id) {

    //document.getElementById(id).style.display = 'block';
    $(id).modal('show');

};

function closeDialog(id) {

    //document.getElementById(id).style.display = 'none';
    $(id).modal('hide');

};

function hasFileAPI() {

    if ( window.FileReader ) {
    
	return true;
  
    } else {
    
	console.log("FileReader", window.FileReader);
	console.log("File", window.File);
	console.log("FileList", window.FileList);
	console.log("FileSystem", window.FileSystem);

	return false;
  
    }

};

function clearTable(id) {

    let tbl = document.getElementById(id);
    
    while (tbl.rows.length > 0) {
	
	tbl.deleteRow(0);
    
    }
    
};

function selectEvent(index) {

    document.getElementById('selected-event').innerHTML = file_name+': '+event_list[index];
    
    event_index = index;

    document.getElementById('load-event').classList.remove('disabled');

};

function updateEventList(event_list) {

    clearTable("browser-events");
    let tbl = document.getElementById("browser-events");

    console.log(event_list);
    
    for ( let i = 0; i < event_list.length; i++ ) {
	
	let e = event_list[i];
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);

	/*
	cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="selectEvent(\'' + i + '\');">' + e + '</a>';
	*/

	cell.innerHTML = '<a id="browser-event-' + i + '" class="event">' + e + '</a>';

	document.getElementById("browser-event-"+i).onclick = function() {

	    selectEvent(i)

	};

    }

};

function enableNextPrev() {

    if ( event_index > 0 ) {

	document.getElementById('prev-event-button').classList.remove('disabled');
    
    } else {

	document.getElementById('prev-event-button').classList.add('disabled');
  
    }

    if ( event_list && event_list.length - 1 > event_index ) {

	document.getElementById('next-event-button').classList.remove('disabled');
    
    } else {

	document.getElementById('next-event-button').classList.add('disabled');
    
    }

};

function loadEvent() {

    document.getElementById('event-loaded').innerHTML = '';
    //document.getElementById('loading').style.display = 'block';
    
    //$("#event-loaded").html("");
    $("#loading").modal("show");

    selected_objects.clear();

    // Hide Detector stuff in tree view if already shown
    if ( $('i.Detector').hasClass('glyphicon-chevron-down') ) {
	
	toggleCollapse('Detector');

    }
    
    let event;

    try {
	
	event = JSON.parse(cleanupData(ig_data.file(event_list[event_index]).asText()));
  
    } catch(err) {
    
	alert(err);
    
    }

    //document.getElementById('loading').style.display = 'none';
    $("#loading").modal("hide");

    if ( isGeometry ) {

	$.extend(detector, event);
	addDetector();
	isGeometry = false;

    } else {

	addEvent(event);
	enableNextPrev();
	
	let ievent = +event_index + 1; // JavaScript!

	document.getElementById('event-loaded').innerHTML = file_name + ":" + event_list[event_index] + "  [" + ievent + " of " + event_list.length + "]";
	
	console.log(current_event.Types);
	console.log(current_event.Collections.Products_V1);
	
    }
    
};

function nextEvent() {

    if ( event_list && event_list.length-1 > event_index ) {
    
	event_index++;
	loadEvent();
  
    }

};

function prevEvent() {

    if ( event_list && event_index > 0 ) {

	event_index--;
	loadEvent();
  
    }

};

function selectLocalFile(index) {

    var reader = new FileReader();
    file_name = local_files[index].name;

    reader.onload = function(e) {
    
	var data = e.target.result;
	var zip = new JSZip(data);
	event_list = [];

	$.each(zip.files, function(index, zipEntry) {

		if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {
		    
		    if ( zipEntry.name.split('/')[0] === 'Geometry' ) {
          
			isGeometry = true;
		    
		    }
        
		    event_list.push(zipEntry.name);
		}
	    });

	//event_list = event_list;
	event_index = 0;
	updateEventList(event_list);
	ig_data = zip;
    
    };

    reader.onerror = function(e) {
    
	alert(e);
  
    };

    reader.readAsArrayBuffer(local_files[index]);

};

function updateLocalFileList(list) {

    clearTable("browser-files");
    let tbl = document.getElementById("browser-files");

    for ( let i = 0; i < list.length; i++ ) {
	
	let name = list[i].name;
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);
	let cls = "file";

	/*
	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="selectLocalFile(\'' + i + '\');">' + name + '</a>';
	*/

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '">' + name + '</a>';
	
	document.getElementById("browser-file-"+i).onclick = function() {

	    selectLocalFile(i)

	};
	
    }

};

function loadLocalFiles() {

    if ( ! hasFileAPI() ) {
	
	var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
	err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
	err_msg += "Alternatively, open a file from the web. ";
	alert(err_msg);
    
	return;
  
    }

    document.getElementById('load-event').classList.add('disabled');
    //$('#load-event').addClass('disabled');

    clearTable("browser-files");
    clearTable("browser-events");

    document.getElementById('selected-event').innerHTML = "Selected event";
    //$('#selected-event').html("Selected event");
    
    local_files = document.getElementById('local-files').files;
    updateLocalFileList(local_files);
    loaded_local = true;
    openDialog('#files');

};

function loadDroppedFile(file) {

    var reader = new FileReader();
    file_name = file.name;

    //document.getElementById('loading').style.display = 'block';
    $('#loading').modal('show');

    reader.onload = function(e) {

	var data = e.target.result;
	var zip = new JSZip(data);

	event_list = [];

	$.each(zip.files, function(index, zipEntry) {

	    if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {

		if ( zipEntry.name.split('/')[0] === 'Geometry' ) {
			
		    isGeometry = true;
			
		}
		    
		event_list.push(zipEntry.name);

	    }

	});

	//event_list = event_list;
	event_index = 0;
	updateEventList(event_list);
	ig_data = zip;
	
	loadEvent();

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

    };

    reader.onerror = function(e) {

	alert(e);

    };

    reader.readAsArrayBuffer(file);

};

function selectFile(filename) {

    console.log(filename);
    
    clearTable("browser-events");

    var new_file_name = filename.split('/')[2]; // of course this isn't a general case for files
    file_name = new_file_name;

    //document.getElementById('progress').style.display = 'block';
    $('#progress').modal('show');
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    
    clearTable("browser-events");
    var ecell = document.getElementById("browser-events").insertRow(0).insertCell(0);
    ecell.innerHTML = 'Loading events...';

    xhr.onprogress = function(evt) {
    
	if ( evt.lengthComputable ) {
     
	    var percentComplete = Math.round((evt.loaded / evt.total)*100);
	    $('.progress-bar').attr('style', 'width:'+percentComplete+'%;');
	    $('.progress-bar').html(percentComplete+'%');
   
	}
    
    };

    xhr.onreadystatechange = function () {
   
	if ( this.readyState === 4 ) {

	    //document.getElementById('progress').style.display = 'none';

	    let progress_bars = document.querySelectorAll('progress-bar');
	    progress_bars.forEach(pb => {

		pb.style.width = '0%';
		pb.innerHTML = '0%';

	    });

	    $('#progress').modal('hide');
	    //$('.progress-bar').attr('style', 'width:0%;');
	    //$('.progress-bar').html('0%');
    
	}
  
    };

    xhr.onload = function() {
    
	if ( this.status === 200 ) {

	    var zip = JSZip(xhr.responseText);
	    event_list = [];
	    
	    $.each(zip.files, function(index, zipEntry) {
		    
		if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {

		    console.log(zipEntry.name);
		    
		    event_list.push(zipEntry.name);
        
		}
      
	    });

	    //event_list = event_list;
	    event_index = 0;
	    updateEventList(event_list);
	    ig_data = zip;
	
	}
  
    };

    xhr.send();

};

function loadWebFiles() {

    const web_files = [
	"./data/Hto4l_120-130GeV.ig",
	"./data/BJetPlusX_Run2012C_0.ig",
	"./data/DoubleMuParked_Run2012C_0.ig",
	"./data/MET_Run2012C_0.ig",
	"./data/TauParked_Run2012C_0.ig",
	"./data/DoubleElectron_Run2012C_0.ig",
	"./data/DoublePhoton_Run2012B_0.ig",
	"./data/JetHT_Run2012C_0.ig",
	"./data/MinimumBias_Run2012C_0.ig"
    ];

    document.getElementById('selected-event').innerHTML = "Selected event";
    document.getElementById('load-event').classList.add('disabled');
    
    //$('#selected-event').html("Selected event");
    //$('#load-event').addClass('disabled');

    let tbl = document.getElementById("browser-files");

    for ( let i = 0; i < web_files.length; i++ ) {
	
	let e = web_files[i];
	let name = e.split("/")[2];
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);
	let cls = "file";

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '">' + name + '</a>';

	document.getElementById("browser-file-"+i).onclick = function() {

	    selectFile(e)

	};
	
    }

};

function showWebFiles() {

    openDialog('#files');

    if ( loaded_local === true ) {
    
	// If we have previously opened a local file then
	// we don't want its contents appearing
	// in the web files dialog
	clearTable("browser-files");
	clearTable("browser-events");
	loaded_local = false;

	loadWebFiles();
  
    }

    //document.getElementById('open-files').style.display = 'none';
    $('#open-files').modal('hide');

};

function cleanupData(d) {

    // rm non-standard json bits
    // newer files will not have this problem
    d = d.replace(/\(/g,'[')
    .replace(/\)/g,']')
    .replace(/\'/g, "\"")
    .replace(/nan/g, "0");
    
    return d;

};

function loadGLTFFiles() {
    
    const gltf_files = [
	'./geometry/gltf/EB.glb',
	'./geometry/gltf/EEminus.glb',
	'./geometry/gltf/EEplus.glb',
	'./geometry/gltf/ESminus.glb',
	'./geometry/gltf/ESplus.glb',
	'./geometry/gltf/muon-barrel.glb',
	'./geometry/gltf/muon-endcap-minus.glb',
	'./geometry/gltf/muon-endcap-plus.glb',
	'./geometry/gltf/muon-rphi-minus.glb',
	'./geometry/gltf/muon-rphi-plus.glb',
	'./geometry/gltf/muon-0.glb',
	'./geometry/gltf/muon-1.glb',
	'./geometry/gltf/muon-2.glb',
	'./geometry/gltf/muon-3.glb',
	'./geometry/gltf/HF.glb'
    ];
    
    clearTable('obj-files');

    document.getElementById('selected-obj').innerHTML = "Selected geometry";
    document.getElementById('load-obj').classList.add('disabled');
    
    //$('#selected-obj').html("Selected geometry");
    //$('#load-obj').addClass('disabled');

    let tbl = document.getElementById('obj-files');
    
    for ( let i = 0; i < gltf_files.length; i++ ) {
	
	let e = gltf_files[i];
	let name = e.split('/')[3];
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);
	let cls = "file";

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="selectGLTF(\'' + name + '\');">' + name + '</a>';
  
    }

};

function loadObjFiles() {

    const obj_files = [
	'./geometry/obj/EB.obj',
	'./geometry/obj/EEminus.obj',
	'./geometry/obj/EEplus.obj',
	'./geometry/obj/ESminus.obj',
	'./geometry/obj/ESplus.obj',
	'./geometry/obj/muon-barrel.obj',
	'./geometry/obj/muon-endcap-minus.obj',
	'./geometry/obj/muon-endcap-plus.obj',
	'./geometry/obj/muon-rphi-minus.obj',
	'./geometry/obj/muon-rphi-plus.obj',
	'./geometry/obj/muon-0.obj',
	'./geometry/obj/muon-1.obj',
	'./geometry/obj/muon-2.obj',
	'./geometry/obj/muon-3.obj',
	'./geometry/obj/HF.obj'
     ];

    clearTable('obj-files');
    
    document.getElementById('selected-obj').innerHTML = "Selected geometry";
    document.getElementById('load-obj').classList.add('disabled');
    
    //$('#selected-obj').html("Selected geometry");
    //$('#load-obj').addClass('disabled');

    let tbl = document.getElementById('obj-files');
    
    for ( let i = 0; i < obj_files.length; i++ ) {
	
	let e = obj_files[i];
	let name = e.split('/')[3];
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);
	let cls = "file";

	console.log(name);
	
	//cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="selectObj(\'' + name + '\');">' + name + '</a>';

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" >' + name + '</a>';
	
	document.getElementById("browser-file-"+i).onclick = function() {

	    //console.log(name);
	    
	    selectObj(name);

	};
	
    }

};

function readOBJ(file, cb) {

    var reader = new FileReader();

    reader.onload = function(e) {

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');
	cb(e.target.result, file.name);

    };

    reader.onerror = function(e) {
    
	alert(e);
  
    };

    reader.readAsText(file);

};

function loadOBJ(contents, name) {

    let object = new OBJLoader().parse(contents);
    object.name = name;

    object.children.forEach(function(c) {
    
	    c.material.transparency = true;
	    c.material.opacity = import_transparency;
  
	});

    scene.getObjectByName("Imported").add(object);
    addSelectionRow("Imported", object.name, object.name, [], true);

};

function readOBJMTL(file, mtl_file, cb) {

    let reader = new FileReader();

    reader.onload = function(e) {
	
	cb(e.target.result, mtl_file, file.name);
  
    };

    reader.onerror = function(e) {
	
	alert(e);
  
    };

    reader.readAsText(file);

};

function loadOBJMTL(obj, mtl_file, name) {
 
    let object = new OBJLoader().parse(obj);
    let reader = new FileReader();

    reader.onload = function(e) {

	let mtl = e.target.result;
	let materials_creator = new MTLLoader().parse(e.target.result);
	materials_creator.preload();

	object.traverse(function (o) {

		if ( o instanceof Mesh || o instanceof Line ) {
       
		    if ( o.material.name ) {

			var material = materials_creator.create(o.material.name);

			if ( material ) {

			    o.material = material;
			    o.material.transparent = true;
			    o.material.opacity = import_transparency;
			    
			}
		    }
		}

	    });

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

	object.name = name;
	object.visible = true;
	disabled[name] = false;

	scene.getObjectByName("Imported").add(object);
	addSelectionRow("Imported", name, name, [], true);
  
    };

    reader.readAsText(mtl_file);

};

function importModel() {
  
    if ( ! hasFileAPI() ) {
	
	var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
	err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
	err_msg += "Alternatively, open a file from the web. ";
	alert(err_msg);
    
	return;
  
    }

    let files = document.getElementById('import-file').files;
    let extension, file_name;
    
    if ( files.length === 1 ) { // If one file we assume it's an obj file and load it
    
	file_name = files[0].name;
	extension = file_name.split('.').pop().toLowerCase();
    
	if ( extension !== 'obj' ) {
      
	    alert('The file you attempted to load: "'+ file_name +'" does not appear (at least from the extension) to be an .obj file!');
	    return;
	
	}

	//document.getElementById('loading').style.display = 'block';
	//document.getElementById('import-model').style.display = 'none';
	
	$('#loading').modal('show');
	$('#import-model').modal('hide');

	readOBJ(files[0], loadOBJ);

    } else if ( files.length === 2 ) { // We support for now either one obj file or an obj file and an mtl file
    
	let obj_file, mtl_file;

	let ext1 = files[0].name.split('.').pop().toLowerCase();
	let ext2 = files[1].name.split('.').pop().toLowerCase();

	if ( ext1 === 'obj' && ext2 === 'mtl' ) {
      
	    obj_file = files[0];
	    mtl_file = files[1];

	} else if ( ext1 === 'mtl' && ext2 === 'obj' ) {
        
	    obj_file = files[1];
	    mtl_file = files[0];

	} else{
        
	    alert('For now, this application supports either loading one .obj file or loading an .obj file and a corresponding .mtl file!');
	    return;
	
	}
	
	//document.getElementById('loading').style.display = 'block';
	//document.getElementById('import-model').style.display = 'none';
	
	$('#loading').modal('show');
	$('#import-model').modal('hide');

	readOBJMTL(obj_file, mtl_file, loadOBJMTL);
	
    } else {
    
	alert('For now, this application supports either loading one .obj file or loading an .obj file and a corresponding .mtl file!');
	return;
    
    }

};

function selectGLTF(gltf_file) {

    document.getElementById('selected-obj').innerHTML = gltf_file;
    document.getElementById('load-obj').classList.remove('disabled');
    
    //$('#selected-obj').html(gltf_file);
    //$('#load-obj').removeClass('disabled');

    selected_gltf = gltf_file;
    
};

function loadSelectedGLTF() {

    let name = selected_gltf.split('.')[0];
    let gltf_file = './geometry/gltf/'+selected_gltf;
    
    const gltf_loader = new GLTFLoader();

    gltf_loader.load(
	gltf_file,
	function(gltf) {
	    
	    let object = gltf.scene.children[0];

	    object.children.forEach(function(c) {

		c.material.clippingPlanes = local_planes;
			
	    });

	    scene.getObjectByName('Imported').add(object);
	    addSelectionRow('Imported', name, name, [], true);
	    
	}
    );

};

function selectObj(obj_file) {
    
    document.getElementById('selected-obj').innerHTML = obj_file;
    document.getElementById('load-obj').classList.remove('disabled');
    
    //$('#selected-obj').html(obj_file);
    //$('#load-obj').removeClass('disabled');

    selected_obj = obj_file;

};

function loadSelectedObj() {

    var name = selected_obj.split('.')[0];
    var obj_file = './geometry/obj/'+selected_obj;
    var mtl_file = './geometry/obj/'+name+'.mtl';

    loadOBJMTL_new(obj_file, mtl_file, name, name, 'Imported', true);
    
};

function loadOBJMTL_new(obj_file, mtl_file, id, name, group, show) {

    var mtl_loader = new MTLLoader();

    mtl_loader.load(mtl_file, function(materials) {

	materials.preload();

	var obj_loader = new OBJLoader();
	obj_loader.setMaterials(materials);

	obj_loader.load(obj_file, function(object) {

	    object.name = id;
	    object.visible = show;
	    disabled[object.name] = false;
	    
	    object.children.forEach(function(c) {
        
		c.material.transparent = true;
		c.material.opacity = import_transparency;
		c.material.clippingPlanes = local_planes;
      
	    });

	    scene.getObjectByName(group).add(object);
	    addSelectionRow(group, object.name, name, [], show);

	});

    });

    return;

};

function importBeampipe() {

    loadOBJMTL_new(
	'./geometry/obj/beampipe.obj',
	'./geometry/obj/beampipe.mtl',
	'BeamPipe',
	'Beam Pipe',
	'Imported',
	true
    );

};

function importDetector() {

    const gltf_loader = new GLTFLoader();
    
    const gltf_objs = [
	{
	    id: 'PixelBarrel3D_V1',
	    name: 'Pixel Barrel',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/PixelBarrel3D_V2.glb' // V2 for pixels corresponds to phase 1 upgrade
	},
	{
	    id: 'PixelEndcapPlus3D_V1',
	    name: 'Pixel Endcap (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/PixelEndcapPlus3D_V2.glb'
	},
	{
	    id: 'PixelEndcapMinus3D_V1',
	    name: 'Pixel Endcap (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/PixelEndcapMinus3D_V2.glb'
	},
	{
	    id: 'SiStripTIB3D_V1',
	    name: 'Tracker Inner Barrel',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTIB3D_V1.glb'
	},
	{
	    id: 'SiStripTOB3D_V1',
	    name: 'Tracker Outer Barrel',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTOB3D_V1.glb'
	},
	{
	    id: 'SiStripTIDPlus3D_V1',
	    name: 'Tracker Inner Detector (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTIDPlus3D_V1.glb'
	},
	{
	    id: 'SiStripTIDMinus3D_V1',
	    name: 'Tracker Inner Detector (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTIDMinus3D_V1.glb'
	},
	{
	    id: 'SiStripTECPlus3D_V1',
	    name: 'Tracker Endcap (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTECPlus3D_V1.glb'
	},
	{
	    id: 'SiStripTECMinus3D_V1',
	    name: 'Tracker Endcap (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/SiStripTECMinus3D_V1.glb'
	},
	{
	    id: 'EcalBarrel3D_V1',
	    name: 'ECAL Barrel',
	    group: 'Detector',
	    show: true,
	    view: '3D',
	    file: './geometry/gltf/EcalBarrel3D_V2.glb'
	},
	{
	    id: 'EcalEndcapPlus3D_V1',
	    name: 'ECAL Endcap (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/EcalEndcapPlus3D_V1.glb'
	},
	{
	    id: 'EcalEndcapMinus3D_V1',
	    name: 'ECAL Endcap (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/EcalEndcapMinus3D_V1.glb'
	},
	{
	    id: 'HcalBarrel3D_V1',
	    name: 'HCAL Barrel',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalBarrel3D_V1.glb',
	},
	{
	    id: 'HcalOuter3D_V1',
	    name: 'HCAL Outer',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalOuter3D_V1.glb'
	},
	{
	    id: 'HcalEndcapPlus3D_V1',
	    name: 'HCAL Endcap (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalEndcapPlus3D_V1.glb'
	},
	{
	    id: 'HcalEndcapMinus3D_V1',
	    name: 'HCAL Endcap (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalEndcapMinus3D_V1.glb'
	},
	{
	    id: 'HcalForwardPlus3D_V1',
	    name: 'HCAL Forward (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalForwardPlus3D_V1.glb'
	},
	{
	    id: 'HcalForwardMinus3D_V1',
	    name: 'HCAL Forward (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/HcalForwardMinus3D_V1.glb'
	},
	{
	    id: 'GEMPlus3D_V1',
	    name: 'Gas Electron Multipliers (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/GEMPlus3D_V1.glb'
	},
	{
	    id: 'GEMMinus3D_V1',
	    name: 'Gas Electron Multipliers (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/GEMMinus3D_V1.glb'
	},
	{
	    id: 'CSC3D_V1',
	    name: 'Cathode Strip Chambers',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/CSC3D_V1.glb'
	},
	{
	    id: 'DTs3D_V1',
	    name: 'Drift Tubes',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/DTs3D_V1.glb'
	},
	{
	    id: 'RPCBarrel3D_V1',
	    name: 'Resistive Plate Chambers (barrel)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/RPCBarrel3D_V1.glb'
	},
	{
	    id: 'RPCPlusEndcap3D_V1',
	    name: 'Resistive Plate Chambers (+)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/RPCPlusEndcap3D_V1.glb'
	},
	{
	    id: 'RPCMinusEndcap3D_V1',
	    name: 'Resistive Plate Chambers (-)',
	    group: 'Detector',
	    show: false,
	    view: '3D',
	    file: './geometry/gltf/RPCMinusEndcap3D_V1.glb'
	},
	{
	    id: 'RhoZ',
	    name: 'RhoZ',
	    group: 'Detector',
	    show: true,
	    view: 'RhoZ',
	    file: './geometry/gltf/RhoZ_V2.glb'
	},
	{
	    id: 'RPhi',
	    name: 'RPhi',
	    group: 'Detector',
	    show: true,
	    view: 'RPhi',
	    file: './geometry/gltf/RPhi_V2.glb'
	}

    ];

    //document.getElementById('loading').style.display = 'block';
    $('#loading').modal('show');

    function loadGLTFs() {

	gltf_objs.map(g => {
	    
	    gltf_loader.load(

		g.file,

		function(gltf) {
		    
		    let object = gltf.scene.children[0];
		    
		    object.name = g.id;
		    object.visible = g.show;
		    object.view = g.view;
		    
		    // Set render order for geometries
		    // Otherwise they won't appear "in-front" of Imported geometries
		    object.children.forEach(function(c) {

			c.renderOrder = 1;

			if ( c.material ) {
			    
			    c.material.clippingPlanes = local_planes;

			}
			
		    });
		    
		    disabled[object.name] = ! g.show;		    
		    scenes[object.view].getObjectByName(g.group).add(object);

		    // For now do not add RPhi and RhoZ selection options to
		    // the controls GUI

		    if ( ! (object.name === 'RPhi' || object.name === 'RhoZ') )
			addSelectionRow(g.group, object.name, g.name, [], g.show);
		
		}
		
	    );

	});

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

    }
    
    loadGLTFs();
    
};

document.getElementById("web-files").onclick = showWebFiles;

document.getElementById("local-files").onchange = loadLocalFiles;
document.getElementById("local-files").onclick = $('#open-files').modal('hide');

document.getElementById("load-event").onclick = function() {

    $('#files').modal('hide');
    loadEvent();

};

document.getElementById("import-button").onclick = function() {

    openDialog('#geometry-files');
    loadObjFiles();
    $('#import-model').modal('hide');

};

document.getElementById("import-file").onchange = importModel;

document.getElementById("load-obj").onclick = function() {

    $('#geometry-files').modal('hide');
    loadSelectedObj();

};
    
export {
    loadWebFiles,
    importDetector,
    nextEvent,
    prevEvent
};
