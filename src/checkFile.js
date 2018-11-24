import fs from 'fs'
import extractPackagesToInstall from './utils/extractPackagesToInstall'

// Checks a file before deciding weither to install or display
const checkFile = (cb, ...paramsForTests) => {
  let path = (paramsForTests.length > 0) ? paramsForTests[0] : `${process.cwd()}/package.json`

  fs.readFile(path, 'utf8', (err, file2) => {
    if (err) {
      // eslint-disable-next-line
      console.log(
        '\nIt seems like the file was not found. Stop messing with me please :-)\n\n',
        err
      )
    } else {
      const installed = JSON.parse(file2).dependencies || {}
      const main = JSON.parse(file2).main || ''

      if (installed && main) {
        const path = (paramsForTests.length > 0) ? paramsForTests[1] : `${process.cwd()}/${main}`

        fs.readFile(path, 'utf8', (err, file) => {
          if (err) {
            // eslint-disable-next-line
            console.log(
              '\nIt seems like the file was not found. Stop messing with me please :-)\n\n',
              err
            )
          } else {
            const packages = extractPackagesToInstall(file)
            cb(packages, Object.keys(installed))
          }
        })
      } else {
        // eslint-disable-next-line
        console.log('No main file in package.json or installed packages')
      }
    }
  })
}

export default checkFile