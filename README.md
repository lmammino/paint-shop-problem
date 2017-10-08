# Paint shop problem

This code is my attempt at solving the "Paint Shop Problem", problem commonly used in interviews or coding challenges.

[Read the problem assignment](PROBLEM.md)

## ToC

  1. [Running the code](#running-the-code)
  2. [The solution algorithm](#the-solution-algorithm)
  3. [Source code](#source-code)
  4. [Tests](#tests)
  5. [Possible optimizations](#possible-optimizations)
  6. [Complexity](#complexity)
  7. [License](#license)


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

The example files from the problem description are stored in [`examples`](examples) so you can run the program against them. E.g:

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

```
4M 5G 1M 2G
```

Gets sorted to:

```
2G 5G 1M 4M
```

This step will make sure that, in the following steps, solutions that optimize the costs by having more gloss colors are preferred.

#### Read Only preferences

All the customers with a single preference of color (only one element in their array) gets the element marked as read only (additional property `readOnly` set to `true`).

This step allows us to spot conflicting situations (invalid solutions) during the sequence validation phase.

### Step 3. — Determine sequences of possible solutions

At this point the set of all the possible solutions to the problem can be constructed by choosing all the possible sequences that are defined by selecting (in order) one element per every customer.

For instance, given the following set of "prepared" preferences (where the asterisk indicates a `readOnly` option):

```
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

In this step we have as input the total number of colors available and a single sequence coming from the previous step **(1)**.

The validation algorithm follows these steps:

  1. Allocate colors array
  2. Apply elements of the sequence to the colors array
  3. Fill empty spaces of the colors array with `G`
  4. Construct the solution string from the colors array

**Note (1)**: In the current implementation, steps 3 and 4 are intertwined in a streaming fashion and they are not really sequential: after a single sequence is generated (step 3), it is immediately validated (step 4). This way, as soon as the program identifies a valid solution it can stop computing possible successive sequences and exits.

#### Step 4.1 — Allocate colors array

In this step an array of `null` of size `numColors` is generated. For instance if `numColors` is `5` the following array is generated:

| 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| `null` |  `null` |  `null` |  `null` |  `null` |

#### Step 4.2 — Apply elements of the sequence to the colors array

This is the main phase of the validation step. It follows will mutate the colors array as per the following rules:

  - every cell of the colors array indicates a color (color 1 will go in index 0, color 2 in index 1 and so on...)
  - for every preference in the current sequence:
    - if the cell for the current color is empty the finish of the current preference is copied in the cell
    - if the cell for the current color is NOT empty, it can be overridden with a new finish only if the current color and the current preference are not read only
    - if a cell cannot be overriden the current sequence is invalid and the validation algorithm stops immediately

An example execution for `5` colors and the sequence `3G 2G 5M*` will produce the following steps:

|   | 0 | 1 | 2 | 3 | 4 |
| ---: | :---: | :---: | :---: | :---: | :---: |
| *(start)* | `null` |  `null` |  `null` |  `null` |  `null` |
| *`3G` ⇒* | `null` |  `null` |  **G** |  `null` |  `null` |
| *`2G` ⇒* | `null` |  **G** |  G |  `null` |  `null` |
| *`5M*` ⇒* | `null` |  G |  G |  `null` |  **M** |

#### Step 4.3 — Fill empty spaces of the colors array with `G`

In this step we simply fill the spaces in the colors array still containing null with `G` (if any). This will happen if no customer has specified a preference for some of the colors in the current sequence.

From the previous example:

|   | 0 | 1 | 2 | 3 | 4 |
| ---: | :---: | :---: | :---: | :---: | :---: |
| ... | ... |  ... |  ... |  ... |  ... |
| *`5M*` ⇒* | `null` |  G |  G |  `null` |  **M** |
| *(fill)* | **G** |  G |  G |  **G** |  M |

#### Step 4.4 — Construct the solution string from the colors array

All the elements in the last line from the previous steps are concatenated (with a space in between) and this produces the expected solution.

In the previous example: `G G G G M`


## Source code

Source code is available in the [source folder (`src`)](src). Code is modular and tests are co-located with every functionality.

The code contains comments and it is written in a functional style, aiming to be as much expressive and readable as possible.


## Tests

Tests are written using [Jest](https://facebook.github.io/jest/) and are saved inside [`src`](src) within `__tests__` folders.

To run the tests simply run:

```bash
npm test
```


## Possible optimizations

  1. Make the parser streaming so that it could be able to load also large files
  2. Use a proper grammar based parser ([example grammar](extra/sample-grammar.ne)) so that it can detect malformed input files


## Complexity

If we identify with `n` the number of colors available and with `m` the number of customers, the computational complexity of this solution is `O(m * n^m)`.

For example, if we have 5 colors and 3 customers, in the worst case where every customer specifies 5 preferences we end up with 5 * 5 * 5 (n^m) possible sequences to test. Every sequence verification takes at most 3 (m) steps to be verified, so we end up with a worst case complexity of `m * n^m`.


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
