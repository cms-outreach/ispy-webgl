var ispy = ispy || {};
ispy.detector = {"Collections":{}};
ispy.version = "0.9.8-COD3.5";

// These need to be defined before adding objects:
ispy.POINT = 0;
ispy.LINE = 1;
ispy.BOX = 2;
ispy.SOLIDBOX = 3;
ispy.SCALEDBOX = 4;
ispy.SCALEDSOLIDBOX = 5;
ispy.SCALEDSOLIDTOWER = 6;
ispy.MODEL = 7;

// This is something with an associated collection (the extras) and the relationship
// with it and the primary collection is given by association set.
// The materials and shapes have to be specified in the drawing method.
ispy.ASSOC = 8;

ispy.SHAPE = 9;
ispy.TEXT = 10;
ispy.BUFFERBOX = 11;
