import {
    Vector3,
    Plane,
    Mesh,
    MeshBasicMaterial,
    Scene,
    Object3D,
    PerspectiveCamera,
    OrthographicCamera,
    ArrowHelper,
    Group,
    Raycaster,
    DirectionalLight,
    WebGLRenderer,
    REVISION
} from 'three';

import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

import { data_groups } from "./objects-config.js";

import {
    onMouseMove,
    onMouseDown,
    updateRendererInfo
} from "./display.js";

import { importDetector } from "./files-load.js";

let camera, framerate;
let renderer, inset_renderer, renderer_name;
let clipgui, local_planes, global_planes;
let gui, subfolders;
let is_perspective;
let inset_scene, inset_camera;
let inverted_colors, use_line2;
let scenes, views, current_view, scene;
let p_camera, o_camera;
let velocity, acceleration, stats;
let tcontrols, ocontrols, controls;
let get_image_data, image_data;
let raycaster, intersected;
let animating, auto_rotating;
let import_transparency;
let light1, light2;

function lookAtOrigin() {

    camera.lookAt(new Vector3(0,0,0));

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
    camera.up = new Vector3(0,1,0);
    
    camera.updateProjectionMatrix();
    lookAtOrigin();
 
};

function useRenderer(type) {

    const width = document.getElementById('display').clientWidth;
    const height = document.getElementById('display').clientHeight;

    const rendererTypes = {
	'WebGLRenderer': WebGLRenderer,
	'SVGRenderer': SVGRenderer
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
	new Plane(new Vector3(-1,0,0), local_params.planeX.constant),
	new Plane(new Vector3(0,-1,0), local_params.planeY.constant),
	new Plane(new Vector3(0,0,-1), local_params.planeZ.constant)
    ];
    
    global_planes = [
	new Plane(new Vector3(-1,0,0), global_params.planeX.constant),
	new Plane(new Vector3(0,-1,0), global_params.planeY.constant),
	new Plane(new Vector3(0,0,-1), global_params.planeZ.constant)
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
    
    inset_scene = new Scene();
   
    // fov, aspect, near, far
    const inset_width = height/5;
    const inset_height = height/5;
    inset_camera = new PerspectiveCamera(70, inset_width / inset_height, 1, 100);
    inset_camera.up = camera.up;
    
    const origin = new Vector3(0,0,0);

    // dir, origin, length, hex, headLength, headWidth
    const length = 3.5;
    const headLength = 1;
    const headWidth = 1;
    
    const rx = new ArrowHelper(
	new Vector3(4,0,0),
	origin,
	length,
	0xff0000,
	headLength,
	headWidth
    );

    const gy = new ArrowHelper(
	new Vector3(0,4,0),
	origin,
	length,
	0x00ff00,
	headLength,
	headWidth
    );

    const bz = new ArrowHelper(
	new Vector3(0,0,4),
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
				
    const font_loader = new FontLoader();
    
    font_loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {

	const tps = {size:0.75, height:0.1, font:font};
	
	const x_geo = new TextGeometry('X', tps);
	const y_geo = new TextGeometry('Y', tps);
	const z_geo = new TextGeometry('Z', tps);

	const x_material = new MeshBasicMaterial({ color: 0xff0000 });
	const x_text = new Mesh(x_geo, x_material);
	x_text.position.x = length+headLength;
	x_text.name = 'xtext';

	const y_material = new MeshBasicMaterial({ color: 0x00ff00});
	const y_text = new Mesh(y_geo, y_material);
	y_text.position.y = length+headLength;
	y_text.name = 'ytext';
	    
	const z_material = new MeshBasicMaterial({ color: 0x0000ff});
	const z_text = new Mesh(z_geo, z_material);
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
	'3D': new Scene(),
	'RPhi': new Scene(),
	'RhoZ': new Scene()
    };

    views = ['3D', 'RPhi', 'RhoZ'];
    
    for ( const key in scenes ) {

	scenes[key].name = key;

    }
    
    current_view = '3D';
    scene = scenes[current_view];
    
    const width = display.clientWidth;
    const height = display.clientHeight;
    
    p_camera = new PerspectiveCamera(
	75,
	width/height,
	0.1,
	100
    );

    p_camera.name = 'PerspectiveCamera';

    o_camera = new OrthographicCamera(
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
    
    velocity = new Vector3(0, 0, 0);
    acceleration = new Vector3(0, 0, 0);

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
    tcontrols = new TrackballControls(camera, renderer.domElement);
    tcontrols.rotateSpeed = 3.0;
    tcontrols.zoomSpeed = 0.5;
    tcontrols.dynamicDampingFactor = 1.0;
    tcontrols.noRotate = false;
    tcontrols.noPan = false;
    
    ocontrols = new OrbitControls(camera, renderer.domElement);
    ocontrols.enableRotate = true;

    controls = ocontrols;
    
    document.getElementById("3d").onclick = function() { showView("3D") };
    document.getElementById("rphi").onclick = function() { showView("RPhi") };
    document.getElementById("rhoz").onclick = function () { showView("RhoZ") };

    views.forEach(v => {

	['Detector', 'Imported'].concat(data_groups).forEach(g => {

	    let obj_group = new Group();
	    obj_group.name = g;
	    scenes[v].add(obj_group);
	   
	});

    });

    document.getElementById('version').innerHTML = "v"+version;
    document.getElementById('threejs').innerHTML = "r"+REVISION;
    
    window.addEventListener('resize', onWindowResize, false);

    get_image_data = false;
    image_data = null;
    
    raycaster = new Raycaster();
    raycaster.layers.set(2);

    intersected = null;
    
    renderer.domElement.addEventListener('pointermove', onMouseMove, false);
    renderer.domElement.addEventListener('pointerdown', onMouseDown, false);
    
    // Are we running an animation?
    animating = false;

    setFramerate(30);
    document.getElementById('fps-slider').value = framerate;
    
    import_transparency = 0.75;
    document.getElementById('transparency-slider').value = import_transparency;
   
    document.getElementById('trspy').innerHTML = import_transparency;
    
    document.getElementById('display').appendChild(document.getElementById('event-info'));
    
    auto_rotating = false;

};

function initLight() {

    const intensity = 1.0;
    const length = 15.0;
    
    const lights = new Object3D();
    lights.name = 'Lights';
    scene.add(lights);
    
    light1 = new DirectionalLight(0xffffff, intensity);
    light1.name = 'Light1';
    light1.position.set(-length, length, length);
    scene.getObjectByName('Lights').add(light1);
    
    light2 = new DirectionalLight(0xffffff, intensity);
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

    if ( auto_rotating ) {
	
	var speed = Date.now()*0.0005;
	camera.position.x = Math.cos(speed)*10;
	camera.position.z = Math.sin(speed)*10;
    
    }

};

function resetView() {

    setPerspective();
    initCamera();

    controls.reset();

    document.getElementById('3d').classList.add('active');
    document.getElementById('rphi').classList.remove('active');
    document.getElementById('rhoz').classList.remove('active');

    current_view = '3D';
    scene = scenes['3D'];
    
};

function setXY() {

    const length = camera.position.length();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = length;
    camera.up = new Vector3(0,1,0);

    lookAtOrigin();

};

function setZX() {

    const length = camera.position.length();

    camera.position.x = 0;
    camera.position.y = length;
    camera.position.z = 0;
    camera.up = new Vector3(1,0,0);

    lookAtOrigin();

};

function setYZ() {

    const length = camera.position.length();

    camera.position.x = -length;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.up = new Vector3(0,1,0);
    
    lookAtOrigin();

};

function autoRotate() {

    auto_rotating = !auto_rotating;

    document.getElementById('autorotate').classList.toggle('active');

};

function setOrthographic() {
    
    document.getElementById('perspective').classList.remove('active');
    document.getElementById('orthographic').classList.add('active');
    
    is_perspective = false;
    camera = o_camera;

    camera.position.x = p_camera.position.x;
    camera.position.y = p_camera.position.y;
    camera.position.z = p_camera.position.z;

    camera.zoom = p_camera.zoom;
    camera.up = p_camera.up;
    
    const fov = p_camera.fov;
    const aspect = p_camera.aspect;
    const near = p_camera.near;
    const far = p_camera.far;
    
    const focus = (near+far)/2;

    let half_height = Math.tan(fov*Math.PI/180/2)*focus;
    let half_width = half_height*aspect;

    half_height /= p_camera.zoom;
    half_width /= p_camera.zoom;
    
    camera.left = -half_width;
    camera.right = half_width;
    camera.top = half_height;
    camera.bottom = -half_height;
    
    camera.updateProjectionMatrix();

    controls.object = camera;
    controls.update();
    
};

function setPerspective() {

    document.getElementById('perspective').classList.add('active');
    document.getElementById('orthographic').classList.remove('active');
    
    is_perspective = true;
    camera = p_camera;
    
    camera.position.x = o_camera.position.x;
    camera.position.y = o_camera.position.y;
    camera.position.z = o_camera.position.z;

    camera.zoom = o_camera.zoom;
    camera.up = o_camera.up;

    camera.aspect = o_camera.right / o_camera.top;
    
    camera.updateProjectionMatrix();

    controls.object = camera;
    controls.update();
    
};


function invertColors() {

    inverted_colors = ! inverted_colors;

    ! inverted_colors ?  renderer.setClearColor(0x232323,1) : renderer.setClearColor(0xefefef,1);
	
    let body = document.querySelector('body');	
    body.classList.toggle('white');
    body.classList.toggle('black');
    
    let ids = [
	'event-info', 'titlebar', 'toolbar',
	'display', 'tableview', 'browser-table',
	'browser-files', 'obj-table', 'obj-files'
    ];

    ids.forEach(id => {

	let el = document.getElementById(id);

	el.classList.toggle('white');
	el.classList.toggle('black');

    });

    let selectors = [
	'treeview td.group', '#treeview td.collection',
	'#tableview table thead th', '#browser-table th',
	'#obj-table th', '.modal-content', '.modal-title',
	'#table-data-eventObject'
    ];

    selectors.forEach(sels => {

	document.querySelectorAll(sels).forEach(s => {

	    s.classList.toggle('white');
	    s.classList.toggle('black');

	});

    });

};

function showView(view) {

    console.log(view);
    
    switch (view) {

    case '3D':
	
	document.getElementById('3d').classList.add('active');
	document.getElementById('rphi').classList.remove('active');
	document.getElementById('rhoz').classList.remove('active');
	
	document.getElementById('perspective').removeAttribute('disabled', '');
	document.getElementById('orthographic').removeAttribute('disabled', '');
	
	document.getElementById('xy').removeAttribute('disabled', '');
	document.getElementById('yz').removeAttribute('disabled', '');
	document.getElementById('xz').removeAttribute('disabled', '');
	
	controls.enableRotate = true;
	controls.reset();

	/*
	  We may have cases where the view is already 3D
	  but we have switched to/from persepctive/orthographic
	*/
	if ( current_view !== '3D' )
	    setPerspective();

	current_view = '3D';
	scene = scenes['3D'];

	break;

    case 'RPhi':

	document.getElementById('3d').classList.remove('active');
	document.getElementById('rphi').classList.add('active');
	document.getElementById('rhoz').classList.remove('active');

	document.getElementById('perspective').setAttribute('disabled', '');
	document.getElementById('orthographic').setAttribute('disabled', '');
	
	document.getElementById('xy').setAttribute('disabled', '');
	document.getElementById('yz').setAttribute('disabled', '');
	document.getElementById('xz').setAttribute('disabled', '');
	
	controls.enableRotate = false;
	controls.reset();
	
	setOrthographic();
	setXY();
	
	current_view = 'RPhi';
	scene = scenes['RPhi'];
	
	break;

    case 'RhoZ':
	
	document.getElementById('3d').classList.remove('active');
	document.getElementById('rphi').classList.remove('active');
	document.getElementById('rhoz').classList.add('active');
	
	document.getElementById('perspective').setAttribute('disabled', '');
	document.getElementById('orthographic').setAttribute('disabled', '');
	
	document.getElementById('xy').setAttribute('disabled', '');
	document.getElementById('yz').setAttribute('disabled', '');
	document.getElementById('xz').setAttribute('disabled', '');
	
	controls.enableRotate = false;
	controls.reset();

	setOrthographic();
	setYZ();
		
	current_view = 'RhoZ';
	scene = scenes['RhoZ'];
	
	break;
	
    }
    
};

function enterFullscreen() {
    
    const container = document.getElementById('ispy');

    if ( container.requestFullscreen ) {
	container.requestFullscreen();
    } else if ( container.msRequestFullscreen ) {
	container.msRequestFullscreen();
    } else if ( container.mozRequestFullScreen ) {
	container.mozRequestFullScreen();
    } else if ( container.webkitRequestFullscreen ) {
	container.webkitRequestFullscreen();
    } else {
	alert('Cannot go to full screen!');
    }
    
};

function exitFullscreen() {
  
    if ( document.exitFullscreen ) {
	document.exitFullscreen();
    } else if ( document.msExitFullscreen ) {
	document.msExitFullscreen();
    } else if ( document.mozCancelFullScreen ) {
	document.mozCancelFullScreen();
    } else if ( document.webkitExitFullscreen ) {
	document.webkitExitFullscreen();
    } else {
	alert('Cannot exit full screen. Try Esc?');
    }

};

function toggleFullscreen() {

    document.getElementById('enterFullscreen').classList.toggle('active');
    document.getElementById('exitFullscreen').classList.toggle('active');

};

document.addEventListener('webkitfullscreenchange', toggleFullscreen, false);
document.addEventListener('mozfullscreenchange', toggleFullscreen, false);
document.addEventListener('fullscreenchange', toggleFullscreen, false);
document.addEventListener('MSFullscreenChange', toggleFullscreen, false);

function onWindowResize() {

    let display = document.getElementById('display');
    display.removeAttribute('style');

    let w = display.clientWidth;
    let h = display.clientHeight;
    
    if ( is_perspective ) {

	camera.aspect = w/h;

    } else {

	camera.left = -w/2;
	camera.right = w/2;
	camera.top = h/2;
	camera.bottom = -h/2;

    }

    camera.updateProjectionMatrix();
    renderer.setSize(w,h);
    render();

};

function reload() {

    location.reload();

};

function setOrientationControls(e) {
  
    if ( ! e.alpha ) {
	
	return;
    
    }

    window.removeEventListener('deviceorientation', setOrientationControls, true);

}

function zoomIn() {

    camera.zoom += 0.5;
    camera.updateProjectionMatrix();
    
};

function zoomOut() {
    
    camera.zoom -= 0.5;
    camera.updateProjectionMatrix();

};

function printImage() {
  
    get_image_data = true;
    render();
    window.open(image_data, "toDataURL() image", "width=1600, height=900");

};

function exportScene() {

    const exporter = new GLTFExporter();

    const options = {
	onlyVisible: true,
	binary: true
    };

    exporter.parse(scene, function(result) {

	exportArrayBuffer(result, 'scene.glb'); 

    }, options);

    alert('scene.glb created');
    
};

function exportString(output, filename) {

    const blob = new Blob([output], {type: 'text/plain'});
    const objectURL = URL.createObjectURL(blob);

    console.log(filename);

    // Use this to output to file:
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild( link );
    link.href = objectURL;
    link.download = filename;
    link.target = '_blank';
    link.click();
    
    // Use this to output to tab:
    //window.open(objectURL, '_blank');
    //window.focus();

};

function exportArrayBuffer(output, filename) {

    const blob = new Blob([output], {type: 'application/octect-stream'});
    const objectURL = URL.createObjectURL(blob);

    console.log(filename);

    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild( link );
    link.href = objectURL;
    link.download = filename;
    link.target = '_blank';
    link.click();
    
};

function exportGLTF_binary() {

    exportGLTF(true);

};

function exportGLTF_text() {

    exportGLTF(false);

};

function exportGLTF(binary) {

    document.getElementById('export-model').style.display = 'none';
    //$('#export-model').hide();
    
    const exporter = new GLTFExporter();

    const options = {
	binary: binary
    };
	
    scene.children.forEach(function(c) {
	    
	if ( c.children.length > 0 && c.name !== 'Lights' ) {
	    
	    c.children.forEach(function(o) {

		if ( o.visible ) {
		    
		    exporter.parse(o, function(result) {

			if ( result instanceof ArrayBuffer ) {

			    exportArrayBuffer(result, o.name+'.glb'); 
			    
			} else {

			    const output = JSON.stringify(result, null, 2);
			    exportString(output, o.name+'.gltf');

			}
			
		    }, options);

		}
			
	    });
		
	}
	    
    });

};

function exportOBJ() {

    document.getElementById('export-model').style.display = 'none';
    //$('#export-model').hide();
    
    const exporter = new OBJExporter();

    scene.children.forEach(function(c) {
	    
	if ( c.children.length > 0 && c.name !== 'Lights' ) {
	    
	    c.children.forEach(function(o) {
			
		if ( o.visible ) {
			    
		    exportString(exporter.parse(o), o.name+'.obj');
			    
		}
			
	    });

	}

    });

};

function setTransparency(t) {

    import_transparency = t;

    document.getElementById('trspy').innerHTML = t;

    let imported = scene.getObjectByName('Imported');

    imported.children.forEach(function(obj) {
    
	obj.children.forEach(function(c) {
      
	    c.material.transparent = true;
	    c.material.opacity = t;
    
	});
	    
    });

};


document.getElementById("reset_view").onclick = resetView;
document.getElementById("zoom_in").onclick = zoomIn;
document.getElementById("zoom_out").onclick = zoomOut;
document.getElementById("autorotate").onclick = autoRotate;

document.getElementById("xy").onclick = setXY;
document.getElementById("yz").onclick = setYZ;
document.getElementById("xz").onclick = setZX;

document.getElementById("perspective").onclick = setPerspective;
document.getElementById("orthographic").onclick = setOrthographic;

document.getElementById("enterFullscreen").onclick = enterFullscreen;
document.getElementById("exitFullscreen").onclick = exitFullscreen;

document.getElementById("print").onclick = printImage;
document.getElementById("stats-button").onclick = updateRendererInfo;
document.getElementById("invert-colors").onclick = invertColors;

document.getElementById("fps-slider").oninput = function() {

    setFramerate(document.getElementById("fps-slider").value);

};

document.getElementById("transparency-slider").oninput = function() {

    setTransparency(this.value);

}

export {
    zoomIn, zoomOut,
    exportScene, resetView, onWindowResize,
    camera, framerate,
    renderer, inset_renderer, renderer_name,
    clipgui, local_planes, global_planes,
    gui, subfolders,
    inverted_colors, use_line2,
    scenes, views, current_view, scene,
    p_camera, o_camera,
    velocity, acceleration, stats,
    tcontrols, ocontrols, controls,
    get_image_data, image_data,
    raycaster, intersected,
    animating, import_transparency,
    light1, light2, render, run,
    init, initLight, initDetector,
    lookAtOrigin, showView
};

