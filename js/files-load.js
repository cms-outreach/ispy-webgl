ispy.ig_data = null;
ispy.ievent = 0;
ispy.isGeometry = false;
ispy.loaded_local = false;

ispy.openDialog = function(id) {

    //document.getElementById(id).style.display = 'block';
    $(id).modal('show');

};

ispy.closeDialog = function(id) {

    //document.getElementById(id).style.display = 'none';
    $(id).modal('hide');

};

ispy.hasFileAPI = function() {

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

ispy.clearTable = function(id) {

    let tbl = document.getElementById(id);
    
    while (tbl.rows.length > 0) {
	
	tbl.deleteRow(0);
    
    }
    
};

ispy.selectEvent = function(index) {

    document.getElementById('selected-event').innerHTML = ispy.file_name+': '+ispy.event_list[index];
    //$("#selected-event").html(ispy.file_name+': '+ispy.event_list[index]);
    
    ispy.event_index = index;

    document.getElementById('load-event').classList.remove('disabled');
    //$('#load-event').removeClass('disabled');

};

ispy.updateEventList = function() {

    ispy.clearTable("browser-events");
    let tbl = document.getElementById("browser-events");

    for ( let i = 0; i < ispy.event_list.length; i++ ) {
    
	let e = ispy.event_list[i];
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);

	cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="ispy.selectEvent(\'' + i + '\');">' + e + '</a>';
  
    }

};

ispy.enableNextPrev = function() {

    if ( ispy.event_index > 0 ) {

	document.getElementById('prev-event-button').classList.remove('disabled');
    
    } else {

	document.getElementById('prev-event-button').classList.add('disabled');
  
    }

    if ( ispy.event_list && ispy.event_list.length - 1 > ispy.event_index ) {

	document.getElementById('next-event-button').classList.remove('disabled');
    
    } else {

	document.getElementById('next-event-button').classList.add('disabled');
    
    }

};

ispy.loadEvent = function() {

    document.getElementById('event-loaded').innerHTML = '';
    //document.getElementById('loading').style.display = 'block';
    
    //$("#event-loaded").html("");
    $("#loading").modal("show");

    ispy.selected_objects.clear();

    // Hide Detector stuff in tree view if already shown
    if ( $('i.Detector').hasClass('glyphicon-chevron-down') ) {
	
	ispy.toggleCollapse('Detector');
    }
    
    let event;

    try {
	
	event = JSON.parse(ispy.cleanupData(ispy.ig_data.file(ispy.event_list[ispy.event_index]).asText()));
  
    } catch(err) {
    
	alert(err);
    
    }

    //document.getElementById('loading').style.display = 'none';
    $("#loading").modal("hide");

    if ( ispy.isGeometry ) {

	$.extend(ispy.detector, event);
	ispy.addDetector();
	ispy.isGeometry = false;

    } else {

	ispy.addEvent(event);
	ispy.enableNextPrev();
	
	let ievent = +ispy.event_index + 1; // JavaScript!

	document.getElementById('event-loaded').innerHTML = ispy.file_name + ":" + ispy.event_list[ispy.event_index] + "  [" + ievent + " of " + ispy.event_list.length + "]";
	//$("#event-loaded").html(ispy.file_name + ":" + ispy.event_list[ispy.event_index] + "  [" + ievent + " of " + ispy.event_list.length + "]");
	
	console.log(ispy.current_event.Types);
	console.log(ispy.current_event.Collections.Products_V1);
	
    }
    
};

ispy.nextEvent = function() {

    if ( ispy.event_list && ispy.event_list.length-1 > ispy.event_index ) {
    
	ispy.event_index++;
	ispy.loadEvent();
  
    }

};

ispy.prevEvent = function() {

    if ( ispy.event_list && ispy.event_index > 0 ) {

	ispy.event_index--;
	ispy.loadEvent();
  
    }

};

