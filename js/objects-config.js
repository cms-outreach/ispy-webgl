

// Hmmm, IIRC objects are unordered. However, at least Chrome and Firefox fetch things in
// the reverse order than specified here. Therefore e.g. Tracker appears at the top of
// row of the tree view and CSC at the bottom. Which is what we want.

ispy.detector_description = {
  "RPCMinusEndcap3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (-)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "RPCPlusEndcap3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (+)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "RPCBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (barrel)",
    fn: ispy.makeRPC, style: {color: [0.6, 0.8, 0], opacity: 0.5, linewidth: 1}},
  "CSC3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers",
    fn: ispy.makeCSC, style: {color: [0.6, 0.7, 0.1], opacity: 0.5, linewidth: 1}},
  "DTs3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Drift Tubes",
    fn: ispy.makeDT, style: {color: [0.8, 0.4, 0], opacity: 0.5, linewidth: 1}},

  "HcalForwardMinus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: ispy.makeModelHcalForwardMinus, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardPlus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: ispy.makeModelHcalForwardPlus, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (-)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalForwardPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (+)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalOuter3D_MODEL": {type: ispy.MODEL, on: true, group: "Detector", name: "HCAL Outer",
    fn: ispy.makeModelHcalOuter, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalOuter3D_V1": {type: ispy.BOX, on: true, group: "Detector", name: "HCAL Outer",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Endcaps",
    fn: ispy.makeModelHcalEndcap, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalEndcapMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (-)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalEndcapPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (+)",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "HcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "HCAL Barrel",
    fn: ispy.makeModelHcalBarrel, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},
  "HcalBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "HCAL Barrel",
    fn: ispy.makeHcal, style: {color: [0.7, 0.7, 0], opacity: 0.5, linewidth: 1}},

  "EcalEndcapMinus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: ispy.makeModelEcalEndcapMinus, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalEndcapPlus3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: ispy.makeModelEcalEndcapPlus, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},
  "EcalBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "ECAL Barrel",
    fn: ispy.makeModelEcalBarrel, style: {color: [0.5, 0.8, 1], opacity: 0.3, linewidth: 0.5}},

  "EcalEndcapMinus3D_V1": {type: ispy.BUFFERBOX, on: false, group: "Detector", name: "ECAL Endcap (-)",
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.1, linewidth: 0.1}},
  "EcalEndcapPlus3D_V1": {type: ispy.BUFFERBOX, on: false, group: "Detector", name: "ECAL Endcap (+)",
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.1, linewidth: 0.1}},
  "EcalBarrel3D_V1": {type: ispy.BUFFERBOX, on: false, group: "Detector", name: "ECAL Barrel",
    fn: ispy.makeEcal, style: {color: [0.5, 0.8, 1], opacity: 0.1, linewidth: 0.1}},

  "TrackerEndcap3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Endcaps",
    fn: ispy.makeModelTrackerEndcap, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "TrackerBarrel3D_MODEL": {type: ispy.MODEL, on: false, group: "Detector", name: "Tracker Barrels",
    fn: ispy.makeModelTrackerBarrel, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},

  "SiStripTECMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "SiStripTECPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "SiStripTIDMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "SiStripTIDPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "SiStripTOB3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Outer Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "SiStripTIB3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},

  "PixelEndcapMinus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "PixelEndcapPlus3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}},
  "PixelBarrel3D_V1": {type: ispy.BOX, on: false, group: "Detector", name: "Pixel Barrel",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], altColor: [0.7, 0.7, 0],
    opacity: 0.5, linewidth: 1}}
};

