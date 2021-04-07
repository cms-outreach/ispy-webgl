ispy.makeWireframeBox = function(data, ci) {

    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    // front
    addFace3(data[ci], data[ci + 1], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci]);

    // back
    addFace3(data[ci + 4], data[ci + 5], data[ci + 6]);
    addFace3(data[ci + 6], data[ci + 7], data[ci + 4]);

    // top
    addFace3(data[ci + 4], data[ci + 5], data[ci + 1]);
    addFace3(data[ci + 1], data[ci], data[ci + 4]);

    // bottom
    addFace3(data[ci + 7], data[ci + 6], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci + 7]);

    // left
    addFace3(data[ci + 0], data[ci + 3], data[ci + 7]);
    addFace3(data[ci + 7], data[ci + 4], data[ci + 0]);

    // right
    addFace3(data[ci + 1], data[ci + 5], data[ci + 6]);
    addFace3(data[ci + 6], data[ci + 2], data[ci + 1]);

    const box_buffer = new THREE.BufferGeometry();
    box_buffer.attributes.position = new THREE.BufferAttribute(
        new Float32Array(all_positions),
        3
    );

    const box = new THREE.EdgesGeometry(box_buffer);

    return box;

};

ispy.makeWireFace = function(data, ci) {
    
    let all_positions = [];
    
    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    addFace3(data[ci], data[ci + 1], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci]);

    const box_buffer = new THREE.BufferGeometry();
    box_buffer.attributes.position = new THREE.BufferAttribute(
        new Float32Array(all_positions),
	3
    );

    const box = new THREE.EdgesGeometry(box_buffer);
    
    return box;

};

ispy.makeSolidFace = function(data, ci) {

    let all_positions = [];
    
    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    addFace3(data[ci], data[ci + 1], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci]);

    const box_buffer = new THREE.BufferGeometry();
    box_buffer.attributes.position = new THREE.BufferAttribute(
        new Float32Array(all_positions),
	3
    );
    
    return box_buffer;
    
};

ispy.makeSolidBox = function(data, ci) {

    let all_positions = [];

    const addFace3 = (...vectors) => {
        all_positions = all_positions.concat(...vectors);
    };

    // front
    addFace3(data[ci], data[ci + 1], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci]);

    // back
    addFace3(data[ci + 4], data[ci + 5], data[ci + 6]);
    addFace3(data[ci + 6], data[ci + 7], data[ci + 4]);

    // top
    addFace3(data[ci + 4], data[ci + 5], data[ci + 1]);
    addFace3(data[ci + 1], data[ci], data[ci + 4]);

    // bottom
    addFace3(data[ci + 7], data[ci + 6], data[ci + 2]);
    addFace3(data[ci + 2], data[ci + 3], data[ci + 7]);

    // left
    addFace3(data[ci + 0], data[ci + 3], data[ci + 7]);
    addFace3(data[ci + 7], data[ci + 4], data[ci + 0]);

    // right
    addFace3(data[ci + 1], data[ci + 5], data[ci + 6]);
    addFace3(data[ci + 6], data[ci + 2], data[ci + 1]);

    const box_buffer = new THREE.BufferGeometry();
    box_buffer.attributes.position = new THREE.BufferAttribute(
        new Float32Array(all_positions),
        3
    );
    
    const box_edges = new THREE.EdgesGeometry(box_buffer);

    return [box_buffer, box_edges];

};

ispy.makeScaledSolidBox = function(data, boxes, ci, scale) {

    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    let v0 = new THREE.Vector3(...data[ci]);
    let v1 = new THREE.Vector3(...data[ci+1]);
    let v2 = new THREE.Vector3(...data[ci+2]);
    let v3 = new THREE.Vector3(...data[ci+3]);
    
    let v4 = new THREE.Vector3(...data[ci+4]);
    let v5 = new THREE.Vector3(...data[ci+5]);
    let v6 = new THREE.Vector3(...data[ci+6]);
    let v7 = new THREE.Vector3(...data[ci+7]);
 
    var energy = data[0];
    scale = energy/scale;

    var center = new THREE.Vector3();

    center.addVectors(v0,v1);
    center.add(v2).add(v3)
    .add(v4).add(v5)
    .add(v6).add(v7);

    center.divideScalar(8.0);

    v0.sub(center);
    v0.multiplyScalar(scale);
    v0.add(center);

    v1.sub(center);
    v1.multiplyScalar(scale);
    v1.add(center);

    v2.sub(center);
    v2.multiplyScalar(scale);
    v2.add(center);
    
    v3.sub(center);
    v3.multiplyScalar(scale);
    v3.add(center);

    v4.sub(center);
    v5.sub(center);
    v6.sub(center);
    v7.sub(center);
    
    v4.multiplyScalar(scale);
    v5.multiplyScalar(scale);
    v6.multiplyScalar(scale);
    v7.multiplyScalar(scale);
    
    v4.add(center);
    v5.add(center);
    v6.add(center);
    v7.add(center);

    // front
    addFace3(v0.toArray(), v1.toArray(), v2.toArray());
    addFace3(v2.toArray(), v3.toArray(), v0.toArray());
    //back
    addFace3(v4.toArray(), v5.toArray(), v6.toArray());
    addFace3(v6.toArray(), v7.toArray(), v4.toArray());
    //top
    addFace3(v4.toArray(), v5.toArray(), v1.toArray());
    addFace3(v1.toArray(), v0.toArray(), v4.toArray());
    //bottom
    addFace3(v7.toArray(), v6.toArray(), v2.toArray());
    addFace3(v2.toArray(), v3.toArray(), v7.toArray());
    //left
    addFace3(v0.toArray(), v3.toArray(), v7.toArray());
    addFace3(v7.toArray(), v4.toArray(), v0.toArray());
    //right
    addFace3(v1.toArray(), v5.toArray(), v6.toArray());
    addFace3(v6.toArray(), v2.toArray(), v1.toArray());

    const box = new THREE.BufferGeometry();
    box.attributes.position = new THREE.BufferAttribute(
	new Float32Array(all_positions),
	3
    );

    boxes.push(box);

};

