/*global window */
(function() {
    "use strict";
    var my_array1 = [];
    var my_array2 = []; //array one length
    var av, jsavArr;
    var jsArr=[[],[]];
    
    //var rows = 2;
    //var cols;
    
	var counter = 0;
	//var temp_index = 0;
    var myAnswer = 0;
    
    
    
    var thangacadex3 = {
	
	option: [0,0,0],
    
    initJSAV: function(arr_size)
    {
        jsArr[0]=my_array1;
    jsArr[1]=my_array2;
        av = new JSAV("Thangacadex3", {animationMode: "none"});
        jsavArr = av.ds.matrix(jsArr);
        av.displayInit();
        av.recorded();
    },

	// Initialize the exercise
	initArr: function(arr_size, denom) { //Initialize ones array
	    var i;
	    var next_val;
	    var array_str;
        //cols = arr_size;
        //jsArr = initArr(rows,cols);

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

	initArr2: function(loc, denom) {
	    var i;
	    var next_val = 0;
	    var array_str;
        counter = 0;
        myAnswer = 0;
		//var rand_num = Math.floor(Math.random() * 3 + 1);
	    my_array2 = [];
        //my_array.push(0);
	    for (i = 0; i < loc - 1; i++) {

           // if(i = 0)
           // {
           //     next_val = 0;
           // }   
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
        
        myAnswer = next_val;
        
	    console.log(array_str);
	    return array_str;
	},
	
	nextValue: function(loc, denom) {
	    //var i;
	    var temp = 0;
	    var temp_index = 0;
        //var divide = 0;
        myAnswer++;
        
        //if(my_array1[loc-1] > myAnswer && denom > myAnswer)
        //{
        //    my_array2[0] = my_array2[loc-1] + 1;
        //}
        
        
        if(loc == denom)
        {
            //divide = arr_size/ denom;
            counter++;
            myAnswer = counter;
        }
        else if(loc > denom) 
        {
            //counter++;
            myAnswer = counter;
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

	    thangacadex3.option[0] = my_array2[1];
	    thangacadex3.option[1] = my_array2[2];
	    thangacadex3.option[2] = my_array2[3];
	    return my_array2[0];
		
	},

    };

    window.thangacadex3 = window.thangacadex3 || thangacadex3;
}());
