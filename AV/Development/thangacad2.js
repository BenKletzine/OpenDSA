"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av, avMatrix, avCoins, avCount;
  var amount, denom;
  var jsCoins, jsMatrix;
  var jsCount = [];
  var skip;
   const DEBUG = true;
   const INVALID = 1337;
   
   const style_default = {"background-color":"white"};
   const style_focus = {"background-color":"yellow"};
   const style_current = {"background-color":"lightgray"};
   const style_trail = {"background-color":"skyblue"}
   const style_reject = {"background-color":"salmon"};
   const style_accept = {"background-color":"lightgreen"};
  
   function makeStyle(a, b, c){
     var s = [a, b, c];
     return function(){return s;};
   }
  
   var defaultStyle = makeStyle(style_default, style_default, style_default)();
   var trailStyle = makeStyle(style_trail, style_default, style_default)();
   var lookingStyle = makeStyle(style_current, style_focus, style_focus)();
   var aboveStyle = makeStyle(style_current, style_accept, style_reject)();
   var leftStyle = makeStyle(style_current, style_reject, style_accept)();
   
  
function runit() {
    ODSA.AV.reset(true);

    embeddedInit();

    //set size for total amount
    if(amount > 14 || amount < 8)
    {
        amount = 10;
    }
    //set size for denom
    
    jsCoins[0] = 1; //init Coins with denominator 1
    jsCount[0] = 0; //init count 0 for denominator 1
    
    var length = denom.length;
    
    if(length > 4)
    {
      length = 4;
    }
    
    for(var i=1; i < length + 1; i++)
    {
        jsCoins[i] = denom[i - 1];
        jsCount[i] = 0;
    }

    jsMatrix = arrInit(jsCoins.length, amount);
    
    JSAV.init();
    av = new JSAV($('.avcontainer'));
    avMatrix = av.ds.matrix(jsMatrix);
    avCoins = av.ds.array(jsCoins, {"layout":"vertical",
      "relativeTo":avMatrix, "anchor":"left center", "myAnchor":"right center"});
    
    av.umsg("The First row will be skipped because of it's simplicity.");
    av.displayInit();
    
    getCha(amount, skip);
    
    avCount = av.ds.array(jsCount, {"layout":"vertical", //"visible":"false", 
       "relativeTo":avCoins, "anchor":"left top", "myAnchor":"right top"});

    backtrack();
    
    av.umsg("that's all, folks");
    av.recorded();
}

function embeddedInit(){
   var total = document.getElementById("totalAmount").value;
   denom = document.getElementById("denomination").value.trim().split(" ");

   amount = parseInt(total);
   jsCoins = [];

   var count = 2;
   
   skip = [];
   for(var i=0; i < amount - 2; i++)
   {
        skip[i] = count + i;
   }

}


function about() {
   alert("Minimum Change Slide with Embedded.");
}
  
function help() {
   alert("Use Total amount between 8 and 14. Also use 2 thru 4 denominators seperated by spaces.");
}

function arrInit(coins, amt){
   var arr = [];
   for(var i = 0; i < coins; ++i){
      arr[i] = new Array(amt + 1);
   }
   return arr;
}

   /*Compute solution and generate slides at specified indexes*/
   function getCha(amt, slideList){
      var cnt = 0;
      var above = 0;
      var left = 0;

      for (var i = 0; i < jsMatrix.length; ++i){
         //style current coin
         avCoins.css(i, style_focus);
         for (var j = 0; j < jsMatrix[i].length && j <= amt; ++j){
            above = left = INVALID;
            
            //get optimals for using (left) and not-using (above) the current coin
            var above = i > 0 ? jsMatrix[i-1][j] : INVALID;
            var left = j == 0 ? i == 0 ? 0 : INVALID : j >= jsCoins[i] ? jsMatrix[i][j-jsCoins[i]] + 1 : INVALID;
            
            //highlight candidate cells and create slide
            //slide("look", lookingStyle);

            //choose between left or above
            if(left < above){
               jsMatrix[i][j] = left;
               avMatrix.value(i, j, left);
               slide("Optimal solution includes this coin.", leftStyle);
            }else if(above < left){
               jsMatrix[i][j] = above;
               avMatrix.value(i, j, above);
               slide("Optimal solution does not include this coin.", aboveStyle);
            }else{
               jsMatrix[i][j] = left;
               avMatrix.value(i, j, left);
               slide("Optimal solution exists for either choice, so we arbitrarily choose to include this coin.", leftStyle);
            }
            
            //set default style before moving to next frame
            style(i, j, defaultStyle);

            if(DEBUG) console.log("frame: " + cnt + "\n");
            
            //consume frame marker if slide was generated
            if(cnt++ == slideList[0]){
               slideList.shift();
            }
         }
         //unstyle current coin
         avCoins.css(i, style_default);
      }

      /*Build table of info, append msg, apply styles s[], generate slide*/
      function slide(msg, s){
         //create slide explaining top row being skipped
         //only add msg and step if a slide is desired for this frame
         if(i == 0 && j == 0){
            msg = "With a 1-credit coin, the top row always equals change amount."
         }else if(i == 0 || cnt == slideList[0]){
            return;
         }
         //check that i and j are in valid range
         var abv = above == INVALID ? "-" : above;
         var lft = left == INVALID ? "-" : left;
         
         //add common output info
         var tbl = ["", "", "", ""];
         var td = "&nbsp&nbsp</td>"
         tbl[0] = "<td>Amount of change:" + td + "<td>" + j + td;
         tbl[1] = "<td>Coin value:" + td + "<td>" + jsCoins[i] + td;
         tbl[2] = "<td>Don't use coin (above):" + td + "<td>" + abv + td;
         tbl[3] = "<td>Do use coin (left):" + td + "<td>" + lft + td;
         
         //append slide msg to table
         msg = "<table>"
            + "<tr>" + tbl[0] + tbl[1] + "</tr>"
            + "<tr>" + tbl[2] + tbl[3] + "</tr>"
            + "</table>" + msg;
         
         //apply style generate slide
         style(i, j, s);
         av.umsg(msg);
         av.step();
      }
   }


   /*Backtrack to find which coins were used*/
 function backtrack(){
      var i = jsMatrix.length - 1;
      var j = jsMatrix[0].length - 1;
      avCount.show();
      av.umsg("All subproblems are computed, we now backtrack in order to count the coins used.");
      av.step();
      avCoins.css(i, style_focus);
      
      while(j > 0){
         if(i == 0 || jsMatrix[i-1][j] > jsMatrix[i][j-jsCoins[i]]){
            //go left
            jsCount[i]++;
            avCount.value(i, jsCount[i]);
            slide("Add 1 of this coin, move left.", leftStyle, trailStyle);
            j -= jsCoins[i];
         }else{
            //go up
            slide("No more coins of this denomination will be included, move up one row.",
               aboveStyle, defaultStyle);
            avCoins.css(i, style_default);
            i--;
            avCoins.css(i, style_focus);
         }
      }
      avCoins.css(i, style_default);

      if(DEBUG) console.log(jsCount);

      /*Apply styles s1[], create slide, apply styles s2[]*/
      function slide(msg, s1, s2){
         //apply slide style
         style(i, j, s1);
         
         //generate slide
         av.umsg(msg);
         av.step();
         
         //apply residual style
         style(i, j, s2);
      }
   }
   function style(i, j, s){
      avMatrix.css(i, j, s[0]);
      if(i >= 1) avMatrix.css(i-1, j, s[1]);
      if(j >= jsCoins[i]) avMatrix.css(i, j-jsCoins[i], s[2]);
   }

// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
