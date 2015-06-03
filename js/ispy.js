var ispy = ispy || {};
ispy.detector = {"Collections":{}};
ispy.version = "0.9";

ispy.POINT = 0;
ispy.LINE = 1;
ispy.BOX = 2;
ispy.SOLIDBOX = 3;
ispy.SCALEDBOX = 4;
ispy.SCALEDSOLIDBOX = 5;
ispy.MODEL = 6;
ispy.TRACK = 7;
ispy.POLYLINE = 8;
ispy.SHAPE = 9;
ispy.TEXT = 10;

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