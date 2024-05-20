# [3kyu] Fix the pipes - #2 - is it leaking?

[Original kata](https://www.codewars.com/kata/59f81fe146d84322ed00001e)

## Instructions

The goal of this kata is to check whether a network of water pipes is leaking anywhere.

**Task**

Create a function which accepts a `map` input and validates if water is leaking anywhere. In case water is leaking return `false`. In case the pipe network is correct -- i.e. there are no leaks anywhere -- return `true`.

There can be multiple water sources. All pipes which are directed outside of the map are connected to a water source, and you need to check them for leaks.

```
For example, in the map below:

     ╋━━┓
     ┃..┃
     ┛..┣
     
The water sources (marked with +) are:           
     +
   + ╋━━┓
     ┃..┃
   + ┛..┣ +
        +

This map shows a correct pipe network. It's not leaking anywhere.
```

A leaking pipeline example :

```
The leak is marked by the arrow pointing to the top left-hand corner of the map:

 --> ...┏ +
     ┃..┃
   + ┛..┣ +
        +
```

A leak may involve a pipe pointing to an empty cell in the map, like this: `━━.`. It may also involve a pipe pointing to another pipe that does not point back, like this: `━━┗`

There can be also 'old pipes` on the map which are not connected to water sources. You should ignore such pipes.

```
    ....
    .┛┛.
    ....
```

There are two old pipes not connected to a water source. Water is not leaking, so the function should return `true`.

![](https://i.postimg.cc/cC1WjZ6f/Leaking.png)

**Notes**

- Check the test cases for more samples
- Unicode UTF-8 characters used for pipes:

```
┗ - 9495 - BOX DRAWINGS HEAVY UP AND RIGHT
┓ - 9491 - BOX DRAWINGS HEAVY DOWN AND LEFT
┏ - 9487 - BOX DRAWINGS HEAVY DOWN AND RIGHT
┛ - 9499 - BOX DRAWINGS HEAVY UP AND LEFT
━ - 9473 - BOX DRAWINGS HEAVY HORIZONTAL
┃ - 9475 - BOX DRAWINGS HEAVY VERTICAL
┣ - 9507 - BOX DRAWINGS HEAVY VERTICAL AND RIGHT
┫ - 9515 - BOX DRAWINGS HEAVY VERTICAL AND LEFT
┳ - 9523 - BOX DRAWINGS HEAVY DOWN AND HORIZONTAL
┻ - 9531 - BOX DRAWINGS HEAVY UP AND HORIZONTAL
╋ - 9547 - BOX DRAWINGS HEAVY VERTICAL AND HORIZONTAL
```
