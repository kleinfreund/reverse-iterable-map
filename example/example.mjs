import { ReverseIterableMap } from '../src/reverse-iterable-map.mjs';

/**
 * Recursive algorithm to stringify arrays and their content in order to print them like dev tools.
 *
 * ```js
 * stringify(['1', '2', '3'])
 * //> [ "1", "2", "3" ]
 *
 * stringify([1, '2', undefined, '3', [4, 5, 6]])
 * //> [ 1, "2", undefined, "3", [ 4, 5, 6 ] ]
 * ```
 *
 * @param {*} input
 * @returns {String}
 */
function stringify(input) {
  if (Array.isArray(input)) {
    const stringArray = [];
    for (const element of input) {
      stringArray.push(stringify(element));
    }

    return `[ ${stringArray.join(', ')} ]`;
  } else if (typeof input === 'string') {
    return `"${input}"`;
  }

  return String(input);
}

/**
 * @param {String} command
 */
function printCommand(command) {
  printCodeBlock(command, 'command');
}

/**
 * @param {Array} args
 */
function printOutput(...args) {
  const output = args.map(arg => Array.isArray(arg) ? stringify(arg) : String(arg));
  printCodeBlock(output.join(' '), 'output');
}

/**
 * @param {Array} args
 */
function printLog(...args) {
  const output = args.map(arg => Array.isArray(arg) ? stringify(arg) : String(arg));
  printCodeBlock(output.join(' '), 'log');
}

/**
 * @param {String} content
 * @param {Array<String>} classNames
 */
function printCodeBlock(content, ...classNames) {
  let concatenatedLines = '';
  for (const line of content.trim().split('\n')) {
    concatenatedLines += `<code>${line}</code>\n`;
  }

  document.body.insertAdjacentHTML(
    'beforeend',
    `<pre class="${classNames.join(' ')}">${concatenatedLines}</pre>`
  );
}

function printExamples() {
  printCommand('const map = new ReverseIterableMap();');
  const map = new ReverseIterableMap();

  printCommand(`
map
  .set("key1", "1")
  .set("key2", "2")
  .set("key3", "3");
  `);

  map
    .set('key1', '1')
    .set('key2', '2')
    .set('key3', '3');

  printCommand(`
for (const [key, value] of map) {
  console.log(key, ":", value);
}
  `);

  for (const [key, value] of map) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const [key, value] of map.entries()) {
  console.log(key, ":", value);
}
  `);
  for (const [key, value] of map.entries()) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const key of map.keys()) {
  console.log(key);
}
  `);
  for (const key of map.keys()) {
    printLog(key);
  }

  printCommand(`
for (const value of map.values()) {
  console.log(value);
}
  `);
  for (const value of map.values()) {
    printLog(value);
  }

  printCommand(`
for (const [key, value] of map.reverse()) {
  console.log(key, ":", value);
}
  `);
  for (const [key, value] of map.reverse()) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const [key, value] of map.entries().reverse()) {
  console.log(key, ":", value);
}
  `);
  for (const [key, value] of map.entries().reverse()) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const key of map.keys().reverse()) {
  console.log(key);
}
  `);
  for (const key of map.keys().reverse()) {
    printLog(key);
  }

  printCommand(`
for (const value of map.values().reverse()) {
  console.log(value);
}
  `);
  for (const value of map.values().reverse()) {
    printLog(value);
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

  printCommand(`
map
  .set("key2", "2")
  .set("key4", "4")
  .set("key5", "5");
  `);
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

  printCommand(`
map.forEach((value, key) => {
  console.log(key, ":", value);
});
  `);
  map.forEach((value, key) => {
    printLog(key, ':', value);
  });

  printCommand(`
map.forEachReverse((value, key) => {
  console.log(key, ":", value);
});
  `);
  map.forEachReverse((value, key) => {
    printLog(key, ':', value);
  });

  printCommand('map.toString()');
  printOutput(map.toString());

  printCommand('const map2 = new ReverseIterableMap([[0, "1"], [1, "2"], [2, "3"]]);');
  const map2 = new ReverseIterableMap([[0, '1'], [1, '2'], [2, '3']]);

  printCommand('const it2 = map2.iteratorFor(1);');
  const it2 = map2.iteratorFor(1);

  printCommand('it2.next().value');
  printOutput(it2.next().value);
  printCommand('it2.next().value');
  printOutput(it2.next().value);
  printCommand('it2.next().value');
  printOutput(it2.next().value);

  printCommand('const map3 = new ReverseIterableMap(["a", "b", "c"].entries());');
  const map3 = new ReverseIterableMap(['a', 'b', 'c'].entries());

  printCommand('const it3 = map3.iteratorFor(1);');
  const it3 = map3.iteratorFor(1);

  printCommand('it3.next().value');
  printOutput(it3.next().value);
  printCommand('it3.next().value');
  printOutput(it3.next().value);
  printCommand('it3.next().value');
  printOutput(it3.next().value);
}

printExamples();
