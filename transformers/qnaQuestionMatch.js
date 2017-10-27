function qnaQuestionMatch (session, messages, configObject) {
  if (typeof configObject.qnaRecognizer === 'undefined') {
    return null
  }
  return new Promise((resolve, reject) => {
    configObject.qnaRecognizer.recognize(session.toRecognizeContext(), function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }).then(result => {
    return result
  })
}

module.exports = qnaQuestionMatch
