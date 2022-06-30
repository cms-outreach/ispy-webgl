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
 
    const energy = data[0];
    scale = energy/scale;

    const center = new THREE.Vector3();

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

    const energy = data[0];
    scale = energy/scale;

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

ispy.makeTrackPoints = function(data, extra, assoc, style, selection) {

    if ( ! assoc ) {
  
	throw "No association!";
  
    }
    
    let cut = [];
    let mi = 0;  
    let positions = [];
    
    for ( let i = 0; i < data.length; i++ ) {

	positions[i] = [];
	
    }
     
    for ( let j = 0; j < assoc.length; j++ ) {
             
	mi = assoc[j][0][1];
	pi = assoc[j][1][1];

	if ( ispy.use_line2 ) {

	    positions[mi].push(...extra[pi][0]);

	} else {
	    
	    positions[mi].push(new THREE.Vector3(...extra[pi][0]));

	}
	
    }
    
    let tcolor = new THREE.Color(style.color);
    let transp = true;
  
    let lines = [];
    
    for ( let k = 0; k < positions.length; k++ ) {

	if ( ispy.use_line2 ) {
	
	    const line2 = new THREE.Line2(
		new THREE.LineGeometry().setPositions(positions[k]),
		new THREE.LineMaterial({
		    color: tcolor,
		    linewidth: style.linewidth*0.001,
		    transparent: transp,
		    opacity:style.opacity
		})
	    );

	    line2.userData.pt = data[k][selection.index];
	    line2.visible = data[k][selection.index] < selection.min_pt ? false : true;
	    line2.computeLineDistances();
	    lines.push(line2);

	} else {

	    const line = new THREE.Line(
		new THREE.BufferGeometry().setFromPoints(positions[k]),
		new THREE.LineBasicMaterial({
		    color: tcolor,
		    transparent: transp,
		    opacity: style.opacity
		})
	    );

	    line.userData.pt = data[k][selection.index];
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

    let ti, ei;
    let p1, d1, p2, d2;
    let distance, scale, curve;
    let curves = [];

    let tcolor = new THREE.Color();    
    tcolor.setStyle(style.color);

    const transp = true;
    
    for ( let i = 0; i < assocs.length; i++ ) {

	let pt = tracks[i][selection.index];
	let eta = tracks[i][4];
	let phi = tracks[i][3];

	ti = assocs[i][0][1];
	ei = assocs[i][1][1];
	
	p1 = new THREE.Vector3(...extras[ei][0]);
	d1 = new THREE.Vector3(...extras[ei][1]);
	d1.normalize();
	
	p2 = new THREE.Vector3(...extras[ei][2]);
	d2 = new THREE.Vector3(...extras[ei][3]);
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
	    let line = new THREE.Line(
		new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),
		new THREE.LineBasicMaterial({
		    color:tcolor,
		    opacity:style.opacity,
		    transparent: transp,
		})
	    );

	line.userData.pt = pt;
	line.visible = pt > selection.min_pt ? true : false;
	curves.push(line);

    }

    return curves;

};

ispy.makeThickTracks = function(tracks, extras, assocs, style, selection) {
  
    if ( ! assocs ) {
    
	throw "No association!";
  
    }

    let ti, ei;
    let p1, d1, p2, d2;
    let distance, scale, curve;
    let curves = [];

    let tcolor = new THREE.Color();    
    tcolor.setStyle(style.color);

    const transp = true;
    
    for ( let i = 0; i < assocs.length; i++ ) {

	let pt = tracks[i][selection.index];
	let eta = tracks[i][4];
	let phi = tracks[i][3];

	ti = assocs[i][0][1];
	ei = assocs[i][1][1];
	
	p1 = new THREE.Vector3(...extras[ei][0]);
	d1 = new THREE.Vector3(...extras[ei][1]);
	d1.normalize();
	
	p2 = new THREE.Vector3(...extras[ei][2]);
	d2 = new THREE.Vector3(...extras[ei][3]);
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

	    let lg = new THREE.LineGeometry();
	    let positions = [];
	    curve.getPoints(32).forEach(function(p) { positions.push(p.x,p.y,p.z); });
	    lg.setPositions(positions);

	    let line = new THREE.Line2(lg, new THREE.LineMaterial({
		color:tcolor,
		opacity:style.opacity,
		transparent:transp,
		linewidth:style.linewidth*0.001
	    }));

	    line.computeLineDistances();

	    line.userData.pt = pt;
	    line.visible = pt > selection.min_pt ? true : false;
	    curves.push(line);

	} else {

	    let line = new THREE.Line(
		new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),
		new THREE.LineBasicMaterial({
		    color:tcolor,
		    opacity:style.opacity,
		    transparent: transp,
		})
	    );

	    line.userData.pt = pt;
	    line.visible = pt > selection.min_pt ? true : false;
	    curves.push(line);

	}

    }

    return curves;

};

