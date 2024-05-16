# [7kyu] Vowel Count

[Original kata](https://www.codewars.com/kata/54ff3102c1bad923760001f3)

## Instructions

Return the number (count) of vowels in the given string.

We will consider `a`, `e`, `i`, `o`, `u` as vowels for this Kata (but not `y`).

The input string will only consist of lower case letters and/or spaces.

## Solutions

There are several solutions to this kata:

- With String.prototype.includes. Iterate through string, check if the `aeiou` string includes the letter.
- With String.prototype.replace. Replace occurrences. Return the length of the returned string.
- With String.prototype.match. Match occurrences. Return the length of the returned array.

Duration is based on 10 million runs. This is an approximate number to compare the overall efficiency of algorithms. These values may vary slightly for different test cases.

| Solution                  | Duration (short string) | Duration (short string, no occurrences) | Duration (long string) | Duration (long string, no occurrences) |
| ------------------------- | ----------------------- | --------------------------------------- | ---------------------- | -------------------------------------- |
| String.prototype.includes | 68ms                    | 60ms                                    | 3429ms                 | 3079ms                                 |
| String.prototype.replace  | 120ms                   | 168ms                                   | 3598ms                 | 6508ms                                 |
| String.prototype.match    | 187ms                   | 60ms                                    | 5901ms                 | 288ms                                  |
