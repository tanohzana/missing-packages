import Bluebird from "bluebird"
import readModule from "read"
import log from "npmlog"

const readAsync = Bluebird.promisify(readModule)

const read = (opts) => (
  Bluebird.try(() => {
    log.clearProgress()

    return readAsync(opts)
  }).finally(() => {
    log.showProgress()
  })
)

const readAnswer = (msg, answer, opts, isRetry) => {
  if (isRetry && (answer === "y" || answer === "n")) {
    return Promise.resolve(answer.trim())
  }

  return read({
    default: answer ? `Entered: ${answer}` : "",
    prompt: msg,
  })
  .then((answer) => readAnswer(msg, answer, opts, true))
}

const installFromQuestions = (toInstallQuestions, cpt, cb) => {
  // eslint-disable-next-line consistent-return
  readAnswer(toInstallQuestions[cpt].message, toInstallQuestions[cpt].answer).then((answer) => {
    toInstallQuestions[cpt].answer = answer

    if (cpt === toInstallQuestions.length - 1) {
      cb(toInstallQuestions)
    } else {
      cpt++

      return installFromQuestions(toInstallQuestions, cpt, cb)
    }
  })
}

export default installFromQuestions