// Hmmm, IIRC objects are unordered. However, at least Chrome and Firefox fetch things in
// the reverse order than specified here. Therefore e.g. Tracker appears at the top of
// row of the tree view and CSC at the bottom. Which is what we want.

ispy.detector_description = {

    '3D': {
	
	"RPCMinusEndcap3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (-)",
	    fn: ispy.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.2, linewidth: 1.0}
	},
	"RPCPlusEndcap3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (+)",
	    fn: ispy.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.2, linewidth: 1.0}
	},
	"RPCBarrel3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (barrel)",
	    fn: ispy.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.2, linewidth: 1.0}
	},
	"GEMMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Gas Electron Multipliers (-)",
	    fn: ispy.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},
	"GEMPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Gas Electron Multipliers (+)",
	    fn: ispy.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	
	"CSC3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers",
	    fn: ispy.makeCSC, style: {color: "rgb(60%, 70%, 10%)", opacity: 0.2, linewidth: 1.0}
	},	
	"DTs3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Drift Tubes",
	    fn: ispy.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.2, linewidth: 1.0}
	},	
	"HcalForwardMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (-)",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.1, linewidth: 1.0}
	},
	"HcalForwardPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Forward (+)",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.1, linewidth: 1.0}
	},
	"HcalOuter3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Outer",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.04, linewidth: 1.0}
	},	
	"HcalEndcapMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (-)",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.01, linewidth: 1.0}
	},
	"HcalEndcapPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Endcap (+)",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.01, linewidth: 1.0}
	},	
	"HcalBarrel3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "HCAL Barrel",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.01, linewidth: 1.0}
	},
	"EcalEndcapMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "ECAL Endcap (-)",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.05, linewidth: 0.5}
	},
	"EcalEndcapPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "ECAL Endcap (+)",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.05, linewidth: 0.5}
	},	
	"EcalBarrel3D_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "ECAL Barrel",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.01, linewidth: 0.5}
	},
	"SiStripTECMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (-)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTECPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Endcap (+)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIDMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (-)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIDPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (+)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTOB3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Outer Barrel",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIB3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Tracker Inner Barrel",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapMinus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapPlus3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelBarrel3D_V1": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Barrel",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapMinus3D_V2": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapPlus3D_V2": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelBarrel3D_V2": {
	    type: ispy.BOX, on: false, group: "Detector", name: "Pixel Barrel",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	}

    },
    
    'RPhi': {

	"DTsRPhi_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "Drift Tubes RPhi",
	    fn: ispy.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalOuterRPhi_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Outer RPhi",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalBarrelRPhi_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Barrel RPhi",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"EcalBarrelRPhi_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "ECAL Barrel RPhi",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"TrackerRPhi_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name:"Tracker RPhi",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	
    },
    
    'RhoZ': {

	"GEMRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "Gas Electron Multipliers RZ",
	    fn: ispy.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	   
	"CSCRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "Cathode Strip Chambers RZ",
	    fn: ispy.makeCSC, style: {color: "rgb(60%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	
	"DTsRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "Drift Tubes RZ",
	    fn: ispy.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	   
	"HcalForwardRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Forward RZ",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalOuterRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Outer RZ",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalEndcapRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Endcap RZ",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalBarrelRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "HCAL Barrel RZ",
	    fn: ispy.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"EcalEndcapRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "ECAL Endcap RZ",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"EcalBarrelRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name: "ECAL Barrel RZ",
	    fn: ispy.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"TrackerRZ_V1": {
	    type: ispy.BOX, on: true, group: "Detector", name:"Tracker RZ",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	}

    }

};

