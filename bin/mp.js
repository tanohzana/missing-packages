#! /usr/bin/env node

import program from 'commander'
import PkgInfo from 'pkginfo'
import fs from 'fs'

new PkgInfo(module, 'version')
let programVersion = module.exports.version

import displayPackages from '../src/displayPackages'
import installPackages from '../src/installPackages'
import checkDirectory from '../src/checkDirectory'
import checkFile from '../src/checkFile'
import { getPackagesInstalled, } from '../src/utils/getPackageJson'

program
  .version(programVersion, '-v, --version')
  .usage('[options] <file/directory>')
  .option('-i, --install', 'install missing packages in a file or directory')
  .option('-c, --check', 'check missing packages in a file or directory')
  .arguments('<file>')
  .action((file) => {
    const filePath = file ? `${process.cwd()}/${file}` : null
    const isDir = fs.lstatSync(filePath).isDirectory()

    if (program.install && program.check) {
      // eslint-disable-next-line
      console.log('\\033[0;31mStop fooling around please !\\033[0m')
      // eslint-disable-next-line
      console.log('Read the doc ! ---> mp -h')
    } else if (program.install) {
      const packagesToInstall = checkDirectory(filePath)
      const packagesInstalled = getPackagesInstalled()

      installPackages(packagesToInstall, packagesInstalled)
    } else if (isDir) {
      const packagesToInstall = checkDirectory(filePath)
      const packagesInstalled = getPackagesInstalled()

      displayPackages(packagesToInstall, packagesInstalled)
    } else {
      const packagesToInstall = checkFile(filePath)
      const packagesInstalled = getPackagesInstalled()

      displayPackages(packagesToInstall, packagesInstalled)
    }
  })
  .parse(process.argv)