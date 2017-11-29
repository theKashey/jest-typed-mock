import fs from 'fs';
import path from 'path';

export default (fn) => {
  for (let i = 0; i < 5; i++) {
    const dir = path.join(__dirname, fn);
    if (fs.existsSync(dir)) {
      return dir;
    }
    fn = path.join('../', fn);
  }
  return fn;
};