import fs from 'fs';
import path from 'path';
import create from './create';

async function executeNode(fileName) {
  return require(fileName);
}

const createData = (mocks) =>
  mocks
    .map(({mock, file}) => `
      (function () {
        // ${mock}
        const realFile = '${file}';
        const mockFile = '${mock}';
        const realFileName = '${path.relative(process.cwd(), file)}';
        const mockFileName = '${path.relative(process.cwd(), mock)}';
        const mock = () => require(mockFile);
        const real = () => require(realFile);
        check(real, mock, realFileName, mockFileName);
      })();
   `)
    .join('\n\n');

const TYPES = `
try{require('babel-require');}catch(e){}
let hasError = false;

const matchExports = require('compare-module-exports')('jest-typed-mock');

function getExports(loader, name) {
  try {
    return loader();
  } catch (e) {
    throw new Error('jest-typed-mock: could not load ' + name + ' > ' + e);
  }
}

function check(real, mock, realFile, mockFile) {
  const realExports = getExports(real, realFile);
  const mockedExports = getExports(mock, mockFile);
  hasError = matchExports(realExports, mockedExports, realFile, mockFile);
}

`;

const END = `if (hasError) {
  throw 'jest-typed-mock: type check failed'
}`;

export default async function flowTyped(dir) {

  const fileName = path.join(__dirname, 'jest-typed-mock-' + (+Date.now()) + '.js');

  const mocks = await create(dir);
  let error = null;

  fs.writeFileSync(fileName,
    TYPES
    + '\n'
    + createData(mocks)
    + END);

  try {
    await executeNode(fileName);
  } catch (e) {
    console.error(e);
    error = e;
  }

  fs.unlinkSync(fileName);

  if (error) {
    throw error;
  }
  return true;
}