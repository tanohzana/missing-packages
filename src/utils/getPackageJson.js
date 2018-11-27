import fs from 'fs'

const getPackageJsonRecursive = (packagePath, cpt) => {
  try {
    const file = fs.readFileSync(`${process.cwd()}/${packagePath}`, 'utf8')
    return file
  } catch(e) {
    cpt++
    if (cpt < 5) {
      return getPackageJsonRecursive(`../${packagePath}`, cpt)
    }

    return null
  }
}

// Does everything it can to find a package.json, even in parent dirs
const getPackageJson = () => {
  let cpt = 0
  const packageJson = getPackageJsonRecursive('package.json', cpt)

  return packageJson
}

// @TODO export this

const getPackagesInstalled = () => {
  const packageJson = getPackageJson()

  if (!packageJson) {
    throw new Error('No package.json found')
  }

  const installedPackagesObject = JSON.parse(packageJson).dependencies || { }
  const installedPackagesArray = Object.keys(installedPackagesObject)

  return installedPackagesArray
}

export default getPackageJson