ispy.hasWebGL = function() {

    var canvas = document.createElement('canvas');

    if ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) {
	
	if ( ! window.WebGLRenderingContext ) {
      
	    return false;
    
	} else {
      
	    return true;
	
	}

    } else {
    
	return false;
  
    }

};

ispy.lookAtOrigin = function() {

    ispy.camera.lookAt(new THREE.Vector3(0,0,0));

};

ispy.setAutoplayInterval = function(apt) {

    ispy.autoplayInterval = apt;
    $('#apt').html(apt);

};

ispy.setFramerate = function(fr) {

    ispy.framerate = fr;  
    $('#fr').html(fr);

};

ispy.init_camera = {

    'x': 9.5,
    'y': 9.5,
    'z': 13.0,
    'zoom': 1.5,
    'perspective': true,
    'orthographic': false

};

ispy.initCamera = function() {

    ispy.camera.position.x = ispy.init_camera.x;
    ispy.camera.position.y = ispy.init_camera.y;
    ispy.camera.position.z = ispy.init_camera.z;
    
    ispy.camera.setZoom(ispy.init_camera.zoom);
    ispy.camera.up = new THREE.Vector3(0,1,0);
    
    ispy.init_camera.perspective ? ispy.camera.toPerspective() : ispy.camera.toOrthographic();

    ispy.lookAtOrigin();

};

ispy.useRenderer = function(type) {

    var width = document.getElementById('display').clientWidth;
    var height = document.getElementById('display').clientHeight;

    var rendererTypes = {
	
	'WebGLRenderer': THREE.WebGLRenderer,
	'CanvasRenderer': THREE.CanvasRenderer,
	'SVGRenderer': THREE.SVGRenderer
    
    };

    var renderer = new rendererTypes[type]({antialias:true, alpha:true});
    var inset_renderer = new rendererTypes[type]({antialias:true, alpha:true});

    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    inset_renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    if ( ispy.inverted_colors ) {
   
	renderer.setClearColor(0xffffff,1);
	inset_renderer.setClearColor(0xffffff,0);
  
    } else {
    
	renderer.setClearColor(0x000000,1);
	inset_renderer.setClearColor(0x000000,0);
  
    }

    renderer.setSize(width, height);
    inset_renderer.setSize(height/5, height/5);

    ispy.renderer = renderer;
    ispy.renderer_name = type;
    ispy.inset_renderer = inset_renderer;
    
    document.getElementById('display').appendChild(ispy.renderer.domElement);
    document.getElementById('axes').appendChild(ispy.inset_renderer.domElement);
    
    $('#settings').modal('hide');

};

