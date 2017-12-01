"use strict";

const nop = _could_be_any_ => {};
const fn = _could_be_any_ => _could_be_any_ => {};

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