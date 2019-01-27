#! /usr/bin/env node

import fs from 'fs'

import displayPackages from '../src/displayPackages'
import installPackages from '../src/installPackages'
import check from "../src/check"
import { getPackagesInstalled } from '../src/utils/getPackageJson'

const mp = (args, cb) => {
  const firstParam = args.shift()
  const secondParam = args.shift()
  const packagesInstalled = getPackagesInstalled()

  if ((firstParam === "i" || firstParam === "install") && fs.existsSync(`${process.cwd()}/${secondParam}`)) {
    const filePath = `${process.cwd()}/${secondParam}`
    const packagesToInstall = check(filePath)

    installPackages(packagesToInstall, packagesInstalled)
  } else if (firstParam === "c" || firstParam === "check"  && fs.existsSync(`${process.cwd()}/${secondParam}`)) {
    const filePath = `${process.cwd()}/${secondParam}`
    const packagesToInstall = check(filePath)

    displayPackages(packagesToInstall, packagesInstalled)
  } else if (fs.existsSync(`${process.cwd()}/${firstParam}`)) {
    const filePath = `${process.cwd()}/${firstParam}`
    const packagesToInstall = check(filePath)

    installPackages(packagesToInstall, packagesInstalled)
  } else {
    misuse()
  }
}

const misuse = () => {
  console.log(`Usage: \n${mp.usage}`);
}