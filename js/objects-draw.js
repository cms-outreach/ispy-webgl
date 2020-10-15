ispy.makeDisc = function(ir, or, pos, slices) {

    var lines = [];
    var points = [];

    for (var i = 0; i < slices; i++) {
    
	var sa = Math.sin(i / slices * 2 * Math.PI);
	var ca = Math.cos(i / slices * 2 * Math.PI);

	points.push({x: ir * sa, y: ir * ca, z: pos});
	points.push({x: or * sa, y: or * ca, z: pos});

	var ix1 = i * 2;
	var ix2 = ((i + 1) % slices) * 2;

	lines.push({p1: ix1 + 0, p2: ix1 + 1});
	lines.push({p1: ix1 + 0, p2: ix2 + 0});
	lines.push({p1: ix1 + 1, p2: ix2 + 1});
  
    }

    return [points, lines];

};

ispy.makeCylinder = function(r, len, pos, slices, segments) {
    
    var lines = [];
    var points = [];
  
    for (var s = 0; s < segments; s++) {
	
	for (var i = 0; i < slices; i++) {
      
	    var sa = Math.sin(i / slices * 2 * Math.PI);
	    var ca = Math.cos(i / slices * 2 * Math.PI);
	    var p = s/(segments - 1) * len + pos;
	    points.push({x: r * sa, y: r * ca, z: p});

	    var ix1 = (s * slices + i);
	    var ix2 = (s * slices + ((i + 1) % slices));
	    
	    lines.push({p1: ix1, p2: ix2});

	    if (s > 0) {

		var ix3 = ((s - 1) * slices + i);
		lines.push({p1: ix3 + 0, p2: ix1 + 0});
      
	    }
    
	}
  
    }

    return [points, lines];

};

/*
ispy.makeCylinder = function(rT, rB, height, rSeg, hSeg, openEnded) {
  return new THREE.CylinderGeometry(rT, rB, height, rSeg, hSeg, openEnded);
}
*/

ispy.makeTube = function(ir, or, len, pos, slices, segments) {
  
    var lines = [];
    var points = [];

    for ( var s = 0; s < segments; s++ ) {
	
	for ( var i = 0; i < slices; i++ ) {
      
	    var sa = Math.sin(i / slices * 2 * Math.PI);
	    var ca = Math.cos(i / slices * 2 * Math.PI);
	    var p = s/(segments - 1) * len + pos;
	    points.push({x: ir * sa, y: ir * ca, z: p});
	    points.push({x: or * sa, y: or * ca, z: p});
	    
	    var ix1 = (s * slices + i) * 2;
	    var ix2 = (s * slices + ((i + 1) % slices)) * 2;
	    
	    lines.push({p1: ix1 + 0, p2: ix1 + 1});
	    lines.push({p1: ix2 + 0, p2: ix2 + 1});
	    lines.push({p1: ix1 + 0, p2: ix2 + 0});
	    lines.push({p1: ix1 + 1, p2: ix2 + 1});
	    
	    if (s > 0) {
        
		var ix3 = ((s - 1) * slices + i) * 2;
		lines.push({p1: ix3 + 0, p2: ix1 + 0});
		lines.push({p1: ix3 + 1, p2: ix1 + 1});
      
	    }
	
	}
  
    }

    return [points, lines];

};

ispy.makeSolidBox = function(data, ci) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

    var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
    var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
    var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
    var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

    var box = new THREE.Geometry();
    box.vertices = [f1,f2,f3,f4,b1,b2,b3,b4];
    
    // front                                                                                                                                           
    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));

    // back                                                                                                                                            
    box.faces.push(new THREE.Face3(4,5,6));
    box.faces.push(new THREE.Face3(6,7,4));

    // top                                                                                                                                             
    box.faces.push(new THREE.Face3(4,5,1));
    box.faces.push(new THREE.Face3(1,0,4));

    // bottom                                                                                                                                          
    box.faces.push(new THREE.Face3(7,6,2));
    box.faces.push(new THREE.Face3(2,3,7));

    // left                                                                                                                                            
    box.faces.push(new THREE.Face3(0,3,7));
    box.faces.push(new THREE.Face3(7,4,0));

    // right                                                                                                                                          
    box.faces.push(new THREE.Face3(1,5,6));
    box.faces.push(new THREE.Face3(6,2,1));
    
    box.computeFaceNormals();
    box.computeVertexNormals();
    
    // These are the lines along the box edges
    var line_box = new THREE.Geometry();

    line_box.vertices.push(f1,f2);
    line_box.vertices.push(f2,f3);
    line_box.vertices.push(f3,f4);
    line_box.vertices.push(f4,f1);

    line_box.vertices.push(b1,b2);
    line_box.vertices.push(b2,b3);
    line_box.vertices.push(b3,b4);
    line_box.vertices.push(b4,b1);

    line_box.vertices.push(b1,f1);
    line_box.vertices.push(b3,f3);
    line_box.vertices.push(b2,f2);
    line_box.vertices.push(b4,f4);

    return [box, line_box];

};

