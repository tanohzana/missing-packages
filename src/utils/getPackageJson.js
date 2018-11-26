import fs from 'fs'

const getPackageJsonRecursive = (packagePath, packages, cpt, cb) => {
  fs.readFile(`${process.cwd()}/${packagePath}`, 'utf8', (err, file2) => {
    if (err) {
      cpt++
      if (cpt < 5) {
        return getPackageJsonRecursive(`../${packagePath}`, packages, cpt, cb)
      }

      return null
    }

    return file2
  })
}

// Does everything it can to find a package.json, even in parent dirs
const getPackageJson = (packages, cb) => {
  let cpt = 0
  const packageJson = getPackageJsonRecursive('package.json', packages, cpt, cb)

  if (packageJson) {
    const installed = JSON.parse(packageJson).dependencies || { }
    cb(packages, Object.keys(installed))
  } else {
    // eslint-disable-next-line
    console.log('No package.json')
  }
}

export default getPackageJson