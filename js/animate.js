// This is particular to the sequence below:
// - Colliding bunch crossings
// - Zoom into position inside detector
// - Rotate around, turning off tracks halfway through rotation
// It will be nice to generalize all this but it's good-enough for now.
// This is reaching the limit of complexity with this setup. Use key frames!

ispy.animation_script = {
    "collision": {
      "proton1": {
        "pi" : {x:0, y:0, z:200.0},
        "pf" : {x:0, y:0, z:-200.0}
      },
      "proton2": {
        "pi": {x:0, y:0, z:-200.0},
        "pf": {x:0, y:0, z:200.0}
      },
      "time": 2500,
      "before_objects": [ // What gets turned off/on before the collision
        {key:"BeamPipe", show:true},
        {key:"Tracks_V1", show:false},
        {key:"Tracks_V2", show:false},
        {key:"Tracks_V3", show:false},
        {key:"EERecHits_V2", show:false},
        {key:"EBRecHits_V2", show:false},
        {key:"HERecHits_V2", show:false},
        {key:"HBRecHits_V2", show:false},
        {key:"DTRecSegment4D_V1", show:false},
        {key:"RPCRecHits_V1", show:false},
        {key:"CSCRecHit2Ds_V2", show:false},
        {key:"CSCSegments_V1", show:false},
        {key:"CSCSegments_V2", show:false},
        {key:"CSCSegments_V3", show:false},
        {key:"GEMRecHits_V2", show:false},
        {key:"GEMSegments_V1", show:false},
        {key:"GEMSegments_V2", show:false},
        {key:"GEMSegments_V3", show:false},
        {key:"GEMDigis_V2", show:false},
        {key:"MuonChambers_V1", show:false},
        {key:"MatchingCSCs_V1",show:false},
        {key:"MatchingGEMs_V1",show:false},
        {key:"GlobalMuons_V1", show:false},
        {key:"TrackerMuons_V1", show:false},
        {key:"TrackerMuons_V2", show:false},
        {key:"GsfElectrons_V1", show:false},
        {key:"GsfElectrons_V2", show:false},
        {key:"PFJets_V1", show:false}
      ],
      "after_objects": [ // What gets turned on/off after the collision
        {key:"Tracks_V1", show:true},
        {key:"Tracks_V2", show:true},
        {key:"Tracks_V3", show:true},
        {key:"EERecHits_V2", show:true},
        {key:"EBRecHits_V2", show:true},
        {key:"HERecHits_V2", show:true},
        {key:"HBRecHits_V2", show:true},
        {key:"DTRecSegment4D_V1", show:true},
        {key:"RPCRecHits_V1", show:true},
        {key:"CSCRecHit2Ds_V2", show:true},
        {key:"CSCSegments_V1", show:true},
        {key:"CSCSegments_V2", show:true},
        {key:"CSCSegments_V3", show:true},
        {key:"GEMRecHits_V2", show:true},
        {key:"GEMSegments_V1", show:true},
        {key:"GEMSegments_V2", show:true},
        {key:"GEMSegments_V3", show:true},
        {key:"GEMDigis_V2", show:true},
        {key:"MuonChambers_V1", show:true},
        {key:"GlobalMuons_V1", show:true},
        {key:"TrackerMuons_V2", show:true},
        {key:"PrimaryVertices", show:true}, 
        {key:"SecondaryVertices", show:true},
        {key:"GsfElectrons_V1", show:true},
        {key:"GsfElectrons_V2", show:true}, 
        {key:"PFJets_V1", show:false},
        {key:"BeamPipe", show:false}
      ]
    },
    "zoom": {
      "time": 5000
    },
    // This rotation is actually split into two halves and the toggle
    // on objects happens at PI
    "rotation": {
      "radius": 2.0,
      "angle": 2*Math.PI,
      "nsteps": 24,
      "time": 5000,
      "objects": [ // What to turn on/off at the middle of the rotation
        {"group":"Tracking", "key":"Tracks_V1", "show":false},
        {"group":"Tracking", "key":"Tracks_V2", "show":false},
        {"group":"Tracking", "key":"Tracks_V3", "show":false}
      ]
    }
};