ispy.selectLocalFile = function(index) {

    var reader = new FileReader();
    ispy.file_name = ispy.local_files[index].name;

    reader.onload = function(e) {
    
	var data = e.target.result;
	var zip = new JSZip(data);
	var event_list = [];

	$.each(zip.files, function(index, zipEntry) {

		if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {
		    
		    if ( zipEntry.name.split('/')[0] === 'Geometry' ) {
          
			ispy.isGeometry = true;
		    
		    }
        
		    event_list.push(zipEntry.name);
		}
	    });

	ispy.event_list = event_list;
	ispy.event_index = 0;
	ispy.updateEventList();
	ispy.ig_data = zip;
    
    };

    reader.onerror = function(e) {
    
	alert(e);
  
    };

    reader.readAsArrayBuffer(ispy.local_files[index]);

};

ispy.updateLocalFileList = function(list) {

    ispy.clearTable("browser-files");
    let tbl = document.getElementById("browser-files");

    for ( let i = 0; i < list.length; i++ ) {
	
	let name = list[i].name;
	let row = tbl.insertRow(tbl.rows.length);
	let cell = row.insertCell(0);
	let cls = "file";

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectLocalFile(\'' + i + '\');">' + name + '</a>';
  
    }

};

ispy.loadLocalFiles = function() {

    if ( ! ispy.hasFileAPI() ) {
	
	var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
	err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
	err_msg += "Alternatively, open a file from the web. ";
	alert(err_msg);
    
	return;
  
    }

    document.getElementById('load-event').classList.add('disabled');
    //$('#load-event').addClass('disabled');

    ispy.clearTable("browser-files");
    ispy.clearTable("browser-events");

    document.getElementById('selected-event').innerHTML = "Selected event";
    //$('#selected-event').html("Selected event");
    
    ispy.local_files = document.getElementById('local-files').files;
    ispy.updateLocalFileList(ispy.local_files);
    ispy.loaded_local = true;
    ispy.openDialog('#files');

};

ispy.loadDroppedFile = function(file) {

    var reader = new FileReader();
    ispy.file_name = file.name;

    //document.getElementById('loading').style.display = 'block';
    $('#loading').modal('show');

    reader.onload = function(e) {

	var data = e.target.result;
	var zip = new JSZip(data);

	var event_list = [];

	$.each(zip.files, function(index, zipEntry) {

	    if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {

		if ( zipEntry.name.split('/')[0] === 'Geometry' ) {
			
		    ispy.isGeometry = true;
			
		}
		    
		event_list.push(zipEntry.name);

	    }

	});

	ispy.event_list = event_list;
	ispy.event_index = 0;
	ispy.updateEventList();
	ispy.ig_data = zip;
	
	ispy.loadEvent();

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

    };

    reader.onerror = function(e) {

	alert(e);

    };

    reader.readAsArrayBuffer(file);

};

ispy.selectFile = function(filename) {
  
    ispy.clearTable("browser-events");

    var new_file_name = filename.split('/')[2]; // of course this isn't a general case for files
    ispy.file_name = new_file_name;

    //document.getElementById('progress').style.display = 'block';
    $('#progress').modal('show');
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    
    ispy.clearTable("browser-events");
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
	    var event_list = [];
	    
	    $.each(zip.files, function(index, zipEntry) {
		    
		if ( zipEntry._data !== null && zipEntry.name !== 'Header' ) {
          
		    event_list.push(zipEntry.name);
        
		}
      
	    });

	    ispy.event_list = event_list;
	    ispy.event_index = 0;
	    ispy.updateEventList();
	    ispy.ig_data = zip;
	
	}
  
    };

    xhr.send();

};

