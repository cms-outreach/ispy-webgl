import * as config from "./config.js";
import * as draw from "./objects-draw.js";

const detector_description = {

    '3D': {
	
	"RPCMinusEndcap3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (-)",
	    fn: draw.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"RPCPlusEndcap3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (+)",
	    fn: draw.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"RPCBarrel3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Resistive Plate Chambers (barrel)",
	    fn: draw.makeRPC, style: {color: "rgb(60%, 80%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"GEMMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Gas Electron Multipliers (-)",
	    fn: draw.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},
	"GEMPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Gas Electron Multipliers (+)",
	    fn: draw.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	
	"CSC3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Cathode Strip Chambers",
	    fn: draw.makeCSC, style: {color: "rgb(60%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	
	"DTs3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Drift Tubes",
	    fn: draw.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalForwardMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Forward (-)",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalForwardPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Forward (+)",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalOuter3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Outer",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalEndcapMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Endcap (-)",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalEndcapPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Endcap (+)",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalBarrel3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "HCAL Barrel",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"EcalEndcapMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "ECAL Endcap (-)",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.1, linewidth: 0.5}
	},
	"EcalEndcapPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "ECAL Endcap (+)",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.1, linewidth: 0.5}
	},	
	"EcalBarrel3D_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "ECAL Barrel",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.01, linewidth: 0.5}
	},
	"SiStripTECMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Endcap (-)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTECPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Endcap (+)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIDMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (-)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIDPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Inner Detector (+)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTOB3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Outer Barrel",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"SiStripTIB3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Tracker Inner Barrel",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapMinus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapPlus3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelBarrel3D_V1": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Barrel",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapMinus3D_V2": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Endcap (-)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelEndcapPlus3D_V2": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Endcap (+)",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"PixelBarrel3D_V2": {
	    type: config.BOX, on: false, group: "Detector", name: "Pixel Barrel",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	}

    },
    
    'RPhi': {

	"DTsRPhi_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "Drift Tubes RPhi",
	    fn: draw.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalOuterRPhi_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Outer RPhi",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalBarrelRPhi_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Barrel RPhi",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"EcalBarrelRPhi_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "ECAL Barrel RPhi",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"TrackerRPhi_V1": {
	    type: config.BOX, on: true, group: "Detector", name:"Tracker RPhi",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	
    },
    
    'RhoZ': {

	"GEMRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "Gas Electron Multipliers RZ",
	    fn: draw.makeGEM, style: {color: "rgb(30%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	   
	"CSCRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "Cathode Strip Chambers RZ",
	    fn: draw.makeCSC, style: {color: "rgb(60%, 70%, 10%)", opacity: 0.5, linewidth: 1.0}
	},	
	"DTsRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "Drift Tubes RZ",
	    fn: draw.makeDT, style: {color: "rgb(80%, 40%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	   
	"HcalForwardRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Forward RZ",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalOuterRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Outer RZ",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},
	"HcalEndcapRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Endcap RZ",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"HcalBarrelRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "HCAL Barrel RZ",
	    fn: draw.makeHcal, style: {color: "rgb(70%, 70%, 0%)", opacity: 0.5, linewidth: 1.0}
	},	
	"EcalEndcapRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "ECAL Endcap RZ",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"EcalBarrelRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name: "ECAL Barrel RZ",
	    fn: draw.makeEcal, style: {color: "rgb(50%, 80%, 100%)", opacity: 0.75, linewidth: 1.0}
	},
	"TrackerRZ_V1": {
	    type: config.BOX, on: true, group: "Detector", name:"Tracker RZ",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 1.0}
	}

    }

};

