.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Thang, Brad, and Ben

=====================================================================
Introduction: Dynamic Programming - Minimum Coin Change
=====================================================================

Overview of Dynamic Programming and Minimum Coin Change
-------------------------------------------------------
In this section of Dynamic Programming we will be discussing about the
minmum coin change problem.

Dynamic Programming is a method that solves complex problems by breaking
them down into smaller and simpler problems. When solving these smaller
subproblems we will store its solution to be used  in the same subproblem
instead of resolving its solution again. This can save us a lot of time.

Minimum coin change problem is a problem in which an individual is asked to 
make change using the minimum number of coins using a set of denominations.
Here is an example.

.. inlineav:: brad-test ss
   :output: show

Minimum Coin Change with User Input
-----------------------------------

Previously we had the inlineav where the inputs are random and the 
user is just given a matrix. In this next set of visualization we 
have an embedded AV where it will allow us to process input from
the user. 
Try it out for yourself!


.. avembed:: AV/Development/thangacad2.html ss

Minimum Coin Change Question
-----------------------------------------------------

Here we have an exercise for you to try. The change wanted is
displayed as well as the denomination. You are to determine the 
next value in the matrix by using what you've learned. If you 
are stuck try using a hint.

.. avembed:: Exercises/Development/Thangacadex3.html ka


.. odsascript:: AV/Development/dynamic-programming/brad-test.js
