function customToString () {
  return JSON.stringify(this)
}
function currentDialog (session, messages, ConfigObject) {
  const proxyHandler = {
    ownKeys () {
      return Reflect.ownKeys({ dialog: '', step: 0 })
    }
  }

  if (session.sessionState.callstack.length === 0) {
    // empty call stack
    const result = { dialog: '', step: 0 }
    result.toString = customToString
    return new Proxy(result, proxyHandler)
  }
  if ((session.sessionState.callstack.length - 2) < 0) {
    const result = {
      dialog: session.sessionState.callstack[0].id,
      step: session.sessionState.callstack[0].state['BotBuilder.Data.WaterfallStep']
    }
    result.toString = customToString
    return new Proxy(result, proxyHandler)
  }
  const result = {
    dialog: session.sessionState.callstack[session.sessionState.callstack.length - 2].id,
    step: session.sessionState.callstack[session.sessionState.callstack.length - 2].state['BotBuilder.Data.WaterfallStep']
  }
  result.toString = customToString
  return new Proxy(result, proxyHandler)
}

module.exports = currentDialog
