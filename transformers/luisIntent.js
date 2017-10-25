function luisIntent (session, messages, configObject) {
  if (typeof configObject.luisRecognizer === 'undefined') {
    return null
  }

  configObject.luisRecognizer.onRecognize(session.toRecognizeContext(), function (err, result) {
    if (err) {
      return err
    }

    // returns undefined. Async issue..
    return result.intent
  })
}

module.exports = luisIntent
