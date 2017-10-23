function currentDialog (session, event, ConfigObject) {
  if (session.sessionState.callstack.length === 0) {
      // empty call stack
    return { dialog: '', step: 0 }
  }
  if ((session.sessionState.callstack.length - 2) < 0) {
    return {
      dialog: session.sessionState.callstack[0].id,
      step: session.sessionState.callstack[0].state['BotBuilder.Data.WaterfallStep']
    }
  }
  return {
    dialog: session.sessionState.callstack[session.sessionState.callstack.length - 2].id,
    step: session.sessionState.callstack[session.sessionState.callstack.length - 2].state['BotBuilder.Data.WaterfallStep']
  }
}

module.exports = currentDialog
