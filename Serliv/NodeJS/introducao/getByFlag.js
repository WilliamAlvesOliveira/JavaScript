module.exports.getByFlag = flag => {
  const indexOfFlag = process.argv.indexOf(flag)

  return process.argv[indexOfFlag + 1]
}
