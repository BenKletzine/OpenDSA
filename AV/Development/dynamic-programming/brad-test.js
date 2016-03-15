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

   //define style groups as 3-tuple closures via makeStyle
   var defaultStyle = makeStyle(style_default, style_default, style_default)();
   var lookingStyle = makeStyle(style_current, style_focus, style_focus)();
   var aboveStyle = makeStyle(style_current, style_accept, style_reject)();
   var leftStyle = makeStyle(style_current, style_reject, style_accept)();

   //js vars
   var amount = 12;
   var jsCoins = [1,3,5]; //getCoins();
   var jsArr = arrInit(jsCoins.length, amount);
   var slides = [0,12,13,14,15,16,17,18,27,28,32,33,41];

   //fire up the av
   JSAV.init();
   var av = new JSAV("brad-test");
   var avArr = av.ds.matrix(jsArr);

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

   /*Get denominations to be used*/
   function getCoins(){
      //possibly add user input
      return [1,4,7];
   }

   /*Initialize matrix based on number of coins and amount of change*/
   function arrInit(coins, amt){
      var arr = [];
      for (var i = 0; i < coins; i++){
         arr[i] = new Array(amount + 1);
      }
      return arr;
   }

   /*Compute solution and generate slides at specified indexes*/
   function getCha(amt, show){
      var cnt = 0;
      var above = 0;
      var left = 0;

      for (var i = 0; i < jsArr.length; ++i){
         for (var j = 0; j < jsArr[i].length && j <= amt; ++j){
            above = left = INVALID;
            //get optimals for using (left) and not-using (above) the current coin
            var above = i > 0 ? jsArr[i-1][j] : INVALID;

            //var left = j == 0 ? 0 : j >= jsCoins[i] ? jsArr[i][j-jsCoins[i]] : INVALID;
            if(j == 0){
               left = 0;
               //slide("Amount of change is 0, so no coins are used. (base case)");
            }else if(j >= jsCoins[i]){
               left = jsArr[i][j-jsCoins[i]] + 1;
               //slide("Look 'left' for solution. (current amount minus coin value)");
            }else{
               left = INVALID;
               //slide("Coin value is greater than current amount, so no solution is possible with this coin.");
            }
            slide("looking", lookingStyle);

            //choose between left or above
            if(left <= above){
               jsArr[i][j] = left;
               avArr.value(i, j, left);

               slide("Optimal solution uses this coin, go left.", leftStyle);
            }else{
               jsArr[i][j] = above;
               avArr.value(i, j, above);

               slide("Optimal solution does not use this coin, go above", aboveStyle);
            }

            //set default style before moving to next frame
            style(i, j, defaultStyle);

            if(DEBUG) console.log("frame: " + cnt + "\n");

            //consume frame marker if slide was generated
            if(cnt++ == show[0]){
               show.shift();
            }
         }
      }

      function slide(msg, s){
         //only add msg and step if a slide is desired
         if(cnt != show[0]) return;
         //check that i and j are in valid range
         var abv = above == INVALID ? "---" : above;
         var lft = left == INVALID ? "---" : left;
         //add common output info
         var tbl = ["", "", "", ""];
         var td = "&nbsp&nbsp</td>"
         tbl[0] = "<td>Amount of change:" + td + "<td>" + j + td;
         tbl[1] = "<td>Coin value:" + td + "<td>" + jsCoins[i] + td;
         tbl[2] = "<td>Don't use coin (above):" + td + "<td>" + abv + td;
         tbl[3] = "<td>Do use coin (left):" + td + "<td>" + lft + td;
         //append slide msg
         msg = "<table>"
            + "<tr>" + tbl[0] + tbl[1] + "</tr>"
            + "<tr>" + tbl[2] + tbl[3] + "</tr>"
            + "</table>" + msg;
         //apply style
         style(i, j, s);
         //generate slide
         av.umsg(msg);
         av.step();
      }
      
      function xxslide(msg){
         //only add msg and step if a slide is desired
         if(cnt != show[0]) return;

         var abv = above == INVALID ? "---" : above;
         var lft = left == INVALID ? "---" : left;
         var tbl = ["", "", "", ""];
         var td = "&nbsp&nbsp</td>"

         tbl[0] = "<td>Amount of change:" + td + "<td>" + j + td;
         tbl[1] = "<td>Coin value:" + td + "<td>" + jsCoins[i] + td;
         tbl[2] = "<td>Don't use coin (above):" + td + "<td>" + abv + td;
         tbl[3] = "<td>Do use coin (left):" + td + "<td>" + lft + td;
         
         msg = "<table>"
            + "<tr>" + tbl[0] + tbl[1] + "</tr>"
            + "<tr>" + tbl[2] + tbl[3] + "</tr>"
            + "</table>" + msg;
        
         av.umsg(msg);
         av.step();
      }
   }


   function backtrack(){
      var cntCoins = [0,0,0];
      var i = jsArr.length - 1;
      var j = jsArr[0].length - 1;

      //style(i, j, style_focus);
      av.umsg("Time to backtrack!");
      av.step();

      while(j > 0){
         // style(i-1, j, style_focus);
         // style(i, j-jsCoins[i], style_focus);
         style(i, j, lookingStyle);
         av.umsg("checking");
         av.step();
         
         if(i > 0 && jsArr[i][j] == jsArr[i-1][j]){
            style(i, j, aboveStyle);
            av.umsg("up");
            av.step();
            //move up
            i--;
         }else{
            style(i, j, leftStyle);
            av.umsg("left");
            av.step();
            //move left
            cntCoins[i]++;
            j -= jsCoins[i];
         }
      }
      console.log(cntCoins);
   }

   /*Index [i][j] is highlighted and has style s applied*/
   function style(i, j, s){
      avArr.css(i, j, s[0]);
      if(i >= 1) avArr.css(i-1, j, s[1]);
      if(j >= jsCoins[i]) avArr.css(i, j-jsCoins[i], s[2]);
   }

   // function xxstyle(i, j, s){
   //    if(i < 0 || j < 0){
   //       return;
   //    }
   //    avArr.css(i, j, s);
   // }
});
