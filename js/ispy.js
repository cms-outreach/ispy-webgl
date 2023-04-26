import { init, initLight, run, initDetector } from "./setup.js";
import { addGroups } from "./tree-view.js";
import { loadWebFiles } from "./files-load.js";
import { event_description } from "./objects-config.js";

document.addEventListener('DOMContentLoaded', function() {

    init();
    addGroups();
    initLight();
    initDetector();
    loadWebFiles();
    run();

    console.log(event_description);

});
