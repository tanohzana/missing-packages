import fs from 'fs'

// Does everything it can to find a package.json, even in parent dirs
const getPackageJson = (packagePath, packages, cpt, cb) => {
  fs.readFile(`${process.cwd()}/${packagePath}`, 'utf8', (err, file2) => {
    if (err) {
      cpt++
      if (cpt < 5) {
        getPackageJson(`../${packagePath}`, packages, cpt, cb)
      } else {
        // eslint-disable-next-line
        console.log('No package.json')
      }
    } else {
      const installed = JSON.parse(file2).dependencies || { }
      cb(packages, Object.keys(installed))
    }
  })
}

export default getPackageJson