ispy.lookAtOrigin = function() {

    ispy.camera.lookAt(new THREE.Vector3(0,0,0));

};

ispy.setFramerate = function(fr) {

    ispy.framerate = fr;  

    document.getElementById('fr').innerHTML = fr;

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

    document.getElementById('settings').style.display = 'none';

};

ispy.setupClipping = function() {
    
    ispy.clipgui = new dat.GUI({
	name: 'Clipping Controls',
	hideable: false,
	autoPlace: false
    });

    ispy.clipgui.domElement.id = 'clipgui';
    document.getElementById('titlebar').appendChild(ispy.clipgui.domElement);

    const localFolder = ispy.clipgui.addFolder("Local Clipping");
    const globalFolder = ispy.clipgui.addFolder("Global Clipping");

    const local_planeX = localFolder.addFolder("planeX");
    const local_planeY = localFolder.addFolder("planeY");
    const local_planeZ = localFolder.addFolder("planeZ");
    
    const global_planeX = globalFolder.addFolder("planeX");
    const global_planeY = globalFolder.addFolder("planeY");
    const global_planeZ = globalFolder.addFolder("planeZ");

    const local_params = {
	
	planeX: {
	    constant: 10,
	    negated: false 
	},
    
	planeY: {
	    constant: 10,
	    negated: false
	},
    
	planeZ: {
	    constant: 30,
	    negated: false
	}

    };
    
    const global_params = {
    
	planeX: {
	    constant: 10,
	    negated: false 
	},
    
	planeY: {
	    constant: 10,
	    negated: false
	},
    
	planeZ: {
	    constant: 30,
	    negated: false
	}
	
    };

    ispy.local_planes = [
	new THREE.Plane(new THREE.Vector3(-1,0,0), local_params.planeX.constant),
	new THREE.Plane(new THREE.Vector3(0,-1,0), local_params.planeY.constant),
	new THREE.Plane(new THREE.Vector3(0,0,-1), local_params.planeZ.constant)
    ];
    
    ispy.global_planes = [
	new THREE.Plane(new THREE.Vector3(-1,0,0), global_params.planeX.constant),
	new THREE.Plane(new THREE.Vector3(0,-1,0), global_params.planeY.constant),
	new THREE.Plane(new THREE.Vector3(0,0,-1), global_params.planeZ.constant)
    ];
    
    ispy.renderer.clippingPlanes = ispy.global_planes;
    ispy.renderer.localClippingEnabled = true;

    local_planeX.add(local_params.planeX, 'constant').min(-10).max(10).onChange(
	d => ispy.local_planes[0].constant = d
    );
    
    local_planeX.add(local_params.planeX, 'negated').onChange(() => {
	ispy.local_planes[0].negate();
	local_params.planeX.constant = ispy.local_planes[0].constant;
    });
    
    local_planeX.open();
    
    global_planeX.add(global_params.planeX, 'constant').min(-10).max(10).onChange(
	d => ispy.global_planes[0].constant = d
    );

    global_planeX.add(global_params.planeX, 'negated').onChange(() => {
	ispy.global_planes[0].negate();
	global_params.planeX.constant = ispy.global_planes[0].constant;
    });

    global_planeX.open();
    
    local_planeY.add(local_params.planeY, 'constant').min(-10).max(10).onChange(
	d => ispy.local_planes[1].constant = d
    );

    local_planeY.add(local_params.planeY, 'negated').onChange(() => {
	ispy.local_planes[1].negate();
	local_params.planeY.constant = ispy.local_planes[1].constant;
    });
        
    local_planeY.open();
    
    global_planeY.add(global_params.planeY, 'constant').min(-10).max(10).onChange(
	d => ispy.global_planes[1].constant = d
    );

    global_planeY.add(global_params.planeY, 'negated').onChange(() => {
	ispy.global_planes[1].negate();
	global_params.planeY.constant = ispy.global_planes[1].constant;
    });

    global_planeY.open();
    
    local_planeZ.add(local_params.planeZ, 'constant').min(-30).max(30).onChange(
	d => ispy.local_planes[2].constant = d
    );

    local_planeZ.add(local_params.planeZ, 'negated').onChange(() => {
	ispy.local_planes[2].negate();
	local_params.planeZ.constant = ispy.local_planes[2].constant;
    });
    
    local_planeZ.open();
    
    global_planeZ.add(global_params.planeZ, 'constant').min(-30).max(30).onChange(
	d => ispy.global_planes[2].constant = d
    );

    global_planeZ.add(global_params.planeZ, 'negated').onChange(() => {
	ispy.global_planes[2].negate();
	global_params.planeZ.constant = ispy.global_planes[2].constant;
    });

    global_planeZ.open();

};

ispy.setupGUIs = function() {
    
    ispy.gui = new dat.GUI({
	name: 'Controls',
	hideable: false,
	autoPlace: false
    });

    ispy.gui.domElement.id = 'treegui';
    document.getElementById('titlebar').appendChild(ispy.gui.domElement);
    
    // It seems currently impossible with dat.gui
    // to fetch the folders as an array and remove them
    // (without knowing the name beforehand).
    // Therefore we have to keep track of them by-hand.
    ispy.subfolders = {};

};