ispy.init = function() {

    var display = document.getElementById('display');
    var inset = document.getElementById('axes');
    
    var scene = new THREE.Scene();
    ispy.scene = scene;
    
    var width = display.clientWidth;
    var height = display.clientHeight;
    
    // width, height, fov, near, far, orthoNear, orthoFar
    var camera = new THREE.CombinedCamera(width, height, 75, 0.1, 100, 0.1, 100);
    ispy.camera = camera;
    ispy.initCamera();

    ispy.velocity = new THREE.Vector3(0, 0, 0);
    ispy.acceleration = new THREE.Vector3(0, 0, 0);

    var inset_scene = new THREE.Scene();
    ispy.inset_scene = inset_scene;

    // fov, aspect, near, far
    var inset_width = height/5;
    var inset_height = height/5;
    var inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
    ispy.inset_camera = inset_camera;
    ispy.inset_camera.up = ispy.camera.up;

    var renderer;
    var inset_renderer;

    if ( ispy.hasWebGL() ) {
      
	ispy.useRenderer('WebGLRenderer', width, height);
  
    } else {
  
	ispy.useRenderer('CanvasRenderer', width, height);
  
    }

    ispy.stats = new Stats();
    display.appendChild(ispy.stats.domElement);

    // On page load hide the stats
    $('#stats').hide();
    // FF keeps the check state on reload so force an "uncheck"
    $('#show-stats').prop('checked', false);

    $('#show-stats').change(function() {
	    
	    if ( this.checked ) { // if checked then show
		
		$('#stats').show();
    
	    } else {
		
		$('#stats').hide();
    
	    }

	});

    $('#show-logo').prop('checked', true);
    
    $('#show-logo').change(function() {
	    
	    if ( this.checked ) {
      
		$('#cms-logo').show();
    
	    } else {
		
		$('#cms-logo').hide();
    
	    }

	});

    ispy.inverted_colors = false;
    $('#invert-colors').prop('checked', false);

    var origin = new THREE.Vector3(0,0,0);
    var rx = new THREE.ArrowHelper(new THREE.Vector3(4,0,0), origin, 4, 0xff0000, 0.01, 0.01);
    var gy = new THREE.ArrowHelper(new THREE.Vector3(0,4,0), origin, 4, 0x00ff00, 0.01, 0.01);
    var bz = new THREE.ArrowHelper(new THREE.Vector3(0,0,4), origin, 4, 0x0000ff, 0.01, 0.01);

    rx.line.material.linewidth = 2.5;
    gy.line.material.linewidth = 2.5;
    bz.line.material.linewidth = 2.5;

    ispy.inset_scene.add(rx);
    ispy.inset_scene.add(gy);
    ispy.inset_scene.add(bz);
    
    $('#show-axes').prop('checked', false); // FF keeps the state after a page refresh. Therefore force uncheck.
  
    $('#show-axes').change(function() {
    
	    if ( this.checked ) { // if checked then hide axes
     
		$('#axes').hide();
    
	    } else {
		
		$('#axes').show();
    
	    }
	    
	});

    var font_loader = new THREE.FontLoader();
    
    font_loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {

	    var tps = {size:0.75, height:0.1, font:font};

	    var x_geo = new THREE.TextGeometry('X', tps);
	    var y_geo = new THREE.TextGeometry('Y', tps);
	    var z_geo = new THREE.TextGeometry('Z', tps);

	    var x_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	    var x_text = new THREE.Mesh(x_geo, x_material);
	    x_text.position.x = 4.5;
	    x_text.name = 'xtext';

	    var y_material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	    var y_text = new THREE.Mesh(y_geo, y_material);
	    y_text.position.y = 4.5;
	    y_text.name = 'ytext';
	    
	    var z_material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	    var z_text = new THREE.Mesh(z_geo, z_material);
	    z_text.position.z = 4.5;
	    z_text.name = 'ztext';

	    ispy.inset_scene.add(x_text);
	    ispy.inset_scene.add(y_text);
	    ispy.inset_scene.add(z_text);

	});

    // The second argument is necessary to make sure that mouse events are
    // handled only when in the canvas
    var tb_controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
    tb_controls.rotateSpeed = 3.0;
    tb_controls.zoomSpeed = 0.5;
    tb_controls.dynamicDampingFactor = 1.0;

    ispy.controls = tb_controls;

    // Add a parent object for each group
    ispy.data_groups.forEach(function(g) {

	    var obj_group = new THREE.Object3D();
	    obj_group.name = g;
	    ispy.scene.add(obj_group);
	    
	});

    $('#version').html("v"+ispy.version);
    $('#threejs').html("r"+THREE.REVISION);

    window.addEventListener('resize', ispy.onWindowResize, false);

    /*
      https://github.com/mrdoob/three.js/pull/421#issuecomment-1792008
      via
      http://stackoverflow.com/questions/15558418/how-do-you-save-an-image-from-a-three-js-canvas
    */
    ispy.get_image_data = false;
    ispy.image_data = null;
    
    ispy.raycaster = new THREE.Raycaster();
    ispy.raycaster.linePrecision = 0.1; // Previously 0.01, but choosing the object was difficult

    ispy.mouse = new THREE.Vector2();
    ispy.intersected = null;
    
    ispy.renderer.domElement.addEventListener('mousemove', ispy.onMouseMove, false);
    ispy.renderer.domElement.addEventListener('mousedown', ispy.onMouseDown, false);
    
    // Are we running an animation?
    ispy.animating = false;

    ispy.setFramerate(30);
    $('#fps-slider').prop('value', ispy.framerate); // for FF
    
    ispy.importTransparency = 0.75;
    $('#transparency-slider').prop('value', ispy.importTransparency);
    $('#trspy').html(ispy.importTransparency);

    ispy.autoplayInterval = 3;
    $('#apt-slider').prop('value', ispy.autoplayInterval);
    $('#apt').html(ispy.autoplayInterval);
 
    // Info dialogs are hidden by default (see ispy.css)
    // FF keeps state on reload so force here
    $('#show-info').prop('checked', false);

    $('#show-info').change(function() {
	    
	    if ( this.checked ) { // if checked then already visible, so turn off
		
		$('.info').css('visibility', 'visible');
    
	    } else {
		
		$('.info').css('visibility', 'hidden');
	    
	    }
  
	});

    ispy.stereo = false;
    
    $('#display').append($('#event-info'));

    var canvas = ispy.renderer.domElement;

    canvas.ondragover = function() {

	this.classList.add('hover');
	return false;

    };

    canvas.ondrop = function(e) {

	e.preventDefault();
	this.classList.remove('hover');
	
	var file = e.dataTransfer.files[0];
	ispy.loadDroppedFile(file);

	return false;

    };

    canvas.addEventListener('ondragover', canvas.ondragover);
    canvas.addEventListener('ondrop', canvas.ondrop);

    ispy.current_view = 'threed';
    
    ispy.autoRotating = false;

};

