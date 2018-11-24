import inquirer from 'inquirer'
import shell from 'shelljs'

// Installs a single package
const installOnePackage = (uniquePackage) => {
  shell.exec(`npm install --save ${uniquePackage}`)
}

const installFromQuestions = (toInstallQuestions) => {
  inquirer.prompt(toInstallQuestions).then((answers) => {
    for (let pack in answers) {
      if (answers[pack]) {
        installOnePackage(pack)
      }
    }
  })
}

export default installFromQuestions