ispy.makeScaledSolidTower = function(data, towers, ci, scale) {
        
    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };

    // Front vertices
    let v0 = new THREE.Vector3(...data[ci]);
    let v1 = new THREE.Vector3(...data[ci+1]);
    let v2 = new THREE.Vector3(...data[ci+2]);
    let v3 = new THREE.Vector3(...data[ci+3]);
    
    // Back vertices    
    let v4 = new THREE.Vector3(...data[ci+4]);
    let v5 = new THREE.Vector3(...data[ci+5]);
    let v6 = new THREE.Vector3(...data[ci+6]);
    let v7 = new THREE.Vector3(...data[ci+7]);

    v4.sub(v0);
    v5.sub(v1);
    v6.sub(v2);
    v7.sub(v3);
    
    v4.normalize();
    v5.normalize();
    v6.normalize();
    v7.normalize();

    v4.multiplyScalar(scale);
    v5.multiplyScalar(scale);
    v6.multiplyScalar(scale);
    v7.multiplyScalar(scale);

    v4.addVectors(v0,v4);
    v5.addVectors(v1,v5);
    v6.addVectors(v2,v6);
    v7.addVectors(v3,v7);

    // front
    addFace3(v0.toArray(), v1.toArray(), v2.toArray());
    addFace3(v2.toArray(), v3.toArray(), v0.toArray());
    //back
    addFace3(v4.toArray(), v5.toArray(), v6.toArray());
    addFace3(v6.toArray(), v7.toArray(), v4.toArray());
    //top
    addFace3(v4.toArray(), v5.toArray(), v1.toArray());
    addFace3(v1.toArray(), v0.toArray(), v4.toArray());
    //bottom
    addFace3(v7.toArray(), v6.toArray(), v2.toArray());
    addFace3(v2.toArray(), v3.toArray(), v7.toArray());
    //left
    addFace3(v0.toArray(), v3.toArray(), v7.toArray());
    addFace3(v7.toArray(), v4.toArray(), v0.toArray());
    //right
    addFace3(v1.toArray(), v5.toArray(), v6.toArray());
    addFace3(v6.toArray(), v2.toArray(), v1.toArray());

    const tower = new THREE.BufferGeometry();
    tower.attributes.position = new THREE.BufferAttribute(
	new Float32Array(all_positions),
	3
    );

    towers.push(tower);

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

	    line.visible = pt > selection.min_pt ? true : false;
	    curves.push(line);
	    
	} else {

	    var lg = new THREE.Geometry();
	    lg.vertices = curve.getPoints(32);
	    
	    var line = new THREE.Line(lg, new THREE.LineBasicMaterial({
		color:tcolor,
		opacity:style.opacity,
		transparent: transp,
	    }));

	    line.visible = pt > selection.min_pt ? true : false;
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

ispy.makeVertexCompositeCandidate = function(data,style) {

    var geometry = new THREE.SphereGeometry(style.radius, 32, 32);
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
				     new THREE.MeshBasicMaterial({
					 color:ccolor,
					 transparent:transp,
					 opacity:style.opacity,
					 side:THREE.DoubleSide})
				    )
		     );
    
    }

    return clusters;

};

ispy.makeEcalDigi = function(data, boxes, scale, selection) {
  
    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
    
	return ispy.makeScaledSolidTower(data, boxes, 15, scale*energy);
  
    }

};

ispy.makeERecHit_V2 = function(data, boxes, scale, selection) {

    var energy = data[0];
  
    if ( energy > selection.min_energy ) {
    
	return ispy.makeScaledSolidTower(data, boxes, 5, scale*energy);
  
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

    return ispy.makeSolidBox(dt, 1);
    //return ispy.makeWireframeBox(dt, 1);

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

    return ispy.makeWireframeBox(ecal, 1);  
    //return ispy.makeBufferBoxesOLD(ecal,1);

};

ispy.makeRPC = function(rpc) {
    
    //return ispy.makeWireFace(rpc, 1);
    return ispy.makeWireframeBox(rpc, 1);
    
};

ispy.makePointCloud = function(data, index) {
  
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(data.length*3);

    for (var i = 0; i < data.length; i++) {
    
	positions[i*3 + 0] = data[i][index][0];
	positions[i*3 + 1] = data[i][index][1];
	positions[i*3 + 2] = data[i][index][2];
  
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
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

    if ( Math.abs(eta) > 3 ) {

	jcolor = new THREE.Color("rgb(100%, 100%, 0%)");

    }
    
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

    if ( et < selection.min_et ) {

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
