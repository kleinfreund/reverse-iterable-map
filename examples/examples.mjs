import ReverseIterableMap from '../dist/esm/reverse-iterable-map.mjs';

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
  const output = args.map(arg => stringify(arg));
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
  printOutput(map);

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
for (const [key, value] of map.reverseIterator()) {
  console.log(key, ":", value);
}
  `);
  for (const [key, value] of map.reverseIterator()) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const [key, value] of map.entries().reverseIterator()) {
  console.log(key, ":", value);
}
  `);
  for (const [key, value] of map.entries().reverseIterator()) {
    printLog(key, ':', value);
  }

  printCommand(`
for (const key of map.keys().reverseIterator()) {
  console.log(key);
}
  `);
  for (const key of map.keys().reverseIterator()) {
    printLog(key);
  }

  printCommand(`
for (const value of map.values().reverseIterator()) {
  console.log(value);
}
  `);
  for (const value of map.values().reverseIterator()) {
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

  printCommand('[...map.reverseIterator()]');
  printOutput([...map.reverseIterator()]);

  printCommand('[...map.entries().reverseIterator()]');
  printOutput([...map.entries().reverseIterator()]);

  printCommand('[...map.keys().reverseIterator()]');
  printOutput([...map.keys().reverseIterator()]);

  printCommand('[...map.values().reverseIterator()]');
  printOutput([...map.values().reverseIterator()]);

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

  printCommand('map.size');
  printOutput(map.size);

  printCommand('const it = map.iteratorFor("key4").reverseIterator()');
  const it = map.iteratorFor('key4').reverseIterator();
  printOutput(it);

  printCommand('it.next().value');
  printOutput(it.next().value);
  printCommand('it.next().value');
  printOutput(it.next().value);
  printCommand('it.next().value');
  printOutput(it.next().value);

  printCommand(`
map.forEach((value, key) => {
  console.log(key, ":", value);
})
  `);
  map.forEach((value, key) => {
    printLog(key, ':', value);
  });

  printCommand(`
map.forEachReverse((value, key) => {
  console.log(key, ":", value);
})
  `);
  map.forEachReverse((value, key) => {
    printLog(key, ':', value);
  });

  printCommand('map.toString()');
  printOutput(map.toString());

  document.body.insertAdjacentHTML('beforeend', '<hr>');

  printCommand('const map2 = new ReverseIterableMap([[0, "1"], [1, "2"], [2, "3"]]);');
  const map2 = new ReverseIterableMap([[0, '1'], [1, '2'], [2, '3']]);
  printOutput(map2);

  printCommand('const it2 = map2.iteratorFor(1);');
  const it2 = map2.iteratorFor(1);
  printOutput(it2);

  printCommand('it2.next().value');
  printOutput(it2.next().value);
  printCommand('it2.next().value');
  printOutput(it2.next().value);
  printCommand('it2.next().value');
  printOutput(it2.next().value);

  document.body.insertAdjacentHTML('beforeend', '<hr>');

  printCommand('const builtInMap = new Map(["a", "b", "c"].entries());');
  printCommand('const map3 = new ReverseIterableMap(builtInMap);');
  const builtInMap = new Map(['a', 'b', 'c'].entries());
  const map3 = new ReverseIterableMap(builtInMap);
  printOutput(map3);

  printCommand('const it3 = map3.iteratorFor(1);');
  const it3 = map3.iteratorFor(1);
  printOutput(it3);

  printCommand('it3.next().value');
  printOutput(it3.next().value);
  printCommand('it3.next().value');
  printOutput(it3.next().value);
  printCommand('it3.next().value');
  printOutput(it3.next().value);
}

printExamples();
