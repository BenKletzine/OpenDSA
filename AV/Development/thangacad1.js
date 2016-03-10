"use strict";

$(document).ready(function () {


    

	//var av_name = "ThangArraySwap";
	// Load the config object with interpreter and code created by odsaUtils.js
	//var config = ODSA.UTILS.loadConfig(
    //           {"av_name": av_name, "json_path": "AV/config/ThangArraySwap.json"}),
    //interpret = config.interpreter,       // get the interpreter
    //code = config.code;                   // get the code object
	
    
	var change = 0;
	var amount = 17;
    var theArray = [1,3,5];
	var numCoins = theArray.length;
	var used = new Array (1);
	var last = new Array (1);
	
	
	var jsArr = arrInIt(theArray, numCoins, change, used, last);
	
	JSAV.init();
	var av = new JSAV("thangacad1");
    var avArr = av.ds.array(jsArr);
	
	
    av.umsg("HELLOOO");
    av.displayInit();
	
	
	function arrInit(coins, diffCoins, maxChange, coinsUsed, lastCoin){
	    coinsUsed[0] = 0;
	    lastCoin[0] = 1;

        for (var cents = 1; cents < maxChange; cents++) 
		{
           var minCoins = cents;
		   var newCoin = 1;
		   
		   for(int j = 0; j < differentCoins; j++)
		   {
		        if( coins[ j ] > cents )   // Cannot use coin j
                    //continue;
                if( coinsUsed[ cents - coins[ j ] ] + 1 < minCoins )
                {
                    minCoins = coinsUsed[ cents - coins[ j ] ] + 1;
                    newCoin  = coins[ j ];
                }
				av.step();
		   }
		     coinsUsed[ cents ] = minCoins;
             lastCoin[ cents ]  = newCoin;
        }
        
    }
	
	function findMin(change, used, last)
	{
	    //System.out.println( "Best is " + used[ change ] + " coins" );
	
	
	    for( int i = change; i > 0; )
        {
            System.out.print( last[ i ] + " " );
            i -= last[ i ];
        }
	}
	
	
	/*
    for(var i=0; i<12; i++)
	{
		av.umsg("From " + i + ", we randomly switch with any number in the array");
		arr.highlight([i]);
		av.step();		

	    var b = Math.floor(Math.random() * (theArray.length));
		while(i == b)
		{		
	   		b = Math.floor(Math.random() * (theArray.length));

	   		if(i != b)
	   		{	
	   			break;
	   		}
		}
		
		arr.highlight([b]);
	    arr.swap(i,b);
	    av.step();
		arr.unhighlight([i]);
		arr.unhighlight([b]);

	}
	*/
    av.recorded();
});
