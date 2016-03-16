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

The term *overlapping subproblems* refers to a situation in which breaking a problem into subproblems results in many of the subproblems being identical to one another. The implication of this situation is that by computing the same subproblems multiple times, we are redoing work that has already been done, and are therefore wasting processing resources.

The fundamental principle motivating dynamic programming is the elimination of this duplicated work. Dynamic programming accomplishes this by storing the solutions to subproblems the first time they are solved, then subsequently checking for stored solutions before solving each subproblem. In so doing, dynamic programming trades some space in order to realze an improvement in execution time. 

Case Study: Optimal Change-Making Problem
-----------------------------------------
To illustrate the advantages of dynamic programming, we will take a look at the optimal change-making problem.

Problem Statement
~~~~~~~~~~~~~~~~~
Given an amount of change and a list of coin denominations, output the minimum number of total coins used. Additionally, output how many of each coin were used.

**Note:** While there is always one best answer for the total number of coins, there *may* be more than one way to solve the problem with the minimun total coins. For example, making change 6 units of change, using denominations of 1, 3, and 5 units, coin counts of {1, 0, 1} and {0, 2, 0} are both optimal solutions.

A Typical Recursive Approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
A simple algorithm to solve the problem (not including base cases and the like) might look something like the following:

1. Begin with the desired amount of change
2. For each coin:
	a. Subtract the coin's value from the amount
	b. Recursively compute the solution for this new amount
	c. Increment the counter for the coin that produced the best result

The *big-Oh* runtime of this algorithm is exponential: O(c^a), where c is the number of coins and a is the amount of change to make. The algorithm must branch for each coin, and it will do this, in the theoretical worst case, a number of times equal to the amount of change being made.

A Dynamic Programming Approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For the optimal change-making algorithm, there can be a significant amount of overlap in the subproblems, making it an excellent candidate for a dynamic programming solution. In this particular example we will take a "tabular" or "bottom-up" approach wherein we fill a 2-dimensional array with optimal solutions for the sub-problems.

First, fill a 2-dimensional array of size c x a with subproblem solutions:

1. For each possible amount:
	a. For each coin:
		i. Check the optimal solution using only lower-valued coins
		ii. Subtract this coin's value from amount and check the optimal solution, adding 1 to account for this coin
		iii. Save the better of the two solutions as the optimal vor this (coin, amount) combination
		
Use backtracking to determine what coins were used:

1. Start at the cell corresponding to the largest coin and desired amount of change
2. While amount > 0
	a. Check the optimal solution using only lower-valued coins
	b. Subtract this coin's value from amount and check the optimal solution, adding 1 to account for this coin
	c. Increment the counter for the coin that produced the best result

Since we save results of subproblems when they are computed, we no longer duplicate that work. Our runtime is dominated by the process of filling the array of subproblem solutions. In this case, our program is O(c*a), a tremendous improvement over our initial solution.

Optimal Change-Making Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Observe the following slideshow example, demonstrating a dynamic-programming implementation of the optimal change-making algorithm in action:

.. inlineav:: brad-test ss
   :output: show
.. odsascript:: AV/Development/dynamic-programming/brad-test.js

embedded here?
--------------
something

Exercises
---------
Don't fail!

.. avembed:: Exercises/Development/Thangacadex3.html ka
