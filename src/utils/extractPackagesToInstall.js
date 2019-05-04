// Finds all packages to install in a file
const extractPackagesToInstall = (fileContent) => {
  const requirePackages = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/giu) || []
  const importPackages = fileContent.match(/import [A-Za-z0-9 {,_-}]+ ["'][A-Za-z0-9 ,_-]+["']/giu) || []

  // Removes "require(" and ")"
  const mappedRequirePackages = requirePackages.map((pack) => pack.substr(9, pack.length - 11))

  // Removes "import { blabla } from " and "'"
  const mappedImportPackages = importPackages.map((pack) => {
    let position = pack.indexOf("'") === -1 ? pack.indexOf("\"") : pack.indexOf("'")

    return pack.substr((position + 1), pack.length - (position + 2))
  })

  return [
    ...mappedRequirePackages,
    ...mappedImportPackages,
  ]
}

export default extractPackagesToInstall
