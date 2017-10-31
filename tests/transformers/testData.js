const callstacks = {
  noStack: [],
  greetingStack: [{
    id: '*:/',
    state: {
      'BotBuilder.Data.Intent': 'greeting',
      'BotBuilder.Data.WaterfallStep': 0
    }
  }],
  choiceStack: [{
    id: '*:/',
    state: {
      'BotBuilder.Data.Intent': 'mainMenu',
      'BotBuilder.Data.WaterfallStep': 0
    }
  }, {
    id: '*:/mainMenu',
    state: {
      'BotBuilder.Data.WaterfallStep': 0
    }
  }, {
    id: 'BotBuilder:prompt-choice',
    state:
    { options: { /* mocked object */ },
      turns: 0,
      lastTurn: 1509474327871,
      isReprompt: false }
  }],
  promptStack: [{
    id: '*:/',
    state: {
      'BotBuilder.Data.Intent': 'mainMenu',
      'BotBuilder.Data.WaterfallStep': 0
    }
  }, {
    id: '*:/mainMenu',
    state: {
      'BotBuilder.Data.WaterfallStep': 1
    }
  }, {
    id: '*:/setName',
    state: {
      'BotBuilder.Data.WaterfallStep': 0
    }
  }, {
    id: 'BotBuilder:prompt-text',
    state: {
      options: {/* mocked object TODO: fill this out more */ },
      turns: 0,
      lastTurn: 1509474340695,
      isReprompt: false
    }
  }]
}

const defaultSession = {
  domain: null,
  _events: { error: () => { /* mocked function */ } },
  _eventsCount: 1,
  _maxListeners: undefined,
  options:
  { localizer: { localePaths: [], locales: { /* object placeholder */ }, _defaultLocale: 'en' },
    logger: {
      isEnabled: true,
      connector: { /* object placeholder */ },
      address: { /* object placeholder */ },
      relatesTo: { /* object placeholder */ },
      event: { /* object placeholder */ } },
    autoBatchDelay: 250,
    connector: {
      settings: { /* object placeholder */ },
      botConnectorOpenIdMetadata: { /* object placeholder */ },
      emulatorOpenIdMetadata: { /* object placeholder */ },
      onEventHandler: () => { /* mocked function */ },
      accessToken: 'randomToken',
      accessTokenExpires: 1509475481104 },
    library:
    {  // UniversalBot
      domain: null,
      _events: {},
      _eventsCount: 0,
      _maxListeners: undefined,
      name: '*',
      dialogs: { /* object placeholder */ },
      libraries: { /* object placeholder */ },
      actions: { /* object placeholder */ },
      recognizers: { /* object placeholder */ },
      triggersAdded: true,
      settings: { /* object placeholder */ },
      connectors: { /* object placeholder */ },
      mwReceive: [],
      mwSend: [],
      mwSession: [],
      _localePath: './locale/',
      localizer: { /* object placeholder */ } },
    middleware: [ () => { /* mocked botbuilder middleware */ } ],
    dialogId: '/',
    dialogArgs: undefined,
    dialogErrorMessage: undefined,
    onSave: [ () => { /* mocked onSave */ } ],
    onSend: () => { /* mocked function */ } },
  msgSent: true,
  _hasError: false,
  _isReset: false,
  lastSendTime: 1509472182114,
  batch: [],
  batchStarted: false,
  sendingBatch: true,
  inMiddleware: false,
  _locale: 'en-US',
  localizer:
  { // DefaultLocalizer
    localePaths: [],
    locales: { en: { /* object placeholder */ }, 'en-US': { /* object placeholder */ } },
    _defaultLocale: 'en' },
  logger:
  { // RemoteSessionLogger
    isEnabled: true,
    connector:
    { // ChatConnector
      settings: { /* object placeholder */ },
      botConnectorOpenIdMetadata: { /* object placeholder */ },
      emulatorOpenIdMetadata: { /* object placeholder */ },
      onEventHandler: () => { /* mocked function */ },
      accessToken: 'mockedAccessToken',
      accessTokenExpires: 1509475481104 },
    address:
    { id: 'ejdl369ij51l',
      channelId: 'emulator',
      user: { /* object placeholder */ },
      conversation: { /* object placeholder */ },
      bot: { /* object placeholder */ },
      serviceUrl: 'http://localhost:7329' },
    relatesTo:
    { id: 'ejdl369ij51l',
      channelId: 'emulator',
      user: { /* object placeholder */ },
      conversation: { /* object placeholder */ },
      bot: { /* object placeholder */ },
      serviceUrl: 'http://localhost:7329' },
    event:
    { type: 'event',
      address: { /* object placeholder */ },
      name: 'debug',
      value: [Array],
      relatesTo: { /* object placeholder */ },
      text: 'Debug Event' } },
  connector:
  { // ChatConnector
    settings:
    { appId: 'myapp-id-random-id',
      appPassword: 'myapp-random-password',
      endpoint: { /* object placeholder */ } },
    botConnectorOpenIdMetadata:
    {  // OpenIdMetadata
      lastUpdated: 0,
      url: 'https://login.botframework.com/v1/.well-known/openidconfiguration' },
    emulatorOpenIdMetadata:
    {  // OpenIdMetadata
      lastUpdated: 1509472178094,
      url: 'https://login.microsoftonline.com/botframework.com/v2.0/.well-known/openid-configuration',
      keys: [Array] },
    onEventHandler: () => { /* mocked function */ },
    accessToken: 'mockedAccessToken',
    accessTokenExpires: 1509475481104 },
  library:
  { // UniversalBot
    domain: null,
    _events: {},
    _eventsCount: 0,
    _maxListeners: undefined,
    name: '*',
    dialogs:
    { '/setName': { /* object placeholder */ },
      '/sendMoney': { /* object placeholder */ },
      '/': { /* object placeholder */ },
      '/mainMenu': { /* object placeholder */ } },
    libraries: { BotBuilder: { /* object placeholder */ } },
    actions: { // ActionSet
      actions: {}
    },
    recognizers: { // IntentRecognizerSet
      _onEnabled: [],
      _onFilter: [],
      options: { /* object placeholder */ },
      length: 0
    },
    triggersAdded: true,
    settings:
    { processLimit: 4,
      persistUserData: true,
      persistConversationData: true,
      storage: { /* object placeholder */ } },
    connectors: { '*': { /* object placeholder */ } },
    mwReceive: [],
    mwSend: [],
    mwSession: [ () => { /* mocked botbuilder function */ } ],
    _localePath: './locale/',
    localizer: { // DefaultLocalizer
      localePaths: [], locales: { /* object placeholder */ }, _defaultLocale: 'en' }
  },
  userData: {},
  conversationData:
  { telemetry:
  { brower: 'Microsoft Edge',
    IPaddress: '192.168.1.1',
    HostUrl: 'https://www.test.com' } },
  privateConversationData: {},
  sessionState:
  { callstack: callstacks.greetingStack,
    lastAccess: 1509472182114,
    version: 0 },
  message:
  { type: 'message',
    text: 'hi',
    textFormat: 'plain',
    timestamp: '2017-10-31T17:49:41.738Z',
    entities: [ { /* object placeholder */ } ],
    localTimestamp: '2017-10-31T12:49:41-05:00',
    textLocale: 'en-US',
    sourceEvent: { clientActivityId: '1509472177218.27674447728945983.0' },
    attachments: [],
    address:
    { id: 'ejdl369ij51l',
      channelId: 'emulator',
      user: { /* object placeholder */ },
      conversation: { /* object placeholder */ },
      bot: { /* object placeholder */ },
      serviceUrl: 'http://localhost:7329' },
    source: 'emulator',
    agent: 'botbuilder',
    user: { id: 'default-user', name: 'User' } },
  dialogData:
  { 'BotBuilder.Data.Intent': 'greeting',
    'BotBuilder.Data.WaterfallStep': 0 },
  batchTimer: null }

