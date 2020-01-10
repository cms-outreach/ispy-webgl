ispy.obj_files = 
    [
     //'./geometry/EB.obj',
     './geometry/EEminus.obj',
     './geometry/EEplus.obj',
     './geometry/ESminus.obj',
     './geometry/ESplus.obj',
     './geometry/muon-barrel.obj',
     './geometry/muon-endcap-minus.obj',
     './geometry/muon-endcap-plus.obj',
     './geometry/muon-rphi-minus.obj',
     './geometry/muon-rphi-plus.obj',
     './geometry/hf.obj'
     ];

ispy.ig_data = null;
ispy.ievent = 0;
ispy.isGeometry = false;
ispy.loaded_local = false;

ispy.openDialog = function(id) {
  
    $(id).modal('show');

};

ispy.closeDialog = function(id) {

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

    var tbl = document.getElementById(id);
    
    while (tbl.rows.length > 0) {
	
	tbl.deleteRow(0);
    
    }
    
};

ispy.selectEvent = function(index) {
 
    $("#selected-event").html(ispy.file_name+': '+ispy.event_list[index]);
    ispy.event_index = index;
    $('#load-event').removeClass('disabled');

};

ispy.updateEventList = function() {

    ispy.clearTable("browser-events");
    var tbl = document.getElementById("browser-events");

    for ( var i = 0; i < ispy.event_list.length; i++ ) {
    
	var e = ispy.event_list[i];
	var row = tbl.insertRow(tbl.rows.length);
	var cell = row.insertCell(0);
	cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="ispy.selectEvent(\'' + i + '\');">' + e + '</a>';
  
    }

};

ispy.enableNextPrev = function() {

    if ( ispy.event_index > 0 ) {
	
	$("#prev-event-button").removeClass("disabled");
    
    } else {
    
	$("#prev-event-button").addClass("disabled");
  
    }

    if ( ispy.event_list && ispy.event_list.length - 1 > ispy.event_index ) {
	
	$("#next-event-button").removeClass("disabled");
    
    } else {
	
	$("#next-event-button").addClass("disabled");
    
    }

};