ispy.makeBufferBoxes = function(data, ci) {
  
    var geometry = new THREE.BufferGeometry();
    /*
      4 corners needed to define a box,
      2 together to form a pair
      (using LinePieces to avoid spurious connecting lines),
      3 components each for the corner (x,y,z),
      3 sets of pairs to define the box
      (one for front, one for back, and one for sides)
    */
    var nvs = 4*2*3*3;
    var vertices = new Float32Array(data.length*nvs);

    // Since we draw the Lines that make the box with LinePieces
    // we want to add pairs of vertices. These are then connected.
    // The pairing starts as 0-1, 1-2, 2-3, 3-0, etc.
    for ( var i = 0; i < data.length; i++ ) {
    
	var f1 = data[i][ci];
	var f2 = data[i][ci+1];
	var f3 = data[i][ci+2];
	var f4 = data[i][ci+3];
	
	
	//if ( f1[0] < 0 && f4[0] < 0 && ( f1[2] > 0 || f2[2] > 0))
	//    continue;

	var b1 = data[i][ci+4];
	var b2 = data[i][ci+5];
	var b3 = data[i][ci+6];
	var b4 = data[i][ci+7];

	var pairs = [
		     f1,f2,
		     f2,f3,
		     f3,f4,
		     f4,f1,
		     b1,b2,
		     b2,b3,
		     b3,b4,
		     b4,b1,
		     b1,f1,
		     b3,f3,
		     b2,f2,
		     b4,f4
		     ];

	for ( var j = 0; j < pairs.length; j++ ) {
      
	    vertices[i*nvs + j*3 + 0] = pairs[j][0];
	    vertices[i*nvs + j*3 + 1] = pairs[j][1];
	    vertices[i*nvs + j*3 + 2] = pairs[j][2];
    
	}
  
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

    return geometry;

};

ispy.makeScaledSolidBox = function(data, geometry, ci, scale) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);
    
    var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
    var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
    var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
    var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

    var box = new THREE.Geometry();
    
    var energy = data[0];
    scale = energy/scale;

    var center = new THREE.Vector3();
    center.addVectors(f1,f2);
    center.add(f3).add(f4)
    .add(b1).add(b2)
    .add(b3).add(b4);

    center.divideScalar(8.0);

    f1.sub(center);
    f1.multiplyScalar(scale);
    f1.add(center);
    box.vertices.push(f1);

    f2.sub(center);
    f2.multiplyScalar(scale);
    f2.add(center);
    box.vertices.push(f2);

    f3.sub(center);
    f3.multiplyScalar(scale);
    f3.add(center);
    box.vertices.push(f3);
    
    f4.sub(center);
    f4.multiplyScalar(scale);
    f4.add(center);
    box.vertices.push(f4);

    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(0,2,3));

    b1.sub(center);
    b2.sub(center);
    b3.sub(center);
    b4.sub(center);
    
    b1.multiplyScalar(scale);
    b2.multiplyScalar(scale);
    b3.multiplyScalar(scale);
    b4.multiplyScalar(scale);
    
    b1.add(center);
    b2.add(center);
    b3.add(center);
    b4.add(center);

    box.vertices.push(b1);
    box.vertices.push(b2);
    box.vertices.push(b3);
    box.vertices.push(b4);

    //front
    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));
    //back
    box.faces.push(new THREE.Face3(4,5,6));
    box.faces.push(new THREE.Face3(6,7,4));
    //top
    box.faces.push(new THREE.Face3(4,5,1));
    box.faces.push(new THREE.Face3(1,0,4));
    //bottom
    box.faces.push(new THREE.Face3(7,6,2));
    box.faces.push(new THREE.Face3(2,3,7));
    //left
    box.faces.push(new THREE.Face3(0,3,7));
    box.faces.push(new THREE.Face3(7,4,0));
    //right
    box.faces.push(new THREE.Face3(1,5,6));
    box.faces.push(new THREE.Face3(6,2,1));

    box.computeFaceNormals();
    box.computeVertexNormals();

    geometry.merge(box);

};

ispy.makeScaledSolidTower = function(data, geometry, ci, scale) {
    
    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);
    
    var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
    var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
    var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
    var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);
    
    var box = new THREE.Geometry();

    box.vertices.push(f1);
    box.vertices.push(f2);
    box.vertices.push(f3);
    box.vertices.push(f4);

    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));
    
    b1.sub(f1);
    b2.sub(f2);
    b3.sub(f3);
    b4.sub(f4);
    
    b1.normalize();
    b2.normalize();
    b3.normalize();
    b4.normalize();

    b1.multiplyScalar(scale);
    b2.multiplyScalar(scale);
    b3.multiplyScalar(scale);
    b4.multiplyScalar(scale);

    b1.addVectors(f1,b1);
    b2.addVectors(f2,b2);
    b3.addVectors(f3,b3);
    b4.addVectors(f4,b4);
    
    box.vertices.push(b1);
    box.vertices.push(b2);
    box.vertices.push(b3);
    box.vertices.push(b4);

    //front
    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));
    //back
    box.faces.push(new THREE.Face3(4,5,6));
    box.faces.push(new THREE.Face3(6,7,4));
    //top
    box.faces.push(new THREE.Face3(4,5,1));
    box.faces.push(new THREE.Face3(1,0,4));
    //bottom
    box.faces.push(new THREE.Face3(7,6,2));
    box.faces.push(new THREE.Face3(2,3,7));
    //left
    box.faces.push(new THREE.Face3(0,3,7));
    box.faces.push(new THREE.Face3(7,4,0));
    //right
    box.faces.push(new THREE.Face3(1,5,6));
    box.faces.push(new THREE.Face3(6,2,1));


    box.computeFaceNormals();
    box.computeVertexNormals();

    geometry.merge(box);

};

ispy.makeWireframeBox = function(data, ci) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

    var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
    var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
    var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
    var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);
    
    // With THREE.LinePieces the Line is made
    // by connecting pairs of vertices instead
    // of one continuous line
    var box = new THREE.Geometry();
    box.vertices.push(f1,f2);
    box.vertices.push(f2,f3);
    box.vertices.push(f3,f4);
    box.vertices.push(f4,f1);
    
    box.vertices.push(b1,b2);
    box.vertices.push(b2,b3);
    box.vertices.push(b3,b4);
    box.vertices.push(b4,b1);
    
    box.vertices.push(b1,f1);
    box.vertices.push(b3,f3);
    box.vertices.push(b2,f2);
    box.vertices.push(b4,f4);
    
    return box;

};

ispy.makeWireFace = function(data, ci) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);

    var box = new THREE.Geometry();
    box.vertices.push(f1,f2);
    box.vertices.push(f2,f3);
    box.vertices.push(f3,f4);
    box.vertices.push(f4,f1);
    
    return box;

};

ispy.makeSolidFace = function(data, ci) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);
    
    var rect = new THREE.Geometry();
    rect.vertices = [f1,f2,f3,f4];
    rect.faces.push(new THREE.Face3(0,1,2));
    rect.faces.push(new THREE.Face3(2,3,0));
    
    return rect;

};

ispy.makeTrackerPiece = function(data) {

    return ispy.makeWireFace(data, 1);

};

ispy.makeShapes = function(data) {

    points = data[0];
    lines = data[1];
    shapes = [];

    var line = new THREE.Geometry();

    for ( var i = 0; i < lines.length; i++ ) {
    
	var l = lines[i];
	line.vertices.push(points[l.p1]);
	line.vertices.push(points[l.p2]);
  
    }

    return line;

};

ispy.makeModelTrackerBarrel = function(data) {

    var radii = [0.046, 0.07, 0.1,
		 0.24, 0.27, 0.32, 0.37, 0.40, 0.43, 0.47, 0.51,
		 0.62, 0.70, 0.78, 0.88, 0.97, 1.08];
    
    var lengths = [0.53, 0.53, 0.53,
		   1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3,
		   2.18, 2.18, 2.18, 2.18, 2.18, 2.18];

    var slices = 24;
    var wfs = [];
    
    for ( var i = 0; i < radii.length; i++ ) {

	var r = radii[i];
	var l = lengths[i];

	wfs.push(ispy.makeCylinder(r, l, -l / 2, slices, 2));
	
	//var barrel = ispy.makeCylinder(r, r, l, slices, 1, true);
	//barrel.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
	//wfs.push(barrel);
  
    }

    return wfs;

};

