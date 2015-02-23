ispy.toggleAnimation = function() {
  ispy.animating = !ispy.animating;

  if ( ispy.animating ) {

    var length = ispy.camera.position.length();
    var xs = [ispy.camera.position.x, 0];
    var ys = [0, 0];
    var zs = [ispy.camera.position.z, length];

    var tw1 = new TWEEN.Tween(ispy.camera.position)
      .to({x:xs, y:ys, z:zs}, 2000)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var r = 2.0;

    var tw2 = new TWEEN.Tween(ispy.camera.position)
      .to({x:0, y:0, z:r}, 2000)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var ns = 24;
    var s = 2*Math.PI/ns;
    var cx = [];
    var cy = [];
    var cz = [];
    for ( var i = 1; i <= ns; i++ ) {
      cx.push(r*Math.sin(s*i));
      cy.push(0.0);
      cz.push(r*Math.cos(s*i));
    }

    var c1x = cx.slice(0,12);
    var c1y = cy.slice(0,12);
    var c1z = cz.slice(0,12);

    var tw3 = new TWEEN.Tween(ispy.camera.position)
      .to({x:c1x, y:c1y, z:c1z}, 2500);

    // Split the rotation in half and
    // turn off tracks and turn on electrons

    var c2x = cx.slice(13,24);
    var c2y = cy.slice(13,24);
    var c2z = cz.slice(13,24);

    var tw4 = new TWEEN.Tween(ispy.camera.position)
      .to({x:c2x, y:c2y, z:c2z}, 2500)
      .onStart(function(){
        ispy.toggle("Tracking", "Tracks_V2");
        ispy.toggle("HCAL", "HBRecHits_V2");
        ispy.toggle("HCAL", "HERecHits_V2");
        ispy.toggle("PhysicsObjects", "GsfElectrons_V1");
      })

    var pgeometry = new THREE.SphereGeometry(0.25,32,32);
    var pmaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

    var proton1 = new THREE.Mesh(pgeometry, pmaterial);
    proton1.position.x = 0.0;
    proton1.position.y = 0.0;
    proton1.position.z = 200.0;

    var proton2 = new THREE.Mesh(pgeometry, pmaterial);
    proton2.position.x = 0.0;
    proton2.position.y = 0.0;
    proton2.position.z = -200.0;

    ispy.scene.add(proton1);
    ispy.scene.add(proton2);

    var c1 = new TWEEN.Tween(proton1.position)
      .to({z:0.0}, 2000)
      .easing(TWEEN.Easing.Back.In);

    var c2 = new TWEEN.Tween(proton2.position)
      .to({z:0.0}, 2000)
      .onComplete(function(){
        tw1.start();

        ispy.toggle("Tracking", "Tracks_V2");
        ispy.toggle("ECAL", "EBRecHits_V2");
        ispy.toggle("ECAL", "EERecHits_V2");
        ispy.toggle("HCAL", "HBRecHits_V2");
        ispy.toggle("HCAL", "HERecHits_V2");
      })
      .easing(TWEEN.Easing.Back.In);

    var c3 = new TWEEN.Tween(proton1.position)
      .to({z:-200.0}, 2000)
      .onComplete(function(){
        ispy.scene.remove(proton1);
      }).easing(TWEEN.Easing.Back.Out);

    var c4 = new TWEEN.Tween(proton2.position)
      .to({z:200.0}, 2000)
      .onComplete(function(){
        ispy.scene.remove(proton2);
      }).easing(TWEEN.Easing.Back.Out);

    c1.chain(c3);
    c2.chain(c4);

    tw1.chain(tw2);
    tw2.chain(tw3);
    tw3.chain(tw4);

    c1.start();
    c2.start();
  }
}
