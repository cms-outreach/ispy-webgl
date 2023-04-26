import { data_groups } from "./objects-config.js";
import { onWindowResize, onMouseMove, onMouseDown } from "./display.js";
import { importDetector } from "./files-load.js";

let camera, framerate;
let renderer, inset_renderer, renderer_name;
let clipgui, local_planes, global_planes;
let gui, subfolders;
let inset_scene, inset_camera;
let inverted_colors, use_line2;
let scenes, views, current_view, scene;
let p_camera, o_camera, is_perspective;
let velocity, acceleration, stats;
let tcontrols, ocontrols, controls;
let get_image_data, image_data;
let raycaster, intersected;
let animating, autoRotating;
let importTransparency;
let light1, light2;

function lookAtOrigin() {

    camera.lookAt(new THREE.Vector3(0,0,0));

};

function setFramerate(fr) {

    framerate = fr;  

    document.getElementById('fr').innerHTML = fr;

};

function initCamera() {

    camera.position.x = 9.5;
    camera.position.y = 9.5;
    camera.position.z = 13.0;

    camera.zoom = 2.0;
    camera.up = new THREE.Vector3(0,1,0);
    
    camera.updateProjectionMatrix();
    lookAtOrigin();
 
};

function useRenderer(type) {

    const width = document.getElementById('display').clientWidth;
    const height = document.getElementById('display').clientHeight;

    const rendererTypes = {
	'WebGLRenderer': THREE.WebGLRenderer,
	'SVGRenderer': THREE.SVGRenderer
    };

    renderer = new rendererTypes[type]({antialias:true, alpha:true});
    inset_renderer = new rendererTypes[type]({antialias:true, alpha:true});

    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    inset_renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    
    renderer.setClearColor(0x232323,1);
    inset_renderer.setClearColor(0x232323,0);

    renderer.setSize(width, height);
    inset_renderer.setSize(height/5, height/5);

    renderer = renderer;
    renderer_name = type;
    inset_renderer = inset_renderer;
    
    document.getElementById('display').appendChild(renderer.domElement);
    document.getElementById('axes').appendChild(inset_renderer.domElement);

    document.getElementById('settings').style.display = 'none';

};

function setupClipping() {
    
    clipgui = new dat.GUI({
	name: 'Clipping Controls',
	hideable: false,
	autoPlace: false
    });

    clipgui.domElement.id = 'clipgui';
    document.getElementById('titlebar').appendChild(clipgui.domElement);

    const localFolder = clipgui.addFolder("Local Clipping");
    const globalFolder = clipgui.addFolder("Global Clipping");

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

    local_planes = [
	new THREE.Plane(new THREE.Vector3(-1,0,0), local_params.planeX.constant),
	new THREE.Plane(new THREE.Vector3(0,-1,0), local_params.planeY.constant),
	new THREE.Plane(new THREE.Vector3(0,0,-1), local_params.planeZ.constant)
    ];
    
    global_planes = [
	new THREE.Plane(new THREE.Vector3(-1,0,0), global_params.planeX.constant),
	new THREE.Plane(new THREE.Vector3(0,-1,0), global_params.planeY.constant),
	new THREE.Plane(new THREE.Vector3(0,0,-1), global_params.planeZ.constant)
    ];
    
    renderer.clippingPlanes = global_planes;
    renderer.localClippingEnabled = true;

    local_planeX.add(local_params.planeX, 'constant').min(-10).max(10).onChange(
	d => local_planes[0].constant = d
    );
    
    local_planeX.add(local_params.planeX, 'negated').onChange(() => {
	local_planes[0].negate();
	local_params.planeX.constant = local_planes[0].constant;
    });
    
    local_planeX.open();
    
    global_planeX.add(global_params.planeX, 'constant').min(-10).max(10).onChange(
	d => global_planes[0].constant = d
    );

    global_planeX.add(global_params.planeX, 'negated').onChange(() => {
	global_planes[0].negate();
	global_params.planeX.constant = global_planes[0].constant;
    });

    global_planeX.open();
    
    local_planeY.add(local_params.planeY, 'constant').min(-10).max(10).onChange(
	d => local_planes[1].constant = d
    );

    local_planeY.add(local_params.planeY, 'negated').onChange(() => {
	local_planes[1].negate();
	local_params.planeY.constant = local_planes[1].constant;
    });
        
    local_planeY.open();
    
    global_planeY.add(global_params.planeY, 'constant').min(-10).max(10).onChange(
	d => global_planes[1].constant = d
    );

    global_planeY.add(global_params.planeY, 'negated').onChange(() => {
	global_planes[1].negate();
	global_params.planeY.constant = global_planes[1].constant;
    });

    global_planeY.open();
    
    local_planeZ.add(local_params.planeZ, 'constant').min(-30).max(30).onChange(
	d => local_planes[2].constant = d
    );

    local_planeZ.add(local_params.planeZ, 'negated').onChange(() => {
	local_planes[2].negate();
	local_params.planeZ.constant = local_planes[2].constant;
    });
    
    local_planeZ.open();
    
    global_planeZ.add(global_params.planeZ, 'constant').min(-30).max(30).onChange(
	d => global_planes[2].constant = d
    );

    global_planeZ.add(global_params.planeZ, 'negated').onChange(() => {
	global_planes[2].negate();
	global_params.planeZ.constant = global_planes[2].constant;
    });

    global_planeZ.open();

};

