// For now, hard-code some examples files here for testing
// the "files from the web"
ispy.web_files = [
  "./masterclass-2015/masterclass_samples.ig",
  "./masterclass-2015/masterclass_1.ig",
  "./masterclass-2015/masterclass_2.ig",
  "./masterclass-2015/masterclass_3.ig",
  "./masterclass-2015/masterclass_4.ig",
  "./masterclass-2015/masterclass_5.ig",
  "./masterclass-2015/masterclass_6.ig",
  "./masterclass-2015/masterclass_7.ig",
  "./masterclass-2015/masterclass_8.ig",
  "./masterclass-2015/masterclass_9.ig",
  "./masterclass-2015/masterclass_10.ig",
  "./masterclass-2015/masterclass_11.ig",
  "./masterclass-2015/masterclass_12.ig",
  "./masterclass-2015/masterclass_13.ig",
  "./masterclass-2015/masterclass_14.ig",
  "./masterclass-2015/masterclass_15.ig",
  "./masterclass-2015/masterclass_16.ig",
  "./masterclass-2015/masterclass_17.ig",
  "./masterclass-2015/masterclass_18.ig",
  "./masterclass-2015/masterclass_19.ig",
  "./masterclass-2015/masterclass_20.ig",
  "./masterclass-2015/masterclass_21.ig",
  "./masterclass-2015/masterclass_22.ig",
  "./masterclass-2015/masterclass_23.ig",
  "./masterclass-2015/masterclass_24.ig",
  "./masterclass-2015/masterclass_25.ig",
  "./masterclass-2015/masterclass_26.ig",
  "./masterclass-2015/masterclass_27.ig",
  "./masterclass-2015/masterclass_28.ig",
  "./masterclass-2015/masterclass_29.ig",
  "./masterclass-2015/masterclass_30.ig"
];

ispy.obj_files = [
  "./geometry/muon-barrel.obj",
  "./geometry/muon-endcap-minus.obj",
  "./geometry/muon-endcap-plus.obj",
  "./geometry/hf.obj"
];

ispy.ig_data = null;
ispy.ievent = 0;

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

  for (var i = 0; i < ispy.event_list.length; i++) {
    var e = ispy.event_list[i];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="ispy.selectEvent(\'' + i + '\');">' + e + '</a>';
  }
};

ispy.enableNextPrev = function() {
  if ( ispy.event_index > 0 ) {
    $("#prev-event-button").removeClass("disabled");
  }
  else {
    $("#prev-event-button").addClass("disabled");
  }

  if ( ispy.event_list && ispy.event_list.length - 1 > ispy.event_index ) {
    $("#next-event-button").removeClass("disabled");
  }
  else {
    $("#next-event-button").addClass("disabled");
  }
};

ispy.loadEvent = function() {
  $("#event-loaded").html("");
  $("#loading").modal("show");
  var event;

  try {
    event = JSON.parse(ispy.cleanupData(ispy.ig_data.file(ispy.event_list[ispy.event_index]).asText()));
  } catch(err) {
    alert(err);
  }

  $("#loading").modal("hide");
  ispy.addEvent(event);
  ispy.enableNextPrev();

  var ievent = +ispy.event_index + 1; // JavaScript!

  $("#event-loaded").html(ispy.file_name + ":" + ispy.event_list[ispy.event_index] + "  [" + ievent + " of " + ispy.event_list.length + "]");

  console.log(ispy.current_event.Types);
  console.log(ispy.current_event.Collections.Products_V1);
};

ispy.nextEvent = function() {
  if ( ispy.event_list && ispy.event_list.length-1 > ispy.event_index ) {
    ispy.event_index++;
    ispy.loadEvent();
  }
};

