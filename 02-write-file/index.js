const { createWriteStream } = require('fs');
const { join } = require('path');
const { createInterface } = require('readline');

const FILE = 'out.txt';

const ws = createWriteStream(join(__dirname, FILE)).on('error', (err) => console.log(err));
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
}).on('error', (err) => console.log(err));

rl.question("Enter text ('exit' for close):\n", (str) => {
  ws.write(str);
});
rl.on('line', (str) => {
  if (str === 'exit') rl.close();
  ws.write(`${str}\n`);
});
rl.on('close', () => console.log('Good bye!'));
