import installFromQuestions from './utils/installFromQuestions'

// Prompts the user before installing missing packages
const installPackages = (packages, installed) => {
  const toInstallQuestions = packages
  .filter((pack) => !installed.includes(pack))
  // eslint-disable-next-line
  .map((pack) => {
    return {
      default: false,
      message: `Install package \x1b[32m${pack}\x1b[0m ?`,
      name: pack,
      type: 'confirm',
    }
  })

  installFromQuestions(toInstallQuestions)
}

export default installPackages