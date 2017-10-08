#!/usr/bin/env node

const { version } = require('../package.json')
const fileParser = require('./fileParser')
const solver = require('./solver')

const usage = `
  Usage:

  ${process.argv[0]} ${process.argv[1]} <inputFile>
`

if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  console.log(`Paint shop problem version ${version}`)
  console.log(usage)
  process.exit(0)
}

const inputFile = process.argv[2]

if (!inputFile) {
  console.error('Missing input file argument')
  console.log(usage)
  process.exit(1)
}

try {
  const data = fileParser(inputFile)
  const result = solver(data)

  console.log(result)
} catch (err) {
  console.error(err)
  process.exit(1)
}
