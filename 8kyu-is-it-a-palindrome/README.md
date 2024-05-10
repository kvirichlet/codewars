# [8kyu] Is it a palindrome?

[Original kata](https://www.codewars.com/kata/57a1fd2ce298a731b20006a4/javascript)

## Details

Write a function that checks if a given string (case insensitive) is a palindrome.

A palindrome is a word, number, phrase, or other sequence of symbols that reads the same backwards as forwards, such as `madam` or `racecar`.

## Solutions

There are several solutions to this kata:

- With reverse. Take a line and reverse it, then compare it to the original.
- With characters comparison in a loop. Compare characters from different ends of the string one by one in a loop.
- With charcodes comparison in a loop. Compare character codes from different ends of the string one by one in a loop.

Duration is based on 100 million runs. This is an approximate number to compare the overall efficiency of algorithms. These values ​​may vary slightly for different test cases.

| Solution              | Duration |
| --------------------- | -------- |
| Reverse               | 20508ms  |
| Characters comparison | 1909ms   |
| Charcodes comparison  | 694ms    |