const defaultMessages = [
  { type: 'message',
    text: 'Hello! I am your friendly bot.',
    locale: 'en-US',
    localTimestamp: '2017-10-31T17:49:42.777Z',
    from: { id: 'bot-id-1234', name: 'Bot' },
    recipient: { id: 'default-user', name: 'User' },
    inputHint: 'acceptingInput'
  }
]

const defaultConfigObject = { botVersion: 'v3',
  luisRecognizer:
  { // LuisRecognizer
    _onEnabled: [],
    _onFilter: [],
    models: {
      '*': 'https://eastus2.api.cognitive.microsoft.com/luis/v2.0/apps/mocked-app-id?subscription-key=mocked-random-key&verbose=true' }
  }
}

const twoMessages = [
  {
    type: 'message',
    text: 'Updating your name..',
    locale: 'en-US',
    localTimestamp: '2017-10-31T18:15:40.859Z',
    from: { id: '1k7b29e5933a', name: 'Bot' },
    recipient: { id: 'default-user', name: 'User' },
    inputHint: 'ignoringInput'
  },
  {
    type: 'message',
    agent: 'botbuilder',
    source: 'emulator',
    textLocale: 'en-US',
    address:
    { id: '43a5ici47f8k',
      channelId: 'emulator',
      user: { /* object placeholder */ },
      conversation: { /* object placeholder */ },
      bot: { /* object placeholder */ },
      serviceUrl: 'http://localhost:7329' },
    text: 'Your name is now updated.' }
]

module.exports = {
  defaultSession,
  defaultMessages,
  defaultConfigObject,
  twoMessages,
  callstacks
}
