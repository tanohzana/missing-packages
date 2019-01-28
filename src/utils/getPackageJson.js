import fs from "fs"

// Find package.json through the deps tree
const getPackageJsonRecursive = (packagePath, cpt) => {
  try {
    const file = fs.readFileSync(`${process.cwd()}/${packagePath}`, "utf8")

    return file
  } catch (err) {
    cpt++
    // Loop recursively only 5 times then abort
    if (cpt < 5) {
      return getPackageJsonRecursive(`../${packagePath}`, cpt)
    }

    return null
  }
}

// Tries to find a package.json
const getPackageJson = () => {
  let cpt = 0
  const packageJson = getPackageJsonRecursive("package.json", cpt)

  return packageJson
}

// Get packages installed, from package.json
const getPackagesInstalled = () => {
  const packageJson = getPackageJson()

  if (!packageJson) {
    throw new Error(" ❌ No package.json found")
  }

  const installedPackagesObject = JSON.parse(packageJson).dependencies || {}
  const installedPackagesArray = Object.keys(installedPackagesObject)

  return installedPackagesArray
}

export { getPackagesInstalled, }
export default getPackageJson