ispy.makeVertex = function(data,style) {

    const geometry = new THREE.SphereGeometry(style.radius, 32, 32);
    const hcolor = new THREE.Color(style.color);
    const transp = true;
    
    const material = new THREE.MeshBasicMaterial({
	color:hcolor,
	transparent: transp,
	opacity:style.opacity
    });
    
    const vertex = new THREE.Mesh(geometry, material);
    vertex.position.x = data[2][0];
    vertex.position.y = data[2][1];
    vertex.position.z = data[2][2];

    return vertex;

};

ispy.makeVertexCompositeCandidate = function(data,style) {

    const geometry = new THREE.SphereGeometry(style.radius, 32, 32);
    const hcolor = new THREE.Color(style.color);
    const transp = true;
    
    const material = new THREE.MeshBasicMaterial({
	color:hcolor,
	transparent: transp,
	opacity:style.opacity
    });
    
    const vertex = new THREE.Mesh(geometry, material);
    vertex.position.x = data[0][0];
    vertex.position.y = data[0][1];
    vertex.position.z = data[0][2];

    return vertex;

};

ispy.makeSimVertex = function(data, style) {

    if ( data[1] !== -1 )
	return null;

    const geometry = new THREE.SphereGeometry(0.005,32,32);
    const hcolor = new THREE.Color(style.color);
    
    const transp = true;
  
    const material = new THREE.MeshBasicMaterial({
	color:hcolor,
	transparent: transp,
	opacity:style.opacity
    });
    
    const vertex = new THREE.Mesh(geometry, material);
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
    
	return ispy.makeScaledSolidTower(data, boxes, 5, scale);
  
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
    
    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    let et = data[0];

    let emEnergy = data[5];
    let hadEnergy = data[4];

    let eta = data[1];
    let phi = data[2];

    let theta = 2*Math.atan(Math.exp(-eta));

    let ci = 11;

    if ( et > selection.min_energy ) {

	let f1 = new THREE.Vector3(...data[ci]);
	let f2 = new THREE.Vector3(...data[ci+1]);
	let f3 = new THREE.Vector3(...data[ci+2]);
	let f4 = new THREE.Vector3(...data[ci+3]);
    
	let b1e = new THREE.Vector3(...data[ci+4]);
	let b2e = new THREE.Vector3(...data[ci+5]);
	let b3e = new THREE.Vector3(...data[ci+6]);
	let b4e = new THREE.Vector3(...data[ci+7]);

	let b1h = b1e;
	let b2h = b2e;
	let b3h = b3e;
	let b4h = b4e;
		
	escale = scale*(emEnergy > 0 ? emEnergy*Math.sin(theta) : 0);
	hscale = scale*(hadEnergy > 0 ? hadEnergy*Math.sin(theta) : 0);

	if ( escale > 0 ) {
    
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

	    // front
	    addFace3(f1.toArray(), f2.toArray(), f3.toArray());
	    addFace3(f3.toArray(), f4.toArray(), f1.toArray());
	    //back
	    addFace3(b1e.toArray(), b2e.toArray(), b3e.toArray());
	    addFace3(b3e.toArray(), b4e.toArray(), b1e.toArray());
	    //top
	    addFace3(b1e.toArray(), b2e.toArray(), f2.toArray());
	    addFace3(f2.toArray(), f1.toArray(), b1e.toArray());
	    //bottom
	    addFace3(b4e.toArray(), b3e.toArray(), f3.toArray());
	    addFace3(f3.toArray(), f4.toArray(), b4e.toArray());
	    //left
	    addFace3(f1.toArray(), f4.toArray(), b4e.toArray());
	    addFace3(b4e.toArray(), b1e.toArray(), f1.toArray());
	    //right
	    addFace3(f2.toArray(), b2e.toArray(), b3e.toArray());
	    addFace3(b3e.toArray(), f3.toArray(), f2.toArray());

	    const ebox = new THREE.BufferGeometry();
	    ebox.attributes.position = new THREE.BufferAttribute(
		new Float32Array(all_positions),
		3
	    );

	    egeometry.push(ebox);
	    
	}

	all_positions = [];
	
	if ( hscale > 0 ) {

	    let v = [];
	    
	    if ( escale > 0 ) {
    
		v.push(b1e);
		v.push(b2e);
		v.push(b3e);
		v.push(b4e);
	    }
	
	    else {
	    
		v.push(f1);
		v.push(f2);
		v.push(f3);
		v.push(f4);

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

	    v.push(b1h);
	    v.push(b2h);
	    v.push(b3h);
	    v.push(b4h);
	    
	    // front
	    addFace3(v[0].toArray(), v[1].toArray(), v[2].toArray());
	    addFace3(v[2].toArray(), v[3].toArray(), v[1].toArray());
	    //back
	    addFace3(v[4].toArray(), v[5].toArray(), v[6].toArray());
	    addFace3(v[6].toArray(), v[7].toArray(), v[4].toArray());
	    //top
	    addFace3(v[4].toArray(), v[5].toArray(), v[1].toArray());
	    addFace3(v[1].toArray(), v[0].toArray(), v[4].toArray());
	    //bottom
	    addFace3(v[7].toArray(), v[6].toArray(), v[2].toArray());
	    addFace3(v[2].toArray(), v[3].toArray(), v[7].toArray());
	    //left
	    addFace3(v[0].toArray(), v[3].toArray(), v[7].toArray());
	    addFace3(v[7].toArray(), v[4].toArray(), v[0].toArray());
	    //right
	    addFace3(v[1].toArray(), v[5].toArray(), v[6].toArray());
	    addFace3(v[6].toArray(), v[2].toArray(), v[1].toArray());

	    const hbox = new THREE.BufferGeometry();
	    hbox.attributes.position = new THREE.BufferAttribute(
		new Float32Array(all_positions),
		3
	    );

	    hgeometry.push(hbox);
	    
	}

    }

};

ispy.makeDT = function(dt) {

    return ispy.makeWireframeBox(dt, 1);
    
};

ispy.makeCSC = function(csc) {

    return ispy.makeWireframeBox(csc, 1);

};

ispy.makeGEM = function(gem) {

    //return ispy.makeSolidBox(gem, 1);  
    return ispy.makeWireframeBox(gem, 1);

};

ispy.makeMuonChamber = function(chamber) {
    
    return ispy.makeSolidBox(chamber, 1);

};

ispy.makeHcal = function(hb) {
  
    return ispy.makeWireframeBox(hb, 1);

};

ispy.makeEcal = function(ecal) {

    return ispy.makeWireframeBox(ecal, 1);  

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

ispy.makeArrow = function(dir, origin, length, color) {

    // dir, origin, length, hex, headLength, headWidth
    const arrow = new THREE.ArrowHelper(
	dir, origin, length, color.getHex(),
	0.2, 0.2
    );
    
    // radiusTop, radiusBottom, height, radialSegments, heightSegments
    // We want more radialSegements beyond the 5 used in ArrowHelper
    // to make a nicer arrowhead
    arrow.cone.geometry = new THREE.CylinderGeometry(0, 0.5, 1, 24, 1);
    arrow.cone.geometry.translate(0, -1, 0);

    return arrow;
    
};

ispy.makeArrowThick = function(dir, origin, length, color, displacement) {

    dir.setLength(length);
    
    const positions = [
	...origin.toArray(),
	...dir.toArray()
    ];

    const arrow = new THREE.Object3D();
    
    const al = new THREE.Line2(
	new THREE.LineGeometry().setPositions(
	    positions
	),
	new THREE.LineMaterial({
	    color: color,
	    linewidth: 2*0.001
	})
    );

    al.computeLineDistances();
    dir.normalize()
    al.translateOnAxis(dir, displacement);

    const cl = 0.2;
    
    const ac = new THREE.Mesh(
	new THREE.CylinderGeometry(
	    0, 0.1, cl, 24, 1
	),
	new THREE.MeshBasicMaterial({
	    color: color
	})
    );
        
    ac.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,cl*0.5,0));
    ac.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));

    ac.lookAt(dir);
    dir.setLength(length+displacement);

    ac.position.x = dir.x;
    ac.position.y = dir.y;
    ac.position.z = dir.z;
    
    arrow.add(al);
    arrow.add(ac);

    return arrow;
    
};

