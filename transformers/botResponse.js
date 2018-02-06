function customToString () {
  return JSON.stringify(this)
}

function botResponse (session, messages, ConfigObject) {
  const responseArray = messages.map(function (item) {
    return item.text
  })
  responseArray.toString = customToString

  const proxy = new Proxy(responseArray, {
    ownKeys () {
      return Reflect.ownKeys([])
    }
  })

  return proxy
}

module.exports = botResponse
