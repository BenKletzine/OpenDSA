/*global window */
(function() {
    
   var style_default = {"background-color":"lightgray"};
   var style_reject = {"background-color":"lightred"};
   var style_accept = {"background-color":"lightgreen"};
   var style_highlight = {"background-color":"yellow"};
   var style_current = {"background-color":"lightteal"};
    
    
    "use strict";
    var my_array1 = [];
    var my_array2 = []; //use array one length
    var av, avCoins, jsavArr;
    var jsCoins;
    var jsArr=[[],[]];
    var array2length;
    
	var counter = 0;
    var myAnswer = 0;
    
    var thangacadex3 = {
	
	option: [0,0,0],
    
    initJSAV: function(arr_size, denom)
    {
        jsCoins = [];
        
        jsCoins[0] = 1;
        jsCoins[1] = denom;
        
        jsArr[0]=my_array1;
        jsArr[1]=my_array2;
        
        av = new JSAV("Thangacadex3", {animationMode: "none"});
        jsavArr = av.ds.matrix(jsArr);
        
                
        avCoins = av.ds.array(jsCoins, {"layout":"vertical",
           "relativeTo":jsavArr, "anchor":"left center", "myAnchor":"right center"});
           
        //jsavArr.highlight(1,array2length);
		jsavArr.css(1, array2length, style_highlight);
        av.displayInit();
        av.recorded();
		
    },

	// Initialize the exercise
	initArr: function(arr_size, denom) { //Initialize Array One with ones
	    var i;
	    var next_val;
	    var array_str;

	    my_array1 = [];
	    for (i = 0; i < arr_size - 1; i++) {
		
		    next_val = denom * i;

		    while (my_array1.includes(next_val))
                next_val = denom * i;

		    my_array1.push(next_val);
		    console.log(" " + next_val);
	    }
	    array_str = "";
	    for (i = 0; i < arr_size - 1; i++) {
		    array_str = array_str + " " + my_array1[i];
	    }
	    console.log(array_str);
	    return array_str;
	},

	initArr2: function(loc, denom) { //Initialize Array Two
	    var i;
	    var next_val = 0;
	    var array_str;
        counter = 0; //resets counter
        myAnswer = 0; //resets answer
	    my_array2 = [];
        
	    for (i = 0; i < loc - 1; i++) {

		    if(i % denom == 0)
            {
               next_val = counter;
               counter++;
            }
            else
            {
		        next_val++;
            }
 
		    my_array2.push(next_val);
		    console.log(" " + next_val);
	    }
	    array_str = "";
	    for (i = 0; i < loc - 1; i++) {
		    array_str = array_str + " " + my_array2[i];
	    }
        array2length = my_array2.length;
        
        myAnswer = next_val;
        
        while(my_array2.length != my_array1.length)
        {
            my_array2.push("");
        }
        
	    console.log(array_str);
	    return array_str;
	},
	
	nextValue: function(loc, denom) {
	    var temp = 0;
	    var temp_index = 0;
        myAnswer++;
        
        if(denom == 2)
        {
            if(my_array2[loc-1] == myAnswer || my_array2[loc-2] == myAnswer)
                myAnswer++;
        }
        
        if(denom == (loc-1))
        {
            myAnswer = 1;
        }
        
        if((denom * 2) == (loc - 1))
        {
            myAnswer = 2;
        }
        
        if((denom * 3) == (loc - 1))
        {
            myAnswer = 3;
        }
        
        my_array2[0] = myAnswer;
		
	    temp_index = Math.floor(Math.random() * (my_array2.length-1)) + 1;
	    temp = my_array2[1];
	    my_array2[1] = my_array2[temp_index];
	    my_array2[temp_index] = temp;

	    temp_index = Math.floor(Math.random() * (my_array2.length-2)) + 2;
	    temp = my_array2[2];
	    my_array2[2] = my_array2[temp_index];
	    my_array2[temp_index] = temp;

	    temp_index = Math.floor(Math.random() * (my_array2.length-3)) + 3;
	    temp = my_array2[3];
	    my_array2[3] = my_array2[temp_index];
	    my_array2[temp_index] = temp;
        
        //if second row has little value in array then it will make up value in options
        if(!my_array2[1])
        {
            my_array2[1] = 2;
        }
        
        if(!my_array2[2])
        {
            my_array2[2] = 3;
        }
        
        if(!my_array2[3])
        {
            my_array2[3] = 4;
        }

	    thangacadex3.option[0] = my_array2[2];
	    thangacadex3.option[1] = my_array2[3];
	    thangacadex3.option[2] = my_array2[0] + 1;
	    return my_array2[0];
		
	},
    
    };

    window.thangacadex3 = window.thangacadex3 || thangacadex3;
}());
