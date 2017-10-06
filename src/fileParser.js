const { readFileSync } = require('fs')

const fileParser = (filePath) => {
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split(/[\r\n]+/)

  const numColors = parseInt(lines.shift(), 10)
  const customerPreferences = lines
    .map((line) => line.split(/\s+/))
    .filter(records => Boolean(records[0] !== '')) // removes empty lines

  return { numColors, customerPreferences }
}

module.exports = fileParser
