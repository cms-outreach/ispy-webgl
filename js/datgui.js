
ispy.initGUI = function() {

    for ( key in ispy.current_event.Types ) {

	console.log(key);

	var ed = ispy.event_description[key];

	if ( ed && ed.cuts ) {

	    ispy.datgui.addFolder(key);

	}

    };

    console.log(ispy.datgui.__folders);

}
