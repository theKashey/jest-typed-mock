import fs from 'fs';
import path from 'path';
import create from './create';
import spawn from 'projector-spawn';
import getBin from './findBin';

async function executeTsc(fileName) {
  return await spawn(getBin('../node_modules/.bin/tsc'), ['--noEmit', fileName], {
    cwd: __dirname
  });
}

const stripPath = (file) => path.join(path.dirname(file), path.basename(file, '.ts'));

const createData = (mocks, baseName) =>
  mocks
    .map(({mock, file}) => `
      (function () {
        // ${mock}
        const mock = () => import('${stripPath(path.relative(baseName, mock))}');
        const real = () => import('${stripPath(path.relative(baseName, file))}');
        expectRealImplimentation(real).toNestMock(mock, mock, real);
      })();
   `)
    .join('\n\n');

const TYPES = `
/// <reference path="__jest_ts.d.ts"/>
declare type ImportFunction<T> = () => Promise<T>;

type Shape<T> =  {[P in keyof T]?: T[P]}

interface Next<T> {
  toNestMock<M>(real: ImportFunction<M>, test:ImportFunction<Shape<T>>, final: ImportFunction<M>): void;
};

declare function expectRealImplimentation<T>(mock: ImportFunction<T>): Next<T>
`

export default async function flowTyped(dir) {
  const fileName = __dirname + '/jest-typed-mock-' + (+Date.now()) + '.ts';
  const baseName = path.dirname(fileName);
  const mocks = await create(dir);
  let error = null;

  fs.writeFileSync(fileName, TYPES + '\n' + createData(mocks, baseName));

  try {
    await executeTsc(fileName);
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