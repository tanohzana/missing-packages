import fs from 'fs'
import extractPackagesToInstall from './utils/extractPackagesToInstall'

// Checks a file before deciding weither to install or display
function checkFile(filePath, knownPackages) {
  const file = fs.readFileSync(filePath, "utf8")
  const packages = extractPackagesToInstall(file)

  if (packages) {
    packages.forEach((pack) => {
      if (!knownPackages.includes(pack)) {
        knownPackages.push(pack)
      }
    })
  }

  return packages
}

export default checkFile