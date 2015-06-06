// All the clever stuff happens in mjbuilder.js
// This code just provides a scaled canvas to extract JPEG frames from.
ispy.recording = false;
ispy.recordCanvas = null;

ispy.toggleRecording = function(){
  if (ispy.recording) {
    ispy.recording = false;
    ispy.recordStop();
  }else{
    ispy.recording = true;
    ispy.recordStart();
  }
}

ispy.recordStart = function(){
  console.log('START RECORDING');
  ispy.recordCanvas = document.createElement('canvas');
  ispy.recordCanvas.width = 640;
  ispy.recordCanvas.height = 480;
  var dst_canv = ispy.recordCanvas;
  ispy.recordBuilder = new movbuilder.MotionJPEGBuilder();
  ispy.recordBuilder.setup( dst_canv.width, dst_canv.height, 25 /* FPS */ );
}

ispy.recordFrame = function(){
    var src_canv = ispy.renderer.domElement;
    var src_aspect = src_canv.width / src_canv.height;
    var dst_canv = ispy.recordCanvas;
    var max_x = dst_canv.height * src_aspect;
    var min_x = (dst_canv.width - max_x) * 0.5;
    var max_y = dst_canv.height;
    var min_y = 0;
    dst_canv.getContext('2d').drawImage(src_canv, min_x, min_y, max_x, max_y);
    ispy.recordBuilder.addCanvasFrame( dst_canv );
};

ispy.recordStop = function(){
  console.log('STOP RECORDING. Please wait for download...');
  ispy.recordBuilder.finish(function(generatedURL) {
	     open(generatedURL);
       console.log('RECORDING COMPLETE.')
  });
  ispy.recordCanvas = null;
}
