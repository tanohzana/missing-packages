import fs from 'fs'
import getPackageJson from './utils/getPackageJson'
import extractPackagesToInstall from './utils/extractPackagesToInstall'

const checkDirectoryRecusrsive = (path, packages) => {
  fs.readdirSync(path).forEach((file) => {
    if (file.match(/\.js/gu) && !file.match(/\.json/gu)) {
      const file2 = fs.readFileSync(`${path}/${file}`, 'utf8')
      let newPackages = extractPackagesToInstall(file2)

      if (newPackages) {
        newPackages.forEach((pack) => {
          if (!packages.includes(pack)) {
            packages.push(pack)
          }
        })
      }

      return packages
    } else if (fs.lstatSync(`${path}/${file}`).isDirectory()
      && file !== 'node_modules') {
      return checkDirectoryRecusrsive(`${path}/${file}`)
    }
  })
}

// Checks all files in a directory
const checkDirectory = (path) => {
  let packagesFound = []

  if (fs.lstatSync(path).isDirectory()) {
    packagesFound = checkDirectoryRecusrsive(path, packagesFound)
  }

  return packagesFound
}

export default checkDirectory