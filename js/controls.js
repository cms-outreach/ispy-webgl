ispy.resetView = function() {

    ispy.setPerspective();
    ispy.initCamera();

    ispy.controls.reset();

    document.getElementById('3d').classList.add('active');
    document.getElementById('rphi').classList.remove('active');
    document.getElementById('rhoz').classList.remove('active');

    ispy.current_view = '3D';
    ispy.scene = ispy.scenes['3D'];
    
};

ispy.setXY = function() {

    const length = ispy.camera.position.length();

    ispy.camera.position.x = 0;
    ispy.camera.position.y = 0;
    ispy.camera.position.z = length;
    ispy.camera.up = new THREE.Vector3(0,1,0);

    ispy.lookAtOrigin();

};

ispy.setZX = function() {

    const length = ispy.camera.position.length();

    ispy.camera.position.x = 0;
    ispy.camera.position.y = length;
    ispy.camera.position.z = 0;
    ispy.camera.up = new THREE.Vector3(1,0,0);

    ispy.lookAtOrigin();

};

ispy.setYZ = function() {

    const length = ispy.camera.position.length();

    ispy.camera.position.x = -length;
    ispy.camera.position.y = 0;
    ispy.camera.position.z = 0;
    ispy.camera.up = new THREE.Vector3(0,1,0);
    
    ispy.lookAtOrigin();

};

ispy.autoRotate = function() {

    ispy.autoRotating = !ispy.autoRotating;

    document.getElementById('autorotate').classList.toggle('active');

};

ispy.setOrthographic = function() {
    
    document.getElementById('perspective').classList.remove('active');
    document.getElementById('orthographic').classList.add('active');
    
    ispy.is_perspective = false;
    ispy.camera = ispy.o_camera;

    ispy.camera.position.x = ispy.p_camera.position.x;
    ispy.camera.position.y = ispy.p_camera.position.y;
    ispy.camera.position.z = ispy.p_camera.position.z;

    ispy.camera.zoom = ispy.p_camera.zoom;
    ispy.camera.up = ispy.p_camera.up;
    
    const fov = ispy.p_camera.fov;
    const aspect = ispy.p_camera.aspect;
    const near = ispy.p_camera.near;
    const far = ispy.p_camera.far;
    
    const focus = (near+far)/2;

    let half_height = Math.tan(fov*Math.PI/180/2)*focus;
    let half_width = half_height*aspect;

    half_height /= ispy.p_camera.zoom;
    half_width /= ispy.p_camera.zoom;
    
    ispy.camera.left = -half_width;
    ispy.camera.right = half_width;
    ispy.camera.top = half_height;
    ispy.camera.bottom = -half_height;
    
    ispy.camera.updateProjectionMatrix();

    ispy.controls.object = ispy.camera;
    ispy.controls.update();
    
};

ispy.setPerspective = function() {

    document.getElementById('perspective').classList.add('active');
    document.getElementById('orthographic').classList.remove('active');
    
    ispy.is_perspective = true;
    ispy.camera = ispy.p_camera;
    
    ispy.camera.position.x = ispy.o_camera.position.x;
    ispy.camera.position.y = ispy.o_camera.position.y;
    ispy.camera.position.z = ispy.o_camera.position.z;

    ispy.camera.zoom = ispy.o_camera.zoom;
    ispy.camera.up = ispy.o_camera.up;

    ispy.camera.aspect = ispy.o_camera.right / ispy.o_camera.top;
    
    ispy.camera.updateProjectionMatrix();

    ispy.controls.object = ispy.camera;
    ispy.controls.update();
    
};

ispy.showView = function(view) {

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
	
	ispy.controls.enableRotate = true;
	ispy.controls.reset();

	/*
	  We may have cases where the view is already 3D
	  but we have switched to/from persepctive/orthographic
	*/
	if ( ispy.current_view !== '3D' )
	    ispy.setPerspective();

	ispy.current_view = '3D';
	ispy.scene = ispy.scenes['3D'];

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
	
	ispy.controls.enableRotate = false;
	ispy.controls.reset();
	
	ispy.setOrthographic();
	ispy.setXY();
	
	ispy.current_view = 'RPhi';
	ispy.scene = ispy.scenes['RPhi'];
	
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
	
	ispy.controls.enableRotate = false;
	ispy.controls.reset();

	ispy.setOrthographic();
	ispy.setYZ();
		
	ispy.current_view = 'RhoZ';
	ispy.scene = ispy.scenes['RhoZ'];
	
	break;
	
    }
    
};

ispy.enterFullscreen = function() {
    
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

ispy.exitFullscreen = function() {
  
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

ispy.toggleFullscreen = function() {

    document.getElementById('enterFullscreen').classList.toggle('active');
    document.getElementById('exitFullscreen').classList.toggle('active');

};

document.addEventListener('webkitfullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('mozfullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('fullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('MSFullscreenChange', ispy.toggleFullscreen, false);

ispy.reload = function() {

    location.reload();

};

function setOrientationControls(e) {
  
    if ( ! e.alpha ) {
	
	return;
    
    }

    window.removeEventListener('deviceorientation', setOrientationControls, true);

}

ispy.zoomIn = function() {

    ispy.camera.zoom += 0.5;
    ispy.camera.updateProjectionMatrix();
    
};

ispy.zoomOut = function() {
    
    ispy.camera.zoom -= 0.5;
    ispy.camera.updateProjectionMatrix();

};

ispy.printImage = function() {
  
    ispy.get_image_data = true;
    ispy.render();
    window.open(ispy.image_data, "toDataURL() image", "width=1600, height=900");

};

ispy.exportScene = function() {

    const exporter = new THREE.GLTFExporter();

    const options = {
	onlyVisible: true,
	binary: true
    };

    exporter.parse(ispy.scene, function(result) {

	ispy.exportArrayBuffer(result, 'scene.glb'); 

    }, options);

    alert('scene.glb created');
    
};

ispy.exportString = function(output, filename) {

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

ispy.exportArrayBuffer = function(output, filename) {

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

ispy.exportGLTF_binary = function() {

    ispy.exportGLTF(true);

};

ispy.exportGLTF_text = function() {

    ispy.exportGLTF(false);

};

ispy.exportGLTF = function(binary) {

    document.getElementById('export-model').style.display = 'none';
    //$('#export-model').hide();
    
    const exporter = new THREE.GLTFExporter();

    const options = {
	binary: binary
    };
	
    ispy.scene.children.forEach(function(c) {
	    
	if ( c.children.length > 0 && c.name !== 'Lights' ) {
	    
	    c.children.forEach(function(o) {

		if ( o.visible ) {
		    
		    exporter.parse(o, function(result) {

			if ( result instanceof ArrayBuffer ) {

			    ispy.exportArrayBuffer(result, o.name+'.glb'); 
			    
			} else {

			    const output = JSON.stringify(result, null, 2);
			    ispy.exportString(output, o.name+'.gltf');

			}
			
		    }, options);

		}
			
	    });
		
	}
	    
    });

};

ispy.exportOBJ = function() {

    document.getElementById('export-model').style.display = 'none';
    //$('#export-model').hide();
    
    const exporter = new THREE.OBJExporter();

    ispy.scene.children.forEach(function(c) {
	    
	if ( c.children.length > 0 && c.name !== 'Lights' ) {
	    
	    c.children.forEach(function(o) {
			
		if ( o.visible ) {
			    
		    ispy.exportString(exporter.parse(o), o.name+'.obj');
			    
		}
			
	    });

	}

    });

};
