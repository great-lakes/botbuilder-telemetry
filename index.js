const botResponseLength = require('./transformers/botResponseLength')
// const qnaQuestionMatch = require('./transformers/qnaQuestionMatch')
const currentDialog = require('./transformers/currentDialog')
const dialogStack = require('./transformers/dialogStack')
const botResponse = require('./transformers/botResponse')

function ApplyTelemetryMiddleware (bot, configObject, dataHandleFunction, dataMutationFuncOrPromise = (data) => data) {
  const dataMutationPromise = (body, session, messages, configObject) => {
    const objOrPromise = dataMutationFuncOrPromise(body, session, messages, configObject)

    if (typeof objOrPromise.then === 'function') {
      return objOrPromise
    }

    return new Promise((resolve, reject) => {
      resolve(objOrPromise)
    })
  }

  const onSend = (session, luisResult, qnaResult) => (messages, cb) => {
    session.library.send(messages, cb)
    var body = {
      botName: messages[0].from.name,
      userName: session.message.user.name,
      userMessage: session.message.text,
      userMessageLength: session.message.text.length,
      userMessageTimestamp: session.message.timestamp,
      botResponse: botResponse(session, messages, configObject),
      botResponseLength: botResponseLength(session, messages, configObject),
      botResponseTimestamp: new Date().toJSON(),
      botResponseLatency: (new Date().getTime() - new Date(session.message.timestamp).getTime()),
      currentDialog: currentDialog(session, messages, configObject),
      dialogStack: dialogStack(session, messages, configObject),
      luisIntent: luisResult ? luisResult.intent : null
      // qnaQuestionMatch: qnaQuestionMatch(session, messages, configObject) // TODO submit PR
    }

    // A promise to add/mutate and compute data before sending to endpoint
    dataMutationPromise(body, session, messages, configObject)
      .then((body) => {
        // REQUIRED function: API/Endpoint/DB Connection calls
        dataHandleFunction(body, session, messages, configObject)
      })
  }

  bot.use({
    botbuilder: function (session, next) {
      if (typeof configObject.luisRecognizer === 'undefined') {
        session.options.onSend = onSend(session, null)
      } else {
        configObject.luisRecognizer.onRecognize(session.toRecognizeContext(), function (err, result) {
          if (err) {
            console.log(err)
          }
          session.options.onSend = onSend(session, result)
        })
      }
      next()
    }
  })

  return bot
}

module.exports = ApplyTelemetryMiddleware
