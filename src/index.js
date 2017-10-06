const fileParser = require('./fileParser')

const inputFile = process.argv[2]

if (!inputFile) {
  console.error(
`Missing input file argument

  Usage:

  ${process.argv[0]} ${process.argv[1]} <inputFile>`
  )
}

console.log(fileParser(inputFile))
