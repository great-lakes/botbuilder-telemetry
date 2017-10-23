const currentDialog = require('./transformers/currentDialog')
const dialogStack = require('./transformers/dialogStack')

function ApplyTelemetryMiddleware (bot, configObject, dataHandleFunction, dataMutationFunction) {
  if (typeof dataMutationFunction === 'undefined') {
    dataMutationFunction = function (data) {
      return data
    }
  }

  bot.use({
    botbuilder: function (session, next) {
      bot.once('send', function (event) {
        configObject.session = session  // save latest session data
      })
      next()
    },
    send: function (event, next) {
      var session = configObject.session  // load session data
      var body = {
        botName: event.address.bot.name,
        botChannel: event.address.channelId,
        userName: session.message.user.name,
        userMessage: session.message.text,
        userMessageLength: session.message.text.length,
        userMessageTimestamp: session.message.timestamp,
        botResponse: event.text,
        botResponseLength: event.text.length,
        botResponseTimestamp: new Date().toJSON(),
        botResponseLatency: (new Date().getTime() - new Date(session.message.timestamp).getTime()),
        currentDialog: currentDialog(session, event, configObject),
        dialogStack: dialogStack(session, event, configObject)
        // luisIntent: luisIntent(session, event, configObject), // TODO triage
        // qnaQuestionMatch: qnaQuestionMatch(session, event, configObject) // TODO triage
      }

      // OPTIONAL function: add/mutate and compute data before sending to endpoint
      body = dataMutationFunction(session, event, configObject, body)

      // REQUIRED function: API/Endpoint/DB Connection calls
      dataHandleFunction(body)
      next()
    }
  })

  return bot
}

module.exports = ApplyTelemetryMiddleware