ispy.makeModelTrackerEndcap = function(data) {
   
    var ecradii = [0.145, 0.145, 0.50, 0.47, 0.50, 0.47, 0.50, 0.47,
		   1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06, 1.08, 1.06,
		   1.08, 1.06, 1.08, 1.06, 1.08, 1.06];

    var ecintradii = [0.07,  0.07,  0.40, 0.25, 0.40, 0.25, 0.40, 0.25,
		      0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
		      0.30, 0.30, 0.30, 0.30, 0.30, 0.30];

    var ecpos = [0.35,  0.48,  0.76, 0.83, 0.89, 0.96, 1.02, 1.09,
		 1.27, 1.34, 1.41, 1.48, 1.55, 1.62, 1.69, 1.76, 1.83, 1.90, 2.00, 2.08,
		 2.20, 2.28, 2.40, 2.48, 2.60, 2.68];

    var slices = 24;
    var wfs = [];

    for ( var i = 0; i < ecradii.length; i++ ) {

	var ecro = ecradii[i];
	var ecri = ecintradii[i];
	var ecp = ecpos[i];
	
	wfs.push(ispy.makeDisc(ecri, ecro, ecp, slices));
	wfs.push(ispy.makeDisc(ecri, ecro, -ecp, slices));
  
    }
  
    return wfs;

};

ispy.makeModelEcalBarrel = function(data) {

    var hr = data[0];
    var pos = data[1];
    var fr = data[2];
    var hpos = data[3];
    var slices = 24;
    
    var points = [];
    var lines = [];
    
    for ( var a = 0; a < slices; a++ ) {
	
	var sa = Math.sin(a / slices * 2 * Math.PI);
	var ca = Math.cos(a / slices * 2 * Math.PI);
	
	for ( var i = 0; i < pos.length; i++ ) {
	    
	    points.push({x: hr * ca, y: hr * sa, z: hpos[i]});
    
	}
    
	for ( var i = 0; i < pos.length; i++ ) {
      
	    points.push({x: fr[i] * ca, y: fr[i] * sa, z: pos[i]});
    
	}

	for ( var i = 0; i < pos.length; i++ ) {
	    
	    var so1 = a * pos.length * 2;
	    var so2 = ((a + 1) % slices) * pos.length * 2;
	    var ix1 = i;

	    if ( i < pos.length - 1 ) {
		
		lines.push({p1: so1 + ix1, p2: so1 + ix1 + 1});
	    
	    }
      
	    lines.push({p1: so1 + ix1, p2: so2 + ix1});

	    var so1 = a * pos.length * 2;
	    var so2 = ((a + 1) % slices) * pos.length * 2;
	    var ix1 = i + pos.length;

	    if ( i < pos.length - 1 ) {
		
		lines.push({p1: so1 + ix1, p2: so1 + ix1 + 1});
      
	    }
      
	    lines.push({p1: so1 + ix1, p2: so2 + ix1});
    
	}
  
    }

    return [[points, lines]];

};

ispy.makeModelEcalEndcapMinus = function(data) {

    return [ispy.makeTube(0.35, 1.5, -0.05, -3.2, 24, 2)];

};

ispy.makeModelEcalEndcapPlus = function(data) {

    return [ispy.makeTube(0.35, 1.5, 0.05, 3.2, 24, 2)];

};

ispy.makeModelEcalPreshower = function(data) {

    return [ispy.makeDisc(0.4, 1.3, 3.025, 24), ispy.makeDisc(0.4, 1.3, 3.075, 24),
	    ispy.makeDisc(0.4, 1.3, -3.025, 24), ispy.makeDisc(0.4, 1.3, -3.075, 24)];

};

ispy.makeModelHcalBarrel = function(data) {

    var points = [];
    var lines = [];
    
    var or = 2.9;
    var ir = 1.8;
    var slices = 72;
    var len = 5;
    var lslices = 20;

    var maxa = Math.atan(len / or);

    for ( var pos = 0; pos <= lslices; pos++ ) {
      
	var a = pos / lslices * maxa;
	var po = or * Math.tan(a);
	var pi = ir * Math.tan(a);
	
	for ( var i = 0; i < slices; i++ ) {
	    
	    var sa = Math.sin(i / slices * 2 * Math.PI);
	    var ca = Math.cos(i / slices * 2 * Math.PI);
	    
	    points.push({x: or * ca, y: or * sa, z: po});
	    points.push({x: ir * ca, y: ir * sa, z: pi});
	    
	    points.push({x: or * ca, y: or * sa, z: -po});
	    points.push({x: ir * ca, y: ir * sa, z: -pi});
	    
	    var ix1 = (pos * slices + i) * 4;
	    var ix2 = (pos * slices + ((i + 1) % slices)) * 4;
	    
	    //tan
	    lines.push({p1: ix1 + 0, p2: ix2 + 0});
	    lines.push({p1: ix1 + 1, p2: ix2 + 1});
	    
	    if ( pos > 0 ) {
		
		lines.push({p1: ix1 + 2, p2: ix2 + 2});
		lines.push({p1: ix1 + 3, p2: ix2 + 3});
		
	    }
	    
	    //rad
	    lines.push({p1: ix1 + 0, p2: ix1 + 1});
	    
	    if ( pos > 0 ) {
		
		lines.push({p1: ix1 + 2, p2: ix1 + 3});
		
	    }
	    
	    //axial
	    if ( pos < lslices ) {
		
		var ix3 = ((pos + 1) * slices + i) * 4;
		lines.push({p1: ix1 + 0, p2: ix3 + 0});
		lines.push({p1: ix1 + 2, p2: ix3 + 2});
		
	    }

	}
  
    }
  
    return [[points, lines]];

};

ispy.makeModelHcalForward = function(data) {
    
    return [ispy.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2), ispy.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];

};

ispy.makeModelHcalForwardPlus = function(data) {

    return [ispy.makeTube(0.15, 1.25, 1.7, 11.1, 24, 2)];

};

ispy.makeModelHcalForwardMinus = function(data) {

    return [ispy.makeTube(0.15, 1.25, -1.7, -11.1, 24, 2)];

};

