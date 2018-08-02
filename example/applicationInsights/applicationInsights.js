// Require npm packages
require('dotenv').config()
const applyTelemetryMiddleware = require('botbuilder-telemetry')
const builder = require('botbuilder')
const restify = require('restify')

// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.APP_ID,
  appPassword: process.env.APP_PASS
})

var bot = new builder.UniversalBot(connector)
server.post('/api/messages', connector.listen())

// Setup LUIS connection
var model = 'https://eastus2.api.cognitive.microsoft.com/luis/v2.0/apps/' + process.env.LUIS_ID + '?subscription-key=' + process.env.LUIS_KEY + '&verbose=true'
var recognizer = new builder.LuisRecognizer(model)
var dialog = new builder.IntentDialog({recognizers: [recognizer]})

// =========================================================
// Middleware: botbuilder-telemetry
// =========================================================

// Application Insights NPM package
const appInsights = require('applicationinsights')
// Application Insights setup
appInsights.setup(process.env.APP_INSIGHTS_INSTRUMENT_KEY).start()

// REQUIRED
var configObject = {
  'botVersion': 'v3',
  'luisRecognizer': recognizer
}

// REQUIRED function: API/Endpoint/DB Connection calls
function dataHandleFunction (body, session, messages, configObject) {
  // Application Insights create traceTelemetry payload
  let traceTelemetry = {
    message: 'botbuilder-telemetry message',
    severity: appInsights.Contracts.SeverityLevel.Information,
    // Note: properties can accept the body directly (rich properties on body will be JSON.stringify)
    properties: body
  }
  // Send trace to application insights
  appInsights.defaultClient.trackTrace(traceTelemetry)
}

bot = applyTelemetryMiddleware(bot, configObject, dataHandleFunction)

// =========================================================
// Bots Dialogs
// =========================================================

// Require dialogs
const setNameDialog = require('./dialogs/setName')
const sendMoneyDialog = require('./dialogs/sendMoney')

setNameDialog(bot)
sendMoneyDialog(bot)

bot.dialog('/', dialog)

dialog.matches('greeting', [
  function (session, results) {
    session.save()
    session.send('Hello! I am your friendly bot.')
  }
])

dialog.matches('mainMenu', [
  function (session, results) {
    session.beginDialog('/mainMenu')
  }
])

// present the user with a main menu of choices they can select from
bot.dialog('/mainMenu', [
  function (session, results) {
    var style = builder.ListStyle['button']
    builder.Prompts.choice(session, 'I can do any of these, pick one!', ['Set Name', 'Send Money'], { listStyle: style })
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        session.send('Set Name!')
        break
      case 1:
        session.send('Send Money!')
        break
    }
  }
])

dialog.matches('None', [
  function (session, results) {
    session.send('NONE intent')
  }
])
