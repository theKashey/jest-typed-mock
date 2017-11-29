#!/usr/bin/env node
const mode = process.argv[2];

switch (mode) {
  case 'flow': return require('./dist/flow').default(process.cwd());
  case 'typescript': return require('./dist/ts').default(process.cwd());
  default: 'usage jest-typed-mock flow|typescript'
}