# [7kyu] Two to One

[Original kata](https://www.codewars.com/kata/5656b6906de340bd1b0000ac)

## Details

Take 2 strings `s1` and `s2` including only letters from `a` to `z`. Return a new sorted string, the longest possible, containing distinct letters - each taken only once - coming from `s1` or `s2`.

**Examples:**
```
a = "xyaabbbccccdefww"
b = "xxxxyyyyabklmopq"
longest(a, b) -> "abcdefklmopqwxy"

a = "abcdefghijklmnopqrstuvwxyz"
longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"
```

## Solutions

There are several solutions to this kata:

- With String.prototype.includes. Iterate through alphabet and search for distinct letters in both strings.
- With letter regexp. Same as previous, but regexp.test instead of String.prototype.includes.
- With strings concatenation regexp. Concatenate strings into a regular expression and remove occurring letters from the alphabet string.
- With set. Iterate through strings and add the occurring values ​​to the set.

Duration is based on 1 million runs. This is an approximate number to compare the overall efficiency of algorithms. These values ​​may vary slightly for different test cases.

| Solution                     | Duration (short string) | Duration (long string) |
| ---------------------------- | ----------------------- | ---------------------- |
| String.prototype.includes    | 890ms                   | 1274ms                 |
| Letter regexp                | 1372ms                  | 1719ms                 |
| String concatenation regexp  | 1311ms                  | 6681ms                 |
| Set                          | 1144ms                  | 27567ms                |
