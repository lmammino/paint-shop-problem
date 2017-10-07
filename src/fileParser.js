const { readFileSync } = require('fs')

const fileParser = (filePath) => {
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split(/[\r\n]+/)

  const numColors = parseInt(lines.shift(), 10)
  const customerPreferences = lines
    .map(line => line.split(/\s+/))
    .filter(records => Boolean(records[0] !== '')) // removes empty lines
    .map(l => l.reduce((acc, curr) => { // converts preferences to object with 'color' and 'finish' properties
      if (curr === 'M' || curr === 'G') {
        acc[acc.length - 1].finish = curr
      } else {
        acc.push({ color: parseInt(curr, 10) })
      }

      return acc
    }, []))

  return { numColors, customerPreferences }
}

module.exports = fileParser
