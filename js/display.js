
// ----------- MODALS: settings
/*
    if ( ispy.get_image_data ){
      ispy.image_data = ispy.renderer.domElement.toDataURL();
      ispy.get_image_data = false;
    }
  }

  if ( ispy.inset_renderer !== null ) {
    ispy.inset_renderer.render(ispy.inset_scene, ispy.inset_camera);
  }
};
*/

ispy.run = function() {
    // Left to run at max speed I get almost 60fps on a Macbook Pro running Chrome.
    // This will cause the fan to come on and drain the battery.
    // So use setTimeout to set the max frame rate.
    var fps = 30;
    setTimeout( function() {
      requestAnimationFrame(ispy.run);
    }, 1000 / fps );

  ispy.controls.update();

  ispy.inset_camera.up = ispy.camera.up;
  ispy.inset_camera.position.subVectors(ispy.camera.position, ispy.controls.target);
  ispy.inset_camera.position.setLength(10);
  ispy.inset_camera.lookAt(ispy.inset_scene.position);

  ispy.render();
  ispy.stats.update();

  if ( ispy.animating ) {
    TWEEN.update();
  }
  if ( ispy.recording ) {
    ispy.recordFrame();
  }
};

ispy.lookAtOrigin = function() {
  ispy.camera.lookAt(new THREE.Vector3(0,0,0));
};

ispy.initCamera = function() {
  var home_x = -18.1;
  var home_y = 8.6;
  var home_z = 14.0;

  ispy.camera.position.x = home_x*0.6;
  ispy.camera.position.y = home_y*0.6;
  ispy.camera.position.z = home_z*0.6;

  ispy.camera.setZoom(1);
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

ispy.initLight = function() {
  var intensity = 1.0;
  var length = 15.0;

  ispy.light1 = new THREE.DirectionalLight(0xffffff, intensity);
  ispy.light1.position.set(-length, length, length);
  ispy.scene.getObjectByName("Detector").add(ispy.light1);

  ispy.light2 = new THREE.DirectionalLight(0xffffff, intensity);
  ispy.light2.position.set(length, -length, -length);
  ispy.scene.getObjectByName("Detector").add(ispy.light2);
};

ispy.resetControls = function() {
  ispy.controls.reset();
};

ispy.setXY = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = 0;
  ispy.camera.position.y = 0;
  ispy.camera.position.z = length;
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

ispy.setZX = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = 0;
  ispy.camera.position.y = length;
  ispy.camera.position.z = 0;
  ispy.camera.up = new THREE.Vector3(1,0,0);
  ispy.lookAtOrigin();
};

ispy.setYZ = function() {
  var length = ispy.camera.position.length();
  ispy.camera.position.x = -length;
  ispy.camera.position.y = 0;
  ispy.camera.position.z = 0;
  ispy.camera.up = new THREE.Vector3(0,1,0);
  ispy.lookAtOrigin();
};

ispy.setOrthographic = function() {
  $('#perspective').toggleClass('active');
  $('#orthographic').toggleClass('active');
  ispy.camera.toOrthographic();
};

ispy.setPerspective = function() {
  $('#perspective').toggleClass('active');
  $('#orthographic').toggleClass('active');
  ispy.camera.toPerspective();
};

ispy.zoom = function(step) {
  var zoom = ispy.camera.zoom;
  ispy.camera.setZoom(zoom+step);
};

ispy.printImage = function() {
  ispy.get_image_data = true;
  ispy.render();
  window.open(ispy.image_data, "toDataURL() image", "width=800, height=400");
};


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

ispy.displayCollection = function(key, group, name, objectIds) {
  ispy.currentCollection = key;
  var type = ispy.current_event.Types[key];
  var collection = ispy.current_event.Collections[key];

  $('#collection-table').empty();
  $('#collection-table').append('<caption>' + group + ': ' + name + '</caption>');
  $('#collection-table').append('<thead> <tr>');

   for ( var t in type ) {
     $("#collection-table thead > tr").append($('<th class="group">').text(type[t][0]));
   }

   for ( var c in collection ) {
     var row_content = "<tr onmouseenter='ispy.highlightObject(\"" + objectIds[c] + "\")' onmouseout='ispy.unHighlightObject()'>";

     for ( v in collection[c] ) {
       row_content += "<td>"+collection[c][v]+"</td>";
     }

     $('#collection-table').append(row_content);
   }

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
    var row = $('#collection-table').find('tbody').find('tr').eq(objectUserData.originalIndex);
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

/*
$(function(){


});
*/
