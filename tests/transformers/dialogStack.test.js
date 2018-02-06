const test = require('ava')
const dialogStack = require('../../transformers/dialogStack')
const {defaultSession, defaultMessages, defaultConfigObject, callstacks} = require('./testData')

test('Empty stack', t => {
  defaultSession.sessionState.callstack = callstacks.noStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = []

  t.deepEqual(actual, expected, 'testing root')
})

test('Root stack', t => {
  defaultSession.sessionState.callstack = callstacks.greetingStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['*:/']

  t.deepEqual(actual, expected, 'testing greeting')
})

test('Choice stack', t => {
  defaultSession.sessionState.callstack = callstacks.choiceStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['*:/', '*:/mainMenu']

  t.deepEqual(actual, expected, 'testing main menu')
})

test('Prompt stack', t => {
  defaultSession.sessionState.callstack = callstacks.promptStack
  const actual = dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = ['*:/', '*:/mainMenu', '*:/setName']

  t.deepEqual(actual, expected, 'testing prompts')
})

test('Prompt stack stringify', t => {
  defaultSession.sessionState.callstack = callstacks.promptStack
  const actual = '' + dialogStack(defaultSession, defaultMessages, defaultConfigObject)
  const expected = '["*:/","*:/mainMenu","*:/setName"]'

  t.deepEqual(actual, expected, 'testing prompts')
})
