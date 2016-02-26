"use strict";

$(document).ready(function () {


    JSAV.init();
	
    var av = new JSAV("KletzineArraySwap");


    var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];

    var arr = av.ds.array(theArray, {indexed: true});
	
    av.umsg("Array in sorted order");
    
    av.displayInit();

    for(var i =0; i < theArray.length; i++){
        
    	var randomIndex = Math.floor(Math.random() * theArray.length);
     //av.umsg("Swapping" + i + "with" + randomIndex);
    	arr.swap(i,randomIndex);
     av.umsg("Swapping " + theArray[i] + " at index " + i + " with " +
     	       theArray[randomIndex] + " at index " + randomIndex);
    	av.step();
        
    }
    av.step();
    av.umsg("Complete.");

    av.recorded();

});
