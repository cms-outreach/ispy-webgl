
$(function() {
    ispy.init();
    ispy.addGroups();
    ispy.initLight();
    ispy.initDetector();
    //ispy.importBeampipe();
    ispy.loadWebFiles();
    ispy.run();

    console.log(ispy.event_description);
});
