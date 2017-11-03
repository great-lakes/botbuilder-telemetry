const test = require('ava')
const currentDialog = require('../../transformers/currentDialog')
const {defaultSession, defaultMessages, defaultConfigObject, callstacks} = require('./testData')

test('Empty stack', t => {
  defaultSession.sessionState.callstack = callstacks.noStack
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '', step: 0 }

  t.deepEqual(actual, expected, 'testing empty stack')
})

test('Root stack', t => {
  defaultSession.sessionState.callstack = callstacks.greetingStack
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '*:/', step: 0 }

  t.deepEqual(actual, expected, 'testing at root')
})

test('Choice stack', t => {
  defaultSession.sessionState.callstack = callstacks.choiceStack
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '*:/mainMenu', step: 0 }

  t.deepEqual(actual, expected, 'testing at main menu choices step 0')
})

test('Prompt stack', t => {
  defaultSession.sessionState.callstack = callstacks.promptStack
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '*:/setName', step: 0 }

  t.deepEqual(actual, expected, 'testing at text prompt step 0')
})

test('Prompt stack', t => {
  defaultSession.sessionState.callstack = callstacks.promptStack_step1
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '*:/setName', step: 1 }

  t.deepEqual(actual, expected, 'testing at text prompt step 1')
})

test('Prompt stack', t => {
  defaultSession.sessionState.callstack = callstacks.promptStack_step2
  const actual = currentDialog(defaultSession, defaultMessages, defaultConfigObject)
  const expected = { dialog: '*:/setName', step: 2 }

  t.deepEqual(actual, expected, 'testing at text prompt step 2')
})
