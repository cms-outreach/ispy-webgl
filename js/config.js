var ispy = ispy || {};
ispy.detector = {"Collections":{}};
ispy.version = "0.9.2";

// These need to be defined before adding objects:
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

ispy.data_groups = ["Detector", "Imported", "Provenance", "Tracking", "ECAL", "HCAL", "Muon", "Physics"];
ispy.table_caption = '<caption>Click on a name under "Provenance", "Tracking", "ECAL", "HCAL", "Muon", and "Physics" to view contents in table</caption>';

// object_ids contains the ids of 'Physics' THREE objects. Ids are
// used when displaying event data in table-view so that we are
// able to connect the data somehow with THREE objects.
ispy.object_ids = {
  "METs_V1": [],
  "Jets_V1": [],
  "Photons_V1": [],
  "GlobalMuons_V1": [],
  "StandaloneMuons_V1": [],
  "StandaloneMuons_V2": [],
  "TrackerMuons_V1": [],
  "GsfElectrons_V1": [],
  "GsfElectrons_V2": []
};