"use strict";

$(document).ready(function () {


    JSAV.init();

	//var av_name = "ThangArraySwap";
	// Load the config object with interpreter and code created by odsaUtils.js
	//var config = ODSA.UTILS.loadConfig(
    //           {"av_name": av_name, "json_path": "AV/config/ThangArraySwap.json"}),
    //interpret = config.interpreter,       // get the interpreter
    //code = config.code;                   // get the code object
	
    var av = new JSAV("ThangArraySwap");
	//var pseudo = av.code(code);
    var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];
    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    for(var i=0; i<12; i++)
	{
	   var a = i;
	   var b = Math.floor(Math.random() * (theArray.length));
		while(a == b)
		{		
			//a = Math.floor(Math.random() * (theArray.length));
	   	b = Math.floor(Math.random() * (theArray.length));
	   	if(i != b)
	   	{
	   		break;
	   	}
		}

	   arr.swap(i,b);
	   av.step();
	}
    // We are now starting a new slide (#3)
    //av.umsg("Text after av.step()");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");

});
