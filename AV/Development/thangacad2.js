"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
  var arraySize = 0;
  var denom = [];
  var jsArr=[[],[]];
  
function runit() {
    ODSA.AV.reset(true);
    var theArray = [];

    arraySize = document.getElementById("totalAmount").value;
    denom = document.getElementById("denomination").value;

    //set size for total amount
    if(arraySize == 0)
    {
        arraySize = 10;
    }
    else if(arraySize > 14 || arraySize < 8)
    {
        arraySize = 10;
    }
    //set size for denom
    
    for(var i = 0; i < arraySize; i++)
    {
        theArray.push(i);
    }
    
    console.log(denom);
    console.log(arraySize);

    av = new JSAV($('.avcontainer'));

    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");

    av.displayInit();

}


function about() {
   alert("Simple array visualization");
}
  
function help() {
   alert("Help for simple array visualization");
}

function changeTen() {
    arraySize = document.getElementById("changeTen").value;

    
    //av = new JSAV($('.avcontainer'));

   // var arr = av.ds.array(theArray, {indexed: true});
}

function changeNine() {
    arraySize = document.getElementById("changeNine").value;

}

function changeEight() {
    arraySize = document.getElementById("changeEight").value;

}
  
ODSA.AV.initArraySize(7, 13, 10);


// Connect action callbacks to the HTML entities
$('#Eight').click(changeEight);
$('#Nine').click(changeNine);
$('#Ten').click(changeTen);
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
