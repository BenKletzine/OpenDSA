"use strict";

$(document).ready(function () {
   var s0 = {"background-color":"lightgray"};
   var s1 = {"background-color":"sandybrown"};
   var s2 = {"background-color":"skyblue"};
   var s3 = {"background-color":"lightgreen"};
   var s4 = {"background-color":"violet"};

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
      for (var i = 0; i < coins; i++) {
         arr[i] = new Array(amount + 1);
      }
      return arr;
   }

   /*Compute solution and generate slides at specified indexes*/
   function getCha(amt, show){
      var cnt = 0;
      for (var i = 0; i < jsArr.length; ++i) {
         for (var j = 0; j < jsArr[i].length && j <= amt; ++j) {
            //get optimals for using(left) and not using(above) current coin
            var above = i > 0 ? jsArr[i-1][j] : 1337;
            var left = j == 0 ? -1 : j >= jsCoins[i] ? jsArr[i][j-jsCoins[i]] : 1337;

            //choose better option and update js *AND* av arrays
            jsArr[i][j] = above > left ? left + 1 : above;
            avArr.value(i, j, jsArr[i][j]);

            console.log("cnt: " + cnt + "\n");

            //only add msg and step if a slide is desired
            if(cnt++ == show[0]){
               /*apply "looking at" style here*/
               avArr.highlight(i, j);
               av.umsg("coin: " + jsCoins[i] + "; index: " + i + "," + j);
               av.step();
               show.shift();
            }

            //apply "completed" style
            style(i, j, s0);
         }
      }
   }

   function backtrack(){
      var cntCoins = [0,0,0];
      var i = jsArr.length - 1;
      var j = jsArr[0].length - 1;

      while(j > 0){
         if(i > 0 && jsArr[i][j] == jsArr[i-1][j]){
            i--;
            avArr.highlight(i, j);
            av.umsg("baH");
            av.step();
            style(i, j, s3);
         }else{
            j -= jsCoins[i];
            cntCoins[i]++;
            avArr.highlight(i, j);
            av.umsg("baH");
            av.step();
            style(i, j, s2);
         }
         
         
         
      }
      console.log(cntCoins);
   }

   /*Index [i][j] is highlighted and has style s applied*/
   function style(i, j, s){
      
      avArr.unhighlight(i, j);
      avArr.css(i, j, s);
   }
});
