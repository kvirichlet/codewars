# [6kyu] Multiples of 3 or 5

[Original kata](https://www.codewars.com/kata/514b92a657cdc65150000006)

## Instructions

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.

Additionally, if the number is negative, return 0.

## Solutions

There are several solutions to this kata:

- With sum of arithmetic progression. Sum 3 and 5, subtract 15 since divisible by 3 and 5 will occur in both progressions.
- With loop. Iterate through numbers and sum divisible by 3 or 5.

Duration is based on 1 million runs. This is an approximate number to compare the overall efficiency of algorithms. These values ​​may vary slightly for different test cases.

| Solution               | Duration (small number) | Duration (big number) |
| ---------------------- | ----------------------- | --------------------- |
| Arithmetic Progression | 5ms                     | 9ms                   |
| Loop                   | 62ms                    | 4851ms                |