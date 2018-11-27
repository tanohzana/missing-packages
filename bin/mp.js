#! /usr/bin/env node

import program from 'commander'
import PkgInfo from 'pkginfo'

new PkgInfo(module, 'version')
let programVersion = module.exports.version

import displayPackages from '../src/displayPackages'
import installPackages from '../src/installPackages'
import checkDirectory from '../src/checkDirectory'
import checkFile from '../src/checkFile'

program
  .version(programVersion, '-v, --version')
  .usage('[options] <file/directory>')
  .option('-i, --install', 'install missing packages in a file or directory')
  .option('-c, --check', 'check missing packages in a file or directory')
  .arguments('<file>')
  .action((file) => {
    const filePath = file ? `${process.cwd()}/${file}` : null

    if (program.install && program.check) {
      // eslint-disable-next-line
      console.log('\\033[0;31mStop fooling around please !\\033[0m')
      // eslint-disable-next-line
      console.log('Read the doc ! ---> mp -h')
    } else if (program.install) {
      const { packages, installed } = checkDirectory(filePath)
      installPackages(packages, installed)
    } else if (program.check) {
      const { packages, installed } = checkDirectory(filePath)
      displayPackages(packages, installed)
    } else {
      const { packages, installed } = checkFile(filePath)
      displayPackages(packages, installed)
    }
  })
  .parse(process.argv)

  // @TODO: receive arrays, not objects
  // @TODO: exploit packagesJson here, top-level
  // @TODO: make checkFile work again