ispy.makeMET = function(data, style, selection) {

    /*
      "METs_V1": [["phi", "double"],["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
    */

    /*
    "PATMETs_V1": [["phi", "double"],["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
    */

    const pt = data[1];
    const px = data[2];
    const py = data[3];

    let length = pt*style.scale;
   
    let dir = new THREE.Vector3(px,py,0);
    dir.normalize();
       
    let origin = new THREE.Vector3(0,0,0);    
    let color = new THREE.Color(style.color);

    var met;
    
    if ( ispy.use_line2 ) {

	met = ispy.makeArrowThick(
	    dir, origin,
	    length, color,
	    1.45 // displace out to ECAL barrel radius
	);

    } else {

	origin.add(dir);
	origin.multiplyScalar(1.45);
    
	met = ispy.makeArrow(dir, origin, length, color);

    }
    
    met.visible = pt < selection.min_pt ? false : true;

    return met;
    
};

ispy.makeJet = function(data, style, selection) {
  
    const et = data[0];
    const eta = data[1];
    
    const theta = data[2];
    const phi = data[3];
    
    let ct = Math.cos(theta);
    let st = Math.sin(theta);
    let cp = Math.cos(phi);
    let sp = Math.sin(phi);

    let maxZ = 2.25;
    let maxR = 1.10;
    
    let length1 = ct ? maxZ / Math.abs(ct) : maxZ;
    let length2 = st ? maxR / Math.abs(st) : maxR;
    let length = length1 < length2 ? length1 : length2;
    let radius = 0.3 * (1.0 /(1 + 0.001));
    
    // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
    const geometry = new THREE.CylinderGeometry(
	radius,
	0.0,
	length,
	16,
	1,
	true
    );
    
    geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,length*0.5,0));
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));

    let jcolor = new THREE.Color(style.color);
    
    let transp = false;
    
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    const material = new THREE.MeshBasicMaterial({
	color:jcolor,
	transparent: transp,
	opacity:style.opacity
    });

    material.side = THREE.DoubleSide;
    material.depthWrite = false;
    
    const jet = new THREE.Mesh(geometry, material);
    jet.lookAt(new THREE.Vector3(length*0.5*st*cp, length*0.5*st*sp, length*0.5*ct));
    jet.visible = true;

    jet.userData.et = et;
    
    if ( et < selection.min_et ) {
    
	jet.visible = false;
	  
    }
    
    return jet;

};


