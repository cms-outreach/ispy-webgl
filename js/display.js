
// ----------- MODALS: settings

ispy.invertColors = function() {
  ispy.inverted_colors = !ispy.inverted_colors;

  if ( !ispy.inverted_colors ) {
    ispy.renderer.setClearColor(0x000000,1);

    for ( var k in ispy.event_description ) {
      var obj = ispy.event_description[k];
      if ( obj.style.altColor !== undefined ) {
        ispy.scene.getObjectByName(obj.group).children.forEach(function(c) {
          if ( c.name === k ) {
            c.children.forEach(function(d) {
              d.material.color.setStyle(obj.style.color);
            });
          }
        });
      }
    }
  } else {
    ispy.renderer.setClearColor(0xffffff,1);

    for ( var k in ispy.event_description ) {
      var obj = ispy.event_description[k];
      if ( obj.style.altColor !== undefined ) {
        ispy.scene.getObjectByName(obj.group).children.forEach(function(c) {
          if ( c.name === k ) {
            c.children.forEach(function(d) {
              d.material.color.setStyle(obj.style.altColor);
            });
          }
        });
      }
    }

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

  $('#obj-table').toggleClass('white').toggleClass('black');
  $('#obj-table th').toggleClass('white').toggleClass('black');
  $('#obj-files').toggleClass('white').toggleClass('black');

  $('.modal-content').toggleClass('white').toggleClass('black');
  $('.modal-title').toggleClass('white').toggleClass('black');

  $('#table-data-eventObject').toggleClass('white').toggleClass('black');
};

ispy.setTransparency = function(t) {
  ispy.importTransparency = t;
  $('#trspy').html(t);

  var imported = ispy.scene.getObjectByName('Imported');

  imported.children.forEach(function(obj) {
    obj.children.forEach(function(c) {
      c.material.transparent = true;
      c.material.opacity = t;
    })
  })
};

// ---------------------------------

// ----------- MODALS: info

ispy.updateRendererInfo = function() {
  var info = ispy.renderer.info;

  var html = "<strong>"+ ispy.renderer_name + " info: </strong>";
  html += "<dl>";

  html += "<dt><strong> render </strong></dt>";
  for ( var prop in info.render ) {
    html += "<dd>" + prop + ": " + info.render[prop] + "</dd>";
  }

  if ( info.memory ) {
    html += "<dt><strong> memory </strong></dt>";
    for ( var prop in info.memory ) {
      html += "<dd>" + prop + ": " + info.memory[prop] + "</dd>";
    }
  }

  $("#renderer-info").html(html);
};

// ---------------------------------

ispy.updateRenderer = function(type) {

  if ( type === ispy.renderer_name ) {
    alert(type + ' is already in use');
    return;
  }

  if ( type === 'WebGLRenderer' ) {
    if ( ! ispy.hasWebGL() ) {
      alert('WebGL is not available. Using CanvasRenderer.');
      type = 'CanvasRenderer';
    }
  }

  document.getElementById('display').removeChild(ispy.renderer.domElement);
  document.getElementById('axes').removeChild(ispy.inset_renderer.domElement);

  ispy.useRenderer(type);

  var controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
  controls.rotateSpeed = 3.0;
  controls.zoomSpeed = 0.5;
  ispy.controls = controls;

  ispy.updateRendererInfo();

};

ispy.onWindowResize = function() {

  if ( ispy.stereo ) {

    var d = $('#display').css({
      'width' : window.innerWidth + 'px',
      'height' : window.innerHeight + 'px',
      'position': 'absolute',
      'left': '0px',
      'top': '0px',
      'z-index': 1000
    })[0];

    d.height = window.innerHeight;
    d.width = window.innerWidth;

  } else {

    $('#display').removeAttr('style');

  }

  var w = $('#display').innerWidth();
  var h = $('#display').innerHeight();

  if ( ispy.camera.inPerspectiveMode ) {

    ispy.camera.cameraP.aspect = w/h;

  } else {

    ispy.camera.cameraO.left = -w/2;
    ispy.camera.cameraO.right = w/2;
    ispy.camera.cameraO.top = h/2;
    ispy.camera.cameraO.bottom = -h/2;

  }

  ispy.camera.updateProjectionMatrix();
  ispy.renderer.setSize(w,h);
  ispy.render();

};


// Given an object3d this returns the ids of its
// children
ispy.getObjectIds = function(obj) {

    var ids = [];

    obj.children.forEach(function(c) {

	    ids.push(c.id);

	});

    return ids;

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

	    ispy.displayCollection(ispy.intersected.name, "Physics", 
				   ispy.event_description[ispy.intersected.name].name, 
				   ispy.getObjectIds(ispy.scene.getObjectByName(ispy.intersected.name)));
	    ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);
      
	}
      
	container.css('cursor','pointer');
	
	ispy.intersected = intersects[i].object;

	ispy.displayCollection(ispy.intersected.name, "Physics", 
			       ispy.event_description[ispy.intersected.name].name, 
			       ispy.getObjectIds(ispy.scene.getObjectByName(ispy.intersected.name)));
	ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, true);

	ispy.intersected.current_color = ispy.intersected.material.color.getHex();
	ispy.intersected.material.color.setHex(0xcccccc);

    }

  } else {
    
      if ( ispy.intersected ) {
	  
	  container.css('cursor','auto');

	  ispy.displayCollection(ispy.intersected.name, "Physics", 
				 ispy.event_description[ispy.intersected.name].name, 
				 ispy.getObjectIds(ispy.scene.getObjectByName(ispy.intersected.name)));
	  ispy.highlightTableRow(ispy.intersected.name, ispy.intersected.userData, false);

	  ispy.intersected.material.color.setHex(ispy.intersected.current_color);
	  ispy.intersected = null;

      }
  
  }

};

