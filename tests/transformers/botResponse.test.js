const test = require('ava')
const botResponse = require('../../transformers/botResponse')
const {defaultSession, defaultMessages, defaultConfigObject, twoMessages} = require('./testData')

test('Single-message response', t => {
  const actual = botResponse(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['Hello! I am your friendly bot.']

  t.deepEqual(actual, expected, 'one message response')
})

test('Multi-message response', t => {
  const actual = botResponse(defaultSession, twoMessages, defaultConfigObject)
  const expected = ['Updating your name..', 'Your name is now updated.']

  t.deepEqual(actual, expected, 'two message response')
})

test('Single-message Stringify', t => {
  const actual = '' + botResponse(defaultSession, defaultMessages, defaultConfigObject)
  const expected = '["Hello! I am your friendly bot."]'

  t.true(actual === expected, 'one message stringify response')
})

test('Multi-message Stringify', t => {
  const actual = '' + botResponse(defaultSession, twoMessages, defaultConfigObject)
  const expected = '["Updating your name..","Your name is now updated."]'

  t.true(actual === expected, 'two message stringify response')
})
