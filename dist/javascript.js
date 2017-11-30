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

const createData = mocks => mocks.map(({ mock, file }) => `
      (function () {
        // ${mock}
        const realFile = '${file}';
        const mockFile = '${mock}';
        const realFileName = '${_path2.default.relative(process.cwd(), file)}';
        const mockFileName = '${_path2.default.relative(process.cwd(), mock)}';
        const mock = () => require(mockFile);
        const real = () => require(realFile);
        check(real, mock, realFileName, mockFileName);
      })();
   `).join('\n\n');

const TYPES = `

let hasError = false;

function getExports(loader, name) {
  try {
    return loader();
  } catch (e) {
    throw new Error('jest-typed-mock: could not load ' + name + ' > ' + e);
  }
}

function testFunction(a, b, file, name) {
  if (a.length != b.length) {
    console.error(name + ': in' + file + '\\n\\t\\t' + a.toString() + '\\n\\tdoes not match\\n\\t\\t'+b.toString());
    throw new Error('jest-typed-mock: function argument mismatch: ' + file + ': ' + name);
  }
}

function test(a, b, file, name) {
  if (!b) {
    throw new Error('jest-typed-mock: mocked export "' + name + '" does not exists in ' + file);
  }
  const typeOfA = typeof a;
  const typeOfB = typeof b;
  if (typeOfA != typeOfB) {
    throw new Error('jest-typed-mock: exported type mismatch: ' + file + ':' + name + '. Expected ' + typeOfB + ', got ' + typeOfB + '');
  }
  if (typeOfA === 'function') {
    return testFunction(a, b, file, name);
  }
}

function matchExports(realExports, mockedExports, realFile, mockFile) {
  if (typeof mockedExports !== typeof realExports) {
    throw new Error('jest-typed-mock: mock ' + mockFile + ' export does not match real file');
  }
  if (typeof mockedExports === 'function') {
    test(mockedExports, realExports, realFile, 'exports');
  } else if (typeof mockedExports === 'object') {
    Object.keys(mockedExports).forEach(key => {
      try {
        test(mockedExports[key], realExports[key], realFile, key)
      } catch (e) {
        console.error(e.message,'\\n');
        hasError = true;
      }
    });
  }
}

function check(real, mock, realFile, mockFile) {
  const realExports = getExports(real, realFile);
  const mockedExports = getExports(mock, mockFile);
  matchExports(realExports, mockedExports, realFile, mockFile);
}

`;

const END = `if (hasError) {
  throw 'jest-typed-mock: type check failed'
}`;

exports.default = (() => {
  var _ref2 = _asyncToGenerator(function* (dir) {

    const fileName = _path2.default.join(__dirname, 'jest-typed-mock-' + +Date.now() + '.js');

    const mocks = yield (0, _create2.default)(dir);
    let error = null;

    _fs2.default.writeFileSync(fileName, TYPES + '\n' + createData(mocks) + END);

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