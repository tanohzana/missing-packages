import shell from "shelljs"

import installFromQuestions from "./utils/installFromQuestions"

// Installs packages
const installPackagesString = (packagesString) => {
  if (packagesString.length) {
    shell.exec(`npm install --save ${packagesString}`)
  }
}

// Prompts the user before installing missing packages
const installPackages = (packages, installed) => {
  const toInstallQuestions = packages
    .filter((pkg) => !installed.includes(pkg))
    .map((pkg) => ({
      answer: null,
      message: `Install package \x1b[32m${pkg}\x1b[0m ? (y/n)`,
      name: pkg,
    }))

  let initialCpt = 0

  installFromQuestions(toInstallQuestions, initialCpt, (packagesToInstall) => {
    const mappedPackages = packagesToInstall
      .filter(({ answer, }) => answer === "y")
      .map((pkg) => pkg.name)

    installPackagesString(mappedPackages.join(" "))
  })
}

export default installPackages