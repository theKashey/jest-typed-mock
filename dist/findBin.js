'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = fn => {
  for (let i = 0; i < 5; i++) {
    const dir = _path2.default.join(__dirname, fn);
    if (_fs2.default.existsSync(dir)) {
      return dir;
    }
    fn = _path2.default.join('../', fn);
  }
  return fn;
};