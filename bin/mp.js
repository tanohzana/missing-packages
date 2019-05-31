#! /usr/bin/env node

import fs from "fs"
import displayPackages from "../src/displayPackages"
import installPackages from "../src/installPackages"
import check from "../src/check"
import { getPackagesInstalled, } from "../src/utils/getPackageJson"

const showHelp = () => {
  console.log("Help:")
  console.log("")
  console.log("Missing-packages 📦")
  console.log("")
  console.log("Usage: mp [command] <path>")
  console.log("Commands: install (or i), check (or c)")
  console.log("")
  console.log("* mp i <path>")
  console.log("will look into the folder or file and ask to install all dependencies that are not in the package.json file")
  console.log("")
  console.log("* mp check <path>")
  console.log("will look into the folder or file and just display all dependencies that are not in the package.json file")
}

const misuse = () => {
  console.log(" ❌ MP was misused. Please refer to README or see help");
  console.log("")
  showHelp()
}

const mp = (args) => {
  const firstParam = args.shift()
  const secondParam = args.shift()

  try {
    const packagesInstalled = getPackagesInstalled()

    if (firstParam === "-h" || firstParam === "h" || firstParam === "help" || firstParam === "--help") {
      showHelp()
    } else if ((firstParam === "i" || firstParam === "install") && fs.existsSync(`${process.cwd()}/${secondParam}`)) {
      const filePath = `${process.cwd()}/${secondParam}`
      const packagesToInstall = check(filePath)

      installPackages(packagesToInstall, packagesInstalled)
    } else if ((firstParam === "c" || firstParam === "check") && fs.existsSync(`${process.cwd()}/${secondParam}`)) {
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
  } catch (error) {
    console.log(error.message)
  }
}

const args = process.argv.splice(2)
mp(args)

export default mp
