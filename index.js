const botResponseLength = require('./transformers/botResponseLength')
const currentDialog = require('./transformers/currentDialog')
const dialogStack = require('./transformers/dialogStack')
const botResponse = require('./transformers/botResponse')
const luisIntent = require('./transformers/luisIntent')

function ApplyTelemetryMiddleware (bot, configObject, dataHandleFunction, dataMutationFunction) {
  if (typeof dataMutationFunction === 'undefined') {
    dataMutationFunction = function (data) {
      return data
    }
  }

  bot.use({
    botbuilder: function (session, next) {
      session.options.onSend = (messages, cb) => {
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
          luisIntent: luisIntent(session, messages, configObject)
          // qnaQuestionMatch: qnaQuestionMatch(session, messages, configObject) // TODO triage
        }

        // OPTIONAL function: add/mutate and compute data before sending to endpoint
        body = dataMutationFunction(body, session, messages, configObject)

        // REQUIRED function: API/Endpoint/DB Connection calls
        dataHandleFunction(body, session, messages, configObject)
      }
      next()
    }
  })

  return bot
}

module.exports = ApplyTelemetryMiddleware
