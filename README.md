A nontransitive dice game in JavaScript is a simulation where each die can beat another with a higher probability, but the relationship is nontransitive—like rock-paper-scissors. For example, Die A beats Die B, Die B beats Die C, and Die C beats Die A, even though each die seems fair.

In JavaScript, the game typically:

Defines custom dice as arrays of numbers (e.g., [2, 2, 4, 4, 9, 9])
Compares each pair of dice by simulating multiple rolls
Calculates which die wins more often