ispy.makeModelHcalOuter = function(data) {

    return [ispy.makeTube(3.9, 4.1, 3, -1.5, 48, 8), ispy.makeCylinder(4.2, 2.5, 1.5, 24, 7),
	    ispy.makeCylinder(4.2, 3, 4.1, 24, 6), ispy.makeCylinder(4.2, -2.5, -1.5, 24, 7),
	    ispy.makeCylinder(4.2, -3, -4.1, 24, 6)];

};

ispy.makeModelHcalEndcap = function(data) {
    
    var points = [];
    var lines = [];
    
    var or = 2.9;
    var ir = 0.4;
    
    var slices = 72;
    var len = 1.5;
    var pos = 4;

    var ori = pos / (pos + len) * or;
    var iro = (pos + len) / pos * ir;

  for ( var i = 0; i < slices; i++ ) {
      
      var sa = Math.sin(i / slices * 2 * Math.PI);
      var ca = Math.cos(i / slices * 2 * Math.PI);
      
      points.push({x: ori * ca, y: ori * sa, z: pos});
      points.push({x: ir * ca, y: ir * sa, z: pos});
      points.push({x: or * ca, y: or * sa, z: pos + len});
      points.push({x: iro * ca, y: iro * sa, z: pos + len});
      
      points.push({x: ori * ca, y: ori * sa, z: -pos});
      points.push({x: ir * ca, y: ir * sa, z: -pos});
      points.push({x: or * ca, y: or * sa, z: -pos - len});
      points.push({x: iro * ca, y: iro * sa, z: -pos - len});

      var ix1 = i * 8;
      var ix2 = ((i + 1) % slices) * 8;
      
      //maybe this slice thing should be abstracted
      //radial
      lines.push({p1: ix1 + 0, p2: ix1 + 1});
      lines.push({p1: ix1 + 2, p2: ix1 + 3});
      lines.push({p1: ix1 + 4, p2: ix1 + 5});
      lines.push({p1: ix1 + 6, p2: ix1 + 7});

      //tangential
      lines.push({p1: ix1 + 0, p2: ix2 + 0});
      lines.push({p1: ix1 + 1, p2: ix2 + 1});
      lines.push({p1: ix1 + 2, p2: ix2 + 2});
      lines.push({p1: ix1 + 3, p2: ix2 + 3});
      lines.push({p1: ix1 + 4, p2: ix2 + 4});
      lines.push({p1: ix1 + 5, p2: ix2 + 5});
      lines.push({p1: ix1 + 6, p2: ix2 + 6});
      lines.push({p1: ix1 + 7, p2: ix2 + 7});

      //well, still radial, but the other radius
      lines.push({p1: ix1 + 0, p2: ix1 + 2});
      lines.push({p1: ix1 + 4, p2: ix1 + 6});
  
  }

    return [[points, lines]];

};

ispy.makeScaledWireframeTower = function(data, material, ci, scale) {

    var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
    var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
    var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
    var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);
    
    var b1 = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
    var b2 = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
    var b3 = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
    var b4 = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);
    
    b1.sub(f1);
    b2.sub(f2);
    b3.sub(f3);
    b4.sub(f4);
    
    b1.normalize();
    b2.normalize();
    b3.normalize();
    b4.normalize();
    
    b1.multiplyScalar(scale);
    b2.multiplyScalar(scale);
    b3.multiplyScalar(scale);
    b4.multiplyScalar(scale);
    
    b1.addVectors(f1,b1);
    b2.addVectors(f2,b2);
    b3.addVectors(f3,b3);
    b4.addVectors(f4,b4);
    
    var front = new THREE.Geometry();
    front.vertices.push(f1);
    front.vertices.push(f2);
    front.vertices.push(f3);
    front.vertices.push(f4);
    front.vertices.push(f1);
    
    var back = new THREE.Geometry();
    back.vertices.push(b1);
    back.vertices.push(b2);
    back.vertices.push(b3);
    back.vertices.push(b4);
    back.vertices.push(b1);
    
    var s1 = new THREE.Geometry();
    s1.vertices.push(f1);
    s1.vertices.push(b1);
    
    var s2 = new THREE.Geometry();
    s2.vertices.push(f2);
    s2.vertices.push(b2);

    var s3 = new THREE.Geometry();
    s3.vertices.push(f3);
    s3.vertices.push(b3);

    var s4 = new THREE.Geometry();
    s4.vertices.push(f4);
    s4.vertices.push(b4);

    return [
	    new THREE.Line(front,material),
	    new THREE.Line(back,material),
	    new THREE.Line(s1,material),
	    new THREE.Line(s2,material),
	    new THREE.Line(s3,material),
	    new THREE.Line(s4,material)
	    ];

};

ispy.makeTrackPoints = function(data, extra, assoc, style, selection) {

    if ( ! assoc ) {
  
	throw "No association!";
  
    }
    
    var cut = [];
    var mi = 0;  
    var positions = [];
    
    for ( var i = 0; i < data.length; i++ ) {

	if ( ispy.use_line2 ) {
	    
	    positions[i] = [];

	} else {

	    positions[i] = new THREE.Geometry();

	}
	
    }
                                                                                                                                 
    for ( var j = 0; j < assoc.length; j++ ) {
             
	mi = assoc[j][0][1];                                                                                              
	pi = assoc[j][1][1];                                                                                                               

	if ( ispy.use_line2 ) {

	    positions[mi].push(extra[pi][0][0],extra[pi][0][1],extra[pi][0][2]);                                                               

	} else {

	    positions[mi].vertices.push(new THREE.Vector3(extra[pi][0][0],extra[pi][0][1],extra[pi][0][2]));

	}
	    
    }
    
    var tcolor = new THREE.Color(style.color);
    var transp = false;
  
    if ( style.opacity < 1.0 ) {
	
	transp = true;
  
    }

    var lines = [];
    
    for ( var k = 0; k < positions.length; k++ ) {

	if ( ispy.use_line2 ) {
	
	    var muon = new THREE.LineGeometry();
	    muon.setPositions(positions[k]);
	
	    var line = new THREE.Line2(muon, new THREE.LineMaterial({
		color: tcolor,
		linewidth: style.linewidth*0.001,
		transparent: transp,
		opacity:style.opacity
	    }));

	    line.visible = data[k][selection.index] < selection.min_pt ? false : true;
	    line.computeLineDistances();
	    lines.push(line);

	} else {

	    var line = new THREE.Line(positions[k], new THREE.LineBasicMaterial({
		color: tcolor,
		transparent: transp,
		opacity: style.opacity
	    }));

	    line.visible = data[k][selection.index] < selection.min_pt ? false : true;
	    lines.push(line);

	}
	
    }

    return lines;

};

