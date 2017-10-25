function luisIntent (session, messages, configObject) {
  if (typeof configObject.luisRecognizer === 'undefined') {
    return null
  }
  return new Promise(resolve=>{
    configObject.luisRecognizer.onRecognize(session.toRecognizeContext(), function (result) {
      resolve(result.intent)
    }) 
  })
}

module.exports = luisIntent