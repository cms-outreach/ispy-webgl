import ispy from './ispy-state.js';

document.addEventListener('DOMContentLoaded', function() {

    ispy.init();
    ispy.addGroups();
    ispy.initLight();
    ispy.initDetector();
    ispy.loadWebFiles();
    ispy.renderer.setAnimationLoop(ispy.run);

    console.log(ispy.event_description);

});
