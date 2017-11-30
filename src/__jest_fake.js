const nop = () => {};
const fn = () => () => {};

const jestObject = {
  addMatchers: nop,
  autoMockOff: nop,
  autoMockOn: nop,
  clearAllMocks: nop,
  clearAllTimers: nop,
  deepUnmock: nop,
  disableAutomock: nop,
  doMock: nop,
  dontMock: nop,
  enableAutomock: nop,
  fn: fn,
  genMockFn: fn,
  genMockFromModule: nop,
  genMockFunction: fn,
  isMockFunction: nop,
  mock: nop,
  requireActual: require,
  requireMock: require,
  resetAllMocks: nop,
  resetModuleRegistry: nop,
  resetModules: nop,
  restoreAllMocks: nop,
  runAllImmediates: nop,
  runAllTicks: nop,
  runAllTimers: nop,
  runOnlyPendingTimers: nop,
  runTimersToTime: nop,
  setMock: nop,
  setTimeout: nop,
  spyOn: nop,
  unmock: nop,
  useFakeTimers: nop,
  useRealTimers: nop
};

module.exports = jestObject;