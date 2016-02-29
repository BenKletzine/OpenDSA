/*global window */
(function() {
    "use strict";
    var my_array;
    
    var thangacadex3 = {
	
	option: [0,0,0],

	// Initialise the exercise
	initArr: function(arr_size, denom) {
	    var i;
	    var next_val;
	    var array_str;
		//var rand_num = Math.floor(Math.random() * 3 + 1);
	    my_array = [];
	    for (i = 0; i < arr_size; i++) {
		
		
		next_val = denom * i;
		
		if(next_val % arr_size == 0)
		{
		   counter++;
		   next_Val = counter;
		}
		
		
		
		//next_val = i;
		//next_val = Math.floor(Math.random() * 1000 + 1);
		//while (my_array.includes(next_val))
		//    next_val = Math.floor(Math.random() * 1000 + 1);
		my_array.push(next_val);
		console.log(" " + next_val);
	    }
	    array_str = "";
	    for (i = 0; i < arr_size; i++) {
		array_str = array_str + " " + my_array[i];
	    }
	    console.log(array_str);
	    return array_str;
	},
	
		initArr2: function(arr_size, denom) {
	    var i;
	    var next_val = denom;
		var counter = 0;
	    var array_str;
		//var rand_num = Math.floor(Math.random() * 3 + 1);
	    my_array = [];
	    for (i = 0; i < arr_size; i++) {
		
		next_val = denom * i;
		
		if(next_val % arr_size == 0)
		{
		   counter++;
		   next_Val = counter;
		}

		//next_val = Math.floor(Math.random() * 1000 + 1);
		//while (my_array.includes(next_val))
		//    next_val = Math.floor(Math.random() * 1000 + 1);
		my_array.push(next_val);
		console.log(" " + next_val);
	    }
	    array_str = "";
	    for (i = 0; i < arr_size; i++) {
		array_str = array_str + " " + my_array[i];
	    }
	    console.log(array_str);
	    return array_str;
	},
	
		initArr3: function(arr_size) {
	    var i;
	    var next_val;
	    var array_str;
		//var rand_num = Math.floor(Math.random() * 3 + 1);
	    my_array = [];
	    //for (i = 0; i < arr_size; i++) {
		//next_val = i;
		//next_val = Math.floor(Math.random() * 1000 + 1);
		//while (my_array.includes(next_val))
		//    next_val = Math.floor(Math.random() * 1000 + 1);
		//my_array.push(next_val);
		//console.log(" " + next_val);
	    //}
		my_array.push(arr_size);
	    array_str = "";
	    for (i = 0; i < 1; i++) {
		array_str = array_str + " " + my_array[i];
	    }
		
	    console.log(array_str);
	    return array_str;
	},
	
	nextValue: function(arr_size, denom) {
	    var i;
	    var temp;
	    var temp_index;
	    // Get the largest in index 0
	    for (i = 1; i < my_array.length; i++) {
		
		if (my_array[i] > my_array[0]) {
		    temp = my_array[0];
		    my_array[0] = my_array[i];
		    my_array[i] = temp;
		}
		
		
		
	    }

	    // The largest is now in index 0.
	    // Get our three options in index 1, 2, 3
	    temp_index = Math.floor(Math.random() * (my_array.length-1)) + 1;
	    temp = my_array[1];
	    my_array[1] = my_array[temp_index];
	    my_array[temp_index] = temp;

	    temp_index = Math.floor(Math.random() * (my_array.length-1)) + 2;
	    temp = my_array[2];
	    my_array[2] = my_array[temp_index];
	    my_array[temp_index] = temp;

	    temp_index = Math.floor(Math.random() * (my_array.length-1)) + 3;
	    temp = my_array[3];
	    my_array[3] = my_array[temp_index];
	    my_array[temp_index] = temp;

	    thangacadex3.option[0] = my_array[1];
	    thangacadex3.option[1] = my_array[2];
	    thangacadex3.option[2] = my_array[3];
	    return my_array[0];
	},

    };

    window.thangacadex3 = window.thangacadex3 || thangacadex3;
}());
