const planeX = ispy.clipgui.addFolder("planeX");
const planeY = ispy.clipgui.addFolder("planeY");
const planeZ = ispy.clipgui.addFolder("planeZ");

const params = {
    
    planeX: {

	constant: 10,
	negated: false,
	displayHelper: false 
    },
    
    planeY: {

	constant: 10,
	negated: false,
	displayHelper: false

    },
    
    planeZ: {

	constant: 30,
	negated: false,
	displayHelper: false

    }
    
};

ispy.planes = [
    new THREE.Plane( new THREE.Vector3(-1,0,0), params.planeX.constant),
    new THREE.Plane( new THREE.Vector3(0,-1,0), params.planeY.constant),
    new THREE.Plane( new THREE.Vector3(0,0,-1), params.planeZ.constant)
];

planeX.add(params.planeX, 'constant').min(-10).max(10).onChange(

    d => ispy.planes[0].constant = d

);

planeX.add(params.planeX, 'negated').onChange(

    () => {
    
    ispy.planes[0].negate();
    params.planeX.constant = ispy.planes[0].constant;
    
    }

);

planeX.open();

planeY.add(params.planeY, 'constant').min(-10).max(10).onChange(

    d => ispy.planes[1].constant = d

);

planeY.add(params.planeY, 'negated').onChange(

    () => {
    
    ispy.planes[1].negate();
    params.planeY.constant = ispy.planes[1].constant;
    
    }

);

planeY.open();


planeZ.add(params.planeZ, 'constant').min(-30).max(30).onChange(

    d => ispy.planes[2].constant = d

);

planeZ.add(params.planeZ, 'negated').onChange(

    () => {
    
    ispy.planes[2].negate();
    params.planeZ.constant = ispy.planes[2].constant;
    
    }

);

planeZ.open();