ispy.makeJetWithVertex = function(data, style, selection) {
  
    const et = data[0];
    const eta = data[1];

    const theta = data[2];
    const phi = data[3];

    const vertex = new THREE.Vector3(...data[4]);
    
    let ct = Math.cos(theta);
    let st = Math.sin(theta);
    let cp = Math.cos(phi);
    let sp = Math.sin(phi);

    let maxZ = 2.25;
    let maxR = 1.10;
    
    let length1 = ct ? maxZ / Math.abs(ct) : maxZ;
    let length2 = st ? maxR / Math.abs(st) : maxR;
    let length = length1 < length2 ? length1 : length2;
    let radius = 0.3 * (1.0 /(1 + 0.001));
    
    // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
    const geometry = new THREE.CylinderGeometry(
	radius,
	0.0,
	length,
	16,
	1,
	true
    );
    
    geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,length*0.5,0));
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));

    let jcolor = new THREE.Color(style.color);    
    let transp = false;
    
    if ( style.opacity < 1.0 ) {
    
	transp = true;
  
    }

    const material = new THREE.MeshBasicMaterial({
	color:jcolor,
	transparent: transp,
	opacity:style.opacity
    });

    material.side = THREE.DoubleSide;
    material.depthWrite = false;
    
    const jet = new THREE.Mesh(geometry, material);
    
    jet.position.x = vertex.x;
    jet.position.y = vertex.y;
    jet.position.z = vertex.z;

    jet.lookAt(new THREE.Vector3(length*0.5*st*cp, length*0.5*st*sp, length*0.5*ct));
    jet.visible = true;
    
    jet.userData.et = et;
    
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
    const lEB = 3.0;  // half-length of the EB (m)
    const rEB = 1.24; // inner radius of the EB (m)
    
    const eta = data[2];
    const phi = data[3];
    
    const energy = data[0];

    const px = Math.cos(phi);
    const py = Math.sin(phi);
    const pz = (Math.pow(Math.E, eta) - Math.pow(Math.E, -eta))/2;

    let t = 0.0;
    
    const x0 = data[4][0];
    const y0 = data[4][1];
    const z0 = data[4][2];

    if ( Math.abs(eta) > 1.48 ) { // i.e. not in the EB, so propagate to ES
    
	t = Math.abs((lEB - z0)/pz);
  
    } else { // propagate to EB
    
	let a = px*px + py*py;
	let b = 2*x0*px + 2*y0*py;
	let c = x0*x0 + y0*y0 - rEB*rEB;
	t = (-b+Math.sqrt(b*b-4*a*c))/2*a;
  
    }
    
    let pt1 = new THREE.Vector3(x0, y0, z0);
    let pt2 = new THREE.Vector3(x0+px*t, y0+py*t, z0+pz*t);
    
    let color = new THREE.Color(style.color);

    var photon;

    if ( ispy.use_line2 ) {

	// For some reason LineDashedMaterial doesn't
	// work for Line2 so use this material
	const ldm =  new THREE.LineMaterial({
	    color: color,
	    dashed: true,
	    linewidth: style.linewidth*0.001,
	    dashSize: 0.1,
	    gapSize: 0.1
	});

	ldm.defines.USE_DASH = ""; 
	ldm.needsUpdate = true;
	
	photon = new THREE.Line2(
	    new THREE.LineGeometry().setPositions(
		[...pt1.toArray(), ...pt2.toArray()] 
	    ),
	    ldm
	);

    } else {

	photon = new THREE.LineSegments(
	    new THREE.BufferGeometry().setFromPoints(
		[pt1, pt2]
	    ),
	    new THREE.LineDashedMaterial({
		color: color,
		scale: 1,
		dashSize: 0.1,
		gapSize: 0.1
	    })
	);
	
    }

    photon.computeLineDistances();
    photon.userData.energy = energy;

    if ( energy < selection.min_energy ) {
	
        photon.visible = false;
	
    }

    return photon;

};

