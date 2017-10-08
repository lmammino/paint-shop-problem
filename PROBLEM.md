# The paint shop problem

You run a paint shop, and there are a few different colors of paint you can prepare.  Each color can be either "gloss" or "matte".

You have a number of customers, and each have some colors they like, either gloss or matte.  No customer will like more than one color in matte.

You want to mix the colors, so that:
  * There is just one batch for each color, and it's either gloss or matte.
  * For each customer, there is at least one color they like.
  * You make as few mattes as possible (because they are more expensive).

Your program should accept an input file as a command line argument, and print a result to standard out.  An example input file is:

```plain
5
1 M 3 G 5 G
2 G 3 M 4 G
5 M
```

The first line specifies how many colors there are.

Each subsequent line describes a customer.  For example, the first customer likes color 1 in matte, color 3 in gloss and color 5 in gloss.

Your program should read an input file like this, and print out either that it is impossible to satisfy all the customer, or describe, for each of the colors, whether it should be made gloss or matte.

The output for the above file should be:

```plain
G G G G M
```

...because all customers can be made happy by every paint being prepared as gloss except number 5.

An example of a file with no solution is:

```plain
1
1 G
1 M
```

Your program should print

No solution exists

A slightly richer example is:

```plain
5
2 M
5 G
1 G
5 G 1 G 4 M
3 G
5 G
3 G 5 G 1 G
3 G
2 M
5 G 1 G
2 M
5 G
4 M
5 G 4 M
```

...which should print:

```plain
G M G M G
```

One more example.  The input:

```plain
2
1 G 2 M
1 M
```

...should produce

```plain
M M
```
