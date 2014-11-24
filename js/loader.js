// For now, hard-code some examples files here for testing
// the "files from the web"
yae.web_files = [
  "http://opendata.cern.ch/record/601/EGMonitor.ig",
  "http://opendata.cern.ch/record/602/Electron.ig"
];

yae.ig_data = null;

yae.openDialog = function(id) {
  $(id).modal('show');
}

yae.closeDialog = function(id) {
  $(id).modal('hide');
}

yae.hasFileAPI = function() {
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

yae.clearTable = function(id) {
  var tbl = document.getElementById(id);
  while (tbl.rows.length > 0) {
    tbl.deleteRow(0);
  }
}

yae.selectEvent = function(index) {
  $("#selected-event").html(yae.event_list[index]);
  yae.event_index = index;
}

yae.updateEventList = function() {
  yae.clearTable("browser-events");
  var tbl = document.getElementById("browser-events");

  for (var i = 0; i < yae.event_list.length; i++) {
    var e = yae.event_list[i];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = '<a id="browser-event-' + i + '" class="event" onclick="yae.selectEvent(\'' + i + '\');">' + e + '</a>';
  }
}

yae.loadEvent = function() {
  $("#files").modal('hide');
  $("#event-loaded").html(yae.file_name + ":" + yae.event_list[yae.event_index]);

  var msg = "Want to load ";
  msg += yae.event_list[yae.event_index] + " ?";
  msg += "Coming soon!"
  alert(msg);
}

yae.selectLocalFile = function(index) {
  var reader = new FileReader();
  yae.file_name = yae.local_files[index].name;

  reader.onload = function(e) {
    var data = e.target.result;
    var zip = new JSZip(data);
    var event_list = [];

    $.each(zip.files, function(index, zipEntry){
      if ( zipEntry._data !== null && zipEntry.name !== "Header" ) {
        event_list.push(zipEntry.name);
      }
    });

    yae.event_list = event_list;
    yae.updateEventList();
    yae.ig_data = zip;
  }

  reader.onerror = function(e) {
    alert(e);
  }

  reader.readAsArrayBuffer(yae.local_files[index]);
}

yae.updateLocalFileList = function(list) {
  yae.clearTable("browser-files");
  var tbl = document.getElementById("browser-files");

  for (var i = 0; i < list.length; i++) {
    var name = list[i].name;
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    var cls = "file";
    cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="yae.selectLocalFile(\'' + i + '\');">' + name + '</a>';
  }
}

yae.loadLocalFiles = function() {
  if (!yae.hasFileAPI()) {
    var err_msg = "Sorry. You seeem to be using a browser that does not support FileReader API. ";
    err_msg += "Please try with Chrome (6.0+), Firefox (3.6+), Safari (6.0+), or IE (10+). ";
    err_msg += "Alternatively, open a file from the web. ";
    alert(err_msg);
    return;
  }

  yae.clearTable("browser-files");
  yae.clearTable("browser-events");
  $('#selected-event').html("Selected event");

  yae.local_files = document.getElementById('local-files').files;
  yae.updateLocalFileList(yae.local_files);
  yae.openDialog('#files');
}

yae.selectFile = function(filename) {
  yae.file_name = filename.split("/")[5];  // of course this isn't a general case for files

  var xhr = new XMLHttpRequest();
  xhr.open("GET", filename, true);
  xhr.overrideMimeType("text/plain; charset=x-user-defined");

  yae.clearTable("browser-events");
  var ecell = document.getElementById("browser-events").insertRow(0).insertCell(0);
  ecell.innerHTML = 'Loading events...';

  xhr.onload = function() {
    if (this.status == 200) {

      var zip = JSZip(xhr.responseText);
      var event_list = [];

      $.each(zip.files, function(index, zipEntry){
        if ( zipEntry._data !== null && zipEntry.name !== "Header" ) {
          event_list.push(zipEntry.name);
        }
      });

      yae.event_list = event_list;
      yae.updateEventList();
      yae.ig_data = zip;
    }
  };

  xhr.send();
}

yae.loadWebFiles = function() {
  yae.clearTable("browser-files");
  yae.clearTable("browser-events");
  $('#selected-event').html("Selected event");

  var tbl = document.getElementById("browser-files");

  for (var i = 0; i < yae.web_files.length; i++) {
    var e = yae.web_files[i];
    var name = e.split("/")[5];
    var row = tbl.insertRow(tbl.rows.length);
    var cell = row.insertCell(0);
    var cls = "file";
    cell.innerHTML = '<a id="browser-file-' + i + '" class="' + cls + '" onclick="yae.selectFile(\'' + e + '\');">' + name + '</a>';
  }
}

yae.cleanupData = function(d) {
  // rm non-standard json bits
  // newer files will not have this problem
  d = d.replace(/\(/g,'[')
       .replace(/\)/g,']')
       .replace(/\'/g, "\"")
       .replace(/nan/g, "0");
  return d;
}
