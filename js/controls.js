import { controls, current_view, camera, scene, scenes, autoRotating, is_perspective, p_camera, o_camera, get_image_data, image_data, lookAtOrigin } from "./setup.js";
import { toggleAnimation } from "./animate.js";

function resetView() {

    setPerspective();
    initCamera();

    controls.reset();

    document.getElementById('3d').classList.add('active');
    document.getElementById('rphi').classList.remove('active');
    document.getElementById('rhoz').classList.remove('active');

    current_view = '3D';
    scene = ispy.scenes['3D'];
    
};

function setXY() {

    const length = camera.position.length();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = length;
    camera.up = new THREE.Vector3(0,1,0);

    lookAtOrigin();

};

function setZX() {

    const length = camera.position.length();

    camera.position.x = 0;
    camera.position.y = length;
    camera.position.z = 0;
    camera.up = new THREE.Vector3(1,0,0);

    lookAtOrigin();

};

function setYZ() {

    const length = camera.position.length();

    camera.position.x = -length;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.up = new THREE.Vector3(0,1,0);
    
    lookAtOrigin();

};

function autoRotate() {

    autoRotating = !autoRotating;

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

function showView(view) {

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

    const exporter = new THREE.GLTFExporter();

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
    
    const exporter = new THREE.GLTFExporter();

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
    
    const exporter = new THREE.OBJExporter();

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
document.getElementById("animate").onclick = toggleAnimation;

/*
document.getElementById("3d").addEventListener("click", showView("3D"));
document.getElementById("rphi").addEventListener("click", showView("RPhi"));
document.getElementById("rhoz").addEventListener("click", showView("RhoZ"));
*/

export { zoomIn, zoomOut, exportScene, resetView };
