function dialogStack (session, event, ConfigObject) {
  if (session.sessionState.callstack.length === 0) {
    return ''
  }
  if (session.sessionState.callstack.length === 1) {
    return session.sessionState.callstack[0].id
  }
  return session.sessionState.callstack
            .slice(0, (session.sessionState.callstack.length - 1))
            .map(function (item) {
              return item.id
            })
}

module.exports = dialogStack
