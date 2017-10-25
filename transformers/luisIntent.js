function luisIntent (session, messages, configObject) {
  if (typeof configObject.luisRecognizer === 'undefined') {
    return null
  }
  return new Promise((resolve, reject) => {
    configObject.luisRecognizer.onRecognize(session.toRecognizeContext(), function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result.intent)
    })
  })
}

module.exports = luisIntent
