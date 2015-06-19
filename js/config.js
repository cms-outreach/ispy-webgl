var ispy = ispy || {};
ispy.detector = {"Collections":{}};
ispy.version = "0.9.3";

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

// Well, maybe these could be in objects config....
ispy.object_has_range = {
  "EERecHits_V2": true,
  "ESRecHits_V2": true,
  "EBRecHits_V2": true,

  "HFRecHits_V2": true,
  "HORecHits_V2": true,
  "HERecHits_V2": true,
  "HBRecHits_V2": true,

  "Tracks_V1": true,
  "Tracks_V2": true,
  "Tracks_V3": true,

  "TrackDets_V1": false,
  "TrackingRecHits_V1": false,
  "SiStripClusters_V1": false,
  "SiPixelClusters_V1": false,

  "Event_V1": false,
  "Event_V2": false,

  "DTRecHits_V1": false,

  "DTRecSegment4D_V1": false,

  "RPCRecHits_V1": false,

  "CSCStripDigis_V1": false,
  "CSCWireDigis_V1": false,

  /* this only exists in my test file
   "MatchingCSCs_V1": false,
   */

  "CSCRecHit2Ds_V2": false,
  "CSCSegments_V1": false,
  "CSCSegments_V2": false,
  "CSCSegments_V3": false,

  "MuonChambers_V1": false,

  "METs_V1": true,
  "Jets_V1": true,
  "Photons_V1": true,

  "GlobalMuons_V1": true,
  "StandaloneMuons_V1": true,
  "StandaloneMuons_V2": true,
  "TrackerMuons_V1": true,

  "GsfElectrons_V1": true,
  "GsfElectrons_V2": true
};