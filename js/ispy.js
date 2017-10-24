
$(function() {
  ispy.init();
  ispy.addGroups();
  ispy.initLight();
  ispy.initDetector();
  ispy.importBeampipe();
  ispy.loadWebFiles('./data/igfiles.json');
  ispy.run();

  console.log(ispy.event_description);
});
