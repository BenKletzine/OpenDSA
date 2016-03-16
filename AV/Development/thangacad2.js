"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
  var amount;
  var denom;
  var jsCoins = [];
  var avMatrix;
  var jsMatrix;
  var avCoins;
  var slides = [];
   const DEBUG = true;
   const INVALID = 1337;
  
   const style_default = {"background-color":"white"};
   const style_focus = {"background-color":"yellow"};
   const style_current = {"background-color":"lightgray"};
   const style_reject = {"background-color":"salmon"};
   const style_accept = {"background-color":"lightgreen"};
  
     function makeStyle(a, b, c){
      var s = [a, b, c];
      return function(){return s;};
   }
  
   var defaultStyle = makeStyle(style_default, style_default, style_default)();
   var trailStyle = makeStyle(style_current, style_default, style_default)();
   var lookingStyle = makeStyle(style_current, style_focus, style_focus)();
   var aboveStyle = makeStyle(style_current, style_accept, style_reject)();
   var leftStyle = makeStyle(style_current, style_reject, style_accept)();
   
  
  
  
  //var jsArr=[[],[]];
  
function runit() {
    ODSA.AV.reset(true);
    //var theArray = [];

    amount = document.getElementById("totalAmount").value;
    denom = document.getElementById("denomination").value.trim().split(" ");

    //set size for total amount
    if(amount > 14 || amount < 8)
    {
        amount = 10;
    }
    //set size for denom
    
    for(var i=0; i < denom.length; i++)
    {
        jsCoins[i] = denom[i];
       // console.log(jsCoins[i]);
    }
    
    //for(var i = 0; i < amount; i++)
    //{
     //   theArray.push(i);
    //}
    
    for(var i =0; i< 100; i++)
    {
      slides[i] = i;
    }
    
    console.log(jsCoins.length);
    console.log(amount);
    
    jsMatrix = arrInit(jsCoins.length, amount);
    
    //console.log(jsMatrix.length);
    
    JSAV.init();
    av = new JSAV($('.avcontainer'));
    avMatrix = av.ds.matrix(jsMatrix);
    avCoins = av.ds.array(jsCoins, {"layout":"vertical",
      "relativeTo":avMatrix, "anchor":"left center", "myAnchor":"right center"});
    
    av.umsg("Test1");
    av.displayInit();
    
    getCha(amount, slides);
    
    //backtrack();
    
    av.umsg("that's all, folks");
    av.recorded();
}


function about() {
   alert("Simple array visualization");
}
  
function help() {
   alert("Help for simple array visualization");
}

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
         for (var j = 0; j < jsMatrix[i].length && j <= amt; ++j){
            above = left = INVALID;
            //get optimals for using (left) and not-using (above) the current coin
            var above = i > 0 ? jsMatrix[i-1][j] : INVALID;
            var left = j == 0 ? 0 : j >= jsCoins[i] ? jsMatrix[i][j-jsCoins[i]] +1 : INVALID;
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
   }


   function backtrack(){
      var cntCoins = [0,0,0];
      var i = jsMatrix.length - 1;
      var j = jsMatrix[0].length - 1;

      av.umsg("Time to backtrack!");
      av.step();

      while(j > 0){         
         if(i > 0 && jsMatrix[i][j] == jsMatrix[i-1][j]){
            slide("up", aboveStyle, defaultStyle);
            i--;
         }else{
            slide("left", aboveStyle, trailStyle);
            cntCoins[i]++;
            j -= jsCoins[i];
         }
      }
      console.log(cntCoins);

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

  
ODSA.AV.initArraySize(7, 13, 10);


// Connect action callbacks to the HTML entities
//$('#Eight').click(changeEight);
//$('#Nine').click(changeNine);
//$('#Ten').click(changeTen);
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
