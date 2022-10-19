# iSpy WebGL
[![DOI](https://zenodo.org/badge/27218260.svg)](https://zenodo.org/badge/latestdoi/27218260)

[T McCauley 2017 J. Phys.: Conf. Ser. 898 072030](https://doi.org/10.1088/1742-6596/898/7/072030)

## What is this?

This is a browser-based event display for the <a href="http://cern.ch/cms" target="_blank">CMS experiment</a> at the LHC using [three.js](https://threejs.org/).

The "production" version is here:

[https://cern.ch/ispy-webgl](https://cern.ch/ispy-webgl)

and the development version is here:

[https://cern.ch/ispy-webgl-dev](https://cern.ch/ispy-webgl-dev)

For more information on the input data format and how to create files for the display:

[https://github.com/cms-outreach/ispy-analyzers](https://github.com/cms-outreach/ispy-analyzers)

Contributors: [F. Ali](https://github.com/9inpachi), [L. Barnard](https://github.com/lukebarnard), [M. Hategan](https://github.com/hategan), [S. Lee](https://github.com/SeungJunLee0), [C. Logrén](https://github.com/carpppa), [T. McCauley](https://github.com/tpmccauley), [P. Nguyen](https://github.com/phongn), [M. Saunby](https://github.com/msaunby)

<img src="https://github.com/cms-outreach/ispy-webgl/blob/master/graphics/ispy-webgl-screenshot-1.0.0.png"></img>

## Papers and talks

["WebGL and three.js in CMS"](https://tpmccauley.github.io/cms-webgl-cwp/#/) at the HEP Software Foundation Visualization Workshop, March 2017.

["iSpy WebGL: a browser-based event display for CMS using WebGL"](https://indico.cern.ch/event/570249/contributions/2450053/subcontributions/218722/attachments/1401904/2139981/mccauley-ispywebgl-hsf.pdf) at HEP Software Foundation Visualization Workshop, Jan 2017.

"A browser-based event display for the CMS Experiment at the LHC using WebGL", at CHEP 2016.
[paper](https://doi.org/10.1088/1742-6596/898/7/072030), [slides](https://indico.cern.ch/event/505613/contributions/2228350/attachments/1346680/2045130/Oral-v4-449.pdf), [highlight summary slide](https://indico.cern.ch/event/505613/contributions/2228350/attachments/1346680/2030787/Highlights-v0-449.pdf)

## Frequently asked questions

### WebGL?

"WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. WebGL does so by introducing an API that closely conforms to OpenGL ES 2.0 that can be used in HTML5 <canvas> elements. This conformance makes it possible for the API to take advantage of hardware graphics acceleration provided by the user's device." - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

"WebGL brings plugin-free 3D to the web, implemented right into the browser. Major browser vendors Apple (Safari), Google (Chrome), Microsoft (Edge), and Mozilla (Firefox) are members of the WebGL Working Group." - [Khronos Group](https://www.khronos.org/webgl/)

Can your browser use WebGL? Check [here](https://caniuse.com/#feat=webgl) or better yet click [here](https://get.webgl.org/).

### How do I run this application locally?

Clone this repository and in the `ispy-webgl/` directory run either `python -m http.server` (python3) or `python -m SimpleHTTPServer` (python2.7). Then go to `http://localhost:8000` in your browser.

### Does this run on a touch-screen like a tablet or phone?

Yes, it should. You will not have access to certain click events though.

### I've gotten the view into a "weird" state where I've lost sight of everything (so to speak). How do I recover?

You can either press the "Home" button to return to the original view or simply refresh the page and start again.

### How do I produce files for events I want to view?

More information is [here](https://github.com/cms-outreach/ispy-analyzers).

### When I "Print Image to File" I don't see the event information text or CMS logo. Why?

These elements are actually overlaid onto the image and aren't part of it. Therefore they aren't printed. If you want to
include these elements in an exported image see the next question.

### How do I make a nice publication-quality event display?

You can save an image using the "Print Image to File Button" which will output what you see in the 3D display window. Note that the CMS logo, text, and axis
are actually overlaid on top of the display so therefore aren't part of the image.

For this and for other reasons it's often better to take a screenshot. Easy enough, but it's often the details that matter.

Some tips:

* It helps to have a nice high-resolution display on which to work (this step is doing a lot of "heavy lifting" as it were)
* Enlarge your display window to be as large as it can go (given your screen aspect ratio). Since you're working with a browser that should be `Ctrl +`.
* Turn off the axes in the bottom left of the display (from the "Settings" button).
* The default black background is often better but in some cases a white background is preferred. This can be changed using the "Settings" button.
* Find the right combination of zoom level, rotation, and projection ("orthographic" or "perspective").
* Turn off/on different parts of the detector to provide some context and background. The event can often look like it's just there in the black void. The ECAL barrel is a nice one to have on by default. Also you can try some of the more complex geometries found via the "Import 3D Model" button. More on those [here](https://twiki.cern.ch/twiki/bin/view/CMSPublic/SketchUpCMS).

### How do I change the line thickness (i.e. make them thicker)?

The default thickness for lines is "1". To use better (thicker) defaults, unclick "Use pick-able" lines in the "Settings" menu and load your event. 

### How do I know what's been loaded in the event?

[Recall](https://github.com/cms-outreach/ispy-analyzers) that the `ig` file is a text-based zip archive. To see what's in it you can just unzip it and take a look.

Also, one of the advantages of a browser-based application is the JavaScript console.
In your browser look for a menu item called "Web developer" or "Developer tools" and open the console.
You should see it open in your browser and see some log information such as what's been loaded.

### How do I see the properties of the individual objects shown in the display?

When an event is loaded you can click on an object name under "Physics" in the list of objects. This will display the contents in the table view at the bottom. For example, if you click on "Global Muons (Reco)" you will see the muon information in the table, with a row for each muon. If you hover over the row, you should see its color change to gray. You should also see the color of the muon in the 3D display change as well.

Alternatively, you can hover over an object in the 3D display and its information will appear in the table with the row corresponding to this particular object highlighted. Sometimes objects are hard to select with the cursor in the 3D display so highlighting using the table as above may be preferred in this case.

### It would be nice to calculate invariant mass for selected objects. How do I do that?

You can select electrons and muons in the 3D display window and obtain an estimate for invariant mass. First, make sure in "Settings" that the "Use pick-able lines" is selected. This will make picking easier. If this option is not selected you may select it and re-load the event. The tracks should appear thinner than usual.

So, say that you have an event with four muons. To select it, hover over it and click. Its color should change to gray. To select another one, do the same. You should now have two muons colored gray. By pressing "M" you can display the invariant mass of the two muons. Now the two muons should have reverted to their original color. The four-vectors used to calculate invariant mass are cleared as well.

If you have selected an object and want to de-select it, click on it again and it will not be part of the invariant mass calculation. It's color will revert back to its original color.

**Note** The input for the display comes from the [CMSSW analyzers](https://github.com/cms-outreach/ispy-analyzers) which may be from different objects, the datasets may be from different reconstructions, or corrections have not been applied. Therefore the invariant mass values may not be exactly as expected from "official" results. Use the numbers here as guidance only.

### I see a lot of jets. How do I hide some of them?

Objects like particle flow jets can be hidden by hovering over them in the display (and the color will change to gray). Press `H` to hide the jet. Press `S` to show.
Note that the hidden objects are put in a list so hide and show are push and pop actions, respectively.

### How do I select event objects based on cuts?

Some objects (like jets, muons, electrons, and tracks) can be selected by transverse energy and momentum in the "tree view" which is the collapsible menu on the right. Select your object (like "Tracks (reco.)") and you will see a "min_pt" field. Enter a value and you should see the changes in the view.

You can select things upstream at the [analyzer step](https://github.com/cms-outreach/ispy-analyzers) just like you would for analysis code.

### How do I change the object colors and opacity?

These properties can be modified with the collapsible controls menu on the right.

### How do I explore and change the application in the console?

As stated above, one of the advantages of a browser-based application is the JavaScript console.
Everything in the display is part of an `ispy` object. What's shown in the 3D display window is part of the `ispy.scene`. If you type `ispy.scene.children` in the console you will see the objects that make up the scene. Many of them correspond to the categories shown in the "tree" view on the left column next to the 3d display: `ECAL`, `HCAL`, `Muon`, `Physics`, etc. For example:

<img src="https://github.com/cms-outreach/ispy-webgl/blob/master/graphics/console1.png"></img>

You can look at "Physics" by index:

<img src="https://github.com/cms-outreach/ispy-webgl/blob/master/graphics/console2.png"></img>

or get objects by name:

<img src="https://github.com/cms-outreach/ispy-webgl/blob/master/graphics/console3.png"></img>

Note that the console has some features of an IDE like auto-complete.

### Some quantities like jet and photon energy aren't the same as what I expect from my analysis code. Why?

The input for the display comes from the [CMSSW analyzers](https://github.com/cms-outreach/ispy-analyzers) which may be from different objects, the datasets may be from different reconstructions, or energy corrections have not been applied.

### How can I make and use some more complex geometries like [here](https://twiki.cern.ch/twiki/bin/view/CMSPublic/SketchUpCMS) and in the screenshot above?

Try the instructions found [here](https://github.com/SketchUpCMS/SketchUpCMS) to create a CMS geometry. Making something useful is a bit beyond the scope of this README but in SketchUp try exporting a geometry to `.obj` and `.mtl` and then load using the "Import 3D Model" button.

### How do I make an animation?

There is a default animation sequence that runs when you click the "Start/Stop Animation" button (or `Shift A`). If you want to capture it you can use any number of video capture programs like QuickTime (for Mac). There is a least one open issue on improvements for this (like how to improve saving the animation and how to customize the sequence).

You can also capture things when running after clicking the "Autorotate about Y axis" button.

### Who do I contact for questions/comments/praise/blame?
ispy-developers[at]cern.ch
