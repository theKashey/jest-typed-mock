'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let executeTsc = (() => {
  var _ref = _asyncToGenerator(function* (fileName) {
    return yield (0, _projectorSpawn2.default)((0, _findBin2.default)('../node_modules/.bin/tsc'), ['--noEmit', fileName], {
      cwd: __dirname
    });
  });

  return function executeTsc(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _projectorSpawn = require('projector-spawn');

var _projectorSpawn2 = _interopRequireDefault(_projectorSpawn);

var _findBin = require('./findBin');

var _findBin2 = _interopRequireDefault(_findBin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const stripPath = file => _path2.default.join(_path2.default.dirname(file), _path2.default.basename(file, '.ts'));

const createData = (mocks, baseName) => mocks.map(({ mock, file }) => `
      (function () {
        // ${mock}
        const mock = () => import('${stripPath(_path2.default.relative(baseName, mock))}');
        const real = () => import('${stripPath(_path2.default.relative(baseName, file))}');
        expectRealImplimentation(real).toNestMock(mock, mock, real);
      })();
   `).join('\n\n');

const TYPES = `
/// <reference path="__jest_ts.d.ts"/>
declare type ImportFunction<T> = () => Promise<T>;

type Shape<T> =  {[P in keyof T]?: T[P]}

interface Next<T> {
  toNestMock<M>(real: ImportFunction<M>, test:ImportFunction<Shape<T>>, final: ImportFunction<M>): void;
};

declare function expectRealImplimentation<T>(mock: ImportFunction<T>): Next<T>
`;

exports.default = (() => {
  var _ref2 = _asyncToGenerator(function* (dir) {
    const fileName = __dirname + '/jest-typed-mock-' + +Date.now() + '.ts';
    const baseName = _path2.default.dirname(fileName);
    const mocks = yield (0, _create2.default)(dir);
    let error = null;

    _fs2.default.writeFileSync(fileName, TYPES + '\n' + createData(mocks, baseName));

    try {
      yield executeTsc(fileName);
    } catch (e) {
      console.error(e.stderr);
      console.error(e.stdout);
      error = e;
    }

    _fs2.default.unlinkSync(fileName);

    if (error) {
      throw error;
    }
  });

  function flowTyped(_x2) {
    return _ref2.apply(this, arguments);
  }

  return flowTyped;
})();