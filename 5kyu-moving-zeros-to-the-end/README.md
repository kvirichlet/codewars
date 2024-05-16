# [5kyu] Moving Zeros To The End

[Original kata](https://www.codewars.com/kata/52597aa56021e91c93000cb0)

## Instructions

Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

```
[false, 1, 0, 1, 2, 0, 1, 3, 'a'] => [false, 1, 1, 2, 1, 3, 'a', 0, 0]
```

## Solutions

There are several solutions to this kata:

- Two pointers. Iterate through array, if 0 is encountered, stop the left pointer. Write other elements to the left pointer position. Fill the rest with zeros.
- Array filter. Filter non-zeros. Fill the rest with zeros.
- Array accumulator. Iterate through array, аill the accumulator array with non-zeros. Fill the rest with zeros.

Duration is based on 1 million runs. This is an approximate number to compare the overall efficiency of algorithms. These values ​​may vary slightly for different test cases.

| Solution          | Duration (small array) | Duration (big array) |
| ----------------- | ---------------------- | -------------------- |
| Two pointers      | 37ms                   | 2219ms               |
| Array filter      | 62ms                   | 3427ms               |
| Array accumulator | 57ms                   | 2883ms               |
