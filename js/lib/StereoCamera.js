/**
 * @author mrdoob / http://mrdoob.com/
 */
// tpmccauley
// use this modified version of the stereo camera

function MyStereoCamera() {

	this.type = 'MyStereoCamera';

	this.aspect = 1;

	this.eyeSep = 0.064;

	this.cameraL = new THREE.PerspectiveCamera();
	this.cameraL.layers.enable( 1 );
	this.cameraL.matrixAutoUpdate = false;

	this.cameraR = new THREE.PerspectiveCamera();
	this.cameraR.layers.enable( 2 );
	this.cameraR.matrixAutoUpdate = false;

}

Object.assign( MyStereoCamera.prototype, {

	update: ( function () {

		var instance, focus, fov, aspect, near, far, zoom, eyeSep;

		var eyeRight = new THREE.Matrix4();
		var eyeLeft = new THREE.Matrix4();

		return function update( camera ) {

			this.cameraL.matrixWorld.copy( camera.matrixWorld ).multiply( eyeLeft );
			this.cameraR.matrixWorld.copy( camera.matrixWorld ).multiply( eyeRight );

		};

	} )()

} );
