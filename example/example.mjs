import { ReverseIterableMap } from '../src/reverse-iterable-map.mjs';

const body = document.querySelector('body');

function printCommand(command) {
  body.insertAdjacentHTML('beforeend', `<pre class="command">&gt; ${command}</pre>`);
}

function printOutput(...args) {
  const output = args.length > 1 ? args.join(' ') : args[0];
  body.insertAdjacentHTML('beforeend', `<pre class="output">← ${output}</pre>`);
}

function runExample() {
  printCommand('const map = new ReverseIterableMap();');
  const map = new ReverseIterableMap();

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

  printCommand('for (const [key, value] of map.entries()) { … }');
  for (const [key, value] of map.entries()) {
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

  printCommand('for (const [key, value] of map.entries().reverse()) { … }');
  for (const [key, value] of map.entries().reverse()) {
    printOutput(key, ':', value);
  }

  printCommand('for (const key of map.keys().reverse()) { … }');
  for (const key of map.keys().reverse()) {
    printOutput(key);
  }

  printCommand('for (const value of map.values().reverse()) { … }');
  for (const value of map.values().reverse()) {
    printOutput(value);
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

  printCommand('[...map.entries().reverse()]');
  printOutput([...map.entries().reverse()]);

  printCommand('[...map.keys().reverse()]');
  printOutput([...map.keys().reverse()]);

  printCommand('[...map.values().reverse()]');
  printOutput([...map.values().reverse()]);

  printCommand('map.size');
  printOutput(map.size);

  printCommand('map.delete("key2")');
  printOutput(map.delete('key2'));

  printCommand('map.size');
  printOutput(map.size);

  printCommand(`map
    .set('key2', '2')
    .set('key4', '4')
    .set('key5', '5');`);
  map
    .set('key2', '2')
    .set('key4', '4')
    .set('key5', '5');

  printCommand('[...map.values()]');
  printOutput([...map.values()]);

  printCommand('const it = map.iteratorFor("key4").reverse();');
  const it = map.iteratorFor('key4').reverse();
  printCommand('it.next().value;');
  printOutput(it.next().value);
  printCommand('it.next().value;');
  printOutput(it.next().value);
  printCommand('it.next().value;');
  printOutput(it.next().value);

  printCommand(`map.forEach((value, key) => {
    printOutput(key, ': ', value);
  });`);
  map.forEach((value, key) => {
    printOutput(key, ':', value);
  });

  printCommand(`map.forEachReverse((value, key) => {
    printOutput(key, ': ', value);
  });`);
  map.forEachReverse((value, key) => {
    printOutput(key, ':', value);
  });

  printCommand('map.toString()');
  printOutput(map.toString());

  printCommand('const map2 = new ReverseIterableMap([[0, "1"], [1, "2"], [2, "3"]]);');
  const map2 = new ReverseIterableMap([[0, '1'], [1, '2'], [2, '3']]);

  printCommand('const it2 = map2.iteratorFor(1);');
  const it2 = map2.iteratorFor(1);

  printCommand('iterator.next().value');
  printOutput(it2.next().value);
  printCommand('iterator.next().value');
  printOutput(it2.next().value);
  printCommand('iterator.next().value');
  printOutput(it2.next().value);

  printCommand('const map3 = new ReverseIterableMap(["a", "b", "c"].entries());');
  const map3 = new ReverseIterableMap(['a', 'b', 'c'].entries());

  printCommand('const it3 = map3.iteratorFor(1);');
  const it3 = map3.iteratorFor(1);

  printCommand('iterator.next().value');
  printOutput(it3.next().value);
  printCommand('iterator.next().value');
  printOutput(it3.next().value);
  printCommand('iterator.next().value');
  printOutput(it3.next().value);
}

runExample();
