function customToString () {
  return JSON.stringify(this)
}

function dialogStack (session, messages, ConfigObject) {
  const proxyHandler = {
    ownKeys () {
      return Reflect.ownKeys([])
    }
  }

  if (session.sessionState.callstack.length === 0) {
    const result = []
    result.toString = customToString
    return new Proxy(result, proxyHandler)
  }
  if (session.sessionState.callstack.length === 1) {
    const result = [session.sessionState.callstack[0].id]
    result.toString = customToString
    return new Proxy(result, proxyHandler)
  }
  const result = session.sessionState.callstack
            .slice(0, (session.sessionState.callstack.length - 1))
            .map(function (item) {
              return item.id
            })
  result.toString = customToString
  return new Proxy(result, proxyHandler)
}

module.exports = dialogStack