ispy.onMouseDown = function(e) {

  if ( ispy.intersected ) {

      ispy.displayEventObjectData(ispy.intersected.name, ispy.intersected.userData);

    }

};

ispy.shift_pressed = false;
ispy.mass_pair = [];

document.addEventListener('keyup', function(e) {

  if ( e.which === 16 ) {
    ispy.shift_pressed = false;
  }

});

document.addEventListener('keydown', function(e) {

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

  if ( e.shiftKey ) {
    ispy.shift_pressed = true;
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

ispy.displayCollection = function(key, group, name, objectIds) {
 
  ispy.currentCollection = key;
  var type = ispy.current_event.Types[key];
  var collection = ispy.current_event.Collections[key];

  var collectionTable = $('#collection-table');

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
    var row_content = "<tr id='" + key.concat(index++) + "' onmouseenter='ispy.highlightObject(\"" + objectIds[c] + "\")' onmouseout='ispy.unHighlightObject()'>";

    for ( v in collection[c] ) {
      row_content += "<td>"+collection[c][v]+"</td>";
    }

    collectionTable.append(row_content);
  }

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
    collectionTableHead.find('th').find('i').removeClass().addClass('fa fa-sort');
    var newClass = "fa fa-sort-" + data.direction;
    collectionTableHead.find('th').eq(data.column).find('i').removeClass().addClass(newClass);
  });

};

ispy.getMass = function() {

  var pt1 = ispy.mass_pair[0].pt;
  var pt2 = ispy.mass_pair[1].pt;

  var eta1 = ispy.mass_pair[0].eta;
  var eta2 = ispy.mass_pair[1].eta;

  var phi1 = ispy.mass_pair[0].phi;
  var phi2 = ispy.mass_pair[1].phi;

  var m = Math.sqrt(2*pt1*pt2*(Math.cosh(eta1-eta2) - Math.cos(phi1-phi2)));

  $('#invariant-mass').html(m.toFixed(2));
  $('#invariant-mass-modal').modal('show');

};

ispy.displayEventObjectData = function(key, objectUserData){
  
  var type = ispy.current_event.Types[key];
  var eventObjectData = ispy.current_event.Collections[key][objectUserData.originalIndex];

  $('#title-data-EventObjects').empty().append(ispy.event_description[key].name);

  var dataTableBody = $('#table-data-eventObject').find("tbody");
  dataTableBody.empty();

  var pt, eta, phi;

  for ( var t in type ) {

    var row_content = "<tr> <td>" + type[t][0] + "</td> <td>" + eventObjectData[t] + "</td> </tr>";
    dataTableBody.append(row_content);

    if ( type[t][0] === 'pt' ) {
      pt = eventObjectData[t];
    } else if ( type[t][0] === 'eta' ) {
      eta = eventObjectData[t];
    } else if ( type[t][0] === 'phi' ) {
      phi = eventObjectData[t];
    }
  }

  if ( ispy.shift_pressed ) {

    if ( ispy.mass_pair.length === 2 ) {
      ispy.mass_pair = [];
      ispy.mass_pair.push({'pt':pt,'eta':eta,'phi':phi});
    }

    else if ( ispy.mass_pair.length === 1 ) {
      ispy.mass_pair.push({'pt':pt,'eta':eta,'phi':phi});
      ispy.getMass();
    }

    else if ( ispy.mass_pair.length === 0 ) {
      ispy.mass_pair.push({'pt':pt,'eta':eta,'phi':phi});
    }

  } else {

    $('#data-EventObjects').modal('show');

  }
};

ispy.highlightTableRow = function(key, objectUserData, doEffect){
  if((ispy.currentCollection == key && doEffect) || !doEffect){
    var selector = "#" + key.concat(objectUserData.originalIndex);
    var row = $(selector);
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
