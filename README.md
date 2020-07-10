# iSpy WebGL
[![DOI](https://zenodo.org/badge/27218260.svg)](https://zenodo.org/badge/latestdoi/27218260)

[T McCauley 2017 J. Phys.: Conf. Ser. 898 072030](https://doi.org/10.1088/1742-6596/898/7/072030)

## What is this?

This is a browser-based event display for the <a href="http://cern.ch/cms" target="_blank">CMS experiment</a> at the LHC using [three.js](https://threejs.org/).

The "production" version is here:

[http://cern.ch/ispy-webgl](http://cern.ch/ispy-webgl)

and the development version is here:

[http://cern.ch/ispy-webgl-dev](http://cern.ch/ispy-webgl-dev)

For more information on the input data format and how to create files for the display:

[https://github.com/cms-outreach/ispy-analyzers](https://github.com/cms-outreach/ispy-analyzers)

Contributors: Luke Barnard, Mihael Hategan, Carita Logrén, Thomas McCauley, Phong Nguyen, Michael Saunby

<img src="https://github.com/cms-outreach/ispy-webgl/blob/master/graphics/ispy-webgl-screenshot-0.9.6.png"></img>

## Papers and talks

["WebGL and three.js in CMS"](https://tpmccauley.github.io/cms-webgl-cwp/#/) at the HEP Software Foundation Visualization Workshop, March 2017.

["iSpy WebGL: a browser-based event display for CMS using WebGL"](https://indico.cern.ch/event/570249/contributions/2450053/subcontributions/218722/attachments/1401904/2139981/mccauley-ispywebgl-hsf.pdf) at HEP Software Foundation Visualization Workshop, Jan 2017.

"A browser-based event display for the CMS Experiment at the LHC using WebGL", at CHEP 2016. 
[paper](https://doi.org/10.1088/1742-6596/898/7/072030), [slides](https://indico.cern.ch/event/505613/contributions/2228350/attachments/1346680/2045130/Oral-v4-449.pdf), [highlight summary slide](https://indico.cern.ch/event/505613/contributions/2228350/attachments/1346680/2030787/Highlights-v0-449.pdf)

## Frequently asked questions

### How do I run this application locally?

Clone this repository and in the `ispy-webgl/` run either `python -m http.server` (python3) or `python -m SimpleHTTPServer` (python2.7). Then go to `http://localhost:8000` in your browser.

### How do I hide/show objects like jets?

Objects like particle flow jets can be hidden by hovering over them in the display (and the color will change to gray). Press `H` to hide the jet. Press `S` to show.
Note that the hidden objects are put in a list so hide and show are push and pop actions, respectively.

### Does this run on a touch-screen like a tablet or phone?

Yes, it should. You will not have access to certain click events though.

### I've gotten the view into a "weird" state where I've lost sight of everything (so to speak). How do I recover?

You can either press the "Home" button to return to the original view or simply refresh the page and start again.

### How do I produce files for events I want to view?

More information is [here](https://github.com/cms-outreach/ispy-analyzers).

### How do I change the colors of the objects in the display?

### How do I select event objects based on cuts?

### How do I make a nice publication-quality event display?