ispy.makeTracks = function(tracks, extras, assocs, style, selection) {
  
    if ( ! assocs ) {
    
	throw "No association!";
  
    }

    var ti, ei;
    var p1, d1, p2, d2;
    var distance, scale, curve;
    var curves = [];

    var tcolor = new THREE.Color();

    if ( ispy.inverted_colors ) {
    
	tcolor.setStyle(style.altColor);
  
    } else {
    
	tcolor.setStyle(style.color);
  
    }

    transp = style.opacity < 1.0 ? true : false;
    
    for ( var i = 0; i < assocs.length; i++ ) {

	var pt = tracks[i][selection.index];
	var eta = tracks[i][4];
	var phi = tracks[i][3];

	ti = assocs[i][0][1];
	ei = assocs[i][1][1];
	
	p1 = new THREE.Vector3(extras[ei][0][0],extras[ei][0][1],extras[ei][0][2]);
	d1 = new THREE.Vector3(extras[ei][1][0],extras[ei][1][1],extras[ei][1][2]);
	d1.normalize();
	
	p2 = new THREE.Vector3(extras[ei][2][0],extras[ei][2][1],extras[ei][2][2]);
	d2 = new THREE.Vector3(extras[ei][3][0],extras[ei][3][1],extras[ei][3][2]);
	d2.normalize();
	
	// What's all this then?
	// Well, we know the beginning and end points of the track as well
	// as the directions at each of those points. This in-principle gives
	// us the 4 control points needed for a cubic bezier spline.
	// The control points from the directions are determined by moving along 0.25
	// of the distance between the beginning and end points of the track.
	// This 0.25 is nothing more than a fudge factor that reproduces closely-enough
	// the NURBS-based drawing of tracks done in iSpy. At some point it may be nice
	// to implement the NURBS-based drawing but I value my sanity.
	
	distance = p1.distanceTo(p2);
	scale = distance*0.25;
	
	p3 = new THREE.Vector3(p1.x+scale*d1.x, p1.y+scale*d1.y, p1.z+scale*d1.z);
	p4 = new THREE.Vector3(p2.x-scale*d2.x, p2.y-scale*d2.y, p2.z-scale*d2.z);
	
	curve = new THREE.CubicBezierCurve3(p1,p3,p4,p2);
	
	if ( ispy.use_line2 ) {
	    	
	    var lg = new THREE.LineGeometry();
	    var positions = [];
	    curve.getPoints(32).forEach(function(p) { positions.push(p.x,p.y,p.z); });
	    lg.setPositions(positions);

	    var line = new THREE.Line2(lg, new THREE.LineMaterial({
		color:tcolor,
		opacity:style.opacity,
		transparent:transp,
		linewidth:style.linewidth*0.001
	    }));

	    line.computeLineDistances();

	    line.visible = pt < selection.min_pt ? false : true;
	    curves.push(line);
	    
	} else {

	    var lg = new THREE.Geometry();
	    lg.vertices = curve.getPoints(32);
	    
	    var line = new THREE.Line(lg, new THREE.LineBasicMaterial({
		color:tcolor,
		opacity:style.opacity,
		transparent: transp,
	    }));

	    line.visible = pt < selection.min_pt ? false : true;
	    curves.push(line);

	}

    }

    return curves;

};

ispy.makeVertex = function(data,style) {

    var geometry = new THREE.SphereGeometry(style.radius, 32, 32);
    var hcolor = new THREE.Color(style.color);
    var transp = false;
    
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    var material = new THREE.MeshBasicMaterial({color:hcolor, transparent: transp, opacity:style.opacity});
    
    var vertex = new THREE.Mesh(geometry, material);
    vertex.position.x = data[2][0];
    vertex.position.y = data[2][1];
    vertex.position.z = data[2][2];

    return vertex;

};

ispy.makeSimVertex = function(data, style) {

    if ( data[1] !== -1 )
	return null;

    var geometry = new THREE.SphereGeometry(0.005,32,32);
    var hcolor = new THREE.Color(style.color);
    
    var transp = false;
  
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    var material = new THREE.MeshBasicMaterial({color:hcolor, transparent: transp, opacity:style.opacity});
    
    var vertex = new THREE.Mesh(geometry, material);
    vertex.position.x = data[0][0];
    vertex.position.y = data[0][1];
    vertex.position.z = data[0][2];
    
    return vertex;

};

ispy.makeCaloClusters = function(data, extra, assoc, style, selection) {
  
    if ( ! assoc ) {

	throw "No association!";
    
    }

    var ri = 0;
    var boxes = [];
   
    for ( var j = 0; j < assoc.length; j++ ) {
	
	ri = assoc[j][1][1];
	boxes[j] = ispy.makeSolidFace(extra[ri], 2);

    }

    var ccolor = new THREE.Color(style.color);
    
    var transp = false;
  
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    var clusters = [];
  
    for ( var k = 0; k < boxes.length; k++ ) {
    
	clusters.push(new THREE.Mesh(boxes[k], 
		      new THREE.MeshBasicMaterial({color:ccolor, transparent:transp, opacity:style.opacity, side:THREE.DoubleSide})));
    
    }

    return clusters;

};

ispy.makeEcalDigi = function(data, geometry, scale, selection) {
  
    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
    
	return ispy.makeScaledSolidTower(data, geometry, 15, scale*energy);
  
    }

};

ispy.makeERecHit_V2 = function(data, geometry, scale, selection) {

    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
    
	return ispy.makeScaledSolidTower(data, geometry, 5, scale*energy);
  
    }

};

ispy.makeHRecHit_V2 = function(data, geometry, scale, selection) {

    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
   
	return ispy.makeScaledSolidBox(data, geometry, 5, scale);
  
    }

};

ispy.makeHGCRecHit = function(data, geometry, scale, selection) {

    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
    
	return ispy.makeScaledSolidBox(data, geometry, 5, 0.05*scale);
  
    }

};

