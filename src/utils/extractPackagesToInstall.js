// Finds all packages to install in a file
const extractPackagesToInstall = (fileContent) => {
  const packages = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/giu)

  if (!packages) {
    // eslint-disable-next-line
    console.log('No packages to install')

    return []
  }

  const mappedPackages = packages.map((pack) => pack.substr(9, pack.length - 11))

  return mappedPackages
}

export default extractPackagesToInstall