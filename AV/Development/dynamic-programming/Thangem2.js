"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
 

function runit() {
    ODSA.AV.reset(true);

    var length = ODSA.AV.initArraySize(10, 16, 12);
    //var theArray = ODSA.AV.processArrayValues(20);
    var theArray = new Array(length);

	for (var i = 0; i < theArray.length; i++) {
	    theArray.push(i);
	}

    av = new JSAV($('.avcontainer'));

    var arr = av.ds.array(theArray);
    av.umsg("TEST!!Text before displayInit()");
    av.displayInit();
    
    // We are now starting a new slide (#2)
    av.umsg("seafrdesafsfsa", {preserve: true});
    arr.swap(1,2);
    av.step();
    
    // We are now starting a new slide (#3)
    av.umsg("asdfadsfsad");
    av.recorded();
}

function about() {
   alert("Simple array visualization");
}
  
function help() {
   alert("Help for simple array visualization");
}

// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