const event_description = {

    "3D": {

	"SuperClusters_V1": {
	    type: config.ASSOC, on: false, group: "ECAL", name: "SuperClusters",
	    extra: "RecHitFractions_V1", assoc: "SuperClusterRecHitFractions_V1",
	    fn: draw.makeCaloClusters, style: {color: "rgb(100%, 20%, 0%)", opacity: 1.0}
	},
	"EEDigis_V1": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Endcap Digis",
	    fn: draw.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.5}
	},
	"EBDigis_V1": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: draw.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EERecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Endcap Rec. Hits",
	    fn: draw.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.01, selection: {"min_energy": 0.5}
	},
	"ESRecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Preshower Rec. Hits",
	    fn: draw.makeERecHit_V2, style: {color: "rgb(100%, 60%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 100.0, selection: {"min_energy": 0.0005}
	},
	"EBRecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: draw.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HERecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HBRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: config.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:draw.makeTrackingRecHits, style: {color: "rgb(100%, 100%, 0%)", size: 0.05}
	},
	"SiStripClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: draw.makeTrackingClusters, style:{color: "rgb(80%, 20%, 0%)", size: 0.05}
	},
	"SiPixelClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: draw.makeTrackingClusters, style:{color: "rgb(100%, 40%, 0%)", size: 0.05}
	},
	"Event_V1":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V2":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V3":{
            type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: draw.makeDTRecHits, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: draw.makeDTRecSegments, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: draw.makeRPCRecHits, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: draw.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: draw.makeGEMRecHits_V2, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: config.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: draw.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: draw.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"MatchingCSCs_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching CSCs",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%,0%,0%)", opacity: 0.1, linewidth: 1}
	},
	"CSCRecHit2Ds_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: draw.makeCSCRecHit2Ds_V2, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"MuonChambers_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching muon chambers",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%, 0%, 0%)", opacity: 0.1, linewidth: 1}
	},
	"CaloTowers_V2":{
	    type: config.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: draw.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (Reco)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJetWithVertex, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (Sim)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PAT)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: draw.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: draw.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"ForwardProtons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Forward Protons",
	    fn: draw.makeProtons, style: {color: "rgb(0%, 100%, 100%)", opacity: 1.0},
	    selection: {}
	},
	"Vertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:draw.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.001, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:draw.makeVertexCompositeCandidate, style: {radius: 0.002, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:draw.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}
	
    },
    
    "RPhi": {
	
	"SuperClusters_V1": {
	    type: config.ASSOC, on: false, group: "ECAL", name: "SuperClusters",
	    extra: "RecHitFractions_V1", assoc: "SuperClusterRecHitFractions_V1",
	    fn: draw.makeCaloClusters, style: {color: "rgb(100%, 20%, 0%)", opacity: 1.0}
	},
	"EBDigis_V1": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: draw.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EBRecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: draw.makeERecHit_V2, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Forward Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: false, group: "HCAL", name: "Outer Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HBRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: draw.makeHRecHit_V2, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: config.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:draw.makeTrackingRecHits, style: {color: "rgb(100%, 100%, 0%)", size: 2}
	},
	"SiStripClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: draw.makeTrackingClusters, style:{color: "rgb(80%, 20%, 0%)", size: 2}
	},
	"SiPixelClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: draw.makeTrackingClusters, style:{color: "rgb(100%, 40%, 0%)", size: 2}
	},
	"Event_V1":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V2":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V3":{
            type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: draw.makeDTRecHits, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: draw.makeDTRecSegments, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: draw.makeRPCRecHits, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: draw.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: draw.makeGEMRecHits_V2, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: config.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: draw.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: draw.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"MatchingCSCs_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching CSCs",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%,0%,0%)", opacity: 0.1, linewidth: 1}
	},
	"CSCRecHit2Ds_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: draw.makeCSCRecHit2Ds_V2, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegments, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"MuonChambers_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching muon chambers",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%, 0%, 0%)", opacity: 0.1, linewidth: 1}
	},
	"CaloTowers_V2":{
	    type: config.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: draw.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (Reco)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJetWithVertex, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (Sim)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Jets (PAT)",
	    fn: draw.makeJet, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: draw.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: draw.makePhoton, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: draw.makeTrackPoints, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracks, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: draw.makeThickTracks, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"Vertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:draw.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.01, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.01, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:draw.makeVertexCompositeCandidate, style: {radius: 0.02, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:draw.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}
	
    },
    
    "RhoZ": {

	"EEDigis_V1": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Endcap Digis",
	    fn: draw.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.5}
	},
	"EBDigis_V1": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Barrel Digis",
	    fn: draw.makeEcalDigi, style: {color: "rgb(100%, 20%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 1.0, selection: {"min_energy": 0.25}
	},
	"EERecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Endcap Rec. Hits",
	    fn: draw.makeERecHit_RZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.01, selection: {"min_energy": 0.5}
	},
	"ESRecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: false, group: "ECAL", name: "Preshower Rec. Hits",
	    fn: draw.makeERecHit_RZ, style: {color: "rgb(100%, 60%, 0%)", opacity: 0.5, linewidth: 0.5},
	    scale: 100.0, selection: {"min_energy": 0.0005}
	},
	"EBRecHits_V2": {
	    type: config.SCALEDSOLIDTOWER, on: true, group: "ECAL", name: "Barrel Rec. Hits",
	    fn: draw.makeERecHit_RZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.5},
	    scale: 0.1, selection: {"min_energy": 0.25}
	},
	"HGCEERecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "ECAL", name: "HGC EE Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HFRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Forward Rec. Hits",
	    fn: draw.makeHRecHit_RZ, style: {color: "rgb(60%, 100%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HORecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Outer Rec. Hits",
	    fn: draw.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 1.0}
	},
	"HERecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Endcap Rec. Hits",
	    fn: draw.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HBRecHits_V2": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "Barrel Rec. Hits",
	    fn: draw.makeHRecHit_RZ, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.0}
	},
	"HGCHEBRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Back Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"HGCHEFRecHits_V1": {
	    type: config.SCALEDSOLIDBOX, on: true, group: "HCAL", name: "HGC HE Front Rec. Hits",
	    fn: draw.makeHGCRecHit, style: {color: "rgb(20%, 70%, 100%)", opacity: 0.5, linewidth: 0.25},
	    selection: {"min_energy": 0.01}
	},
	"Tracks_V1": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, index: 2}
	},
	"Tracks_V2": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V3": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"Tracks_V4": {
	    type: config.ASSOC, on: true, group: "Tracking", name: "Tracks (reco.)",
	    extra: "Extras_V1", assoc: "TrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 100%, 0%)",
					 opacity: 0.5, lineCaps: "square", linewidth: 1},
	    selection: {"min_pt": 1.0, "index": 2}
	},
	"TrackDets_V1": {
	    type: config.BOX, on: false, group: "Tracking", name: "Matching Tracker Dets",
	    fn: draw.makeTrackerPiece, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.5, linewidth: 0.5}
	},
	"TrackingRecHits_V1": {
	    type:config.POINT, on:false, group:"Tracking", name: "Tracking Rec Hits",
	    fn:draw.makeTrackingRecHitsRZ, style: {color: "rgb(100%, 100%, 0%)", size: 2}
	},
	"SiStripClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Strip Clusters",
	    fn: draw.makeTrackingClustersRZ, style:{color: "rgb(80%, 20%, 0%)", size: 2}
	},
	"SiPixelClusters_V1": {
	    type: config.POINT, on:false, group:"Tracking", name: "Si Pixel Clusters",
	    fn: draw.makeTrackingClustersRZ, style:{color: "rgb(100%, 40%, 0%)", size: 2}
	},
	"Event_V1":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V2":{
	    type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"Event_V3":{
            type: config.TEXT, on: true, group: "Provenance", name: "Event", fn: draw.makeEvent, style: {}
	},
	"DTRecHits_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "DT Rec. Hits",
	    fn: draw.makeDTRecHitsRZ, style: {color: "rgb(0%, 100%, 0%)", opacity: 0.5, linewidth: 1}
	},
	"DTRecSegment4D_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "DT Rec. Segments (4D)",
	    fn: draw.makeDTRecSegmentsRZ, style: {color: "rgb(100%, 100%, 0%)",
						opacity: 1.0, linewidth: 1.5}
	},
	"RPCRecHits_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "RPC Rec. Hits",
	    fn: draw.makeRPCRecHitsRZ, style: {color: "rgb(80%, 100%, 0%)",
					     opacity: 1.0, linewidth: 1.5}
	},
	"MatchingGEMs_V1": {
	    type: config.SOLIDBOX, on: true, group: "Muon", name: "Matching GEMs",
	    fn: draw.makeMuonChamber, style: {color: "rgb(100%,0%,10%)", opacity: 0.1, linewidth: 1}
	},
	"GEMDigis_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Strip Digis",
	    fn: draw.makeGEMDigis_V2, style: {color: "rgb(100%, 10%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"GEMRecHits_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Rec. Hits (2D)",
	    fn: draw.makeGEMRecHitsRZ, style: {color: "rgb(60%, 100%, 70%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"GEMSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "GEM Segments",
	    fn: draw.makeGEMSegments_V2, style: {color: "rgb(100%, 70%, 100%)", opacity: 1.0, linewidth: 1}
	},
	"CSCStripDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCStripDigis, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCWireDigis_V1": {
	    type: config.SOLIDBOX, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCWireDigis, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCStripDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Strip Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 20%, 100%)", opacity: 0.8, linewidth: 1}
	},
	"CSCWireDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Wire Digis",
	    fn: draw.makeCSCDigis_V2, style: {color: "rgb(100%, 60%, 100%)", opacity: 0.5, linewidth: 1}
	},
	"CSCLCTDigis_V1": {
	    type: config.POINT, on: false, group: "Muon", name: "CSC LCT Digis",
	    fn: draw.makeCSCLCTDigis, style: {color: "rgb(0%, 100%, 100%)", size: 0.15}
	},
	"CSCCorrelatedLCTDigis_V2": {
	    type: config.LINE, on: false, group: "Muon", name: "CSC Correlated LCT Digis",
	    fn: draw.makeCSCLCTCorrelatedLCTDigis, style: {color: "rgb(0%,100%,100%)", opacity:0.8, linewidth: 2}
	},
	"CSCRecHit2Ds_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Rec. Hits (2D)",
	    fn: draw.makeCSCRecHit2DsRZ, style: {color: "rgb(60%, 100%, 90%)", opacity: 1.0, linewidth: 1}
	},
	"CSCSegments_V1": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V2": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CSCSegments_V3": {
	    type: config.LINE, on: true, group: "Muon", name: "CSC Segments",
	    fn: draw.makeCSCSegmentsRZ, style: {color: "rgb(100%, 60%, 100%)", opacity: 1.0, linewidth: 1.5}
	},
	"CaloTowers_V2":{
	    type: config.STACKEDTOWER, on: false, group: "Physics", name: "Calo Towers",
	    fn: draw.makeCaloTower, style: {ecolor: "rgb(100%, 0%, 0%)", hcolor: "rgb(0%, 0%, 100%)", opacity: 0.5, linewidth: 1.0}, 
	    scale: 0.1, selection: {"min_energy": 0.1}
	},
	"METs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (Reco)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PFMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PF)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"PATMETs_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Missing Et (PAT)",
	    fn: draw.makeMET, style: {color: "rgb(100%, 50%, 100%)", linewidth:2, scale: 0.025}, selection: {"min_pt": 0.0}
	},
	"Jets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (Reco)",
	    fn: draw.makeJetRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.75}, selection: {"min_et": 10.0}
	},
	"PFJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJetRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"PFJets_V2": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PF)",
	    fn: draw.makeJetWithVertexRZ, style: {color: "rgb(100%, 100%, 0%)", opacity: 0.6},
	    selection: {"min_et": 10.0}, cuts: true
	},
	"GenJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (Sim)",
	    fn: draw.makeJetRZ, style: {color: "rgb(100%, 75%, 0%)", opacity: 0.8}, selection: {"min_et": 10.0}
	},
	"PATJets_V1": {
	    type: config.SHAPE, on: true, group: "Physics", name: "Jets (PAT)",
	    fn: draw.makeJetRZ, style: {color: "rgb(100%, 50%, 0%)", opacity: 0.3}, selection: {"min_et": 10.0}
	},
	"Photons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (Reco)",
	    fn: draw.makePhotonRZ, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy": 10.0}
	},
	"PATPhotons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Photons (PAT)",
	    fn: draw.makePhotonRZ, style: {color: "rgb(100%, 80%, 0%)", opacity: 1.0, linewidth: 2}, selection: {"min_energy":10.0}
	},
	"GlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GlobalMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonGlobalPoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATGlobalMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Global Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonGlobalPoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},    
	"StandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonStandalonePoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 3},
	    selection:{"min_pt":1.0, "index":0}
	},
	"StandaloneMuons_V2": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (Reco)",
	    extra: "Extras_V1", assoc: "MuonTrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATStandaloneMuons_V1": {
	    type: config.ASSOC, on: false, group: "Physics", name: "Stand-alone Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection: {"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
	    extra: "Points_V1", assoc: "MuonTrackerPoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"TrackerMuons_V2": {
            type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (Reco)",
            extra: "Extras_V1", assoc: "MuonTrackerExtras_V1",
            fn: draw.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Points_V1", assoc: "PATMuonTrackerPoints_V1",
	    fn: draw.makeTrackPointsRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"PATTrackerMuons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Tracker Muons (PAT)",
	    extra: "Extras_V1", assoc: "PATMuonTrackExtras_V1",
	    fn: draw.makeTracksRZ, style: {color: "rgb(100%, 0%, 0%)", opacity: 1.0, linewidth: 1},
	    selection:{"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V2": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"GsfElectrons_V3": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (GSF)",
	    extra: "Extras_V1", assoc: "GsfElectronExtras_V1",
	    fn: draw.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 1, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"PATElectrons_V1": {
	    type: config.ASSOC, on: true, group: "Physics", name: "Electron Tracks (PAT)",
	    extra: "Extras_V1", assoc: "PATElectronExtras_V1",
	    fn: draw.makeThickTracksRZ, style: {color: "rgb(10%, 100%, 10%)", opacity: 0.9, linewidth: 3},
	    selection: {"min_pt":1.0, "index":0}
	},
	"ForwardProtons_V1": {
	    type: config.SHAPE, on: false, group: "Physics", name: "Forward Protons",
	    fn: draw.makeProtons, style: {color: "rgb(0%, 100%, 100%)", opacity: 1.0},
	    selection: {}
	},
	"Vertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Reco)",
	    fn:draw.makeVertex, style: {radius: 0.001, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"PrimaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Primary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.01, color: "rgb(100%, 100%, 0%)", opacity: 0.9}
	},
	"SecondaryVertices_V1": {
            type:config.SHAPE, on:false, group:"Physics", name: "Secondary Vertices (Reco)",
            fn:draw.makeVertex, style: {radius: 0.01, color: "rgb(100%, 40%, 0%)", opacity: 0.9}
	},
	"VertexCompositeCandidates_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "V0Vertices (Reco)",
	    fn:draw.makeVertexCompositeCandidate, style: {radius: 0.02, color: "rgb(100%, 0%, 0%)", opacity: 0.9}
	},
	"SimVertices_V1": {
	    type:config.SHAPE, on:false, group:"Physics", name: "Vertices (Sim)",
	    fn:draw.makeSimVertex, style: {color: "rgb(80%, 20%, 0%)", opacity: 0.9}
	}

    }

};

const disabled = [];

for ( let view in detector_description ) {

    for ( let key in detector_description[view] ) {

	if ( ! detector_description[view][key].on ) {
	
	    disabled[key] = true;
  
	}

    }
    
}

for ( let view in event_description ) {

    for ( let key in event_description[view] ) {
    
	if ( ! event_description[view][key].on ) {
	
	    disabled[key] = true;
  
	}

    }

}

const data_groups = [
    "Provenance",
    "Tracking",
    "ECAL",
    "HCAL",
    "Muon",
    "Physics"
];

const table_caption = '<caption>Click on a name under "Provenance", "Tracking", "ECAL", "HCAL", "Muon", and "Physics" to view contents in table</caption>';

export { detector_description, event_description, disabled, data_groups, table_caption };
