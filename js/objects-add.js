import {
    Object3D,
    Color,
    Line,
    LineBasicMaterial,
    LineSegments,
    MeshBasicMaterial,
    DoubleSide,
    Mesh,
    Points,
    PointsMaterial
} from "three";

import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { mergeBufferGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import {
    scene,
    scenes,
    camera,
    views,
    local_planes,
    use_line2,
    showView,
    current_view
} from "./setup.js";

import {
    detector_description,
    event_description,
    disabled,
    data_groups,
    table_caption
} from "./objects-config.js";

import { clearSubfolders, addSelectionRow } from "./tree-view.js";
import * as config from "./config.js";

let current_event, current_scene;

function addDetector() {

    for ( let key in detector_description ) {

	const data = detector.Collections[key];
	
	if ( ! data || data.length === 0 ) {
      
	    continue;
	
	}

	const descr = detector_description[key];

	// If something is already disabled via the toggle then this
	// should override what comes from the description
	// -- However it is not used in addSelectionRow()? - C
	const visible = ! disabled[key] ? descr.on = true : descr.on = false;
	addSelectionRow(descr.group, key, descr.name, [], visible);

	const obj = new Object3D();
	
	obj.name = key;
	obj.visible = visible;
	
	scene.getObjectByName(descr.group).add(obj);

	const ocolor = new Color(descr.style.color);
	//const transp = descr.style.opacity < 1.0 ? true : false;
	const transp = true; // Make true for all?
	
	switch(descr.type) {

	case config.BOX:

	    let box_material = new LineBasicMaterial({
		color:ocolor, 
		transparent: transp,
		linewidth:descr.style.linewidth, 
		depthWrite: false,
		opacity:descr.style.opacity,
		clippingPlanes: local_planes
	    });
	    
	    let box_geometries = [];
	    
	    for ( var i = 0; i < data.length; i++ ) {
	
		box_geometries.push(descr.fn(data[i]));
        
	    }
	    
	    let box = new LineSegments(
		mergeBufferGeometries(box_geometries),
		box_material
	    );
	    
	    box.name = key;
	    box.renderOrder = 1;
	    scene.getObjectByName(key).add(box);

	    break;

	case config.SOLIDBOX:

	    let solidbox_material = new MeshBasicMaterial({
		color:ocolor,
		transparent: transp,
		opacity:descr.style.opacity,
		depthTest: false,
		clippingPlanes: local_planes
	    });
        
	    solidbox_material.side = DoubleSide;

	    let boxes = [];
	    let lines = [];

	    for ( let i = 0; i < data.length; i++ ) {
		
		const bl = descr.fn(data[i]);
		
		if ( bl.length === 0 )
		    continue;

		boxes.push(bl[0]);
		lines.push(bl[1]);
        
	    }

	    let meshes = new Mesh(
		mergeBufferGeometries(boxes),
		solidbox_material
	    );

	    meshes.name = key;
	    meshes.renderOrder = 1;
	    scene.getObjectByName(key).add(meshes);

	    let line_material = new LineBasicMaterial({
		    color:0x000000,
		    transparent: false,
		    linewidth:1,
		    depthTest: false
		});

	    let line_mesh = new LineSegments(
		mergeBufferGeometries(lines),
		line_material
	    );

	    line_mesh.name = key;
	    scene.getObjectByName(key).add(line_mesh);

	    break;
	
	}
    
    }
    
};

function addToScene(event, view) {

    current_scene = scenes[view];

    // Remove data from scene
    data_groups.forEach(g => {

	current_scene.getObjectByName(g).children.length = 0;

    });
    
    for ( let key in event_description[view] ) {
	
	const data = event.Collections[key];
    
	if ( ! data || data.length === 0 )
	    continue;

	const descr = event_description[view][key];

	let extra = null;
	let assoc = null;

	if ( descr.extra ) {
	    
	    extra = event.Collections[descr.extra];
    
	}

	if ( descr.assoc ) {
	    
	    assoc = event.Associations[descr.assoc];

	    if ( ! assoc || assoc.length === 0 ) 
		continue;
	    
	}
	
	// objectIds contain the ids of 'Physics' THREE objects. Ids are
	// used when displaying event data in table-view so that we are
	// able to connect the data somehow with THREE objects.
	const objectIds = [];
	const visible = ! disabled[key] ? descr.on = true : descr.on = false;

	const obj = new Object3D();
	
	obj.name = key;
	obj.visible = visible;
	
	current_scene.getObjectByName(descr.group).add(obj);

	let ocolor = null;
	const transp = true;

	if ( descr.style.color !== undefined ) {
	    
	    ocolor = new Color();
	    ocolor.setStyle(descr.style.color);

	}

	const is_physics_obj = descr.group === 'Physics' ? true : false;
		
	switch(descr.type) {
	    
	case config.BOX:

	    const boxes = [];

	    for ( let i = 0; i < data.length; i++ ) {
		
		boxes.push(descr.fn(data[i]));

	    }

	    const line = new LineSegments(
		mergeBufferGeometries(boxes),
		new LineBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    linewidth:descr.style.linewidth,
		    opacity:descr.style.opacity
		})
	    );

	    line.name = key;
	    current_scene.getObjectByName(key).add(line);

	    break;

	case config.SOLIDBOX:
	    
	    const sboxes = [];
	    const slines = [];
	    
	    for ( let j = 0; j < data.length; j++ ) {
          
		let bl = descr.fn(data[j]);

		if ( bl.length === 1 ) {
		    sboxes.push(bl[0]);
		}
		
		if ( bl.length === 2 ) {
		    sboxes.push(bl[0]);
		    slines.push(bl[1]);
		}
        
	    }
	    
	    const solidbox_material = new MeshBasicMaterial({
		color:ocolor,
		transparent: transp,
		opacity:descr.style.opacity,
		depthTest: false,
		depthWrite: false
	    });
	    
	    solidbox_material.side = DoubleSide;
	    
	    const smeshes = new Mesh(
		mergeBufferGeometries(sboxes),
		solidbox_material
	    );

	    smeshes.name = key;
	    current_scene.getObjectByName(key).add(smeshes);

	    if ( slines.length > 0 ) {
	    
		const sline_material = new LineBasicMaterial({
                    color:0xcccccc,
                    transparent: false,
                    linewidth:1,
                    depthTest: false  
                });

		const sline_mesh = new LineSegments(
		    mergeBufferGeometries(slines),
		    sline_material
		);

		sline_mesh.name = key;    
		current_scene.getObjectByName(key).add(sline_mesh);

	    }
	    
	    break;

	case config.SCALEDSOLIDBOX:

	    const ss_boxes = [];
	    let maxEnergy = 0.0;

	    for ( let k = 0; k < data.length; k++ ) {

		let energy = data[k][0];
		
		if ( energy > maxEnergy )
		    maxEnergy = energy;
        
	    }

	    for ( let l = 0; l < data.length; l++ ) {
		
		descr.fn(data[l], ss_boxes, maxEnergy, descr.selection);
        
	    }

	    if ( ss_boxes.length > 0 ) {

		const ssb_material = new MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
		ssb_material.side = DoubleSide;
		
		const ssb_meshes = new Mesh(
		    mergeBufferGeometries(ss_boxes),
		    ssb_material
		);

		ssb_meshes.name = key;
		current_scene.getObjectByName(key).add(ssb_meshes);

	    }
		
	    break;

	case config.SCALEDSOLIDTOWER:

	    const sst_boxes = [];
	    let maxE = 0.0;
	    
	    for ( let ee = 0; ee < data.length; ee++ ) {

		let energy = data[ee][0];
		
		if ( energy > maxE )
		    maxE = energy;
        
	    }

	    for ( var m = 0; m < data.length; m++ ) {
          
		descr.fn(data[m], sst_boxes, maxE, descr.selection);
        
	    }

	    if ( sst_boxes.length > 0 ) {

		const sst_material = new MeshBasicMaterial({
		    color:ocolor, 
		    transparent: transp,
		    opacity:descr.style.opacity
		});
	    
		sst_material.side = DoubleSide;

		var sst_meshes = new Mesh(
		    mergeBufferGeometries(sst_boxes),
		    sst_material
		);
	    
		sst_meshes.name = key;
		current_scene.getObjectByName(key).add(sst_meshes);

	    }
	    
	    break;

	case config.STACKEDTOWER:
	    
	    const eboxes = [];
	    const hboxes = [];
	    
	    for ( let n = 0; n < data.length; n++ ) {

		descr.fn(data[n], eboxes, hboxes, descr.scale, descr.selection);

	    }

	    const ematerial = new MeshBasicMaterial({
		    color: new Color(descr.style.ecolor),
		    transparent: transp,
		    opacity: descr.style.opacity
		});

	    const hmaterial = new MeshBasicMaterial({
		    color: new Color(descr.style.hcolor),
                    transparent: transp,
                    opacity: descr.style.opacity
		});
	    
	    ematerial.side = DoubleSide;
	    hmaterial.side = DoubleSide;

	    const emeshes = new Mesh(
		mergeBufferGeometries(eboxes),
		ematerial
	    );
	    
	    const hmeshes = new Mesh(
		mergeBufferGeometries(hboxes),
		hmaterial
	    );

	    emeshes.name = key;
	    hmeshes.name = key;

	    if ( is_physics_obj && visible ) {
		
		emeshes.layers.enable(2);
		hmeshes.layers.enable(2);

	    }
	    
	    current_scene.getObjectByName(key).add(emeshes);
	    current_scene.getObjectByName(key).add(hmeshes);

	    break;

	case config.ASSOC:
	    
	    const objs = descr.fn(data, extra, assoc, descr.style, descr.selection);

	    if ( objs !== undefined ) {

		objs.forEach(function(obj, index) {
		    
		    // For event info we want each of the children to have the
		    // same name as the parent. this is so picking on an object works
		    obj.name = key;

		    if ( is_physics_obj && visible ) {

			obj.layers.enable(2);

		    }
		    
		    // originalIndex works as a link between the original
		    // data and THREE objects:
		    obj.userData.originalIndex = index;
		    objectIds.push(obj.id);
		    current_scene.getObjectByName(key).add(obj);
		    
		});
		
	    }
	    
	    break;

	case config.POINT:
	    
	    const points = new Points(
		descr.fn(data),
		new PointsMaterial({
		    color:ocolor, 
		    size:descr.style.size
		}));
	    
	    points.name = key;
	    current_scene.getObjectByName(key).add(points);
        
	    break;

	case config.SHAPE:

	    for ( let si = 0; si < data.length; si++ ) {
          
		const shape = descr.fn(data[si], descr.style, descr.selection);
          
		if ( shape !== null ) {
            
		    shape.name = key;

		    shape.traverse(function(s) {

			s.name = key;
			
			if ( is_physics_obj && visible ) {

			    s.layers.enable(2);

			}

		    });
		   		    
		    // originalIndex works as a link between the original
		    // data and THREE objects:
		    shape.userData.originalIndex = si;
		    objectIds.push(shape.id);
		    current_scene.getObjectByName(key).add(shape);
		
		}
        
	    }
	    
	    break;

	case config.LINE:
	    
	    for ( let li = 0; li < data.length; li++ ) {

		descr.fn(data[li]).forEach(function(g) {

		    if ( use_line2 ) {
		    
			const line2 = new Line2(g, new LineMaterial({
			    color:ocolor,
			    transparent:transp,
			    linewidth:descr.style.linewidth*0.001,
			    opacity:descr.style.opacity
			}));
            
			line2.name = key;
			line2.computeLineDistances();
            
			// originalIndex works as a link between the original
			// data and THREE objects:
		    
			line2.userData.originalIndex = li;
			objectIds.push(line2.id);
			current_scene.getObjectByName(key).add(line2);

		    } else {
			
			const line = new Line(g, new LineBasicMaterial({
			    color:ocolor,
			    transparent:transp,
			    opacity:descr.style.opacity
			}));

			line.name = key;
            
			// originalIndex works as a link between the original
			// data and THREE objects:
		    
			line.userData.originalIndex = li;
			objectIds.push(line.id);
			current_scene.getObjectByName(key).add(line);

		    }
			    
		});
	    
	    }
	    
	    break;
	
	case config.TEXT:

	    descr.fn(data);

	    break;
	    
	}

	// Everything in the event is part of the 3D view so we only have to add
	// the rows in the controls GUI when the view is 3D.
	// Properties will be changed over the 3 views and their corresponding scenes
	// in the same place in the controls GUI.
	if ( view === '3D' )
	    addSelectionRow(descr.group, key, descr.name, objectIds, visible);

    }

};

function addEvent(event) {

    console.log(camera.position);
    
    current_event = event;
    // Clear table from last event and show default caption
    $('#collection-table').empty();
    $('#collection-table').append(table_caption);

    // remove selectors for last event
    $("tr.Event").remove();

    // Clear the subfolders for event information in the treegui
    clearSubfolders();
    
    views.forEach(v => {

	addToScene(event, v);

    });

    console.log(current_view);
    showView(current_view);
    
};

export { current_event, addEvent };
