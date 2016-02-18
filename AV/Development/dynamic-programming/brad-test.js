"use strict";

$(document).ready(function () {
    JSAV.init();

    var av = new JSAV("brad-test");
    var jsArr = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    var jsCoins = [1,3,5];
    var avArr = av.ds.matrix(jsArr);

    //slide (#1)
    av.umsg("..Text before displayInit()");

    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();


    var getCha = function(amt){
      for (var i = 0; i < jsArr.length; ++i) {
        for (var j = 0; j < jsArr[i].length && j <= amt; ++j) {
          var above = i > 0 ? jsArr[i-1][j] : 40;
          var left = j == 0 ? -1 : j >= jsCoins[i] ? jsArr[i][j-jsCoins[i]] : 50;
          jsArr[i][j] = above > left ? left + 1 : above;

          var arr = av.ds.matrix(jsArr);
          av.umsg("...and text after displayInit()"+i+","+j, {preserve: true});
          av.step();
        }
      }
    }
    getCha(13);

    //jsArr = [0,1,2,3,4,5,6];
    



    // We are now starting a new slide (#2)
    av.umsg("...and text after displayInit()", {preserve: true});

    //function call here...
    avArr.swap(1,1,2,2);
    av.step();

    // We are now starting a new slide (#3)
    av.umsg("..Text after av.step()");


    //end of slides
    av.recorded();

    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");
});
