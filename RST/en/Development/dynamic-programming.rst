.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Brad LaVigne

============================================================
Dynamic Programming
============================================================

Overview
--------
Dynamic programming is a strategy for solving problems that can be broken up into overlapping subproblems.

def operlapping subs

desc dp strat for subs

Case Study: Optimal Change-Making Algorithm
-------------------------------------------
Problem Statement
~~~~~~~~~~~~~~~~~
Given an amount of change and a list of coin denominations, output the minimum number of total coins used. Additionally, output how many of each coin were used.

**Note:** While there is always one best answer for the total number of coins, there *may* be more than one way to solve the problem with the minimun total coins. For example, making change 6 units of change, using denominations of 1, 3, and 5 units, coin counts of {1, 0, 1} and {0, 2, 0} are both optimal solutions.

The Naive Approach
~~~~~~~~~~~~~~~~~~
A simple algorithm to solve the problem:
1. Begin with the desired amount of change
2. For each coin:

	a. Subtract the coin's value from the amount
	b. Compute the solution for the remainder by beginning at step 1 with the new amount

3. Increment the counter for the coin that produced the best result
4. Return solution

The *big-Oh* runtime of this algorithm is exponential: c^a, where c is the number of coins and a is the amount of change to make. The algorithm must branch for each coin, and it will do this, in the theoretical worst case, a number of times equal to the amount of change being made.

The Dynamic Programming Approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For the optimal change-making algorithm, there can be a significant amount of overlap in the subproblems, which makes it an excellent candidate for a dynamic programming solution.

1. Begin with the desired amount of change
2. For each coin:

	a. Subtract the coin's value from the amount
	b. Check for existing solution for the new amount
	
		i. If solution for this amount exists, use that solution
		ii. Else, compute the solution for the remainder by beginning at step 1 with the new amount

3. Increment the counter for the coin that produced the best result
4. Return solution



Optimal Change-Making Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Consider the following example which demonstrates a dynamic-programming implementation of the optimal change-making algorithm:

.. inlineav:: brad-test ss
   :output: show
.. odsascript:: AV/Development/dynamic-programming/brad-test.js

Exercises
---------
