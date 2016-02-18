"use strict";

$(document).ready(function () {
    JSAV.init();
    var av = new JSAV("av-name-here");

    var jsArr = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    //var avArr = av.ds.array(theArray, {indexed: true});
    var jsCoins = [1,3,5];
    //var avCoins = av.ds.array(bkCoins, {indexed: true});

    var function getCha(amt){
      for (var i = 0; i < jsArr.length; ++i) {
        for (var i = 0; i < jsArr[i].length; i++) {
          var above = i > 0 ? jsArr[i-1][j] : 999;
          var left = j >= jsCoins[i] ? jsArr[i][j-jsCoins[i]] : 999;

          jsArr[i][j] = above < left ? above + 1 : left + 1;
        }
      }
    }

    var avArr = av.ds.array(theArray, {indexed: true});

    //slide (#1)
    av.umsg("..Text before displayInit()");

    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();

    // We are now starting a new slide (#2)
    av.umsg("...and text after displayInit()", {preserve: true});

    //function call here...
    //
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
