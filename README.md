# botbuilder-telemetry

[![Build Status](https://travis-ci.org/great-lakes/botbuilder-telemetry.svg?branch=master)](https://travis-ci.org/great-lakes/botbuilder-telemetry)

Microsoft Botbuilder telemetry package for analytics. Allows bot session, incoming and outgoing messages, and LUIS recognizer to be captured and consumed. This payload can be sent to any endpoint desired. Microsoft [Application Insights] metrics can also be used with `botbuilder-telemetry` payload.

[Application Insights]: https://azure.microsoft.com/en-us/services/application-insights/


## Telemetry Included (predefined `body` payload)
```js
botName: string                                 // "Test-Bot"
userName: string                                // "Foo Bar"
userMessage: string                             // "hello"
userMessageLength: number                       // 5
userMessageTimestamp: string                    // 2017-10-26T20:21:54.977Z
botResponse: string[]                           // ["Hello! I am your friendly bot."]
botResponseLength: number                       // 10
botResponseTimestamp: string                    // 2017-10-26T20:21:57.424Z
botResponseLatency: number                      // 2447
currentDialog: {dialog: string, step: number}   // Object {dialog: "*:/", step: 0}
dialogStack: string[]                           // ["*:/", "*:/greeting"]
luisIntent: string                              // "greeting"
```
___
## Resources and Links

[botbuilder-telemetry NPM package](https://www.npmjs.com/package/botbuilder-telemetry)

[botbuilder-telemetry Github](https://github.com/KSLHacks/botbuilder-telemetry)

[Microsoft Bot Builder SDK](https://github.com/Microsoft/BotBuilder)

[Microsoft Bot Framework Documentation](https://dev.botframework.com/)

___
# Install
`npm install botbuilder-telemetry`

# Usage Examples
## Simple example
See [example/simple] folder for full `app.js` example.

## Microsoft Application Insights Example
See [example/applicationInsights] folder for full `applicationInsights.js` example.


[example/simple]: https://github.com/KSLHacks/botbuilder-telemetry/tree/master/example
[example/applicationInsights]: https://github.com/KSLHacks/botbuilder-telemetry/tree/master/example/applicationInsights

# Usage
## Step 1: Configuration Object (Required)
This allows any object to be passed into the middleware, which will be available within the `dataMutationFuncOrPromise()`. This is useful if you wish to pass in default values to the body payload.

Ex. If you require the `botVersion` to be included in the payload, you can specify the version in the `configObject` and add this property onto the body within the `dataMutationFuncOrPromise()`.

_Note: If you would like LUIS intents included in the payload, you must pass in the recognizer (see example/app.js)_

_Note: If you do not require any config variables, create an empty object and pass it in._

```js
var configObject = {
  'botVersion': 'v3',
  // required for LUIS query/intent telemetry
  'luisRecognizer': luisRecognizer, 
  'foo': 'bar'
}
```

## Step 2: dataHandleFunction (Required)
After the `body` has gone through `dataMutationFuncOrPromise()` (optional), it will be ready to send to any endpoint/api/storage you choose. You can create any request call within this function. This will be the last step in the sequence for this pipeline.

Ex. Sending the body to a test endpoint using `node-fetch` package.

```js
function dataHandleFunction (body, session, messages, configObject) {
  fetch('https://testEndpoint.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Subscription-Key': process.env.apiKey
    },
    body: body
  }).then(response => {
    return response.json()
  }).then(json => {
  // Read response JSON here...
    console.log(json)
  })
}
```

## Step 3: dataMutationFuncOrPromise (Optional)
This function or promise allows any processing and manipulation of the `body` payload, based on the predefined body payload, session, messages, recognizer and configObject.

`messages` is the object response from the bot to user containing the text, options, attachments and other relevant information.

_Note: If `dataMutationFuncOrPromise()` is not defined, the predefined `body` payload will not be mutated and passed straight to the `dataHandleFunction()`, step 3._

```js
function dataMutationFunction (body, session, messages, configObject) {
    // The bot version - Managed by the bot developer
    // Add bot version to body if passed in through configObject
    if (typeof configObject.botVersion === 'undefined') { 
      body.botVersion = configObject.botVersion 
    }

    // Restrict user message to 100 characters and update body
    if (body.userMessage.length > 100) { 
      body.userMessage = body.userMessage.substring(0, 100)
    }
  }
```

## Step 4: Apply middleware
This step is necessary to utilize this telemetry package.  Make sure to apply the middleware right after you create your bot instance.

```js
// from Microsoft botbuilder SDK
var bot = new builder.UniversalBot(connector) 

// Use botbuilder-telemetry package
bot = applyTelemetryMiddleware(bot, configObject, dataHandleFunction, dataMutationFuncOrPromise)

// ... Rest of your bot definition
```
## Contributors
```js
{
  "name": "Kevin Leung",
  "twitter": "https://twitter.com/kslhacks",
  "github": "https://github.com/KSLHacks/",
  "url": "http://KSLhacks.com/"
},
{
  "name": "Hao Luo",
  "twitter": "https://twitter.com/howlowck",
  "github": "https://github.com/howlowck",
  "url": "https://blog.lifeishao.com/"
},
{
  "name": "Heather Shapiro",
  "twitter": "https://twitter.com/microheather",
  "github": "https://github.com/heatherbshapiro",
  "url": "http://microheather.com/"
}
```
