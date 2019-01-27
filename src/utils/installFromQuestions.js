import inquirer from 'inquirer'
import shell from 'shelljs'
import Bluebird from "bluebird"
import Read from "read"
import log from "npmlog"

const readAsync = Bluebird.promisify(new Read())

// Installs packages
const installPackagesString = (packagesString) => {
  shell.exec(`npm install --save ${packagesString}`)
}

const installFromQuestions = (toInstallQuestions, cpt, cb) => {
  readAnswer(toInstallQuestions[cpt].message, toInstallQuestions[cpt].answer).then((answer) => {
    toInstallQuestions[cpt].answer = answer

    if(cpt === toInstallQuestions.length-1) {
      cb(toInstallQuestions)
    } else {
      cpt++
      return installFromQuestions(toInstallQuestions, cpt, cb)
    }
  })
}

const read = (opts) => {
  return Bluebird.try(() => {
    log.clearProgress()
    return readAsync(opts)
  }).finally(() => {
    log.showProgress()
  })
}

const readAnswer = (msg, answer, opts, isRetry) => {
  if (isRetry && (answer === "y" || answer === "n")) {
    return Promise.resolve(answer.trim())
  }

  return read({prompt: msg, default: answer ? `Entered: ${answer}` : ''})
    .then((answer) => readAnswer(msg, answer, opts, true))
}

export default installFromQuestions