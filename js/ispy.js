
$(function() {
  ispy.init();
  ispy.addGroups();
  ispy.initLight();
  ispy.initDetector();
  ispy.importBeampipe();
  ispy.run();

  // need to debug why this doesn't work
  // but standard table with bootstrap is not bad already
  //$('#collection-table').DataTable();
  //$('#collection-table').removeClass('display').addClass('table table-striped table-bordered');
});