ispy.loadWebFiles = function() {

    const web_files = [
	"./masterclass-2017/masterclass_samples.ig",
	"./masterclass-2017/masterclass_1.ig",
	"./masterclass-2017/masterclass_2.ig",
	"./masterclass-2017/masterclass_3.ig",
	"./masterclass-2017/masterclass_4.ig",
	"./masterclass-2017/masterclass_5.ig",
	"./masterclass-2017/masterclass_6.ig",
	"./masterclass-2017/masterclass_7.ig",
	"./masterclass-2017/masterclass_8.ig",
	"./masterclass-2017/masterclass_9.ig",
	"./masterclass-2017/masterclass_10.ig",
	"./masterclass-2017/masterclass_11.ig",
	"./masterclass-2017/masterclass_12.ig",
	"./masterclass-2017/masterclass_13.ig",
	"./masterclass-2017/masterclass_14.ig",
	"./masterclass-2017/masterclass_15.ig",
	"./masterclass-2017/masterclass_16.ig",
	"./masterclass-2017/masterclass_17.ig",
	"./masterclass-2017/masterclass_18.ig",
	"./masterclass-2017/masterclass_19.ig",
	"./masterclass-2017/masterclass_20.ig",
	"./masterclass-2017/masterclass_21.ig",
	"./masterclass-2017/masterclass_22.ig",
	"./masterclass-2017/masterclass_23.ig",
	"./masterclass-2017/masterclass_24.ig",
	"./masterclass-2017/masterclass_25.ig",
	"./masterclass-2017/masterclass_26.ig",
	"./masterclass-2017/masterclass_27.ig",
	"./masterclass-2017/masterclass_28.ig",
	"./masterclass-2017/masterclass_29.ig",
	"./masterclass-2017/masterclass_30.ig",
	"./masterclass-2017/masterclass_31.ig",
	"./masterclass-2017/masterclass_32.ig",
	"./masterclass-2017/masterclass_33.ig",
	"./masterclass-2017/masterclass_34.ig",
	"./masterclass-2017/masterclass_35.ig",
	"./masterclass-2017/masterclass_36.ig",
	"./masterclass-2017/masterclass_37.ig",
	"./masterclass-2017/masterclass_38.ig",
	"./masterclass-2017/masterclass_39.ig",
	"./masterclass-2017/masterclass_40.ig",
	"./masterclass-2017/masterclass_41.ig",
	"./masterclass-2017/masterclass_42.ig",
	"./masterclass-2017/masterclass_43.ig",
	"./masterclass-2017/masterclass_44.ig",
	"./masterclass-2017/masterclass_45.ig",
	"./masterclass-2017/masterclass_46.ig",
	"./masterclass-2017/masterclass_47.ig",
	"./masterclass-2017/masterclass_48.ig",
	"./masterclass-2017/masterclass_49.ig",
	"./masterclass-2017/masterclass_50.ig",
	"./masterclass-2017/masterclass_51.ig",
	"./masterclass-2017/masterclass_52.ig",
	"./masterclass-2017/masterclass_53.ig",
	"./masterclass-2017/masterclass_54.ig",
	"./masterclass-2017/masterclass_55.ig",
	"./masterclass-2017/masterclass_56.ig",
	"./masterclass-2017/masterclass_57.ig",
	"./masterclass-2017/masterclass_58.ig",
	"./masterclass-2017/masterclass_59.ig",
	"./masterclass-2017/masterclass_60.ig",
	"./masterclass-2017/masterclass_61.ig",
	"./masterclass-2017/masterclass_62.ig",
	"./masterclass-2017/masterclass_63.ig",
	"./masterclass-2017/masterclass_64.ig",
	"./masterclass-2017/masterclass_65.ig",
	"./masterclass-2017/masterclass_66.ig",
	"./masterclass-2017/masterclass_67.ig",
	"./masterclass-2017/masterclass_68.ig",
	"./masterclass-2017/masterclass_69.ig",
	"./masterclass-2017/masterclass_70.ig",
	"./masterclass-2017/masterclass_71.ig",
	"./masterclass-2017/masterclass_72.ig",
	"./masterclass-2017/masterclass_73.ig",
	"./masterclass-2017/masterclass_74.ig",
	"./masterclass-2017/masterclass_75.ig",
	"./masterclass-2017/masterclass_76.ig",
	"./masterclass-2017/masterclass_77.ig",
	"./masterclass-2017/masterclass_78.ig",
	"./masterclass-2017/masterclass_79.ig",
	"./masterclass-2017/masterclass_80.ig",
	"./masterclass-2017/masterclass_81.ig",
	"./masterclass-2017/masterclass_82.ig",
	"./masterclass-2017/masterclass_83.ig",
	"./masterclass-2017/masterclass_84.ig",
	"./masterclass-2017/masterclass_85.ig",
	"./masterclass-2017/masterclass_86.ig",
	"./masterclass-2017/masterclass_87.ig",
	"./masterclass-2017/masterclass_88.ig",
	"./masterclass-2017/masterclass_89.ig",
	"./masterclass-2017/masterclass_90.ig",
	"./masterclass-2017/masterclass_91.ig",
	"./masterclass-2017/masterclass_92.ig",
	"./masterclass-2017/masterclass_93.ig",
	"./masterclass-2017/masterclass_94.ig",
	"./masterclass-2017/masterclass_95.ig",
	"./masterclass-2017/masterclass_96.ig",
	"./masterclass-2017/masterclass_97.ig",
	"./masterclass-2017/masterclass_98.ig",
	"./masterclass-2017/masterclass_99.ig",
	"./masterclass-2017/masterclass_100.ig"
    ];

 /*
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
 */
 
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

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectFile(\'' + e + '\');">' + name + '</a>';
  
    }

};

