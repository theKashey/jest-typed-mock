#!/usr/bin/env node
require("babel-register");
const mode = process.argv[2];

switch (mode) {
  case 'flow': return require('./dist/flow').default(process.cwd());
  case 'typescript': return require('./dist/ts').default(process.cwd());
  case 'javascript': return require('./dist/javascript').default(process.cwd());
  case 'exports': return require('./dist/javascript').default(process.cwd(), {noFunctionCompare: true});
  default: 'usage jest-typed-mock javascript|flow|typescript'
}