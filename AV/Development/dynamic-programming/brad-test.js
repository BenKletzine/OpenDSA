"use strict";

$(document).ready(function () {
   var style_default = {"background-color":"lightgray"};
   var style_reject = {"background-color":"lightred"};
   var style_accept = {"background-color":"lightgreen"};
   var style_highlight = {"background-color":"yellow"};
   var style_current = {"background-color":"lightteal"};
   //var style_test = {"background-color":"blue"};
   //var style_path = {"background-color":"lightgreen"};

   //js vars
   var amount = 13;
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
   //end first slide

   getCha(amount, slides);
   // new slide
   backtrack();

   av.umsg("execution complete");
   av.step();

   // last slide
   av.umsg("that's all, folks");
   av.recorded();

   // If you add av.umsg after av.recorded, it will add new slides in
   // ways that you probably do not expect and probably cannot
   // control in the way that you want. As av.recorded() rewinds the
   // slideshow, the new slides would go to the beginning of the slideshow.
   // So, unless you are trying to add slides on-the-fly
   // interactively, you don't want to do this.
   // av.umsg("Text after av.recorded()");   

   /*Get denominations to be used*/
   function getCoins(){
      //add user input
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
            above = left = 1337;

            style(i, j, style_highlight);
            slide("Finding optimal solution for next cell.");
            style(i, j, style_default);

            //get optimals for using (left) and not-using (above) the current coin
            //var above = i > 0 ? jsArr[i-1][j] : 1337;
            if(i > 0){
               above = jsArr[i-1][j];

               style(i - 1, j, style_highlight);
               slide("Look 'above' for optimal solution without this coin.");
               //style(i - 1, j, style_current);
            }else{
               above = 1337;
               slide("This is the first coin, so there is no solution without this coin.");
            }
            //var left = j == 0 ? -1 : j >= jsCoins[i] ? jsArr[i][j-jsCoins[i]] : 1337;
            if(j == 0){
               left = 0;
               slide("Amount of change is 0, so no coins are used. (base case)");
            }else if(j >= jsCoins[i]){
               left = jsArr[i][j-jsCoins[i]] + 1;

               style(i, j-jsCoins[i], style_highlight);
               slide("Look 'left' for solution. (current amount minus coin value)");
               //style(i, j-jsCoins[i], style_default);
            }else{
               left = 1337;
               slide("Coin value is greater than current amount, so no solution is possible with this coin.");
            }
            

            //choose better option and update js *AND* av arrays
            //jsArr[i][j] = above > left ? left + 1 : above;
            if(left <= above){
               jsArr[i][j] = left;
               avArr.value(i, j, left);

               style(i - 1, j, style_reject);
               style(i, j-jsCoins[i], style_accept);
               slide("Optimal solution uses this coin. (left + 1)");
            }else{
               jsArr[i][j] = above;
               avArr.value(i, j, above);

               style(i - 1, j, style_accept);
               style(i, j-jsCoins[i], style_reject);
               slide("Optimal solution does not use this coin. (above)");
            }
            //set default style
            style(i - 1, j, style_default);
            style(i, j-jsCoins[i], style_default);
            //style(i, j, style_default);

            console.log("frame: " + cnt + "\n");            
            //consume frame marker if slide was generated
            if(cnt++ == show[0]){
               show.shift();
            }
         }
      }

      //only add msg and step if a slide is desired
      function slide(msg){
         if(cnt != show[0]) return;

         var abv = above == 1337 ? "-" : above;
         var lft = left == 1337 ? "-" : left;
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

      //style(i, j, style_highlight);
      av.umsg("Time to backtrack!");
      av.step();

      while(j > 0){
         style(i-1, j, style_highlight);
         style(i, j-jsCoins[i], style_highlight);
         av.umsg("checking");
         av.step();
         
         if(i > 0 && jsArr[i][j] == jsArr[i-1][j]){
            style(i-1, j, style_accept);
            style(i, j-jsCoins[i], style_reject);
            av.umsg("up");
            av.step();
            //style(i-1, j, style_default);
            //style(i, j-jsCoins[i], style_default);

            i--;
         }else{
            style(i-1, j, style_reject);
            style(i, j-jsCoins[i], style_accept);
            av.umsg("left");
            av.step();
            //style(i-1, j, style_default);
            //style(i, j-jsCoins[i], style_default);

            cntCoins[i]++;
            j -= jsCoins[i];
         }
      }
      console.log(cntCoins);
   }

   /*Index [i][j] is highlighted and has style s applied*/
   function style(i, j, s){
      if(i < 0 || j < 0){
         return;
      }
      avArr.css(i, j, s);
   }
});