ispy.event_description = {

    "3D": {

	"SuperClusters_V1": {
	    type: ispy.ASSOC, on: false, group: "ECAL", name: "SuperClusters",
	    extra: "RecHitFractions_V1", assoc: "SuperClusterRecHitFractions_V1",
	    fn: ispy.makeCaloClusters, style: {color: "rgb(100%, 20%, 0%)", opacity: 1.0}
	},
	"EEDigis_V1": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Endcap Digis",
	    fn: ispy.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.5}
	},
	"EBDigis_V1": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: ispy.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EERecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Endcap Rec. Hits",
	    fn: ispy.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.01, selection: {"min_energy": 0.5}
	},
	"ESRecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Preshower Rec. Hits",
	    fn: ispy.makeERecHit_V2, style: {color: "rgb(100%, 60%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 100.0, selection: {"min_energy": 0.0005}
	},
	"EBRecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HERecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HBRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: ispy.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type:ispy.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:ispy.makeTrackingRecHits, style: {color: "rgb(100%, 100%, 0%)", size: 0.05}
	},
	"SiStripClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: ispy.makeTrackingClusters, style:{color: "rgb(80%, 20%, 0%)", size: 0.05}
	},
	"SiPixelClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: ispy.makeTrackingClusters, style:{color: "rgb(100%, 40%, 0%)", size: 0.05}
	},
	"Event_V1":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V2":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V3":{
            type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: ispy.makeDTRecHits, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: ispy.makeDTRecSegments, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: ispy.makeRPCRecHits, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: ispy.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: ispy.makeGEMRecHits_V2, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: ispy.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: ispy.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: ispy.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"MatchingCSCs_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching CSCs",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%,0%,0%)", opacity: 0.1, linewidth: 1}
	},
	"CSCRecHit2Ds_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: ispy.makeCSCRecHit2Ds_V2, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"MuonChambers_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching muon chambers",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%, 0%, 0%)", opacity: 0.1, linewidth: 1}
	},
	"CaloTowers_V2":{
	    type: ispy.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: ispy.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (Reco)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJetWithVertex, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (Sim)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PAT)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: ispy.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: ispy.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"ForwardProtons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Forward Protons",
	    fn: ispy.makeProtons, style: {color: "rgb(0%, 100%, 100%)", opacity: 1.0},
	    selection: {}
	},
	"Vertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:ispy.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.001, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:ispy.makeVertexCompositeCandidate, style: {radius: 0.002, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:ispy.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}
	
    },
    
    "RPhi": {
	
	"SuperClusters_V1": {
	    type: ispy.ASSOC, on: false, group: "ECAL", name: "SuperClusters",
	    extra: "RecHitFractions_V1", assoc: "SuperClusterRecHitFractions_V1",
	    fn: ispy.makeCaloClusters, style: {color: "rgb(100%, 20%, 0%)", opacity: 1.0}
	},
	"EBDigis_V1": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: ispy.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EBRecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HBRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: ispy.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type:ispy.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:ispy.makeTrackingRecHits, style: {color: "rgb(100%, 100%, 0%)", size: 2}
	},
	"SiStripClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: ispy.makeTrackingClusters, style:{color: "rgb(80%, 20%, 0%)", size: 2}
	},
	"SiPixelClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: ispy.makeTrackingClusters, style:{color: "rgb(100%, 40%, 0%)", size: 2}
	},
	"Event_V1":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V2":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V3":{
            type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: ispy.makeDTRecHits, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: ispy.makeDTRecSegments, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: ispy.makeRPCRecHits, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: ispy.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: ispy.makeGEMRecHits_V2, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: ispy.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: ispy.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: ispy.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"MatchingCSCs_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching CSCs",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%,0%,0%)", opacity: 0.1, linewidth: 1}
	},
	"CSCRecHit2Ds_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: ispy.makeCSCRecHit2Ds_V2, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"MuonChambers_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching muon chambers",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%, 0%, 0%)", opacity: 0.1, linewidth: 1}
	},
	"CaloTowers_V2":{
	    type: ispy.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: ispy.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (Reco)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJetWithVertex, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (Sim)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Jets (PAT)",
	    fn: ispy.makeJet, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: ispy.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: ispy.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: ispy.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: ispy.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"Vertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:ispy.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.01, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.01, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:ispy.makeVertexCompositeCandidate, style: {radius: 0.02, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:ispy.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}
	
    },
    
    "RhoZ": {

	"EEDigis_V1": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Endcap Digis",
	    fn: ispy.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.5}
	},
	"EBDigis_V1": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: ispy.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EERecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Endcap Rec. Hits",
	    fn: ispy.makeERecHit_RZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.01, selection: {"min_energy": 0.5}
	},
	"ESRecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Preshower Rec. Hits",
	    fn: ispy.makeERecHit_RZ, style: {color: "rgb(100%, 60%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 100.0, selection: {"min_energy": 0.0005}
	},
	"EBRecHits_V2": {
	    type: ispy.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeERecHit_RZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Forward Rec. Hits",
	    fn: ispy.makeHRecHit_RZ, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Outer Rec. Hits",
	    fn: ispy.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HERecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
	    fn: ispy.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HBRecHits_V2": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: ispy.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: ispy.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: ispy.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: ispy.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: ispy.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: ispy.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type:ispy.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:ispy.makeTrackingRecHitsRZ, style: {color: "rgb(100%, 100%, 0%)", size: 2}
	},
	"SiStripClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: ispy.makeTrackingClustersRZ, style:{color: "rgb(80%, 20%, 0%)", size: 2}
	},
	"SiPixelClusters_V1": {
	    type: ispy.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: ispy.makeTrackingClustersRZ, style:{color: "rgb(100%, 40%, 0%)", size: 2}
	},
	"Event_V1":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V2":{
	    type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"Event_V3":{
            type: ispy.TEXT, on: true, group: "Provenance", name: "Event", fn: ispy.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: ispy.makeDTRecHitsRZ, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: ispy.makeDTRecSegmentsRZ, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: ispy.makeRPCRecHitsRZ, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: ispy.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: ispy.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: ispy.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: ispy.makeGEMRecHitsRZ, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: ispy.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: ispy.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: ispy.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: ispy.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: ispy.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: ispy.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: ispy.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"CSCRecHit2Ds_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: ispy.makeCSCRecHit2DsRZ, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: ispy.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: ispy.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CaloTowers_V2":{
	    type: ispy.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: ispy.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: ispy.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (Reco)",
	    fn: ispy.makeJetRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJetRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: ispy.makeJetWithVertexRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (Sim)",
	    fn: ispy.makeJetRZ, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: ispy.SHAPE, on: true, group: "Physics", name: "Jets (PAT)",
	    fn: ispy.makeJetRZ, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: ispy.makePhotonRZ, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: ispy.makePhotonRZ, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: ispy.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: ispy.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: ispy.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: ispy.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: ispy.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: ispy.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"ForwardProtons_V1": {
	    type: ispy.SHAPE, on: false, group: "Physics", name: "Forward Protons",
	    fn: ispy.makeProtons, style: {color: "rgb(0%, 100%, 100%)", opacity: 1.0},
	    selection: {}
	},
	"Vertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:ispy.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.01, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:ispy.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:ispy.makeVertex, style: {radius: 0.01, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:ispy.makeVertexCompositeCandidate, style: {radius: 0.02, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:ispy.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:ispy.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}

    }

};

ispy.disabled = [];

for ( let view in ispy.detector_description ) {

    for ( let key in ispy.detector_description[view] ) {

	if ( ! ispy.detector_description[view][key].on ) {
	
	    ispy.disabled[key] = true;
  
	}

    }
    
}

for ( let view in ispy.event_description ) {

    for ( let key in ispy.event_description[view] ) {
    
	if ( ! ispy.event_description[view][key].on ) {
	
	    ispy.disabled[key] = true;
  
	}

    }

}

ispy.data_groups = [
    "Provenance",
    "Tracking",
    "ECAL",
    "HCAL",
    "Muon",
    "Physics"
];

ispy.table_caption = '<caption>Click on a name under "Provenance", "Tracking", "ECAL", "HCAL", "Muon", and "Physics" to view contents in table</caption>';
