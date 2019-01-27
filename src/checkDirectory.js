import fs from 'fs'
import uniq from "lodash.uniq"

import checkFile from './checkFile'

function checkDirectoryRecursive(path, knownPackages) {
  let localPackages = []

  fs.readdirSync(path).forEach((file) => {
    const filePath = `${path}/${file}`

    if (fs.lstatSync(filePath).isDirectory()
      && file !== "node_modules") {
      localPackages = localPackages.concat(checkDirectoryRecursive(`${path}/${file}`, knownPackages))
    } else if (file.match(/\.js/gu) && !file.match(/\.json/gu)) {
      localPackages = localPackages.concat(checkFile(filePath, knownPackages))
    }
  })

  knownPackages = knownPackages.concat(localPackages)

  return uniq(knownPackages)
}

export default checkDirectory