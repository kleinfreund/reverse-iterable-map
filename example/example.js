import { LinkedMap } from '../src/linked-map.js';

const body = document.querySelector('body');

function printCommand(command) {
  body.insertAdjacentHTML('beforeend', `<pre class="command">&gt; ${command}</pre>`);
}

function printOutput(...args) {
  body.insertAdjacentHTML('beforeend', `<pre class="output">  ${args.join(' ')}</pre>`);
}

function runExample() {
  printCommand('const map = new LinkedMap();');
  const map = new LinkedMap();

  printCommand(`map
    .set('key1', '1')
    .set('key2', '2')
    .set('key3', '3');`);
  map
    .set('key1', '1')
    .set('key2', '2')
    .set('key3', '3');

  printCommand('for (const [key, value] of map) { … }');
  for (const [key, value] of map) {
    printOutput(key, ':', value);
  }

  printCommand('for (const [key, value] of map.entries(true)) { … }');
  for (const [key, value] of map.entries(true)) {
    printOutput(key, ':', value);
  }

  printCommand('for (const key of map.keys()) { … }');
  for (const key of map.keys()) {
    printOutput(key);
  }

  printCommand('for (const value of map.values()) { … }');
  for (const value of map.values()) {
    printOutput(value);
  }

  printCommand('for (const [key, value] of map.reverse()) { … }');
  for (const [key, value] of map.reverse()) {
    printOutput(key, ':', value);
  }

  printCommand('[...map]');
  printOutput([...map]);

  printCommand('[...map.entries()]');
  printOutput([...map.entries()]);

  printCommand('[...map.keys()]');
  printOutput([...map.keys()]);

  printCommand('[...map.values()]');
  printOutput([...map.values()]);

  printCommand('[...map.reverse()]');
  printOutput([...map.reverse()]);

  printCommand('map.size');
  printOutput(map.size);

  printCommand('map.delete("key2");');
  map.delete('key2');

  printCommand('map.size');
  printOutput(map.size);

  printCommand('for (const value of map.values()) { … }');
  for (const value of map.values()) {
    printOutput(value);
  }
}

runExample();