ispy.makeCaloTower = function(data, egeometry, hgeometry, scale, selection) {

    var et = data[0];

    var emEnergy = data[5];
    var hadEnergy = data[4];

    var eta = data[1];
    var phi = data[2];

    var theta = 2*Math.atan(Math.exp(-eta));

    var ci = 11;

    if ( et > selection.min_energy ) {

	var f1 = new THREE.Vector3(data[ci][0],   data[ci][1],   data[ci][2]);
	var f2 = new THREE.Vector3(data[ci+1][0], data[ci+1][1], data[ci+1][2]);
	var f3 = new THREE.Vector3(data[ci+2][0], data[ci+2][1], data[ci+2][2]);
	var f4 = new THREE.Vector3(data[ci+3][0], data[ci+3][1], data[ci+3][2]);
    
	var b1e = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
	var b2e = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
	var b3e = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
	var b4e = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);
    
	var b1h = new THREE.Vector3(data[ci+4][0], data[ci+4][1], data[ci+4][2]);
        var b2h = new THREE.Vector3(data[ci+5][0], data[ci+5][1], data[ci+5][2]);
        var b3h = new THREE.Vector3(data[ci+6][0], data[ci+6][1], data[ci+6][2]);
        var b4h = new THREE.Vector3(data[ci+7][0], data[ci+7][1], data[ci+7][2]);

	var ebox = new THREE.Geometry();
	var hbox = new THREE.Geometry();
		
	escale = scale*(emEnergy > 0 ? emEnergy*Math.sin(theta) : 0);
	hscale = scale*(hadEnergy > 0 ? hadEnergy*Math.sin(theta) : 0);

	if ( escale > 0 ) {

	    ebox.vertices.push(f1);
	    ebox.vertices.push(f2);
	    ebox.vertices.push(f3);
	    ebox.vertices.push(f4);
    
	    b1e.normalize();
	    b2e.normalize();
	    b3e.normalize();
	    b4e.normalize();

	    b1e.multiplyScalar(escale);
	    b2e.multiplyScalar(escale);
	    b3e.multiplyScalar(escale);
	    b4e.multiplyScalar(escale);

	    b1e.addVectors(f1,b1e);
	    b2e.addVectors(f2,b2e);
	    b3e.addVectors(f3,b3e);
	    b4e.addVectors(f4,b4e);

	    ebox.vertices.push(b1e);
	    ebox.vertices.push(b2e);
	    ebox.vertices.push(b3e);
	    ebox.vertices.push(b4e);

	    //front
	    ebox.faces.push(new THREE.Face3(0,1,2));
	    ebox.faces.push(new THREE.Face3(2,3,0));
	    //back
	    ebox.faces.push(new THREE.Face3(4,5,6));
	    ebox.faces.push(new THREE.Face3(6,7,4));
	    //top
	    ebox.faces.push(new THREE.Face3(4,5,1));
	    ebox.faces.push(new THREE.Face3(1,0,4));
	    //bottom
	    ebox.faces.push(new THREE.Face3(7,6,2));
	    ebox.faces.push(new THREE.Face3(2,3,7));
	    //left
	    ebox.faces.push(new THREE.Face3(0,3,7));
	    ebox.faces.push(new THREE.Face3(7,4,0));
	    //right
	    ebox.faces.push(new THREE.Face3(1,5,6));
	    ebox.faces.push(new THREE.Face3(6,2,1));
	    
	    ebox.computeFaceNormals();
	    ebox.computeVertexNormals();
	    
	    egeometry.merge(ebox);
	    
	}

	if ( hscale > 0 ) {
	
	    if ( escale > 0 ) {
    
		hbox.vertices.push(b1e);
		hbox.vertices.push(b2e);
		hbox.vertices.push(b3e);
		hbox.vertices.push(b4e);
	    }
	
	    else {
	    
		hbox.vertices.push(f1);
		hbox.vertices.push(f2);
		hbox.vertices.push(f3);
		hbox.vertices.push(f4);

	    }

	    b1h.normalize();
	    b2h.normalize();
	    b3h.normalize();
	    b4h.normalize();
	
	    b1h.multiplyScalar(hscale);
	    b2h.multiplyScalar(hscale);
	    b3h.multiplyScalar(hscale);
	    b4h.multiplyScalar(hscale);


	    if ( escale > 0 ) {
		
		b1h.addVectors(b1e,b1h);
		b2h.addVectors(b2e,b2h);
		b3h.addVectors(b3e,b3h);
		b4h.addVectors(b4e,b4h);
		
	    } else {

		b1h.addVectors(f1,b1h);
		b2h.addVectors(f2,b2h);
		b3h.addVectors(f3,b3h);
		b4h.addVectors(f4,b4h);
		
	    }

	    hbox.vertices.push(b1h);
	    hbox.vertices.push(b2h);
	    hbox.vertices.push(b3h);
	    hbox.vertices.push(b4h);
	    
	    //front
	    hbox.faces.push(new THREE.Face3(0,1,2));
	    hbox.faces.push(new THREE.Face3(2,3,0));
	    //back
	    hbox.faces.push(new THREE.Face3(4,5,6));
	    hbox.faces.push(new THREE.Face3(6,7,4));
	    //top
	    hbox.faces.push(new THREE.Face3(4,5,1));
	    hbox.faces.push(new THREE.Face3(1,0,4));
	    //bottom
	    hbox.faces.push(new THREE.Face3(7,6,2));
	    hbox.faces.push(new THREE.Face3(2,3,7));
	    //left
	    hbox.faces.push(new THREE.Face3(0,3,7));
	    hbox.faces.push(new THREE.Face3(7,4,0));
	    //right
	    hbox.faces.push(new THREE.Face3(1,5,6));
	    hbox.faces.push(new THREE.Face3(6,2,1));
	    
	    hbox.computeFaceNormals();
	    hbox.computeVertexNormals();
	    
	    hgeometry.merge(hbox);

	}

    }

};

ispy.makeDT = function(dt) {

    //return ispy.makeSolidBox(dt, 1);
    return ispy.makeWireframeBox(dt, 1);

};

ispy.makeCSC = function(csc) {

    //return ispy.makeSolidBox(csc, 1);  
    return ispy.makeWireframeBox(csc, 1);

};

ispy.makeMuonChamber = function(chamber) {
    
    return ispy.makeSolidBox(chamber, 1);
    //return ispy.makeWireframeBox(chamber, 1);

};

ispy.makeHcal = function(hb) {
  
    return ispy.makeWireframeBox(hb, 1);

};

ispy.makeEcal = function(ecal) {

    //return ispy.makeWireframeBox(ecal, 1);  
    return ispy.makeBufferBoxes(ecal,1);

};

ispy.makeRPC = function(rpc) {
    
    return ispy.makeWireFace(rpc, 1);

};

