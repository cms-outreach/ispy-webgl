ispy.toggleAnimation = function() {
  ispy.animating = !ispy.animating;

  if ( ispy.animating ) {

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
      .to({z:0}, 2000)
      .onComplete(function(){
        ispy.scene.remove(proton1);
      })
      .easing(TWEEN.Easing.Back.In);

    var c2 = new TWEEN.Tween(proton2.position)
      .to({z:0}, 2000)
      .onComplete(function(){
        ispy.scene.remove(proton2);

        ispy.toggle("Tracking", "Tracks_V2");
        ispy.toggle("ECAL", "EBRecHits_V2");
        ispy.toggle("ECAL", "EEecHits_V2");
        ispy.toggle("HCAL", "HBRecHits_V2");
        ispy.toggle("HCAL", "HEecHits_V2");

      })
      .easing(TWEEN.Easing.Back.In);

    var length = ispy.camera.position.length();
    var xs = [ispy.camera.position.x, 0];
    var ys = [0, 0];
    var zs = [ispy.camera.position.z, length];

    var tw1 = new TWEEN.Tween(ispy.camera.position)
      .to({x:xs, y:ys, z:zs}, 2000)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var tw2 = new TWEEN.Tween(ispy.camera.position)
      .to({x:0, y:0, z:2}, 2000)
      .easing(TWEEN.Easing.Sinusoidal.In);

    var cx = [2,0,-2,0];
    var cy = [0,0,0,0];
    var cz = [0,-2,0,2];

    var tw3 = new TWEEN.Tween(ispy.camera.position)
      .to({x:cx, y:cy, z:cz}, 5000)
      .easing(TWEEN.Easing.Sinusoidal.In);

    c1.chain(tw1);
    tw1.chain(tw2);
    tw2.chain(tw3);

    c1.start();
    c2.start();
  }
}
