"use strict";

$(document).ready(function () {
   const DEBUG = true;
   const INVALID = 1337;

   //define css styles
   const style_default = {"background-color":"white"};
   const style_focus = {"background-color":"yellow"};
   const style_current = {"background-color":"lightgray"};
   const style_reject = {"background-color":"salmon"};
   const style_accept = {"background-color":"lightgreen"};

   /*creates a 3-tuple closure*/
   function makeStyle(a, b, c){
      var s = [a, b, c];
      return function(){return s;};
   }

   //define css style groups as 3-tuple closures via makeStyle
   var defaultStyle = makeStyle(style_default, style_default, style_default)();
   var trailStyle = makeStyle(style_current, style_default, style_default)();
   var lookingStyle = makeStyle(style_current, style_focus, style_focus)();
   var aboveStyle = makeStyle(style_current, style_accept, style_reject)();
   var leftStyle = makeStyle(style_current, style_reject, style_accept)();

   //initialize js vars
   var amount = 14;
   var jsCoins = [1,3,5];
   var jsMatrix = arrInit(jsCoins.length, amount);
   var slides = [0,12,13,14,15,16,17,18,27,28,32,33,41];

   //fire up the av
   JSAV.init();
   var av = new JSAV("brad-test");
   var avMatrix = av.ds.matrix(jsMatrix);
   var avCoins = av.ds.array(jsCoins, {"layout":"vertical",
      "relativeTo":avMatrix, "anchor":"left center", "myAnchor":"right center"});
   // var avCoins = av.ds.matrix(jsCoins, {
   //    "relativeTo":avMatrix, "anchor":"left center", "myAnchor":"right center"});

   //first slide
   av.umsg("OMG DYNAMIC PROGRAMMING!!1");
   av.displayInit();
   //fill change matrix
   getCha(amount, slides);
   //backtrack optimal solution
   backtrack();
   // last slide
   av.umsg("that's all, folks");
   av.recorded();

   /*Initialize matrix based on number of coins and amount of change*/
   function arrInit(coins, amt){
      var arr = [];
      for(var i = 0; i < coins; ++i){
         arr[i] = new Array(amount + 1);
      }
      return arr;
   }

   /*Compute solution and generate slides at specified indexes*/
   function getCha(amt, show){
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
            var left = j == 0 ? 0 : j >= jsCoins[i] ? jsMatrix[i][j-jsCoins[i]] +1 : INVALID;
            
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
            if(cnt++ == show[0]){
               show.shift();
            }
         }
         //unstyle current coin
         avCoins.css(i, style_default);
      }

      /*Build table of info, append msg, apply styles s[], generate slide*/
      function slide(msg, s){
         //only add msg and step if a slide is desired for this frame
         if(cnt != show[0]) return;
         
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
      var cntCoins = [0,0,0];
      var i = jsMatrix.length - 1;
      var j = jsMatrix[0].length - 1;

      av.umsg("All subproblems have been ");
      av.step();
      avCoins.css(i, style_focus);
      
      while(j > 0){
         if(i > 0 && jsMatrix[i][j] == jsMatrix[i-1][j]){
            slide("No more coins of this denomination will be included, move up one row.",
               aboveStyle, defaultStyle);
            avCoins.css(i, style_default);
            i--;
            avCoins.css(i, style_focus);
         }else{
            slide("Add 1 of this coin, move left.", aboveStyle, trailStyle);
            cntCoins[i]++;
            j -= jsCoins[i];
         }
      }
      console.log(cntCoins);

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

   /*Index [i][j] and associated indices (above and left) are styled by s[]*/
   function style(i, j, s){
      avMatrix.css(i, j, s[0]);
      if(i >= 1) avMatrix.css(i-1, j, s[1]);
      if(j >= jsCoins[i]) avMatrix.css(i, j-jsCoins[i], s[2]);
   }
});
