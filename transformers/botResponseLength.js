function botResponseLength (session, messages, ConfigObject) {
  return messages.map(function (item) {
    return item.text.length
  })
}

module.exports = botResponseLength