ispy.makeProtons = function(data, style, selection) {
    /*
      Draw a line representing the inferred photon trajectory from the vertex 
      "ForwardProtons_V1": [["xi", "double"],["thetax", "double"],["thetay", "double"],["vertex", "v3d"],
                            ["pt", "double"],["px", "double"],["py", "double"],["pz", "double"]]
    */
    const xi = data[0];
    
    const x0 = data[3][0];
    const y0 = data[3][1];
    const z0 = data[3][2];

    const px = data[5];
    const py = data[6];
    const pz = data[7];
    
    let dir = new THREE.Vector3(px,py,pz);
    dir.normalize();
       
    let origin = new THREE.Vector3(x0,y0,z0);

    let length = Math.abs(pz)*0.01;
    length -= 0.75*65;
    
    let color = new THREE.Color(style.color);

    var proton;

    if ( ispy.use_line2 ) {

	proton = new ispy.makeArrowThick(
	    dir, origin, length, color, 0
	);

    } else {
    
	proton = new ispy.makeArrow(
	    dir, origin, length, color
	);

    }

    proton.userData.xi = xi;

    const radius = xi*10;
    const thickness = 0.05;

    const rg = new THREE.RingGeometry(
	radius, // inner radius
	radius + thickness, // outer radius
	32 // theta segments
    );

    rg.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
    
    const rm = new THREE.MeshBasicMaterial({
	color: color,
	side: THREE.DoubleSide
    });
    
    const ring = new THREE.Mesh(rg, rm);
    ring.name = "ring";

    // Note that coordinates are
    // w.r.t. the arrow 
    ring.position.x = 0;
    ring.position.y = length;
    ring.position.z = 0;

    //proton.add(ring);
    
    return proton;

};


