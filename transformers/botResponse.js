function botResponse (session, messages, ConfigObject) {
  return messages.map(function (item) {
    return item.text
  })
}

module.exports = botResponse
