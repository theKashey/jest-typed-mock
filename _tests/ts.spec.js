import {expect} from 'chai';

import test from '../src/ts';

describe('typescript', () => {
  it('fail test', () => (
    test(__dirname + '/ts-fail')
      .then(() => {
          throw new Error('should not be called')
        }
        , () => true
      )
  )).timeout(20000);

  it('ok test', () => (
    test(__dirname + '/ts-ok')
  )).timeout(20000);
});