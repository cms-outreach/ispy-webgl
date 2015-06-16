
// ----------- MODALS: settings

ispy.showAxes = function() {
  ispy.show_axes = !ispy.show_axes;
  if (!ispy.show_axes) {
    $('#axes').hide();
  } else {
    $('#axes').show();
  }
};

ispy.invertColors = function() {
  ispy.inverted_colors = !ispy.inverted_colors;

  if ( !ispy.inverted_colors ) {
    ispy.renderer.setClearColor(0x000000,0);
  } else {
    ispy.renderer.setClearColor(0xffffff,0);
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

  $('#browser-table').toggleClass('white').toggleClass('black');
  $('#browser-table th').toggleClass('white').toggleClass('black');
  $('#browser-files').toggleClass('white').toggleClass('black');

  $('.modal-content').toggleClass('white').toggleClass('black');
  $('.modal-title').toggleClass('white').toggleClass('black');

  $('#table-data-eventObject').toggleClass('white').toggleClass('black');
};

ispy.showStats = function() {
  ispy.show_stats = !ispy.show_stats;

  if ( ispy.show_stats ) {
    $('#stats').show();
  } else {
    $('#stats').hide();
  }
};

// ---------------------------------

// ----------- MODALS: info

ispy.updateRendererInfo = function() {
  var info = ispy.renderer.info;

  var html = "<strong>"+ ispy.renderer_name + " info: </strong>";
  html += "<dl>";

  for ( var i in info ) {
    html += "<dt><strong>"+ i +"</strong></dt>";
    for ( var j in info[i] ) {
      html += "<dd>" + j + ": " + info[i][j] + "</dd>";
    }
  }

  $("#renderer-info").html(html);
};

// ---------------------------------



ispy.onWindowResize = function() {
  var w = $('#display').innerWidth();
  var h = $('#display').innerHeight();

  ispy.camera.aspect	= w/h;
  ispy.camera.updateProjectionMatrix();
  ispy.renderer.setSize(w,h);
  ispy.render();
};

ispy.onMouseMove = function(e) {
  e.preventDefault();

  var container = $("canvas");

  var w = $('#display').innerWidth();
  var h = $('#display').innerHeight();

  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  var offsetX = $('#display').offset().left - left;
  var offsetY = $('#display').offset().top - top;

  ispy.mouse.x = ((e.clientX-offsetX) / w)*2 - 1;
  ispy.mouse.y = -((e.clientY-offsetY) / h)*2 +1;

  var vector = new THREE.Vector3(ispy.mouse.x,ispy.mouse.y,0.5).unproject(ispy.camera);
  ispy.raycaster.set(ispy.camera.position, vector.subVectors(vector, ispy.camera.position).normalize());
  var intersects = ispy.raycaster.intersectObject(ispy.scene.getObjectByName("Physics"), true);

  // Make sure invisible objects in front won't interfere:
  var i = 0; while(i < intersects.length && !intersects[i].object.visible) ++i;

  if ( intersects[i] ) {
    if ( ispy.intersected != intersects[i].object) {
      if ( ispy.intersected ) {
        ispy.intersected.material.color.setHex(ispy.intersected.current_color);
        ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);
      }
      container.css('cursor','pointer');
      ispy.intersected = intersects[i].object;
      ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, true);
      ispy.intersected.current_color = ispy.intersected.material.color.getHex();
      ispy.intersected.material.color.setHex(0xcccccc);
    }
  } else {
    if ( ispy.intersected ){
      container.css('cursor','auto');
      ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);
      ispy.intersected.material.color.setHex(ispy.intersected.current_color);
      ispy.intersected = null;
    }
  }
};

ispy.onMouseDown = function(e) {
  if(ispy.intersected){
    ispy.displayEventObjectData(ispy.intersected.name, ispy.intersected.userData);
  }
};

document.addEventListener('keydown', function(e) {
  e.preventDefault();

  // Instead of a button, make output of 3D to JSON a "secret" key binding
  // If shift + e then export
  if ( e.which === 69 && e.shiftKey ) {
    ispy.exportScene();
  }

  // up arrow
  if ( e.which === 38 && e.shiftKey ) {
    ispy.zoom(0.5);
  }

  // down
  if ( e.which === 40 && e.shiftKey ) {
    ispy.zoom(-0.5);
  }

  // shift+a to toggle animation
  if ( e.which === 65 && e.shiftKey ) {
    ispy.toggleAnimation();
  }
  /*
  // right
  if ( e.which === 39 && e.shiftKey ) {
    console.log('right');
  }

  // left
  if ( e.which === 37 && e.shiftKey ) {
    console.log('left');
  }
  */
});

