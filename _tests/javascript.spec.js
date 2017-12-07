import {expect} from 'chai';

import test from '../src/javascript';

describe('javascript', () => {
  it('fail test', () => (
    test(__dirname + '/js-fail')
      .then(() => {
          throw new Error('should not be called')
        }
        , () => true
      )
  ));

  it('not-ok test', () => (
    test(__dirname + '/js-ok')
      .then(() => {
          throw new Error('should not be called')
        }
        , () => true
      )
  ));

  it('ok test', () => (
    test(__dirname + '/js-ok', {noFunctionCompare: true})
  ));

  it.only('default test', () => (
    test(__dirname + '/default-js')
  ));
});