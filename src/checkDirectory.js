import fs from 'fs'

import checkFile from './checkFile'

const checkDirectoryRecusrsive = (path, packages) => {
  fs.readdirSync(path).forEach((file) => {
    const filePath = `${path}/${file}`

    if (file.match(/\.js/gu) && !file.match(/\.json/gu)) {
      let newPackages = checkFile(filePath)

      if (newPackages) {
        newPackages.forEach((pack) => {
          if (!packages.includes(pack)) {
            packages.push(pack)
          }
        })
      }
    } else if (fs.lstatSync(filePath).isDirectory()
      && file !== 'node_modules') {
      return checkDirectoryRecusrsive(`${path}/${file}`, packages)
    }

    return []
  })

  return packages
}

// Checks all files in a directory
const checkDirectory = (path) => {
  // Passing an empty array to initiate recursivity
  const packagesFound = checkDirectoryRecusrsive(path, [])

  return packagesFound
}

export default checkDirectory