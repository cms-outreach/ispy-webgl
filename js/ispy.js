
$(function() {
  ispy.init();
  ispy.addGroups();
  ispy.initLight();
  ispy.initDetector();
  //ispy.importBeampipe();
  ispy.loadWebFiles('/static/node_modules/ispy-webgl/data/igfiles.json');
  ispy.run();

  console.log(ispy.event_description);
});