ispy.makePointCloud = function(data, index) {
  
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(data.length*3);

    for (var i = 0; i < data.length; i++) {
    
	positions[i*3 + 0] = data[i][index][0];
	positions[i*3 + 1] = data[i][index][1];
	positions[i*3 + 2] = data[i][index][2];
  
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();
    
    return geometry;

};

ispy.makeTrackingRecHits = function(data) {

    return ispy.makePointCloud(data,0);

};

ispy.makeTrackingClusters = function(data) {

    return ispy.makePointCloud(data,1);

};

ispy.makeMET = function(data, style, selection) {

    /*
      "METs_V1": [["phi", "double"],["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
    */

    /*
    "PATMETs_V1": [["phi", "double"],["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
    */

    var pt = data[1];
    var px = data[2];
    var py = data[3];

    var length = pt*style.scale;
   
    var dir = new THREE.Vector3(px,py,0);
    dir.normalize();
       
    var origin = new THREE.Vector3(0,0,0);
    origin.add(dir);
    origin.multiplyScalar(1.45);
    
    var color = new THREE.Color(style.color);

    // dir, origin, length, hex, headLength, headWidth
    var met = new THREE.ArrowHelper(dir, origin, length, color.getHex(), 0.2, 0.2);

    if ( pt < selection.min_pt ) {

	met.visible = false;

    }

    return met;
    
    /*
    var color = new THREE.Color(style.color);
    var origin = new THREE.Vector3(0,0,0);
    var length = pt*style.scale;
    
    dir.setLength(length);
    
    var geometry = new THREE.LineGeometry();
    geometry.setPositions([
	origin.x,origin.y,origin.z,
	dir.x,dir.y,dir.z
    ]);

    var material = new THREE.LineMaterial({
	color: color,
	linewidth: style.linewidth*0.001
    });
    
    var met = new THREE.Line2(geometry, material);
    met.computeLineDistances();

    dir.normalize();
    met.translateOnAxis(dir, 1.45);
    */
};

ispy.makeJet = function(data, style, selection) {
  
    var et = data[0];
    var eta = data[1];

    var theta = data[2];
    var phi = data[3];
    
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var cp = Math.cos(phi);
    var sp = Math.sin(phi);

    var maxZ = 2.25;
    var maxR = 1.10;
    
    var length1 = ct ? maxZ / Math.abs(ct) : maxZ;
    var length2 = st ? maxR / Math.abs(st) : maxR;
    var length = length1 < length2 ? length1 : length2;
    var radius = 0.3 * (1.0 /(1 + 0.001));
    
    // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
    var geometry = new THREE.CylinderGeometry(radius,0.0,length,16,1,true);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,length*0.5,0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
    
    var jcolor = new THREE.Color(style.color);

    var transp = false;
    
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    var material = new THREE.MeshBasicMaterial({color:jcolor, transparent: transp, opacity:style.opacity});
    material.side = THREE.DoubleSide;
    
    var jet = new THREE.Mesh(geometry, material);
    jet.lookAt(new THREE.Vector3(length*0.5*st*cp, length*0.5*st*sp, length*0.5*ct));
    jet.visible = true;

    if ( et < selection.min_et ) {
    
	jet.visible = false;
  
    }
  
    return jet;

};

ispy.makePhoton = function(data, style, selection) {
    /*
      Draw a line representing the inferred photon trajectory from the vertex (IP?) to the extent of the ECAL
      "Photons_V1": [["energy", "double"],["et", "double"],["eta", "double"],["phi", "double"],["pos", "v3d"]
    */
    var lEB = 3.0;  // half-length of the EB (m)
    var rEB = 1.24; // inner radius of the EB (m)
    
    var eta = data[2];
    var phi = data[3];
    
    var et = data[1];

    var px = Math.cos(phi);
    var py = Math.sin(phi);
    var pz = (Math.pow(Math.E, eta) - Math.pow(Math.E, -eta))/2;

    var t = 0.0;
    
    var x0 = data[4][0];
    var y0 = data[4][1];
    var z0 = data[4][2];

    if ( Math.abs(eta) > 1.48 ) { // i.e. not in the EB, so propagate to ES
    
	t = Math.abs((lEB - z0)/pz);
  
    } else { // propagate to EB
    
	var a = px*px + py*py;
	var b = 2*x0*px + 2*y0*py;
	var c = x0*x0 + y0*y0 - rEB*rEB;
	t = (-b+Math.sqrt(b*b-4*a*c))/2*a;
  
    }

    var pt1 = new THREE.Vector3(x0, y0, z0);
    var pt2 = new THREE.Vector3(x0+px*t, y0+py*t, z0+pz*t);
    
    var geometry = new THREE.LineGeometry();    
    geometry.setPositions([pt1.x, pt1.y, pt1.z, pt2.x, pt2.y, pt2.z]);

    var color = new THREE.Color(style.color);

    var photon = new THREE.Line2(geometry, new THREE.LineMaterial({color: color, linewidth: style.linewidth*0.001, dashed:true}));
    photon.computeLineDistances();

    if ( et < selection.min_et || et > 110 ) {

        photon.visible = false;

    }

    return photon;

};

ispy.makeDTRecHits = function(data) {
    /*
      ["wireId", "int"],["layerId", "int"],["superLayerId", "int"],["sectorId", "int"],["stationId", "int"],["wheelId", "int"],
      ["digitime", "double"],["wirePos", "v3d"],
      ["lPlusGlobalPos", "v3d"],["lMinusGlobalPos", "v3d"],["rPlusGlobalPos", "v3d"],["rMinusGlobalPos", "v3d"],
      ["lGlobalPos", "v3d"],["rGlobalPos", "v3d"],
      ["axis", "v3d"],["angle", "double"],["cellWidth", "double"],["cellLength", "double"],["cellHeight", "double"]]
    */

    var pos = new THREE.Vector3(data[7][0], data[7][1], data[7][2]);
    var axis = new THREE.Vector3(data[14][0], data[14][1], data[14][2]);
    var angle = data[15];
    
    var w = data[16]*0.5;
    var h = data[17]*0.5;
    var d = data[18]*0.5;
    
    var box = new THREE.Geometry();
    box.vertices = [new THREE.Vector3(-w, h,-d),
		    new THREE.Vector3( w, h,-d),
		    new THREE.Vector3( w, h, d),
		    new THREE.Vector3(-w, h, d),
		    new THREE.Vector3(-w,-h, d),
		    new THREE.Vector3( w,-h, d),
		    new THREE.Vector3( w,-h,-d),
		    new THREE.Vector3(-w,-h,-d)];
    
    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));
    
    box.faces.push(new THREE.Face3(4,5,6));
    box.faces.push(new THREE.Face3(6,7,4));
    
    box.faces.push(new THREE.Face3(4,5,1));
    box.faces.push(new THREE.Face3(1,0,4));
    
    box.faces.push(new THREE.Face3(7,6,2));
    box.faces.push(new THREE.Face3(2,3,7));
    
    box.faces.push(new THREE.Face3(0,3,7));
    box.faces.push(new THREE.Face3(7,4,0));
    
    box.faces.push(new THREE.Face3(1,5,6));
    box.faces.push(new THREE.Face3(6,2,1));
    
    box.applyMatrix(new THREE.Matrix4().makeRotationAxis(axis,angle));
    box.applyMatrix(new THREE.Matrix4().makeTranslation(pos.x,pos.y,pos.z));
    
    return box;

};

