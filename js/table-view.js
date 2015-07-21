ispy.displayCollection = function(key, group, name) {
  ispy.currentCollection = key;
  var type = ispy.current_event.Types[key];
  var collection = ispy.current_event.Collections[key];

  var collectionTable = $('#collection-table');

  // This is not completely unbinding the trigger??
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

  var dataSort, has_range;

  // Variable 'rangeables' contains boolean for every column
  // in the current table; value being true if the values of
  // the column can be used as range selector, false otherwise.
  var rangeables = [];
  for ( var t in type ) {
    dataSort = type[t][1] === "double" ? "float" : type[t][1];
    has_range = (ispy.object_has_range[key] && dataSort !== "v3d" && dataSort !== "string") ? ' <i class="fa fa-tasks"></i>' : '';
    rangeables.push(has_range !== '');
    collectionTableHead.append($('<th class="group" data-sort="' + dataSort + '"><i class="i-no-sorted fa fa-sort"></i> ' + type[t][0] + has_range + '</th>'));
  }

  var index = 0;
  for ( var c in collection ) {
    var row_content = "<tr id='" + key.concat(index++) + "' onmouseenter='' onmouseout='ispy.unHighlightObject()'>";

    for ( v in collection[c] ) {
      row_content += "<td>"+collection[c][v]+"</td>";
    }

    collectionTable.append(row_content);
  }

  // Set up the picking
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

    collectionTableHead.find('th').find('i.i-sorted').removeClass().addClass('i-no-sorted fa fa-sort');
    var newClass = "i-sorted fa fa-sort-" + data.direction;
    collectionTableHead.find('th').eq(data.column).find('i').eq(0).removeClass().addClass(newClass);

    // In case the table was sorted by something non-rangeable.....
    collectionTable.find('tbody').find('tr').off({
      'mousedown': ispy.tableOnMouseDown,
      'mouseover': ispy.tableOnMouseOver,
      'mouseleave': ispy.tableOnMouseLeave
    });

    collectionTable.find('tbody').find('tr').removeClass('selected');

    ispy.tableMouseDown = false;
    ispy.tablePrevRow = null;

    if(rangeables[data.column]){

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