ispy.toggleAnimation = function() {
  ispy.animating = !ispy.animating;

  $('#animate').toggleClass('active');

  if ( ispy.animating ) {
    var animation = ispy.animation_script;
    ispy.resetControls();
    var home = ispy.camera.position;

    var length = ispy.camera.position.length();
    var xs = [ispy.camera.position.x, 0];
    var ys = [0, 0];
    var zs = [ispy.camera.position.z, length];

    var zoom1 = new TWEEN.Tween(ispy.camera.position)
      .to({x:xs, y:ys, z:zs}, animation.zoom.time)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var r = animation.rotation.radius;

    var zoom2 = new TWEEN.Tween(ispy.camera.position)
      .to({x:0, y:0, z:r}, animation.zoom.time)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var ns = animation.rotation.nsteps;
    var s = animation.rotation.angle/ns;
    var cx = [];
    var cy = [];
    var cz = [];
    for ( var i = 1; i <= ns; i++ ) {
      cx.push(r*Math.sin(s*i));
      cy.push(0.0);
      cz.push(r*Math.cos(s*i));
    }

    var bs = 0;
    var es = ns/2;

    var c1x = cx.slice(0,es);
    var c1y = cy.slice(0,es);
    var c1z = cz.slice(0,es);

    var rotation1 = new TWEEN.Tween(ispy.camera.position)
      .to({x:c1x, y:c1y, z:c1z}, animation.rotation.time);

    // Split the rotation in half and
    // turn off tracks and turn on electrons/muons/jets

    bs = ns/2 + 1;
    es = ns;

    var c2x = cx.slice(bs, es);
    var c2y = cy.slice(bs, es);
    var c2z = cz.slice(bs, es);

    var rotation2 = new TWEEN.Tween(ispy.camera.position)
      .to({x:c2x, y:c2y, z:c2z}, animation.rotation.time)
      .onStart(function(){
        animation.rotation.objects.forEach(function(o) {
          ispy.showObject(o.key, o.show);
        });
      });

    var zoom3 = new TWEEN.Tween(ispy.camera.position)
      .to({x:home.x, y:home.y, z:home.z}, 5000)
      .onComplete(function() {
        $('#animate').removeClass('active');
      })
      .easing(TWEEN.Easing.Sinusoidal.In);

    zoom3.delay(1000);

    var pgeometry = new THREE.SphereGeometry(0.25,32,32);
    var pmaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

    var proton1 = new THREE.Mesh(pgeometry, pmaterial);
    proton1.position.x = animation.collision.proton1.pi.x;
    proton1.position.y = animation.collision.proton1.pi.y;
    proton1.position.z = animation.collision.proton1.pi.z;

    var proton2 = new THREE.Mesh(pgeometry, pmaterial);
    proton2.position.x = animation.collision.proton2.pi.x;
    proton2.position.y = animation.collision.proton2.pi.y;
    proton2.position.z = animation.collision.proton2.pi.z;

    ispy.scene.add(proton1);
    ispy.scene.add(proton2);

    var c1 = new TWEEN.Tween(proton1.position)
      .to({z:0.0}, animation.collision.time)
      .onStart(function(){
        animation.collision.before_objects.forEach(function(o){
          ispy.showObject(o.key,o.show);
        });
      })
      .easing(TWEEN.Easing.Back.In);

    var c2 = new TWEEN.Tween(proton2.position)
      .to({z:0.0}, animation.collision.time)
      .onComplete(function(){
        zoom1.start();
          animation.collision.after_objects.forEach(function(o) {
            ispy.showObject(o.key, o.show);
          });
      })
      .easing(TWEEN.Easing.Back.In);

    var c3 = new TWEEN.Tween(proton1.position)
      .to({z:animation.collision.proton1.pf.z}, animation.collision.time)
      .onComplete(function(){
        ispy.scene.remove(proton1);
      }).easing(TWEEN.Easing.Back.Out);

    var c4 = new TWEEN.Tween(proton2.position)
      .to({z:animation.collision.proton2.pf.z}, animation.collision.time)
      .onComplete(function(){
        ispy.scene.remove(proton2);
      }).easing(TWEEN.Easing.Back.Out);

    c1.chain(c3);
    c2.chain(c4);

    zoom1.chain(zoom2);
    zoom2.chain(rotation1);
    rotation1.chain(rotation2);
    rotation2.chain(zoom3);

    c1.start();
    c2.start();
  }
};
