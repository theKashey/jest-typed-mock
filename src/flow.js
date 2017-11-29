import fs from 'fs';
import path from 'path';
import create from './create';
import spawn from 'projector-spawn';
import getBin from './findBin';

const fileName = path.join(__dirname, 'jest-typed-mock.js.flow');

const baseName = path.dirname(fileName);

async function executeFlow() {
  return await spawn(getBin('../node_modules/.bin/flow'), [fileName], {
    cwd: __dirname
  });
}

const createData = (mocks) =>
  mocks
    .map(({mock, file}) => `
      (function () {
        // ${mock}
        const mock = () => import('${path.relative(baseName, mock)}');
        const real = () => import('${path.relative(baseName, file)}');
        expectRealImplimentation(real).toNestMock(mock);
      })(); 
   `)
    .join('\n\n');

const TYPES = `
// @flow
interface MagicObjectWithRandomMethod {
  __magic__rewiremock_flow: any;
}

declare type ImportFunction<T> = () => Promise<T>;

interface Next<T> {
  toNestMock(real: ImportFunction<$Shape<$Diff<T, MagicObjectWithRandomMethod>>>): Boolean;
};

declare function expectRealImplimentation<T>(mock: ImportFunction<T>): Next<T>

`

export default async function flowTyped(dir) {
  const mocks = await create(dir);
  let error = null;

  fs.writeFileSync(fileName, TYPES + '\n' + createData(mocks));

  try {
    await executeFlow();
  } catch (e) {
    console.error(e.stderr);
    console.error(e.stdout);
    error = e;
  }

  fs.unlinkSync(fileName);

  if (error) {
    throw error;
  }
}