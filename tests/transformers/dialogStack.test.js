const test = require('ava')
const dialogStack = require('../../transformers/dialogStack')
const {defaultSession, defaultMessages, defaultConfigObject, callstacks} = require('./testData')

test(t => {
  defaultSession.sessionState.callstack = callstacks.noStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = {}

  t.deepEqual(actual, expected, 'testing no stack (root)')
})

test(t => {
  defaultSession.sessionState.callstack = callstacks.greetingStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = '*:/'

  t.deepEqual(actual, expected, 'testing one stack (greeting)')
})

test(t => {
  defaultSession.sessionState.callstack = callstacks.choiceStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['*:/', '*:/mainMenu']

  t.deepEqual(actual, expected, 'testing choice stack (greeting)')
})

test(t => {
  defaultSession.sessionState.callstack = callstacks.promptStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['*:/', '*:/mainMenu', '*:/setName']

  t.deepEqual(actual, expected, 'testing prompt stack (greeting)')
})
