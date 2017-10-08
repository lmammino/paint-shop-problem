const sortColor = (a, b) => {
  // G is always smaller than M
  if (a.finish === 'G' && b.finish === 'M') {
    return -1
  }

  // M is always bigger than G
  if (a.finish === 'M' && b.finish === 'G') {
    return 1
  }

  // if same finish, sort by color ascendent
  return a.color - b.color
}

module.exports = sortColor
