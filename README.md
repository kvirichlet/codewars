# Codewars solutions

Solutions of Codewars katas in Javascript (v10.x).

I do not pretend to be the number one katas solver using best practices, however, tried to make efficient, easy-to-read and maintainable code. Do not read my solutions if you plan to solve the katas yourself. That would just ruin all the fun.

Feel free to [add me](https://www.codewars.com/users/Dirichlet).

## Development notes

Some features of the latest (v16.x) node version are not supported since an older (v8.1.3, v10.x or v12.x) version is used in the Codewars sandbox. Thus, a number of solutions are implemented in a different way, which could be made simpler in the current version.

Codewars has a limit on the execution of the entire set of test cases (12 seconds). All written solutions comply with the specified limit and have been verified and submitted.

## Repository structure

The repository consists of folders with completed katas. The folder names begin with the "{{number}}kyu", where the number indicates the difficulty of the task. The number ranges from 8 (beginner) to 1 (expert).

Each folder contains several files:

* `README.md` - description of the kata
* `index.js` - solution of the kata
* (optional) `examples.json` - brief description of the fixed test cases, arguments and the expected result
* (optional) `additional-test-cases.js` - a set of additional tests required to validate the solution
* (optional) `test-case-maker.js` - a function to create a set of description - random arguments and the expected result

Most kata contain only a set of simple fixed test cases based on boundary value analysis and equivalence partitioning including positive and necessary negative cases.

If a task requires additional test cases, there will be a separate file with such cases in the target folder.

Also, some folders will contain random case generator. They are not part of the solution. However, sometimes they will be added, since the problem of generating random data is also interesting to me.