ispy.makeRPCRecHits = function(data) {
  
    var u1 = new THREE.Vector3(data[0][0], data[0][1], data[0][2]);
    var u2 = new THREE.Vector3(data[1][0], data[1][1], data[1][2]);
    var v1 = new THREE.Vector3(data[2][0], data[2][1], data[2][2]);
    var v2 = new THREE.Vector3(data[3][0], data[3][1], data[3][2]);
    var w1 = new THREE.Vector3(data[4][0], data[4][1], data[4][2]);
    var w2 = new THREE.Vector3(data[5][0], data[5][1], data[5][2]);
    
    var u = new THREE.Geometry();
    u.vertices.push(u1);
    u.vertices.push(u2);
    
    var v = new THREE.Geometry();
    v.vertices.push(v1);
    v.vertices.push(v2);

    var w = new THREE.Geometry();
    w.vertices.push(w1);
    w.vertices.push(w2);
    
    return [u,v,w];

};

ispy.makeCSCRecHit2Ds_V2 = function(data, descr) {

    return ispy.makeRPCRecHits(data, descr);

};

ispy.makeDTRecSegments = function(data) {

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(data[1][0], data[1][1], data[1][2]));
    geometry.vertices.push(new THREE.Vector3(data[2][0], data[2][1], data[2][2]));
    return [geometry];

};

ispy.makeCSCSegments = function(data, geometry) {

    return ispy.makeDTRecSegments(data, geometry);

};

ispy.makeCSCDigis = function(data, w, d, rotate) {

    var pos = new THREE.Vector3(data[0][0], data[0][1], data[0][2]);
    var h = data[1]*0.5;
    w *= 0.5;
    d *= 0.5;
    var axis = new THREE.Vector3(0.0, 0.0, 1.0);
    var angle = -Math.atan2(pos.x, pos.y) - rotate;

    var box = new THREE.Geometry();
    // (-1,1,-1) (1,1,-1) (1,1,1) (-1,1,1) (-1,-1,1) (1,-1,1) (1,-1,-1) (-1,-1,-1)
    box.vertices = [new THREE.Vector3(-w, h,-d),
		    new THREE.Vector3( w, h,-d),
		    new THREE.Vector3( w, h, d),
		    new THREE.Vector3(-w, h, d),
		    new THREE.Vector3(-w,-h, d),
		    new THREE.Vector3( w,-h, d),
		    new THREE.Vector3( w,-h,-d),
		    new THREE.Vector3(-w,-h,-d)];

    
    box.faces.push(new THREE.Face3(0,1,2));
    box.faces.push(new THREE.Face3(2,3,0));
    
    box.faces.push(new THREE.Face3(4,5,6));
    box.faces.push(new THREE.Face3(6,7,4));
    
    box.faces.push(new THREE.Face3(4,5,1));
    box.faces.push(new THREE.Face3(1,0,4));
    
    box.faces.push(new THREE.Face3(7,6,2));
    box.faces.push(new THREE.Face3(2,3,7));
    
    box.faces.push(new THREE.Face3(0,3,7));
    box.faces.push(new THREE.Face3(7,4,0));
    
    box.faces.push(new THREE.Face3(1,5,6));
    box.faces.push(new THREE.Face3(6,2,1));
        
    box.applyMatrix(new THREE.Matrix4().makeRotationAxis(axis,angle));
    box.applyMatrix(new THREE.Matrix4().makeTranslation(pos.x,pos.y,pos.z));

    return box;

};

ispy.makeCSCDigis_V2 = function(data) {
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(data[0][0], data[0][1], data[0][2]));
    geometry.vertices.push(new THREE.Vector3(data[1][0], data[1][1], data[1][2]));
    return [geometry];

};

/*
  "CSCStripDigis_V1": [["pos", "v3d"],["length", "double"],["endcap", "int"],["station", "int"],["ring", "int"],["chamber", "int"]]
  "CSCWireDigis_V1": [["pos", "v3d"],["length", "double"],["endcap", "int"],["station", "int"],["ring", "int"],["chamber", "int"]]
*/

ispy.makeCSCWireDigis = function(data) {
 
    return ispy.makeCSCDigis(data, 0.02, 0.01, Math.PI*0.5);

};

ispy.makeCSCStripDigis = function(data) {

    return ispy.makeCSCDigis(data, 0.01, 0.01, 0.0);

};

ispy.makeCSCLCTDigis = function(data) {

    return ispy.makePointCloud(data,0);

};

ispy.makeCSCLCTCorrelatedLCTDigis = function(data) {

    var l1 = new THREE.Geometry();
    l1.vertices.push(new THREE.Vector3(data[0][0], data[0][1], data[0][2]));
    l1.vertices.push(new THREE.Vector3(data[1][0], data[1][1], data[1][2]));

    var l2 = new THREE.Geometry();
    l2.vertices.push(new THREE.Vector3(data[2][0], data[2][1], data[2][2]));
    l2.vertices.push(new THREE.Vector3(data[3][0], data[3][1], data[3][2]));

    return [l1,l2];

};

ispy.makeEvent = function(data) {
    /*
      "Event_V2": [["run", "int"],["event", "int"],["ls", "int"],["orbit", "int"],["bx", "int"],["time", "string"],["localtime", "string"]]
      for what we do here, Event_V1 is the same, i.e. we don't show localtime
    */
    var ei = data[0];
    var run = ei[0], event = ei[1], ls = ei[2], time = ei[5];
    
    var et = "CMS Experiment at the LHC, CERN<br>";
    et += "Data recorded: " + time + "</br>";
    et += "Run / Event / LS: " + run + " / " + event + " / " + ls + "</br>";
    
    $('#event-text').html(et);
    var ei = $('#event-info');
    $('#display').append(ei);

};
