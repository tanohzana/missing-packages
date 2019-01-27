// Checks all for packages in file(s)
function check(path) {
  let packages = []
  const isDir = fs.lstatSync(path).isDirectory()

  // Passing an empty array to initiate recursivity or search one file
  packages = isDir ? checkDirectoryRecursive(path, packages) : checkFile(path, packages)

  return packages
}

export default check