function setupGUIs() {
    
    gui = new dat.GUI({
	name: 'Controls',
	hideable: false,
	autoPlace: false
    });

    gui.domElement.id = 'treegui';
    document.getElementById('titlebar').appendChild(gui.domElement);
    
    // It seems currently impossible with dat.gui
    // to fetch the folders as an array and remove them
    // (without knowing the name beforehand).
    // Therefore we have to keep track of them by-hand.
    subfolders = {};

};

function setupInset(height) {
    
    inset_scene = new THREE.Scene();
   
    // fov, aspect, near, far
    const inset_width = height/5;
    const inset_height = height/5;
    inset_camera = new THREE.PerspectiveCamera(70, inset_width / inset_height, 1, 100);
    inset_camera.up = camera.up;
    
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

    inset_scene.add(rx);
    inset_scene.add(gy);
    inset_scene.add(bz);
				
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

	inset_scene.add(x_text);
	inset_scene.add(y_text);
	inset_scene.add(z_text);

    });
    
};

function handleToggles() {

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
    
    inverted_colors = false;
    document.getElementById('invert-colors').checked = false;

    let show_axes = document.getElementById('show-axes');
    
    // FF keeps the state after a page refresh. Therefore force uncheck.
    show_axes.checked = false;

    show_axes.addEventListener('change', (event) => {

	let axes = document.getElementById('axes');
	event.target.checked ? axes.style.display = 'none' : axes.style.display = 'block';
	
    });

    use_line2 = false;

    let pickable_lines = document.getElementById('pickable_lines');

    pickable_lines.checked = false;

    pickable_lines.addEventListener('change', (event) => {

	use_line2 = event.target.checked ? true : false;
	
    });

    let clipgui = document.getElementById('clipgui');
    clipgui.style.display = 'none';

    let clipping = document.getElementById('clipping');
    clipping.checked = false;

    clipping.addEventListener('change', (event) => {

	event.target.checked ? clipgui.style.display = 'block' : clipgui.style.display = 'none';

    });

};

function handleDragAndDrop() {
    
    const canvas = renderer.domElement;

    canvas.ondragover = function() {

	this.classList.add('hover');
	return false;

    };

    canvas.ondrop = function(e) {

	e.preventDefault();
	this.classList.remove('hover');
	
	var file = e.dataTransfer.files[0];
	loadDroppedFile(file);

	return false;

    };

    canvas.addEventListener('ondragover', canvas.ondragover);
    canvas.addEventListener('ondrop', canvas.ondrop);

};

