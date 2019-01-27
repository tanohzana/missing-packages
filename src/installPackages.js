import installFromQuestions from './utils/installFromQuestions'

// Prompts the user before installing missing packages
const installPackages = (packages, installed) => {
  const toInstallQuestions = packages
		.filter((pkg) => !installed.includes(pkg))
		.map((pkg) => {
			return {
				message: `Install package \x1b[32m${pkg}\x1b[0m ? (y/n)`,
        answer: null,
				name: pkg,
			}
		})

  let initialCpt = 0

  installFromQuestions(toInstallQuestions, initialCpt, (packagesToInstall) => {
    const mappedPackages = packagesToInstall
      .filter(({ answer }) => answer === "y")
      .map(pkg => pkg.name)

    installPackagesString(mappedPackages.join(" "))
  })
}

export default installPackages