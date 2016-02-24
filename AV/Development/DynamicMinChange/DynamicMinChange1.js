"use strict";
$(document).ready(function () {
JSAV.init();
var av = new JSAV("DynamicMinChange1");
var problem = [0,1,2,3,4,5,6][1,2,3];
var solution = av.ds.matrix(problem, {indexed: true});
av.umsg("We start with an initial array");
// Note: av.displayInit() will not affect the number of slides.
// All that it will do is affect what you get to see on the
// initial slide.
av.displayInit();
// We are now starting a new slide (#2)
av.umsg("... and text after displayInit()", {preserve: true});
arr.swap(3,7);
av.step();
// We are now starting a new slide (#3)
av.umsg("Text after av.step()");
av.recorded();
});


