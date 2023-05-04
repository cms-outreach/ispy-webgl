import {
    animating,
    camera,
    scene,
    resetView
} from "./setup.js";

// This is particular to the sequence below:
// - Colliding bunch crossings
// - Zoom into position inside detector
// - Rotate around, turning off tracks halfway through rotation
// It will be nice to generalize all this but it's good-enough for now.
// This is reaching the limit of complexity with this setup. Use key frames!

const animation = {
    "collision": {
	"proton1": {
            "pi" : {x:0, y:0, z:200.0},
            "pf" : {x:0, y:0, z:-200.0}
	},
	"proton2": {
            "pi": {x:0, y:0, z:-200.0},
            "pf": {x:0, y:0, z:200.0}
	},
	"time": 2500,
	"before_objects": [ // What gets turned off/on before the collision
            {key:"BeamPipe", show:true},
            {key:"Tracks_V1", show:false},
            {key:"Tracks_V2", show:false},
            {key:"Tracks_V3", show:false},
            {key:"EERecHits_V2", show:false},
            {key:"EBRecHits_V2", show:false},
            {key:"HERecHits_V2", show:false},
            {key:"HBRecHits_V2", show:false},
            {key:"DTRecSegment4D_V1", show:false},
            {key:"RPCRecHits_V1", show:false},
            {key:"CSCRecHit2Ds_V2", show:false},
            {key:"CSCSegments_V1", show:false},
            {key:"CSCSegments_V2", show:false},
            {key:"CSCSegments_V3", show:false},
            {key:"GEMRecHits_V2", show:false},
            {key:"GEMSegments_V1", show:false},
            {key:"GEMSegments_V2", show:false},
            {key:"GEMSegments_V3", show:false},
            {key:"GEMDigis_V2", show:false},
            {key:"MuonChambers_V1", show:false},
            {key:"MatchingCSCs_V1",show:false},
            {key:"MatchingGEMs_V1",show:false},
            {key:"GlobalMuons_V1", show:false},
            {key:"TrackerMuons_V1", show:false},
            {key:"TrackerMuons_V2", show:false},
            {key:"GsfElectrons_V1", show:false},
            {key:"GsfElectrons_V2", show:false},
            {key:"PFJets_V1", show:false}
	],
	"after_objects": [ // What gets turned on/off after the collision
            {key:"Tracks_V1", show:true},
            {key:"Tracks_V2", show:true},
            {key:"Tracks_V3", show:true},
            {key:"EERecHits_V2", show:true},
            {key:"EBRecHits_V2", show:true},
            {key:"HERecHits_V2", show:true},
            {key:"HBRecHits_V2", show:true},
            {key:"DTRecSegment4D_V1", show:true},
            {key:"RPCRecHits_V1", show:true},
            {key:"CSCRecHit2Ds_V2", show:true},
            {key:"CSCSegments_V1", show:true},
            {key:"CSCSegments_V2", show:true},
            {key:"CSCSegments_V3", show:true},
            {key:"GEMRecHits_V2", show:true},
            {key:"GEMSegments_V1", show:true},
            {key:"GEMSegments_V2", show:true},
            {key:"GEMSegments_V3", show:true},
            {key:"GEMDigis_V2", show:true},
            {key:"MuonChambers_V1", show:true},
            {key:"GlobalMuons_V1", show:true},
            {key:"TrackerMuons_V2", show:true},
            {key:"PrimaryVertices", show:true}, 
            {key:"SecondaryVertices", show:true},
            {key:"GsfElectrons_V1", show:true},
            {key:"GsfElectrons_V2", show:true}, 
            {key:"PFJets_V1", show:false},
            {key:"BeamPipe", show:false}
	]
    },
    "zoom": {
	"time": 5000
    },
    // This rotation is actually split into two halves and the toggle
    // on objects happens at PI
    "rotation": {
	"radius": 2.0,
	"angle": 2*Math.PI,
	"nsteps": 24,
	"time": 5000,
	"objects": [ // What to turn on/off at the middle of the rotation
            {"group":"Tracking", "key":"Tracks_V1", "show":false},
            {"group":"Tracking", "key":"Tracks_V2", "show":false},
            {"group":"Tracking", "key":"Tracks_V3", "show":false}
	]
    }
};

export { animation };