ispy.setupInset = function(height) {
    
    const inset_scene = new THREE.Scene();
    ispy.inset_scene = inset_scene;

    // fov, aspect, near, far
    const inset_width = height/5;
    const inset_height = height/5;
    const inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
    ispy.inset_camera = inset_camera;
    ispy.inset_camera.up = ispy.camera.up;
    
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
    
};

ispy.handleToggles = function() {

    // On page load hide the stats
    let stats = document.getElementById('stats');
    stats.style.display = 'none';

    let show_stats = document.getElementById('show-stats');
    
    // FF keeps the check state on reload so force an "uncheck"
    show_stats.checked = false;
    
    show_stats.addEventListener('change', () => {

	show_stats.checked == true ? stats.style.display = 'block' : stats.style.display = 'none';

    });
    

    let show_logo = document.getElementById('show-logo');
    show_logo.checked = true;

    show_logo.addEventListener('change', (event) => {

	let cms_logo = document.getElementById('cms-logo');
	event.target.checked ? cms_logo.style.display = 'block' : cms_logo.style.display = 'none';
	   
    });
    
    ispy.inverted_colors = false;
    document.getElementById('invert-colors').checked = false;

    let show_axes = document.getElementById('show-axes');
    
    // FF keeps the state after a page refresh. Therefore force uncheck.
    show_axes.checked = false;

    show_axes.addEventListener('change', (event) => {

	let axes = document.getElementById('axes');
	event.target.checked ? axes.style.display = 'none' : axes.style.display = 'block';
	
    });

    ispy.use_line2 = false;

    let pickable_lines = document.getElementById('pickable_lines');

    pickable_lines.checked = false;

    pickable_lines.addEventListener('change', (event) => {

	ispy.use_line2 = event.target.checked ? true : false;
	
    });

    let clipgui = document.getElementById('clipgui');
    clipgui.style.display = 'none';

    let clipping = document.getElementById('clipping');
    clipping.checked = false;

    clipping.addEventListener('change', (event) => {

	event.target.checked ? clipgui.style.display = 'block' : clipgui.style.display = 'none';

    });

};

ispy.handleDragAndDrop = function() {
    
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

};

ispy.init = function() {

    const display = document.getElementById('display');
    const inset = document.getElementById('axes');

    ispy.scenes = {
	'3D': new THREE.Scene(),
	'RPhi': new THREE.Scene(),
	'RhoZ': new THREE.Scene()
    };

    ispy.views = ['3D', 'RPhi', 'RhoZ'];
    
    for ( const key in ispy.scenes ) {

	ispy.scenes[key].name = key;

    }
    
    ispy.current_view = '3D';
    ispy.scene = ispy.scenes[ispy.current_view];
    
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

    ispy.setupInset(height);
    
    ispy.useRenderer('WebGLRenderer', width, height);
  
    ispy.stats = new Stats();
    display.appendChild(ispy.stats.domElement);

    ispy.setupGUIs();    
    ispy.setupClipping();
    ispy.handleToggles();
    ispy.handleDragAndDrop();

    // The second argument is necessary to make sure that mouse events are
    // handled only when in the canvas
    ispy.tcontrols = new THREE.TrackballControls(ispy.camera, ispy.renderer.domElement);
    ispy.tcontrols.rotateSpeed = 3.0;
    ispy.tcontrols.zoomSpeed = 0.5;
    ispy.tcontrols.dynamicDampingFactor = 1.0;
    ispy.tcontrols.noRotate = false;
    ispy.tcontrols.noPan = false;
    
    ispy.ocontrols = new THREE.OrbitControls(ispy.camera, ispy.renderer.domElement);
    ispy.ocontrols.enableRotate = true;

    ispy.controls = ispy.ocontrols;

    ispy.views.forEach(v => {

	['Detector', 'Imported'].concat(ispy.data_groups).forEach(g => {

	    let obj_group = new THREE.Group();
	    obj_group.name = g;
	    ispy.scenes[v].add(obj_group);
	   
	});

    });

    document.getElementById('version').innerHTML = ispy.version;
    document.getElementById('threejs').innerHTML = "r"+THREE.REVISION;
    
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

    document.getElementById('fps-slider').value = ispy.framerate;
    
    ispy.importTransparency = 0.75;
    document.getElementById('transparency-slider').value = ispy.importTransparency;
   
    document.getElementById('trspy').innerHTML = ispy.importTransparency;
    
    document.getElementById('display').appendChild(document.getElementById('event-info'));
    
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

ispy.initDetector = function() {

    ispy.importDetector();
    
};

ispy.render = function() {

    if ( ispy.renderer !== null ) {
	    
	ispy.renderer.render(ispy.scene, ispy.camera);
    
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

    ispy.controls.update();
    ispy.inset_camera.position.subVectors(ispy.camera.position, ispy.controls.target);
	
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
