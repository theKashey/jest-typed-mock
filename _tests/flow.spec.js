import {expect} from 'chai';

import test from '../src/flow';

describe('flow', () => {
  it('fail test', () => (
    test(__dirname + '/flow-fail')
      .then(() => {
          throw new Error('should not be called')
        }
        , () => true
      )
  )).timeout(20000);

  it('ok test', () => (
    test(__dirname + '/flow-ok')
  )).timeout(20000);
});