ispy.displayCollection = function(key, group, name) {
  ispy.currentCollection = key;
  var type = ispy.current_event.Types[key];
  var collection = ispy.current_event.Collections[key];

  var collectionTable = $('#collection-table');

  collectionTable.unbind('aftertablesort');

  collectionTable.find('tbody').find('tr').off({
    'mousedown': ispy.tableOnMouseDown,
    'mouseover': ispy.tableOnMouseOver,
    'mouseleave': ispy.tableOnMouseLeave
  });

  collectionTable.empty();
  collectionTable.append('<caption>' + group + ': ' + name + '</caption>');
  collectionTable.append('<thead> <tr>');
  var collectionTableHead = collectionTable.find('thead').find('tr');

  for ( var t in type ) {
    var dataSort = type[t][1] === "double" ? "float" : type[t][1];
    collectionTableHead.append($('<th class="group" data-sort="' + dataSort + '"><i class="fa fa-sort"></i> ' + type[t][0] + '</th>'));
  }

  var index = 0;
  for ( var c in collection ) {
    var row_content = "<tr id='" + key.concat(index++) + "' onmouseenter='' onmouseout='ispy.unHighlightObject()'>";

    for ( v in collection[c] ) {
      row_content += "<td>"+collection[c][v]+"</td>";
    }

    collectionTable.append(row_content);
  }

  ispy.updateTablePicking(key);

  collectionTable.stupidtable({
    "v3d":function(a,b){

      var aV3 = a.split(",");
      var bV3 = b.split(",");

      if(aV3.length === 3 && bV3.length === 3){

        var aLength = Math.sqrt(aV3[0] * aV3[0] + aV3[1] * aV3[1] + aV3[2] * aV3[2]);
        var bLength = Math.sqrt(bV3[0] * bV3[0] + bV3[1] * bV3[1] + bV3[2] * bV3[2]);

        return aLength - bLength;
      }
      return 1;
    }
  }).bind('aftertablesort', function(event, data){

    // Why is this event triggered multiple times per sort?

    collectionTableHead.find('th').find('i').removeClass().addClass('fa fa-sort');
    var newClass = "fa fa-sort-" + data.direction;
    collectionTableHead.find('th').eq(data.column).find('i').removeClass().addClass(newClass);

    collectionTable.find('tbody').find('tr').off({
      'mousedown': ispy.tableOnMouseDown,
      'mouseover': ispy.tableOnMouseOver,
      'mouseleave': ispy.tableOnMouseLeave
    });

    collectionTable.find('tbody').find('tr').removeClass('selected');

    ispy.tableMouseDown = false;
    ispy.tablePrevRow = null;

    if(ispy.object_has_range[key] &&
      (collectionTableHead.find('th').eq(data.column).attr('data-sort') !== "v3d") &&
      (collectionTableHead.find('th').eq(data.column).attr('data-sort') !== "string")){

      collectionTable.find('tbody').find('tr').on({
        'mousedown': ispy.tableOnMouseDown,
        'mouseover': ispy.tableOnMouseOver,
        'mouseleave': ispy.tableOnMouseLeave
      }, {
        key: key,
        column: data.column,
        direction: data.direction
      });
    }
  });

};

ispy.displayEventObjectData = function(key, objectUserData){
  var type = ispy.current_event.Types[key];
  var eventObjectData = ispy.current_event.Collections[key][objectUserData.originalIndex];

  $('#title-data-EventObjects').empty().append(ispy.event_description[key].name);

  var dataTableBody = $('#table-data-eventObject').find("tbody");
  dataTableBody.empty();

  for(var t in type){
    var row_content = "<tr> <td>" + type[t][0] + "</td> <td>" + eventObjectData[t] + "</td> </tr>";
    dataTableBody.append(row_content);
  }

  $('#data-EventObjects').modal('show');
};

ispy.highlightTableRow = function(key, objectUserData, doEffect){
  if((ispy.currentCollection == key && doEffect) || !doEffect){
    var domId = "#" + key.concat(objectUserData.originalIndex);
    var row = $(domId);
    if(row){
      if(doEffect){
        var color = ispy.inverted_colors ? "#dfdfdf" : "#777";
        row.css("background-color", color);
        row.scrollintoview();
      }else{
        row.removeAttr("style");
      }
    }
  }
};

