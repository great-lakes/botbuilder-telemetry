const test = require('ava')
const botResponseLength = require('../../transformers/botResponseLength')
const {defaultSession, defaultMessages, defaultConfigObject, twoMessages, richCardButtonsMessage} = require('./testData')

test('Single-message response', t => {
  const actual = botResponseLength(defaultSession, defaultMessages, defaultConfigObject)
  const expected = [30]

  t.deepEqual(actual, expected, 'one message response')
})

test('Multi-message response', t => {
  const actual = botResponseLength(defaultSession, twoMessages, defaultConfigObject)
  const expected = [20, 25]

  t.deepEqual(actual, expected, 'two message response')
})

test('Rich-message response', t => {
  const actual = botResponseLength(defaultSession, richCardButtonsMessage, defaultConfigObject)
  const expected = [0]

  t.deepEqual(actual, expected, 'Rich Message with no text')
})