ispy.prevEvent = function() {
  if ( ispy.event_list && ispy.event_index > 0) {
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

    $.each(zip.files, function(index, zipEntry){
      if ( zipEntry._data !== null && zipEntry.name !== "Header" ) {
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

  for (var i = 0; i < list.length; i++) {
    var name = list[i].name;
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    var cls = "file";
    cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectLocalFile(\'' + i + '\');">' + name + '</a>';
  }
};

ispy.loadLocalFiles = function() {
  if (!ispy.hasFileAPI()) {
    var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
    err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
    err_msg += "Alternatively, open a file from the web. ";
    alert(err_msg);
    return;
  }

  $('#load-event').addClass('disabled');

  ispy.clearTable("browser-files");
  ispy.clearTable("browser-events");
  $('#selected-event').html("Choose an event from Events and then Load");

  ispy.local_files = document.getElementById('local-files').files;
  ispy.updateLocalFileList(ispy.local_files);
  ispy.openDialog('#files');
};

ispy.selectFile = function(filename) {
  ispy.clearTable("browser-events");
  $('#selected-event').html("Choose an event from Events and then Load");

  var new_file_name = filename.split('/')[2]; // of course this isn't a general case for files
  ispy.file_name = new_file_name;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", filename, true);
  xhr.overrideMimeType("text/plain; charset=x-user-defined");

  ispy.clearTable("browser-events");
  var ecell = document.getElementById("browser-events").insertRow(0).insertCell(0);
  ecell.innerHTML = 'Loading events...';

  $('#progress').modal('show');

  xhr.onprogress = function(evt) {
    if ( evt.lengthComputable ) {
     var percentComplete = Math.round((evt.loaded / evt.total)*100);
     $('.progress-bar').attr('style', 'width:'+percentComplete+'%;');
     $('.progress-bar').html(percentComplete+'%');
   } else {
     $('#progress').modal('hide');
     $('#loading').modal('show');
  }
 };

  xhr.onreadystatechange = function (evt) {
    if (this.readyState === 4){
      $('#progress').modal('hide');
      $('#loading').modal('hide');

      $('.progress-bar').attr('style', 'width:0%;');
      $('.progress-bar').html('0%');
    }
  };

  xhr.onload = function() {
    if (this.status === 200) {

      var zip = JSZip(xhr.responseText);
      var event_list = [];

      $.each(zip.files, function(index, zipEntry){
        if ( zipEntry._data !== null && zipEntry.name !== "Header" ) {
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
  //ispy.clearTable("browser-files");
  //ispy.clearTable("browser-events");

  //$('#selected-event').html("Selected event");
  $('#selected-event').html("Choose an event from Events and then Load");
  $('#load-event').addClass('disabled');

  var tbl = document.getElementById("browser-files");

  for (var i = 0; i < ispy.web_files.length; i++) {
    var e = ispy.web_files[i];
    var name = e.split("/")[2];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    var cls = "file";
    cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectFile(\'' + e + '\');">' + name + '</a>';
  }
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

// This pattern is starting to appear in several places.
// I should consolidate them into something more elegant than below.

ispy.loadObjFiles = function() {
  ispy.clearTable('obj-files');

  $('#selected-obj').html("Selected event");
  $('#load-obj').addClass('disabled');

  var tbl = document.getElementById('obj-files');

  for (var i = 0; i < ispy.obj_files.length; i++) {
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
  //var object = new THREE.OBJLoader().parse(obj);
  var object = new THREE.OBJMTLLoader().parse(obj);

  var reader = new FileReader();

  reader.onload = function(e) {
    var mtl = e.target.result;
    var materials_creator = new THREE.MTLLoader().parse(e.target.result);
    materials_creator.preload();

    object.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        if (object.material.name) {

          var material = materials_creator.create(object.material.name);

          if (material) {
            object.material = material;
            object.material.transparent = true;
            object.material.opacity = ispy.importTransparency;
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
}

ispy.importModel = function() {
  if (!ispy.hasFileAPI()) {
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

ispy.loadSelectedObj = function() {
  // When loading from the web load the mtl file as well
  var mtl_file = ispy.selected_obj.split('.')[0]+'.mtl';

  var loader = new THREE.OBJMTLLoader();
  loader.load('./geometry/'+ispy.selected_obj, './geometry/'+mtl_file,
    function(object) {
      object.name = ispy.selected_obj;
      object.visible = true;
      ispy.disabled[object.name] = false;

      object.children.forEach(function(c) {
        c.material.transparent = true;
        c.material.opacity = ispy.importTransparency;
      })

      ispy.scene.getObjectByName("Imported").add(object);
      ispy.addSelectionRow("Imported", object.name, object.name, true);

      $('#loading').modal('hide');
    },
    function(xhr) {
      $('#loading').modal('show');
      //console.log((xhr.loaded/xhr.total*100) + '% loaded');
    },
    function(xhr) {
      alert('Yikes! An error occurred');
    })
};

ispy.importBeampipe = function() {
  var loader = new THREE.OBJMTLLoader();
  loader.load('./geometry/beampipe.obj', './geometry/beampipe.mtl', function(object){
    object.name = 'BeamPipe';
    object.visible = true;
    ispy.disabled[object.name] = false;

    ispy.scene.getObjectByName('Imported').add(object);
    ispy.addSelectionRow('Imported', object.name, 'Beam Pipe', true);
  });
};