ispy.loadEvent = function() {

    $("#event-loaded").html("");
    $("#loading").modal("show");

    // Clear for new event
    ispy.selected_objects.clear();

    // Hide Detector stuff in tree view if already shown
    if ( $('i.Detector').hasClass('glyphicon-chevron-down') ) {

	ispy.toggleCollapse('Detector');

    }
    
    var event;

    try {
	
	event = JSON.parse(ispy.cleanupData(ispy.ig_data.file(ispy.event_list[ispy.event_index]).asText()));
  
    } catch(err) {
    
	alert(err);
    
    }

    $("#loading").modal("hide");

    if ( ispy.isGeometry ) {

	$.extend(ispy.detector, event);
	ispy.addDetector();
	ispy.isGeometry = false;

    } else {

	ispy.addEvent(event);
	ispy.enableNextPrev();
	
	var ievent = +ispy.event_index + 1; // JavaScript!

	$("#event-loaded").html(ispy.file_name + ":" + ispy.event_list[ispy.event_index] + "  [" + ievent + " of " + ispy.event_list.length + "]");
	
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
    var tbl = document.getElementById("browser-files");

    for ( var i = 0; i < list.length; i++ ) {
	
	var name = list[i].name;
	var row = tbl.insertRow(tbl.rows.length);
	var cell = row.insertCell(0);
	var cls = "file";
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

    $('#load-event').addClass('disabled');

    ispy.clearTable("browser-files");
    ispy.clearTable("browser-events");
    $('#selected-event').html("Selected event");
    
    ispy.local_files = document.getElementById('local-files').files;
    ispy.updateLocalFileList(ispy.local_files);
    ispy.loaded_local = true;
    ispy.openDialog('#files');

};

ispy.loadDroppedFile = function(file) {

    var reader = new FileReader();
    ispy.file_name = file.name;
    
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
      
	    $('#progress').modal('hide');
	    $('.progress-bar').attr('style', 'width:0%;');
	    $('.progress-bar').html('0%');
    
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

ispy.loadWebFiles = function(json_file) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", json_file, true);

    xhr.onload = function() {

	if ( this.status === 200 ) {

	    data = JSON.parse(xhr.responseText);
	    ispy.web_files = data;
	
	    $('#selected-event').html("Selected event");
	
	    var tbl = document.getElementById("browser-dirs");

	    for ( var d in data ) {

		tbl.insertRow(tbl.rows.length).insertCell(0).innerHTML = '<a onclick="ispy.showWebDir(\'' + data[d].release + '\');">' + data[d].release + '/' + '</a>';
	   
	    }

	}

    };

    xhr.send();
    
};

ispy.showWebFiles = function() {

  ispy.openDialog('#files');
  ispy.showWebDirs();

  $('#open-files').modal('hide');

};

ispy.showWebDir = function(dir_name) {

    $('#browser-dirs').hide();

    var tbl = document.getElementById("browser-files");
    var files = ispy.web_files.filter(function(w){ return w.release === dir_name; })[0].files;
    tbl.insertRow(tbl.rows.length).insertCell(0).innerHTML = '<a onclick="ispy.showWebDirs();"> ../ </a>';
    
    files.forEach(function(f) {
 
	var filename = "./data/"+dir_name+"/"+f;

	tbl.insertRow(tbl.rows.length).insertCell(0).innerHTML =
	    '<a class="file" onclick="ispy.selectFile(\'' + filename + '\');">' + f + '</a>';

    });

    $('#browser-files').show();

};

ispy.showWebDirs = function() {

  ispy.clearTable('browser-files');
  ispy.clearTable('browser-events');

  $('#selected-event').html("Selected event");
  $('#load-event').addClass('disabled');

  $('#browser-files').hide();
  $('#browser-dirs').show();

};


/*
ispy.loadWebFiles = function() {

    $('#selected-event').html("Selected event");
    $('#load-event').addClass('disabled');

    var tbl = document.getElementById("browser-files");

    for ( var i = 0; i < ispy.web_files.length; i++ ) {
	
	var e = ispy.web_files[i];
	var name = e.split("/")[2];
	var row = tbl.insertRow(tbl.rows.length);
	var cell = row.insertCell(0);
	var cls = "file";
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

    $('#open-files').modal('hide');

};
*/

ispy.cleanupData = function(d) {

    // rm non-standard json bits
    // newer files will not have this problem
    d = d.replace(/\(/g,'[')
    .replace(/\)/g,']')
    .replace(/\'/g, "\"")
    .replace(/nan/g, "0");
    
    return d;

};

// This pattern is starting to appear in several places.
// I should consolidate them into something more elegant than below.

ispy.loadObjFiles = function() {

    ispy.clearTable('obj-files');

    $('#selected-obj').html("Selected geometry");
    $('#load-obj').addClass('disabled');

    var tbl = document.getElementById('obj-files');
    
    for ( var i = 0; i < ispy.obj_files.length; i++ ) {
	
	var e = ispy.obj_files[i];
	var name = e.split('/')[2];
	var row = tbl.insertRow(tbl.rows.length);
	var cell = row.insertCell(0);
	var cls = "file";
	cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectObj(\'' + name + '\');">' + name + '</a>';
  
    }

};

ispy.readOBJ = function(file, cb) {

    var reader = new FileReader();

    reader.onload = function(e) {
	
	$('#loading').modal('hide');
	cb(e.target.result, file.name);

    };

    reader.onerror = function(e) {
    
	alert(e);
  
    };

  
    reader.readAsText(file);

};

ispy.loadOBJ = function(contents, name) {

    var object = new THREE.OBJLoader().parse(contents);
    object.name = name;

    object.children.forEach(function(c) {
    
	    c.material.transparency = true;
	    c.material.opacity = ispy.importTransparency;
  
	});

    ispy.scene.getObjectByName("Imported").add(object);
    ispy.addSelectionRow("Imported", object.name, object.name, true);

};

ispy.readOBJMTL = function(file, mtl_file, cb) {

    var reader = new FileReader();

    reader.onload = function(e) {
	
	cb(e.target.result, mtl_file, file.name);
  
    };

    reader.onerror = function(e) {
	
	alert(e);
  
    };

    reader.readAsText(file);

}

ispy.loadOBJMTL = function(obj, mtl_file, name) {
 
    var object = new THREE.OBJLoader().parse(obj);
    var reader = new FileReader();

    reader.onload = function(e) {

	var mtl = e.target.result;
	var materials_creator = new THREE.MTLLoader().parse(e.target.result);
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

	$('#loading').modal('hide');
	object.name = name;
	object.visible = true;
	ispy.disabled[name] = false;

	ispy.scene.getObjectByName("Imported").add(object);
	ispy.addSelectionRow("Imported", name, name, true);
  
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

    var files = document.getElementById('import-file').files;
    var extension, file_name;
    
    if ( files.length === 1 ) { // If one file we assume it's an obj file and load it
    
	file_name = files[0].name;
	extension = file_name.split('.').pop().toLowerCase();
    
	if ( extension !== 'obj' ) {
      
	    alert('The file you attempted to load: "'+ file_name +'" does not appear (at least from the extension) to be an .obj file!');
	    return;
	
	}

	$('#loading').modal('show');
	$('#import-model').modal('hide');

	ispy.readOBJ(files[0], ispy.loadOBJ);

    } else if ( files.length === 2 ) { // We support for now either one obj file or an obj file and an mtl file
    
	var obj_file, mtl_file;

	var ext1 = files[0].name.split('.').pop().toLowerCase();
	var ext2 = files[1].name.split('.').pop().toLowerCase();

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

	$('#loading').modal('show');
	$('#import-model').modal('hide');

	ispy.readOBJMTL(obj_file, mtl_file, ispy.loadOBJMTL);
	
    } else {
    
	alert('For now, this application supports either loading one .obj file or loading an .obj file and a corresponding .mtl file!');
	return;
    
    }

};

ispy.selectObj = function(obj_file) {

    $('#selected-obj').html(obj_file);
    $('#load-obj').removeClass('disabled');
    ispy.selected_obj = obj_file;

};

ispy.parseOBJMTL = function(obj_file, mtl_file, name) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", obj_file, true);

    xhr.onload = function() {
    
	if ( this.status === 200 ) {
	    
	    var object = new THREE.OBJLoader().parse(xhr.responseText);
	    ispy.parseMTL(object, mtl_file, name);
	
	}
  
    };

    xhr.send();

};

ispy.parseMTL = function(object, mtl_file, name) {
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", mtl_file, true);
    
    xhr.onload = function() {
	
	if ( this.status === 200 ) {

	    var materials = new THREE.MTLLoader().parse(xhr.responseText);
	    materials.preload();

	    object.traverse(function (o) {

		    if ( o instanceof THREE.Mesh || o instanceof THREE.Line ) {

			if ( o.material.name ) {

			    var material = materials.create(o.material.name);

			    if ( material ) {
				
				o.material = material;
				o.material.transparent = true;
				o.material.opacity = ispy.importTransparency;

			    }
          
			}
        
		    }

		});

	    $('#loading').modal('hide');
	    object.name = name;
	    object.visible = true;
	    ispy.disabled[name] = false;
	    
	    ispy.scene.getObjectByName("Imported").add(object);
	    ispy.addSelectionRow("Imported", name, name, true);
	    
	}
    };

    xhr.send();

};

ispy.loadSelectedObj = function() {

    var name = ispy.selected_obj.split('.')[0];
    var obj_file = './geometry/'+ispy.selected_obj;
    var mtl_file = './geometry/'+name+'.mtl';
    
    ispy.parseOBJMTL(obj_file, mtl_file, name);

    // tpmccauley: In-principle this one-line function call should replace
    // all of this function as well as the two above it. However, for some
    // obj+mtl pairs one has to parse both the obj and mtl files first
    // before both can be handled without errors. Ack!
    //ispy.loadOBJMTL_new(obj_file, mtl_file, name, name, true);
    
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
      
			});

		    ispy.scene.getObjectByName(group).add(object);
		    ispy.addSelectionRow(group, object.name, name, show);

		});

	});

    return;

};

ispy.importBeampipe = function() {

    ispy.loadOBJMTL_new('./geometry/beampipe.obj', './geometry/beampipe.mtl', 'BeamPipe', 'Beam Pipe', 'Imported', true);

};
