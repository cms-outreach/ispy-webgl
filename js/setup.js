ispy.lookAtOrigin = function() {

    ispy.camera.lookAt(new THREE.Vector3(0,0,0));

};

ispy.setFramerate = function(fr) {

    ispy.framerate = fr;  
    $('#fr').html(fr);

};

ispy.initCamera = function() {

    ispy.camera.position.x = 9.5;
    ispy.camera.position.y = 9.5;
    ispy.camera.position.z = 13.0;

    ispy.camera.zoom = 2.0;
    ispy.camera.up = new THREE.Vector3(0,1,0);
    
    ispy.camera.updateProjectionMatrix();
    ispy.lookAtOrigin();
 
};

ispy.useRenderer = function(type) {

    const width = document.getElementById('display').clientWidth;
    const height = document.getElementById('display').clientHeight;

    const rendererTypes = {
	
	'WebGLRenderer': THREE.WebGLRenderer,
	'SVGRenderer': THREE.SVGRenderer
    
    };

    const renderer = new rendererTypes[type]({antialias:true, alpha:true});
    const inset_renderer = new rendererTypes[type]({antialias:true, alpha:true});

    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    inset_renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    
    renderer.setClearColor(0x232323,1);
    inset_renderer.setClearColor(0x232323,0);

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

    const display = document.getElementById('display');
    const inset = document.getElementById('axes');
    
    const scene = new THREE.Scene();
    ispy.scene = scene;
    
    const width = display.clientWidth;
    const height = display.clientHeight;
    
    ispy.p_camera = new THREE.PerspectiveCamera(
	75,
	width/height,
	0.1,
	100
    );

    ispy.p_camera.name = 'PerspectiveCamera';

    ispy.o_camera = new THREE.OrthographicCamera(
	width / -2,
	width / 2,
	height / 2,
	height / -2,
	0.1,
	100
    );
 
    ispy.o_camera.name = 'OrthographicCamera';
    
    ispy.is_perspective = true; 
    ispy.camera = ispy.is_perspective ? ispy.p_camera : ispy.o_camera;
    ispy.initCamera();
    
    ispy.velocity = new THREE.Vector3(0, 0, 0);
    ispy.acceleration = new THREE.Vector3(0, 0, 0);

    const inset_scene = new THREE.Scene();
    ispy.inset_scene = inset_scene;

    // fov, aspect, near, far
    const inset_width = height/5;
    const inset_height = height/5;
    const inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
    ispy.inset_camera = inset_camera;
    ispy.inset_camera.up = ispy.camera.up;

    ispy.useRenderer('WebGLRenderer', width, height);
  
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

    ispy.treegui = new dat.GUI({
	name: 'Tree View',
	hideable: false,
	autoPlace: false
    });

    ispy.treegui.domElement.id = 'treegui';
    document.getElementById('titlebar').appendChild(ispy.treegui.domElement);
  
    // It seems currently impossible with dat.gui
    // to fetch the folders as an array and remove them
    // (without knowing the name beforehand).
    // Therefore we have to keep track of them by-hand.
    ispy.subfolders = {};
 
    ispy.clipgui.domElement.id = 'clipgui';
    document.getElementById('titlebar').appendChild(ispy.clipgui.domElement);
    $('#clipgui').hide();
    
    ispy.renderer.clippingPlanes = ispy.planes;

    ispy.inverted_colors = false;
    $('#invert-colors').prop('checked', false);

    const origin = new THREE.Vector3(0,0,0);

    // dir, origin, length, hex, headLength, headWidth
    const length = 3.5;
    const headLength = 1;
    const headWidth = 1;
    
    const rx = new THREE.ArrowHelper(
	new THREE.Vector3(4,0,0),
	origin,
	length,
	0xff0000,
	headLength,
	headWidth
    );

    const gy = new THREE.ArrowHelper(
	new THREE.Vector3(0,4,0),
	origin,
	length,
	0x00ff00,
	headLength,
	headWidth
    );

    const bz = new THREE.ArrowHelper(
	new THREE.Vector3(0,0,4),
	origin,
	length,
	0x0000ff,
	headLength,
	headWidth
    );

    rx.line.material.linewidth = 2.5;
    gy.line.material.linewidth = 2.5;
    bz.line.material.linewidth = 2.5;

    ispy.inset_scene.add(rx);
    ispy.inset_scene.add(gy);
    ispy.inset_scene.add(bz);
    
    $('#show-axes').prop('checked', false); // FF keeps the state after a page refresh. Therefore force uncheck.
  
    $('#show-axes').change(function() {

	if ( this.checked ) {

	    $('#axes').hide();

	} else {

	    $('#axes').show();

	}
	
    });

    ispy.use_line2 = false;
    $('#pickable_lines').prop('checked', false);

    $('#pickable_lines').change(function() {

	ispy.use_line2 = this.checked ? true : false;
	
    });

    $('#clipping').prop('checked', false);

    $('#clipping').change(function() {

	this.checked ? $('#clipgui').show() : $('#clipgui').hide();

    });
				
    const font_loader = new THREE.FontLoader();
    
    font_loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {

	    const tps = {size:0.75, height:0.1, font:font};

	    const x_geo = new THREE.TextGeometry('X', tps);
	    const y_geo = new THREE.TextGeometry('Y', tps);
	    const z_geo = new THREE.TextGeometry('Z', tps);

	    const x_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	    const x_text = new THREE.Mesh(x_geo, x_material);
	    x_text.position.x = length+headLength;
	    x_text.name = 'xtext';

	    const y_material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
	    const y_text = new THREE.Mesh(y_geo, y_material);
	    y_text.position.y = length+headLength;
	    y_text.name = 'ytext';
	    
	    const z_material = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	    const z_text = new THREE.Mesh(z_geo, z_material);
	    z_text.position.z = length+headLength;
	    z_text.name = 'ztext';

	    ispy.inset_scene.add(x_text);
	    ispy.inset_scene.add(y_text);
	    ispy.inset_scene.add(z_text);

	});

    // The second argument is necessary to make sure that mouse events are
    // handled only when in the canvas
    const controls = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 0.5;
    controls.dynamicDampingFactor = 1.0;

    ispy.controls = controls;

    ["Detector", "Imported"].forEach(function(g) {

	let obj_group = new THREE.Object3D();
	obj_group.name = g;
	ispy.scene.add(obj_group);

    });
    
    // Add a parent object for each group
    ispy.data_groups.forEach(function(g) {

	    let obj_group = new THREE.Object3D();
	    obj_group.name = g;
	    ispy.scene.add(obj_group);
	    
	});

    $('#version').html("v"+ispy.version);
    $('#threejs').html("r"+THREE.REVISION);

    window.addEventListener('resize', ispy.onWindowResize, false);

    ispy.get_image_data = false;
    ispy.image_data = null;
    
    ispy.raycaster = new THREE.Raycaster();
    ispy.raycaster.layers.set(2);

    ispy.intersected = null;
    
    ispy.renderer.domElement.addEventListener('pointermove', ispy.onMouseMove, false);
    ispy.renderer.domElement.addEventListener('pointerdown', ispy.onMouseDown, false);
    
    // Are we running an animation?
    ispy.animating = false;

    ispy.setFramerate(30);
    $('#fps-slider').prop('value', ispy.framerate); // for FF
    
    ispy.importTransparency = 0.75;
    $('#transparency-slider').prop('value', ispy.importTransparency);
    $('#trspy').html(ispy.importTransparency);

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

    const canvas = ispy.renderer.domElement;

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

    const intensity = 1.0;
    const length = 15.0;
    
    const lights = new THREE.Object3D();
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

    ispy.importDetector();
    
};

