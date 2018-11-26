import fs from 'fs'
import getPackageJson from './utils/getPackageJson'
import extractPackagesToInstall from './utils/extractPackagesToInstall'

let packages = []
let iterations = 0
let gblPath = ''

// Checks all files in a directory
const checkDirectory = (path, recursive, cb) => {
  iterations++

  if (iterations === 1) {
    gblPath = path
  }

  try {
    if (fs.lstatSync(path).isDirectory()) {
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
        } else if (fs.lstatSync(`${path}/${file}`).isDirectory()
          && file !== 'node_modules'
          && recursive) {
          checkDirectory(`${path}/${file}`, recursive, cb)
        }
      })

      if (path === gblPath) {
        getPackageJson(packages, cb)
      }
    } else {
      fs.readFile(path, 'utf8', (err, file) => {
        if (err) {
          // eslint-disable-next-line
          console.log(err)
        } else {
          packages = extractPackagesToInstall(file)
          getPackageJson(packages, cb)
        }
      })
    }
  } catch (err) {
    if (err.message.substr(0, 6) === 'ENOENT') {
      // eslint-disable-next-line
      console.log('No such file or directory')
    } else {
      // eslint-disable-next-line
      console.log(err)
    }
  }
}

export default checkDirectory