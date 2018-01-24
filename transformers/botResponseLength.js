function botResponseLength (session, messages, ConfigObject) {
  return messages.map(function (item) {
    return item.text ? item.text.length : 0
  })
}

module.exports = botResponseLength