function init() {

    const display = document.getElementById('display');
    const inset = document.getElementById('axes');

    scenes = {
	'3D': new THREE.Scene(),
	'RPhi': new THREE.Scene(),
	'RhoZ': new THREE.Scene()
    };

    views = ['3D', 'RPhi', 'RhoZ'];
    
    for ( const key in scenes ) {

	scenes[key].name = key;

    }
    
    current_view = '3D';
    scene = scenes[current_view];
    
    const width = display.clientWidth;
    const height = display.clientHeight;
    
    p_camera = new THREE.PerspectiveCamera(
	75,
	width/height,
	0.1,
	100
    );

    p_camera.name = 'PerspectiveCamera';

    o_camera = new THREE.OrthographicCamera(
	width / -2,
	width / 2,
	height / 2,
	height / -2,
	0.1,
	100
    );
 
    o_camera.name = 'OrthographicCamera';
    
    is_perspective = true; 
    camera = is_perspective ? p_camera : o_camera;
    initCamera();
    
    velocity = new THREE.Vector3(0, 0, 0);
    acceleration = new THREE.Vector3(0, 0, 0);

    setupInset(height);
    
    useRenderer('WebGLRenderer', width, height);
  
    stats = new Stats();
    display.appendChild(stats.domElement);

    setupGUIs();    
    setupClipping();
    handleToggles();
    handleDragAndDrop();

    // The second argument is necessary to make sure that mouse events are
    // handled only when in the canvas
    tcontrols = new THREE.TrackballControls(camera, renderer.domElement);
    tcontrols.rotateSpeed = 3.0;
    tcontrols.zoomSpeed = 0.5;
    tcontrols.dynamicDampingFactor = 1.0;
    tcontrols.noRotate = false;
    tcontrols.noPan = false;
    
    ocontrols = new THREE.OrbitControls(camera, renderer.domElement);
    ocontrols.enableRotate = true;

    controls = ocontrols;

    views.forEach(v => {

	['Detector', 'Imported'].concat(data_groups).forEach(g => {

	    let obj_group = new THREE.Group();
	    obj_group.name = g;
	    scenes[v].add(obj_group);
	   
	});

    });

    document.getElementById('version').innerHTML = "v"+version;
    document.getElementById('threejs').innerHTML = "r"+THREE.REVISION;
    
    window.addEventListener('resize', onWindowResize, false);

    get_image_data = false;
    image_data = null;
    
    raycaster = new THREE.Raycaster();
    raycaster.layers.set(2);

    intersected = null;
    
    renderer.domElement.addEventListener('pointermove', onMouseMove, false);
    renderer.domElement.addEventListener('pointerdown', onMouseDown, false);
    
    // Are we running an animation?
    animating = false;

    setFramerate(30);

    document.getElementById('fps-slider').value = framerate;
    
    importTransparency = 0.75;
    document.getElementById('transparency-slider').value = importTransparency;
   
    document.getElementById('trspy').innerHTML = importTransparency;
    
    document.getElementById('display').appendChild(document.getElementById('event-info'));
    
    autoRotating = false;

};

function initLight() {

    const intensity = 1.0;
    const length = 15.0;
    
    const lights = new THREE.Object3D();
    lights.name = 'Lights';
    scene.add(lights);
    
    light1 = new THREE.DirectionalLight(0xffffff, intensity);
    light1.name = 'Light1';
    light1.position.set(-length, length, length);
    scene.getObjectByName('Lights').add(light1);
    
    light2 = new THREE.DirectionalLight(0xffffff, intensity);
    light2.name = 'Light2';
    light2.position.set(length, -length, -length);
    scene.getObjectByName('Lights').add(light2);

};

function initDetector() {

    importDetector();
    
};

function render() {

    if ( renderer !== null ) {
	    
	renderer.render(scene, camera);
    
	if ( get_image_data ){
      
	    image_data = renderer.domElement.toDataURL();
	    get_image_data = false;

	}

    }

    if ( inset_renderer !== null ) {

	inset_renderer.render(inset_scene, inset_camera);

    }

};

function run() {

    setTimeout( function() {
  
	requestAnimationFrame(run);
  
    }, 1000/framerate );

    stats.update();

    controls.update();
    inset_camera.position.subVectors(camera.position, controls.target);
	
    inset_camera.up = camera.up;
    inset_camera.quarternion = camera.quaternion;
    inset_camera.position.setLength(10);
    inset_camera.lookAt(inset_scene.position);

    if ( inset_scene.getObjectByName('xtext') ) {
    
	inset_scene.getObjectByName('xtext').quaternion.copy(inset_camera.quaternion);
	inset_scene.getObjectByName('ytext').quaternion.copy(inset_camera.quaternion);
	inset_scene.getObjectByName('ztext').quaternion.copy(inset_camera.quaternion);

    }
	
    render();

    if ( animating ) {

	TWEEN.update();
	
    }

    if ( autoRotating ) {
	
	var speed = Date.now()*0.0005;
	camera.position.x = Math.cos(speed)*10;
	camera.position.z = Math.sin(speed)*10;
    
    }

};

export { camera, framerate,
	 renderer, inset_renderer, renderer_name,
	 clipgui, local_planes, global_planes,
	 gui, subfolders,
	 inverted_colors, use_line2,
	 scenes, views, current_view, scene,
	 p_camera, o_camera, is_perspective,
	 velocity, acceleration, stats,
	 tcontrols, ocontrols, controls,
	 get_image_data, image_data,
	 raycaster, intersected,
	 animating, autoRotating,
	 importTransparency,
	 light1, light2, render, run,
	 init, initLight, initDetector, lookAtOrigin };