ispy.makeDTRecHits = function(data) {
    /*
      ["wireId", "int"],["layerId", "int"],["superLayerId", "int"],["sectorId", "int"],["stationId", "int"],["wheelId", "int"],
      ["digitime", "double"],["wirePos", "v3d"],
      ["lPlusGlobalPos", "v3d"],["lMinusGlobalPos", "v3d"],["rPlusGlobalPos", "v3d"],["rMinusGlobalPos", "v3d"],
      ["lGlobalPos", "v3d"],["rGlobalPos", "v3d"],
      ["axis", "v3d"],["angle", "double"],["cellWidth", "double"],["cellLength", "double"],["cellHeight", "double"]]
    */

    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    let pos = new THREE.Vector3(...data[7]);
    let axis = new THREE.Vector3(...data[14]);
    let angle = data[15];
    
    let w = data[16]*0.5;
    let h = data[17]*0.5;
    let d = data[18]*0.5;

    let v0 = new THREE.Vector3(-w, h,-d);
    let v1 = new THREE.Vector3( w, h,-d);
    let v2 = new THREE.Vector3( w, h, d);
    let v3 = new THREE.Vector3(-w, h, d);
    let v4 = new THREE.Vector3(-w,-h, d);
    let v5 = new THREE.Vector3( w,-h, d);
    let v6 = new THREE.Vector3( w,-h,-d);
    let v7 = new THREE.Vector3(-w,-h,-d);
    
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
    
    box.applyMatrix4(new THREE.Matrix4().makeRotationAxis(axis,angle));
    box.applyMatrix4(new THREE.Matrix4().makeTranslation(pos.x,pos.y,pos.z));
    
    return [box];

};

ispy.makeRPCRecHits = function(data) {

    var u,v,w;
    
    if ( ispy.use_line2 ) {
    
	u = new THREE.LineGeometry();
	u.setPositions([...data[0], ...data[1]]);

	v = new THREE.LineGeometry();
	v.setPositions([...data[2], ...data[3]]);

	w = new THREE.LineGeometry();
	w.setPositions([...data[4], ...data[5]]);
	
    } else {
	
	const u1 = new THREE.Vector3(...data[0]);
	const u2 = new THREE.Vector3(...data[1]);
	const v1 = new THREE.Vector3(...data[2]);
	const v2 = new THREE.Vector3(...data[3]);
	const w1 = new THREE.Vector3(...data[4]);
	const w2 = new THREE.Vector3(...data[5]);

	u = new THREE.BufferGeometry().setFromPoints([u1,u2]);
	v = new THREE.BufferGeometry().setFromPoints([v1,v2]);
	w = new THREE.BufferGeometry().setFromPoints([w1,w2]);
	
    }

    return [u,v,w];
        
};

ispy.makeCSCRecHit2Ds_V2 = function(data, descr) {

    return ispy.makeRPCRecHits(data, descr);

};