ispy.highlightObject = function(objectId){

  var selected = ispy.scene.getObjectById(Number(objectId), true);

  if(selected){
    if(ispy.highlighted != selected && selected.visible){
      if(ispy.highlighted){
        ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
      }
      ispy.highlighted = selected;
      ispy.highlighted.current_color = ispy.highlighted.material.color.getHex();
      ispy.highlighted.material.color.setHex(0xcccccc);
    }
  }
};

ispy.unHighlightObject = function(){
  if(ispy.highlighted){
    ispy.highlighted.material.color.setHex(ispy.highlighted.current_color);
    ispy.highlighted = null;
  }
};

ispy.tableOnMouseDown = function(event){
  // remove all previous selections:
  var hadClass = $(this).hasClass("selected");
  var collectionTable = $('#collection-table');
  collectionTable.find('tbody').find('tr').removeClass('selected');
  if(!hadClass){
    ispy.tableMouseDown = true;
    $(this).addClass('selected');
  }
  // If a single (or no) element has been selected,
  // ispy.tableOnMouseOver is not called --> call
  // ispy.showRangeFromTable from this function:
  ispy.showRangeFromTable(event.data.key, event.data.column, event.data.direction);
  return false; // prevent text selection
};

ispy.tableOnMouseOver = function(event){
  if (ispy.tableMouseDown) {
    if ((($(this).prevAll('.selected').length || ($(this).hasClass('selected') && $(this).nextAll('.selected').length)) &&
      $(this).nextAll(ispy.tablePrevRow).length) || // If we arrive to this row again from below...
      (($(this).nextAll('.selected').length || ($(this).hasClass('selected') && $(this).prevAll('.selected').length)) &&
      $(this).prevAll(ispy.tablePrevRow).length)) { // ...or from above...
      $(ispy.tablePrevRow).removeClass('selected'); // ...deselect the row we came from.
    }
    if ($(this).prevAll('.selected').length && $(this).prevAll(ispy.tablePrevRow).length) { // If we arrive to this row as new from above...
      $(this).prevUntil('.selected').addClass('selected'); // ...select all the rows between this and previous selected...
      $(this).addClass("selected"); // ...and select this.
    } else if ($(this).nextAll('.selected').length && $(this).nextAll(ispy.tablePrevRow).length) { // If we arrive to this row as new from below...
      $(this).nextUntil('.selected').addClass('selected'); // ...select all the rows between this and previous selected...
      $(this).addClass("selected"); // ...and select this.
    }

    ispy.showRangeFromTable(event.data.key, event.data.column, event.data.direction);
  }
};

ispy.tableOnMouseLeave = function(){
  if (ispy.tableMouseDown) {
    ispy.tablePrevRow = '#' + $(this).prop('id');
  }
};

ispy.documentOnMouseUp = function(){
  ispy.tableMouseDown = false;
  ispy.tablePrevRow = null;
};

ispy.showRangeFromTable = function(key, column, direction){ // If no row has been selected, default range is shown
  var collectionTable = $('#collection-table');

  var range = {};
  range.selector = column;

  var limits = {
    first: collectionTable.find('tbody').find('tr.selected').eq(0).find('td').eq(column).text(),
    last: collectionTable.find('tbody').find('tr.selected').eq(-1).find('td').eq(column).text()
  };

  range.min = direction === 'asc' ? parseFloat(limits.first) : parseFloat(limits.last);
  range.max = direction === 'asc' ? parseFloat(limits.last) : parseFloat(limits.first);

  ispy.removeObject(key);
  ispy.addObject(key, range);

  // Picking is based on object_ids. These will be different after
  // two previous functions --> update the new id:s to the table:
  ispy.updateTablePicking(key);
};

ispy.updateTablePicking = function(key){
  if(ispy.event_description[key].group === "Physics") {
    // Object ids appear in ispy.object_ids in the same order
    // as they do "naturally" (e.g. before possible sorting).
    // This function places the correct id in the correct row,
    // the row being determined by the original index of the
    // id in the array, which is - for a very obvious reason -
    // the same as the original index of the object, which
    // in turn is used while creating the id of the row.
    var domId;
    for(var i = 0; i < ispy.object_ids[key].length; ++i){
      domId = "#" + key.concat(i);
      $(domId).attr('onmouseenter', 'ispy.highlightObject("' + ispy.object_ids[key][i] + '")');
    }
  }
};

$(function(){
  $(document).on('mouseup',ispy.documentOnMouseUp);
});
