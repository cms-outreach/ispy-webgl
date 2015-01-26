// For now, hard-code some examples files here for testing
// the "files from the web"
ispy.web_files = [
  "./data/4lepton.ig",
  "./data/Mu.ig",
  "./data/Electron.ig",
  "./data/masterclass_1.ig"
];

ispy.ig_data = null;

ispy.openDialog = function(id) {
  $(id).modal('show');
}

ispy.closeDialog = function(id) {
  $(id).modal('hide');
}

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
}

ispy.clearTable = function(id) {
  var tbl = document.getElementById(id);
  while (tbl.rows.length > 0) {
    tbl.deleteRow(0);
  }
}

ispy.selectEvent = function(index) {
  $("#selected-event").html(ispy.event_list[index]);
  ispy.event_index = index;
}

ispy.updateEventList = function() {
  ispy.clearTable("browser-events");
  var tbl = document.getElementById("browser-events");

  for (var i = 0; i < ispy.event_list.length; i++) {
    var e = ispy.event_list[i];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="ispy.selectEvent(\'' + i + '\');">' + e + '</a>';
  }
}

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
}

ispy.loadEvent = function() {
  $("#event-loaded").html("");
  $("#loading").modal("show");

  try {
    var event = JSON.parse(ispy.cleanupData(ispy.ig_data.file(ispy.event_list[ispy.event_index]).asText()));
  } catch(err) {
    alert(err);
  }

  $("#loading").modal("hide");
  ispy.addEvent(event);
  ispy.enableNextPrev();

  $("#event-loaded").html(ispy.file_name + ":" + ispy.event_list[ispy.event_index]);
}

ispy.nextEvent = function() {
  if ( ispy.event_list && ispy.event_list.length-1 > ispy.event_index ) {
    ispy.event_index++;
    ispy.loadEvent();
  }
}

ispy.prevEvent = function() {
  if ( ispy.event_list && ispy.event_index > 0) {
    ispy.event_index--;
    ispy.loadEvent();
  }
}

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
  }

  reader.onerror = function(e) {
    alert(e);
  }

  reader.readAsArrayBuffer(ispy.local_files[index]);
}

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
}

ispy.loadLocalFiles = function() {
  if (!ispy.hasFileAPI()) {
    var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
    err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
    err_msg += "Alternatively, open a file from the web. ";
    alert(err_msg);
    return;
  }

  ispy.clearTable("browser-files");
  ispy.clearTable("browser-events");
  $('#selected-event').html("Selected event");

  ispy.local_files = document.getElementById('local-files').files;
  ispy.updateLocalFileList(ispy.local_files);
  ispy.openDialog('#files');
}

ispy.selectFile = function(filename) {
  ispy.file_name = filename.split("/")[2];  // of course this isn't a general case for files

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
  }

  xhr.onreadystatechange = function () {
    if (this.readyState === 4){
      $('#progress').modal('hide');
    }
  }

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
}

ispy.loadWebFiles = function() {
  ispy.clearTable("browser-files");
  ispy.clearTable("browser-events");
  $('#selected-event').html("Selected event");

  var tbl = document.getElementById("browser-files");

  for (var i = 0; i < ispy.web_files.length; i++) {
    var e = ispy.web_files[i];
    var name = e.split("/")[2];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    var cls = "file";
    cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="ispy.selectFile(\'' + e + '\');">' + name + '</a>';
  }
}

ispy.cleanupData = function(d) {
  // rm non-standard json bits
  // newer files will not have this problem
  d = d.replace(/\(/g,'[')
       .replace(/\)/g,']')
       .replace(/\'/g, "\"")
       .replace(/nan/g, "0");
  return d;
}

ispy.exportString = function (output) {
  // This comes from three.js editor
  var blob = new Blob([output], {type: 'text/plain'});
  var objectURL = URL.createObjectURL(blob);
  window.open(objectURL, '_blank');
  window.focus();
}

ispy.exportScene = function() {
  // Only export objects in the scene that are visible.
  // Each visible object is exported to its own tab (A feature, not a bug! For now.)
  // WARNING! This works best (and is intended for) output of solid geometries.
  // For tracks this will create a separate file for each track and wireframe
  // geometries will only output vertices, connected in sequence. Use with care!
  ispy.scene.children.forEach(function(c){
    c.children.forEach(function(o){
      if ( o.visible ) {
        var output = o.toJSON();
        output = JSON.stringify( output, null, '\t' );
        output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
        ispy.exportString(output);
      }
    });
  });
}

// Instead of a button, make output of 3D to JSON a "secret" key binding
document.addEventListener('keydown', function(e) {
  e.preventDefault();

  // If shift + e then export
  if ( e.which === 69 && e.shiftKey ) {
    ispy.exportScene();
  }
});