ispy.makeGEMRecHits_V2 = function(data, descr) {

    return ispy.makeRPCRecHits(data, descr);

};
ispy.makeDTRecSegments = function(data) {

    var geometry;
    
    if ( ispy.use_line2 ) {
    
	geometry = new THREE.LineGeometry();
	geometry.setPositions([...data[1], ...data[2]]);

    } else {

	geometry = new THREE.BufferGeometry().setFromPoints([
	    new THREE.Vector3(...data[1]),
	    new THREE.Vector3(...data[2])
	]);

    }

    return [geometry];
    
};

ispy.makeCSCSegments = function(data, geometry) {

    return ispy.makeDTRecSegments(data, geometry);

};

ispy.makeGEMSegments_V2 = function(data, geometry) {

    return ispy.makeDTRecSegments(data, geometry);

};

ispy.makeCSCDigis = function(data, w, d, rotate) {
    
    let all_positions = [];

    const addFace3 = (...vectors) => {
	all_positions = all_positions.concat(...vectors);
    };
    
    var pos = new THREE.Vector3(...data[0]);
    var h = data[1]*0.5;

    w *= 0.5;
    d *= 0.5;

    var axis = new THREE.Vector3(0.0, 0.0, 1.0);
    var angle = -Math.atan2(pos.x, pos.y) - rotate;

    let v0 = new THREE.Vector3(-w, h,-d);
    let v1 = new THREE.Vector3( w, h,-d);
    let v2 = new THREE.Vector3( w, h, d);
    let v3 = new THREE.Vector3(-w, h, d);
    let v4 = new THREE.Vector3(-w,-h, d);
    let v5 = new THREE.Vector3( w,-h, d);
    let v6 = new THREE.Vector3( w,-h,-d);
    let v7 = new THREE.Vector3(-w,-h,-d);
    
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
    
    box.applyMatrix4(new THREE.Matrix4().makeRotationAxis(axis,angle));
    box.applyMatrix4(new THREE.Matrix4().makeTranslation(pos.x,pos.y,pos.z));

    return [box];

};

ispy.makeCSCDigis_V2 = function(data) {

    var geometry;
    
    if ( ispy.use_line2 ) {
	
	geometry = new THREE.LineGeometry()
	geometry.setPositions([...data[0], ...data[1]]);
    
    } else {
    
	geometry = new THREE.BufferGeometry().setFromPoints([
	    new THREE.Vector3(...data[0]),
	    new THREE.Vector3(...data[1])
	]);

    }

    return [geometry];
    
};

ispy.makeGEMDigis_V2 = function(data) {

    var geometry;
    
    if ( ispy.use_line2) {
    
	geometry = new THREE.LineGeometry();
	geometry.setPositions([...data[0], ...data[1]]);
	
    } else {

	geometry = new THREE.BufferGeometry().setFromPoints([
	    new THREE.Vector3(...data[0]),
	    new THREE.Vector3(...data[1])
	]);

    }

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

    var l1, l2;

    if ( ispy.use_line2 ) {

	l1 = new THREE.LineGeometry();
	l1.setPositions([...data[0], ...data[1]]);

	l2 = new THREE.LineGeometry();
	l2.setPositions([...data[2], ...data[3]]);

    } else {

	l1 = new THREE.BufferGeometry().setFromPoints([
	    new THREE.Vector3(...data[0]),
	    new THREE.Vector3(...data[1])
	]);

	l2 = new THREE.BufferGeometry().setFromPoints([
	    new THREE.Vector3(...data[2]),
	    new THREE.Vector3(...data[3])
	]);

    }
    
    return [l1,l2];

};

ispy.makeEvent = function(data) {
    /*
      "Event_V2": [["run", "int"],["event", "int"],["ls", "int"],["orbit", "int"],["bx", "int"],["time", "string"],["localtime", "string"]]
      for what we do here, Event_V1 is the same, i.e. we don't show localtime
    */
    let ei = data[0];
    const run = ei[0], event = ei[1], ls = ei[2], time = ei[5];
    
    let et = "CMS Experiment at the LHC, CERN<br>";
    et += "Data recorded: " + time + "</br>";
    et += "Run / Event / LS: " + run + " / " + event + " / " + ls + "</br>";
    
    $('#event-text').html(et);
    ei = $('#event-info');
    $('#display').append(ei);

};
