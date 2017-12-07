import { LinkedMap } from '../src/linked-map.js';

let totalAssertions = 0;
let correctAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (condition) {
    correctAssertions++;
  }

  console.assert(condition, message);
}

function assertEqual(thing, exptected, actual, message) {
  const condition = exptected === actual;
  console.info(`${thing}: ${actual} === ${exptected}? ${condition ? '✓' : '✗'}`);
  assert(condition, `Expect ${thing} to be ${exptected} but it was ${actual}.`);
}

console.info('Running tests …');

const map = new LinkedMap();

assertEqual('map.size', 0, map.size);

map
  .push('key1', '1')
  .push('key2', '2')
  .push('key3', '3');

console.group('map.get() method');
assertEqual('map.size', 3, map.size);
assertEqual('map.get("key1")', '1', map.get('key1'));
assertEqual('map.get("key2")', '2', map.get('key2'));
assertEqual('map.get("key3")', '3', map.get('key3'));
console.groupEnd();

console.group('map.delete() method');
assertEqual('map.delete("key2")', true, map.delete('key2'));
assertEqual('map.size', 2, map.size);
assertEqual('map.delete("key1")', true, map.delete('key1'));
assertEqual('map.size', 1, map.size);
assertEqual('map.delete("key2")', false, map.delete('key2'));
assertEqual('map.delete("key3")', true, map.delete('key3'));
assertEqual('map.size', 0, map.size);
console.groupEnd();

console.info(`Done. ${correctAssertions}/${totalAssertions} tests passed.`);
