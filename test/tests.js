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
  console.info(`${thing}: ${actual} === ${exptected}? ${statusMark(condition)}`);
  assert(condition, `Expect ${thing} to be ${exptected} but it was ${actual}.`);
}

function assertHasOwnProperty(thing, property, object) {
  const condition = object.hasOwnProperty(property);
  console.info(
    `${thing}: ${thing}.hasOwnProperty(${property.toString()})? ${statusMark(condition)}`
  );
  assert(condition, `Expect ${thing} to have a property ${property.toString()} but it doesn’t.`);
}

function statusMark(condition) {
  return condition ? '✓' : '✗';
}

console.group('Tests');
console.info('Running tests …');

const map = new LinkedMap();

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

console.group('Iterators');
map
  .push('key1', '1')
  .push('key2', '2')
  .push('key3', '3');

console.group('map.entries()');
const entries = map.entries();
console.info('> const entries = map.entries();');
assertHasOwnProperty('map.entries()', 'next', entries);
assertHasOwnProperty('map.entries()', Symbol.iterator, entries);

let entriesNext = entries.next();
console.info('> let entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertEqual('entriesNext.done', true, entriesNext.done);
console.groupEnd();

console.group('map.keys()');
const keys = map.keys();
console.info('> const keys = map.keys();');
assertHasOwnProperty('keys', 'next', keys);
assertHasOwnProperty('keys', Symbol.iterator, keys);

let keysNext = keys.next();
console.info('> let keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 'key1', keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 'key2', keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertHasOwnProperty('keysNext', 'value', keysNext);
assertEqual('keysNext.value', 'key3', keysNext.value);
assertEqual('keysNext.done', false, keysNext.done);

keysNext = keys.next();
console.info('> keysNext = keys.next();');
assertHasOwnProperty('keysNext', 'done', keysNext);
assertEqual('keysNext.done', true, keysNext.done);
console.groupEnd();

console.group('map.values()');
const values = map.values();
console.info('> const values = map.values();');
assertHasOwnProperty('values', 'next', values);
assertHasOwnProperty('values', Symbol.iterator, values);

let valuesNext = values.next();
console.info('> let valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '1', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '2', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '3', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertEqual('valuesNext.done', true, valuesNext.done);
console.groupEnd();
console.groupEnd();

console.info(
  `Done. ${correctAssertions}/${totalAssertions} tests passed. ${
    correctAssertions === totalAssertions ? '🎉🎉🎉' : ''
  }`
);
console.groupEnd();
