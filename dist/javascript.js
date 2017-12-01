'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let executeNode = (() => {
  var _ref = _asyncToGenerator(function* (fileName) {
    return require(fileName);
  });

  return function executeNode(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createData = (mocks, options = {}) => mocks.map(({ mock, file }) => `
      (function () {
        // ${mock}
        const realFile = '${file}';
        const mockFile = '${mock}';
        const realFileName = '${_path2.default.relative(process.cwd(), file)}';
        const mockFileName = '${_path2.default.relative(process.cwd(), mock)}';
        const mock = () => require(mockFile);
        const real = () => require(realFile);
        check(real, mock, realFileName, mockFileName, ${JSON.stringify(options)});
      })();
   `).join('\n\n');

const TYPES = `
let hasError = false;
if(typeof jest === 'undefined') { console.log('jest imported');global.jest = require('./__jest_fake.js');}

const matchExports = require('compare-module-exports')('jest-typed-mock');

function getExports(loader, name) {
  try {
    return loader();
  } catch (e) {
    throw new Error('jest-typed-mock: could not load ' + name + ' > ' + e);
  }
}

function check(real, mock, realFile, mockFile, options) {
  const realExports = getExports(real, realFile);
  const mockedExports = getExports(mock, mockFile);
  hasError = matchExports(realExports, mockedExports, realFile, mockFile, options);
}

`;

const END = `if (hasError) {
  throw 'jest-typed-mock: type check failed'
}`;

exports.default = (() => {
  var _ref2 = _asyncToGenerator(function* (dir, options = {}) {

    const fileName = _path2.default.join(__dirname, 'jest-typed-mock-' + +Date.now() + '.js');
    const mocks = yield (0, _create2.default)(dir);
    let error = null;

    _fs2.default.writeFileSync(fileName, TYPES + '\n' + createData(mocks, options) + END);

    try {
      yield executeNode(fileName);
    } catch (e) {
      console.error(e);
      error = e;
    }

    _fs2.default.unlinkSync(fileName);

    if (error) {
      throw error;
    }
    return true;
  });

  function flowTyped(_x2) {
    return _ref2.apply(this, arguments);
  }

  return flowTyped;
})();