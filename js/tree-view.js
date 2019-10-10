// It's not good to have all this html made in js.
// This screams: "template me!"

ispy.addGroups = function() {

    var group_table = $('#treeview table');
    
    ispy.data_groups.forEach(function(g) {
    
	    var n = g;
	    var html = "<tr id='"+ g +"'>";

	    html += "<td class='group black'><a class='expand' onclick='ispy.toggleCollapse(\"" + g + "\");' href='#'>";
	    html += "<i class='"+g+" expand glyphicon glyphicon-chevron-down'></i></a>";
	    html += n +"</td>";

	    // These are the information dialogs for the public. For now, by default, keep them hidden.
	    // They can be turned on in the settings dialog.
	    html += "<td class='group black'><a class='info' href='#' data-toggle='modal' data-target='#info-"+ g +"'>";
	    html += "<i class='glyphicon glyphicon-info-sign'></i></a></td>";
	    
	    html += "</tr>";
	    group_table.append(html);

  });

};

ispy.toggleCollapse = function(g) {
    
    // If the objects under the group category have not been loaded then
    // do not toggle the chevron. We don't want to have it in the wrong
    // state when the group is eventually populated
    var children = $('tr.'+g);
  
    if ( children.length === 0 ) {

	return;
	
    }

    children.toggle();
    $('i.'+g).toggleClass('glyphicon-chevron-right').toggleClass('glyphicon-chevron-down');

};

ispy.toggle = function(key) {

    ispy.disabled[key] = !ispy.disabled[key];

    // For event information we display as simple HTML
    // so therefore not part of the scene
    if ( key === 'Event_V1' || key === 'Event_V2' || key === 'Event_V3' ) {
    
	if ( ispy.disabled[key] ) {
      
	    $('#event-text').hide();
    
	} else {
      
	    $('#event-text').show();
    
	}
  
    }

    ispy.scene.getObjectByName(key).visible = !ispy.disabled[key];

};

// In some cases (e.g. animation) we want to explicitly turn somethings on/off
// It would probably be nice to: do this by group, support wildcards, etc.
ispy.showObject = function(key, show) {

    var obj = ispy.scene.getObjectByName(key);
    
    if ( obj !== undefined ) {
    
	console.log(key, show);
	obj.visible = show;
	ispy.disabled[key] = !show;
	$('#'+key).prop('checked', show);
    
    }

};

ispy.addSelectionRow = function(group, key, name, objectIds, visible) {
    
    var dc = 'Detector';

    if ( group !== 'Detector' ) {
	
	if ( group !== 'Imported' ) {
	    
	    dc = 'Event'; // this means it gets cleared from the tree view when an event is loaded
    
	} else {
      
	    dc = 'Imported';
	
	}
    
    }

    var on = !ispy.disabled[key] ? "checked" : "";
    var html = "<tr class='" + dc + " "+ group +"'>";
    var cc = ispy.inverted_colors ? "white" : "black";

    var nobjects = 0;

    if ( group !== 'Detector' && group !== 'Imported' && group !== 'Provenance' ) {
	
	if ( ispy.current_event !== undefined ) {

	    nobjects = ispy.current_event.Collections[key].length;

	} 

	html += "<td class='collection "+ cc +"' onclick='ispy.displayCollection(\""+key+"\",\""+ group + "\",\"" + name +"\",[" + objectIds + "])'>" + name + " ["+nobjects+"]</td>";
  
    } else {
    
	html += "<td class='collection "+ cc +"'>"+ name +"</td>";
  
    }

    html += "<td class='collection'>";
    html += "<input type='checkbox' id='"+key+"'" + on + " onchange='ispy.toggle(\"" + key + "\");'>";
    html += "</td>";
    html += "</tr>";
    
    $('#'+group).after(html);

};