ispy.event_description = {
  "EERecHits_V2": {type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Endcap Rec. Hits",
    fn: ispy.makeERecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, selection: {"min_energy": 0.5}},
  "ESRecHits_V2": {type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Preshower Rec. Hits",
    fn: ispy.makeERecHit_V2, style: {color: [1, 0.6, 0], opacity: 0.5, linewidth: 1}, scale: 100.0, selection: {"min_energy": 0.0005}},
  "EBRecHits_V2": {type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
    fn: ispy.makeERecHit_V2, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, scale: 0.05, selection: {"min_energy": 0.5}},

  "HGCEERecHits_V1": {type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
    fn: ispy.makeHGCRecHit, style: {color: [0.1, 1.0, 0.1], opacity: 0.5, linewidth: 1}, selection: {"min_energy": 0.01}},

  "HFRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
    fn: ispy.makeHRecHit_V2, style: {color: [0.6, 1, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 3.0}},
  "HORecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
    fn: ispy.makeHRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 1.0}},
  "HERecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
    fn: ispy.makeHRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 1.0}},
  "HBRecHits_V2": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
    fn: ispy.makeHRecHit_V2, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 1.0}},

  "HGCHEBRecHits_V1": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
    fn: ispy.makeHGCRecHit, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 0.01}},
  "HGCHEFRecHits_V1": {type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
    fn: ispy.makeHGCRecHit, style: {color: [0.2, 0.7, 1], opacity: 0.5, linewidth: 0.5}, selection: {"min_energy": 0.01}},

  "Tracks_V1": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 1, 0], altColor: [1, 0.5, 0], opacity: 0.9, lineCaps: "square", linewidth: 3},
    selection: {"min_pt": 0.5, index: 2}},
  "Tracks_V2": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 1, 0], altColor: [1, 0.5, 0], opacity: 0.9, lineCaps: "square", linewidth: 3},
    selection: {"min_pt": 0.5, "index": 2}},
  "Tracks_V3": {type: ispy.TRACK, on: true, group: "Tracking", name: "Tracks (reco.)",
    extra: "Extras_V1", assoc: "TrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 1, 0], altColor: [1, 0.5, 0], opacity: 0.9, lineCaps: "square", linewidth: 3},
    selection: {"min_pt": 0.5, "index": 2}},

  "TrackDets_V1": {type: ispy.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
    fn: ispy.makeTrackerPiece, style: {color: [1, 1, 0], opacity: 0.5, linewidth: 1}},
  "TrackingRecHits_V1": {type:ispy.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
    fn:ispy.makeTrackingRecHits, style: {color: [1, 1, 0], size: 0.05}},
  "SiStripClusters_V1": {type: ispy.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
    fn: ispy.makeTrackingClusters, style:{color: [0.8, 0.2, 0.0], size: 0.05}},
  "SiPixelClusters_V1": {type: ispy.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
    fn: ispy.makeTrackingClusters, style:{color: [1.0, 0.4, 0.0], size: 0.05}},

  "Event_V1":{type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}},
  "Event_V2":{type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}},

  "DTRecHits_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
    fn: ispy.makeDTRecHits, style: {color: [0, 1, 0], opacity: 0.5, linewidth: 2}},

  "DTRecSegment4D_V1": {type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
    fn: ispy.makeDTRecSegments, style: {color: [1, 1, 0, 1], opacity: 1.0, linewidth: 3}},

  "RPCRecHits_V1": {type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
    fn: ispy.makeRPCRecHits, style: {color: [0.8, 1, 0, 1], opacity: 1.0, linewidth: 3}},

  "CSCStripDigis_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
    fn: ispy.makeCSCStripDigis, style: {color: [1.0, 0.2, 1.0], opacity: 0.5, linewidth: 1}},
  "CSCWireDigis_V1": {type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
    fn: ispy.makeCSCWireDigis, style: {color: [1.0, 0.6, 1.0], opacity: 0.5, linewidth: 1}},

  "CSCLCTDigis_V1": {type: ispy.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
    fn: ispy.makeCSCLCTDigis, style: {color: [0.0, 1.0, 1.0], size: 0.15}},

  /* this only exists in my test file
   "MatchingCSCs_V1": {type: ispy.BOX, on: true, group: "Muon", name: "Matching CSCs",
   fn: ispy.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.3, linewidth: 2}},
   */

  "CSCRecHit2Ds_V2": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
    fn: ispy.makeCSCRecHit2Ds_V2, style: {color: [0.6, 1, 0.9, 1], opacity: 1.0, linewidth: 2}},
  "CSCSegments_V1": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], opacity: 1.0, linewidth: 3}},
  "CSCSegments_V2": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], opacity: 1.0, linewidth: 3}},
  "CSCSegments_V3": {type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
    fn: ispy.makeCSCSegments, style: {color: [1, 0.6, 1, 1], opacity: 1.0, linewidth: 3}},

  "MuonChambers_V1": {type: ispy.BOX, on: true, group: "Muon", name: "Matching muon chambers",
    fn: ispy.makeMuonChamber, style: {color: [1, 0, 0], opacity: 0.5, linewidth: 1}},

  "METs_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
    fn: ispy.makeMET, style: {color: [1, 0.5, 1], linewidth:4}, selection: {"min_pt": 10.0}},
  "Jets_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (Reco)",
    fn: ispy.makeJet, style: {color: [1, 1, 0], opacity: 0.3}, selection: {"min_et": 10.0}},
  "PFJets_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (PF)",
    fn: ispy.makeJet, style: {color: [1, 1, 0], opacity: 0.3}, selection: {"min_et": 10.0}},
  "GenJets_V1": {type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (Sim)",
    fn: ispy.makeJet, style: {color: [1, 0.75, 0], opacity: 0.8}, selection: {"min_et": 10.0}},
  "Photons_V1": {type: ispy.LINE, on: false, group: "Physics", name: "Photons (Reco)",
    fn: ispy.makePhoton, style: {color: [0.8, 0.8, 0], opacity: 1.0, linewidth: 2}},

  "GlobalMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics", name: "Global Muons (Reco)",
    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}, selection:{"min_pt":1.0, "index":0}},
  "StandaloneMuons_V1": {type: ispy.POLYLINE, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}, selection:{"min_pt":1.0, "index":0}},
  "StandaloneMuons_V2": {type: ispy.TRACK, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
    fn: ispy.makeTracks, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}, selection: {"min_pt":1.0, "index":0}},
  "TrackerMuons_V1": {type: ispy.POLYLINE, on: true, group: "Physics", name: "Tracker Muons (Reco)",
    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
    fn: ispy.makeTrackPoints, style: {color: [1, 0, 0], opacity: 1.0, linewidth: 3}, selection:{"min_pt":1.0, "index":0}},

  "GsfElectrons_V1": {type: ispy.TRACK, on: true, group: "Physics", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 3}, selection: {"min_pt":1.0, "index":0}},
  "GsfElectrons_V2": {type: ispy.TRACK, on: true, group: "Physics", name: "Electron Tracks (GSF)",
    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
    fn: ispy.makeTracks, style: {color: [0.1, 1.0, 0.1], opacity: 0.9, linewidth: 3}, selection: {"min_pt":1.0, "index":0}},

  "Vertices_V1": {type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (reco)",
    fn:ispy.makeVertex, style: {color: [1, 0.4, 0], opacity: 0.9}},
  "SimVertices_V1": {type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (sim)",
    fn:ispy.makeSimVertex, style: {color: [0.8, 0.2, 0], opacity: 0.9}}
};

ispy.disabled = [];

for (var key in ispy.detector_description) {
  if ( ! ispy.detector_description[key].on ) {
    ispy.disabled[key] = true;
  }
}

for (var key in ispy.event_description) {
  if ( ! ispy.event_description[key].on ) {
    ispy.disabled[key] = true;
  }
}

ispy.data_groups = ["Detector", "Imported", "Provenance", "Tracking", "ECAL", "HCAL", "Muon", "Physics"];
ispy.table_caption = '<caption>Click on a name under "Provenance", "Tracking", "ECAL", "HCAL", "Muon", and "Physics" to view contents in table</caption>';