ispy.initDetector_old = function() {

    $('#loading').modal('show');

    $.when(
	ispy.getJSON('./geometry/json/eb.json'),
	ispy.getJSON('./geometry/json/ee.json'),
	ispy.getJSON('./geometry/json/hb.json'),
	ispy.getJSON('./geometry/json/ho.json'),
	ispy.getJSON('./geometry/json/hehf.json'),
	ispy.getJSON('./geometry/json/pixel-phase1.json'),
	ispy.getJSON('./geometry/json/tec.json'),
	ispy.getJSON('./geometry/json/tib.json'),
	ispy.getJSON('./geometry/json/tid.json'),
	ispy.getJSON('./geometry/json/tob.json')

    ).done(function(){
		       
	$.when(ispy.addDetector()).done(function() {
            
	    $('#loading').modal('hide');
			   
	});

    });
	
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

    if ( ispy.inset_scene.getObjectByName('xtext') ) {
    
	ispy.inset_scene.getObjectByName('xtext').quaternion.copy(ispy.inset_camera.quaternion);
	ispy.inset_scene.getObjectByName('ytext').quaternion.copy(ispy.inset_camera.quaternion);
	ispy.inset_scene.getObjectByName('ztext').quaternion.copy(ispy.inset_camera.quaternion);

    }
	
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
