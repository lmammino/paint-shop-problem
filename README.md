# Paint shop problem

This code is my attempt at solving the "Paint Shop Problem", problem commonly used in interviews or coding challenges.

[Read the problem assignment](/PROBLEM.md)


## Running the code

### Requirements

In order to run the code you will need Node.js (version `>= 6.12`) installed.


### Dependencies

The code does not use any library, exception made for the tests. If you are planning to run the test files you have to run:

```bash
npm install
```

Before starting.


### Running

The solution is constructed as a command line program that accepts the path to the input file as first (and only parameter).

The command can be executed with:

```bash
node src/index.js <path to input file>
```

The example files from the problem description are stored in `[exmaples](/examples)` so you can run the program against them. E.g:

```bash
node src/index.js examples/case1.txt
```

You can also pass `--help` or `-h` as first parameter to access the inline command line help.


## The solution algorithm

In this section is described the solution algorithm I designed and implemented to solve the problem.

The general idea is that the algorithm selects a color for every customers and tries to verify if the resulting sequence is an acceptable solution given the constraints defined by the problem.

All the possible combinations are tested and explored in an order that guarantees compliance with the constraints (E.g a finish of type `Gloss` is always preferred to a finish of type `Matte` where possible).

If a solution is found, the program stops immediately without exploring other possible solutions. If no solution is found (after testing all the sequences) the program outputs `No solution exists` and exit.

### Step 1 — Input parsing

In this step the source file is parsed and converted in memory in a data structure the respects the following specification:

```javascript
{
  numColors: (int),
  customerPreferences: [
    [
      {
        color: (int),
        finish: ('M'|'G')
      },
      // ...
    ],
    // ...
  ]
}
```

Where:

  - `numColors` is an integer defining the number of possible colors
  - `customerPreferences` is an array, where every element is an array of preferences for a given customer. Every preference contains a `color` (defined by an integer in the range \[`1`-`numColors`\]) and a `finish` (a char, either `G` for "gloss" or `M` for "matte").

The parser is quite dummy and doesn't try to detect malformed input files. So it will likely crash with invalid inputs without providing meaning errors.

Also the parser assumes that the input file are quite small and load them directly in memory in a single blob, which is not ideal with big files.


### Step 2 — Input preparation

In this step the object resulting from the parsing step is modified in order to make the successive steps easier to address.

There are two main changes that are applied: "preferences sorting" and "read only preferences marking".

#### Preferences sorting

For every customer, their preferences are sorted to comply with the following rules:

  - A color in gloss comes always before a color in matte
  - A color with an smaller index comes always before a color with a bigger index

For example the following set of preferences for a customer:

```plain
4M 5G 1M 2G
```

Gets sorted to:

```plain
2G 5G 1M 4M
```

This step will make sure that, in the following steps, solutions that optimize the costs by having more gloss colors are preferred.

#### Read Only preferences

All the customers with a single preference of color (only one element in their array) gets the element marked as read only (additional property `readOnly` set to `true`).

This step allows us to spot conflicting situations (invalid solutions) during the sequence validation phase.

### Step 3. — Determine sequences of possible solutions

At this point the set of all the possible solutions to the problem can be constructed by choosing all the possible sequences that are defined by selecting (in order) one element per every customer.

For instance, given the following set of "prepared" preferences (where the asterisk indicates a `readOnly` option):

```plain
3G 5G 1M
2G 4G 3M
5M*
```

The set of the sorted possible solutions sequences is given by:

  1. `3G 2G 5M*`
  2. `3G 4G 5M*`
  3. `3G 3M 5M*`
  4. `5G 2G 5M*`
  5. `5G 4G 5M*`
  6. `5G 3M 5M*`
  7. `1M 2G 5M*`
  8. `1M 4G 5M*`
  9. `1M 3M 5M*`

### Step 4. — Sequence validation

In this step we have as input the total number of colors available and a single sequence coming from the previous step<sup>(1)</sup>.

...




<bold>Note<sup>(1)</sup></bold>: In the current implementation, steps 3 and 4 are intertwined in a streaming fashion and they are not really sequential: after a single sequence is generated (step 3), it is immediately validated (step 4). This way, as soon as the program identifies a valid solution it can stop computing possible successive sequences and exits.


## Source code

...


## Tests

...


## Possible optimizations

  1. Make the parser streaming so that it could be able to load also large files
  2. Use a proper grammar based parser ([example grammar](extra/sample-grammar.ne)) so that it can detect malformed input files


## Complexity

...


## License

Licensed under [MIT License](/LICENSE). © Luciano Mammino.