ispy.initLight = function() {

    var intensity = 1.0;
    var length = 15.0;
    
    var lights = new THREE.Object3D();
    lights.name = 'Lights';
    ispy.scene.add(lights);
    
    ispy.light1 = new THREE.DirectionalLight(0xffffff, intensity);
    ispy.light1.name = 'Light1';
    ispy.light1.position.set(-length, length, length);
    ispy.scene.getObjectByName('Lights').add(ispy.light1);
    
    ispy.light2 = new THREE.DirectionalLight(0xffffff, intensity);
    ispy.light2.name = 'Light2';
    ispy.light2.position.set(length, -length, -length);
    ispy.scene.getObjectByName('Lights').add(ispy.light2);

};

ispy.getJSON = function(scr) {

    return $.ajax({url: scr, dataType: "json", cache: true}).success(function(data) {
	  
	    $.extend(true, ispy.detector, data);
	
	});
    
};

ispy.getScript = function(scr) {
  
    return $.ajax({url: scr, dataType: "script", cache: true});

};

ispy.initDetector = function() {

    // Loading and rendering the actual geometry when WebGL is available
    // works well. With CanvasRenderer, not so well, so load and render
    // the geometry models.

    if ( ispy.renderer_name === "CanvasRenderer" ) {
    
	ispy.getScript("./geometry/models.js").done(function() {
        
		ispy.addDetector();

	    });

    } else if ( ispy.renderer_name === "WebGLRenderer" ) {

	$('#loading').modal('show');

	$.when(
	       ispy.getJSON('./geometry/eb.json'),
	       ispy.getJSON('./geometry/ee.json'),
	       ispy.getJSON('./geometry/hb.json'),
	       ispy.getJSON('./geometry/ho.json'),
	       ispy.getJSON('./geometry/hehf.json'),
	       ispy.getJSON('./geometry/pixel.json'),
	       ispy.getJSON('./geometry/tec.json'),
	       ispy.getJSON('./geometry/tib.json'),
	       ispy.getJSON('./geometry/tid.json'),
	       ispy.getJSON('./geometry/tob.json')

	       ).done(function(){
		       
		       $.when(ispy.addDetector()).done(function() {
          
			       $('#loading').modal('hide');
			   
			   });

		   });
	
    }

};

ispy.render = function() {

    if ( ispy.renderer !== null ) {

	if ( ispy.stereo ) {
	    
	    ispy.stereo_renderer.render(ispy.scene, ispy.camera);
    
	} else {
	    
	    ispy.renderer.render(ispy.scene, ispy.camera);
    
	}

	if ( ispy.get_image_data ){
      
	    ispy.image_data = ispy.renderer.domElement.toDataURL();
	    ispy.get_image_data = false;

	}

    }

    if ( ispy.inset_renderer !== null ) {

	ispy.inset_renderer.render(ispy.inset_scene, ispy.inset_camera);

    }

};

ispy.run = function() {

    setTimeout( function() {
  
	    requestAnimationFrame(ispy.run);
  
	}, 1000/ispy.framerate );

    ispy.stats.update();

    if ( ispy.stereo ) {

	ispy.do_controls.update();

	var width = window.innerWidth;
	var height = window.innerHeight;

	ispy.camera.aspect = width / height;
	ispy.camera.updateProjectionMatrix();
	ispy.stereo_renderer.setSize(width, height);
	
    } else {

	ispy.controls.update();
	ispy.inset_camera.position.subVectors(ispy.camera.position, ispy.controls.target);
	
    }

    ispy.inset_camera.up = ispy.camera.up;
    ispy.inset_camera.quarternion = ispy.camera.quaternion;
    ispy.inset_camera.position.setLength(10);
    ispy.inset_camera.lookAt(ispy.inset_scene.position);

    ispy.inset_scene.getObjectByName('xtext').quaternion.copy(ispy.inset_camera.quaternion);
    ispy.inset_scene.getObjectByName('ytext').quaternion.copy(ispy.inset_camera.quaternion);
    ispy.inset_scene.getObjectByName('ztext').quaternion.copy(ispy.inset_camera.quaternion);
    
    ispy.render();

    if ( ispy.animating ) {

	TWEEN.update();
	
    }

    if ( ispy.autoRotating ) {
	
	var speed = Date.now()*0.0005;
	ispy.camera.position.x = Math.cos(speed)*10;
	ispy.camera.position.z = Math.sin(speed)*10;
    
    }

};