ispy.showWebFiles = function() {

    ispy.openDialog('#files');

    if ( ispy.loaded_local === true ) {
    
	// If we have previously opened a local file then
	// we don't want its contents appearing
	// in the web files dialog
	ispy.clearTable("browser-files");
	ispy.clearTable("browser-events");
	ispy.loaded_local = false;

	ispy.loadWebFiles();
  
    }

    //document.getElementById('open-files').style.display = 'none';
    $('#open-files').modal('hide');

};

ispy.cleanupData = function(d) {

    // rm non-standard json bits
    // newer files will not have this problem
    d = d.replace(/\(/g,'[')
    .replace(/\)/g,']')
    .replace(/\'/g, "\"")
    .replace(/nan/g, "0");
    
    return d;

};

ispy.loadGLTFFiles = function() {
    
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
    
    ispy.clearTable('obj-files');

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

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectGLTF(\'' + name + '\');">' + name + '</a>';
  
    }

};

ispy.loadObjFiles = function() {

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

    ispy.clearTable('obj-files');
    
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

	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectObj(\'' + name + '\');">' + name + '</a>';
  
    }

};

ispy.readOBJ = function(file, cb) {

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

ispy.loadOBJ = function(contents, name) {

    let object = new THREE.OBJLoader().parse(contents);
    object.name = name;

    object.children.forEach(function(c) {
    
	    c.material.transparency = true;
	    c.material.opacity = ispy.importTransparency;
  
	});

    ispy.scene.getObjectByName("Imported").add(object);
    ispy.addSelectionRow("Imported", object.name, object.name, [], true);

};

ispy.readOBJMTL = function(file, mtl_file, cb) {

    let reader = new FileReader();

    reader.onload = function(e) {
	
	cb(e.target.result, mtl_file, file.name);
  
    };

    reader.onerror = function(e) {
	
	alert(e);
  
    };

    reader.readAsText(file);

};

ispy.loadOBJMTL = function(obj, mtl_file, name) {
 
    let object = new THREE.OBJLoader().parse(obj);
    let reader = new FileReader();

    reader.onload = function(e) {

	let mtl = e.target.result;
	let materials_creator = new THREE.MTLLoader().parse(e.target.result);
	materials_creator.preload();

	object.traverse(function (o) {

		if ( o instanceof THREE.Mesh || o instanceof THREE.Line ) {
       
		    if ( o.material.name ) {

			var material = materials_creator.create(o.material.name);

			if ( material ) {

			    o.material = material;
			    o.material.transparent = true;
			    o.material.opacity = ispy.importTransparency;
			    
			}
		    }
		}

	    });

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

	object.name = name;
	object.visible = true;
	ispy.disabled[name] = false;

	ispy.scene.getObjectByName("Imported").add(object);
	ispy.addSelectionRow("Imported", name, name, [], true);
  
    };

    reader.readAsText(mtl_file);

};

ispy.importModel = function() {
  
    if ( ! ispy.hasFileAPI() ) {
	
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

	ispy.readOBJ(files[0], ispy.loadOBJ);

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

	ispy.readOBJMTL(obj_file, mtl_file, ispy.loadOBJMTL);
	
    } else {
    
	alert('For now, this application supports either loading one .obj file or loading an .obj file and a corresponding .mtl file!');
	return;
    
    }

};

ispy.selectGLTF = function(gltf_file) {

    document.getElementById('selected-obj').innerHTML = gltf_file;
    document.getElementById('load-obj').classList.remove('disabled');
    
    //$('#selected-obj').html(gltf_file);
    //$('#load-obj').removeClass('disabled');

    ispy.selected_gltf = gltf_file;
    
};

ispy.loadSelectedGLTF = function() {

    let name = ispy.selected_gltf.split('.')[0];
    let gltf_file = './geometry/gltf/'+ispy.selected_gltf;
    
    const gltf_loader = new THREE.GLTFLoader();

    gltf_loader.load(
	gltf_file,
	function(gltf) {
	    
	    let object = gltf.scene.children[0];

	    object.children.forEach(function(c) {

		c.material.clippingPlanes = ispy.local_planes;
			
	    });

	    ispy.scene.getObjectByName('Imported').add(object);
	    ispy.addSelectionRow('Imported', name, name, [], true);
	    
	}
    );

};

ispy.selectObj = function(obj_file) {
    
    document.getElementById('selected-obj').innerHTML = obj_file;
    document.getElementById('load-obj').classList.remove('disabled');
    
    //$('#selected-obj').html(obj_file);
    //$('#load-obj').removeClass('disabled');

    ispy.selected_obj = obj_file;

};

ispy.loadSelectedObj = function() {

    var name = ispy.selected_obj.split('.')[0];
    var obj_file = './geometry/obj/'+ispy.selected_obj;
    var mtl_file = './geometry/obj/'+name+'.mtl';

    ispy.loadOBJMTL_new(obj_file, mtl_file, name, name, 'Imported', true);
    
};

ispy.loadOBJMTL_new = function(obj_file, mtl_file, id, name, group, show) {

    var mtl_loader = new THREE.MTLLoader();

    mtl_loader.load(mtl_file, function(materials) {

	materials.preload();

	var obj_loader = new THREE.OBJLoader();
	obj_loader.setMaterials(materials);

	obj_loader.load(obj_file, function(object) {

	    object.name = id;
	    object.visible = show;
	    ispy.disabled[object.name] = false;
	    
	    object.children.forEach(function(c) {
        
		c.material.transparent = true;
		c.material.opacity = ispy.importTransparency;
		c.material.clippingPlanes = ispy.local_planes;
      
	    });

	    ispy.scene.getObjectByName(group).add(object);
	    ispy.addSelectionRow(group, object.name, name, [], show);

	});

    });

    return;

};

ispy.importBeampipe = function() {

    ispy.loadOBJMTL_new(
	'./geometry/obj/beampipe.obj',
	'./geometry/obj/beampipe.mtl',
	'BeamPipe',
	'Beam Pipe',
	'Imported',
	true
    );

};

ispy.importDetector = function() {

    const gltf_loader = new THREE.GLTFLoader();
    
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
			    
			    c.material.clippingPlanes = ispy.local_planes;

			}
			
		    });
		    
		    ispy.disabled[object.name] = ! g.show;		    
		    ispy.scenes[object.view].getObjectByName(g.group).add(object);

		    // For now do not add RPhi and RhoZ selection options to
		    // the controls GUI

		    if ( ! (object.name === 'RPhi' || object.name === 'RhoZ') )
			ispy.addSelectionRow(g.group, object.name, g.name, [], g.show);
		
		}
		
	    );

	});

	//document.getElementById('loading').style.display = 'none';
	$('#loading').modal('hide');

    }
    
    loadGLTFs();
    
};
