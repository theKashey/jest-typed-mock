'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scanDirectory = require('scan-directory');

var _scanDirectory2 = _interopRequireDefault(_scanDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (root) {
    const __mocks__ = yield (0, _scanDirectory2.default)(root, function (file) {
      return file.match(/__mocks__/);
    });
    return __mocks__.map(function (file) {
      return {
        mock: file,
        file: file.replace('/__mocks__/', '/')
      };
    });
  });

  function look(_x) {
    return _ref.apply(this, arguments);
  }

  return look;
})();