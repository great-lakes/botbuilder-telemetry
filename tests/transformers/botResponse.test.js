const test = require('ava')
const botResponse = require('../../transformers/botResponse')
const {defaultSession, defaultMessages, defaultConfigObject, twoMessages} = require('./testData')

test(t => {
  const actual = botResponse(defaultSession, twoMessages, defaultConfigObject)
  const expected = ['Updating your name..', 'Your name is now updated.']

  t.deepEqual(actual, expected, 'a multi-message response')
})

test(t => {
  const actual = botResponse(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['Hello! I am your friendly bot.']

  t.deepEqual(actual, expected, 'a single-message response')
})
