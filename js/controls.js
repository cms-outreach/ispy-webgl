ispy.resetControls = function() {
  
    ispy.setPerspective();
    ispy.initCamera();
    ispy.controls.reset();
	
    $('#3d').addClass('active');
    $('#rphi').removeClass('active');
    $('#rhoz').removeClass('active');

    ispy.controls.noRotate = false;
		
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
    $('#autorotate').toggleClass('active');

};

ispy.setOrthographic = function() {

    $('#perspective').removeClass('active');
    $('#orthographic').addClass('active');
    $('#stereo').removeClass('active');
    
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

    $('#perspective').addClass('active');
    $('#orthographic').removeClass('active');
    $('#stereo').removeClass('active');

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

	ispy.resetControls();
	
	//$('#treegui').show();
	//$('#rphigui').hide();
	//$('#rhozgui').hide();

	break;

    case 'RPhi':
	
	$('#3d').removeClass('active');
        $('#rphi').addClass('active');
	$('#rhoz').removeClass('active');

	ispy.controls.noRotate = true;
	ispy.setOrthographic();
	ispy.setXY();
	
	ispy.current_view = 'RPhi';
	ispy.scene = ispy.scenes['RPhi'];

	//$('#treegui').hide();
	//$('#rphigui').show();
	//$('#rhozgui').hide();
	
	break;

    case 'RhoZ':
	
	$('#3d').removeClass('active');
        $('#rphi').removeClass('active');
	$('#rhoz').addClass('active');

	ispy.controls.noRotate = false;
	ispy.setOrthographic();
	ispy.setYZ();
		
	ispy.current_view = 'RhoZ';
	ispy.scene = ispy.scenes['RhoZ'];
	
	//$('#treegui').hide();
	//$('#rphigui').hide();
	//$('#rhozgui').show();
	
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

    $('#enterFullscreen').toggleClass('active');
    $('#exitFullscreen').toggleClass('active');

};

document.addEventListener('webkitfullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('mozfullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('fullscreenchange', ispy.toggleFullscreen, false);
document.addEventListener('MSFullscreenChange', ispy.toggleFullscreen, false);

ispy.reload = function() {

    location.reload();

};

ispy.toStereo = function () {

  if ( ! ispy.stereo ) {

    ispy.stereo = true;

    ispy.camera.position.x = 5;
    ispy.camera.position.y = 5;
    ispy.camera.position.z = 10;

    ispy.stereo_renderer = new THREE.StereoEffect(ispy.renderer);
    ispy.do_controls = new THREE.DeviceOrientationControls(ispy.camera);

    $('#axes').hide();
    $('#event-info').hide();

    $('#display')[0].addEventListener('click', ispy.toStereo, false);

    ispy.do_controls.connect();

    ispy.onWindowResize();

  } else {

    ispy.stereo = false;

    $('#axes').show();
    $('#event-info').show();

    $('#display')[0].removeEventListener('click', ispy.toStereo, false);

    ispy.setPerspective();
    ispy.initCamera();
    ispy.onWindowResize();

  }
  
};

function setOrientationControls(e) {
  
    if ( ! e.alpha ) {
	
	return;
    
    }

    window.removeEventListener('deviceorientation', setOrientationControls, true);

}

//window.addEventListener('deviceorientation', setOrientationControls, true);

ispy.setStereo = function() {

    $('#perspective').removeClass('active');
    $('#orthographic').removeClass('active');
    $('#stereo').addClass('active');

    ispy.toStereo();
    ispy.enterFullscreen();

};

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

    $('#export-model').hide();
    
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

    $('#export-model').hide();
    
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
