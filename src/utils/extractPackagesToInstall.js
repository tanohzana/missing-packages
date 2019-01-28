
// Finds all packages to install in a file
const extractPackagesToInstall = (fileContent) => {
  const packages = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/giu)

  if (!packages) {
    return []
  }

  // Removes "require(" and ")"
  const mappedPackages = packages.map((pack) => pack.substr(9, pack.length - 11))

  return mappedPackages
}

export default extractPackagesToInstall