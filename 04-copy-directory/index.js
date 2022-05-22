const fs = require('fs/promises');
const { join } = require('path');

const DIR = join(__dirname, 'files');
const DIR_COPY = join(__dirname, 'files-copy');

fs.readdir(DIR)
  .then((dir) => copy(dir))
  .then((count) => console.log(`${count} file(s) copied!`));

async function copy(dir) {
  fs.mkdir(DIR_COPY).catch((err) => {
    if (err === 'EEXIST') {
      fs.rmdir(DIR_COPY);
    }
  });
  for (let i = 0; i < dir.length; i++) {
    await fs.copyFile(join(DIR, dir[i]), join(DIR_COPY, dir[i])).then(console.log(dir[i]));
  }

  return dir.length;
}
