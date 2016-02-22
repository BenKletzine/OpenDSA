"use strict";

$(document).ready(function () {


    JSAV.init();
	
    var av = new JSAV("KletzineArraySwap");


    var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];

    var arr = av.ds.array(theArray, {indexed: true});
	
    av.umsg("Array in sorted order");
    av.umsg("
    av.displayInit();
    //av.step();

    for(var i =0; i < theArray.length; i++){
        av.umsg("testing");
    	var randomIndex = Math.floor(Math.random() * theArray.length);
    	arr.swap(i,randomIndex);
       
    	av.step();
        
    }
   

    av.recorded();

});
