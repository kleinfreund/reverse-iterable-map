import { ReverseIterableMap } from '../src/reverse-iterable-map.mjs';

let totalAssertions = 0;
let correctAssertions = 0;

function assert(condition, message) {
  totalAssertions++;

  if (condition) {
    correctAssertions++;
  }

  console.assert(condition, message);
}

function assertEqual(expression, exptected, actual, message) {
  const condition = exptected === actual;
  console.info(`${expression}: ${actual} === ${exptected}? ${statusMark(condition)}`);
  assert(condition, `Expect ${expression} to be ${exptected} but it was ${actual}.`);
}

function assertHasOwnProperty(expression, property, object) {
  const condition = object.hasOwnProperty(property);
  console.info(
    `${expression}: ${expression}.hasOwnProperty(${property.toString()})? ${statusMark(condition)}`
  );
  assert(
    condition,
    `Expect ${expression} to have a property ${property.toString()} but it doesn’t.`
  );
}

function statusMark(condition) {
  return condition ? '✓' : '✗';
}

console.group('Tests');
console.info('Running tests …');

const map = new ReverseIterableMap()
  .set('key1', '1')
  .set('key2', '2')
  .set('key3', '3');

console.group('map.get() method');
assertEqual('map.size', 3, map.size);
assertEqual('map.get("key1")', '1', map.get('key1'));
assertEqual('map.get("key2")', '2', map.get('key2'));
assertEqual('map.get("key3")', '3', map.get('key3'));
assertEqual('map.has("key1")', true, map.has('key1'));
assertEqual('map.has("key2")', true, map.has('key2'));
assertEqual('map.has("key3")', true, map.has('key3'));
assertEqual('map.has("")', false, map.has(''));
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

console.group('Iterables & Iterators');
map
  .set('key1', '4')
  .set('key2', '5')
  .set('key3', '6');

console.group('map');
assertHasOwnProperty('ReverseIterableMap.prototype', Symbol.iterator, ReverseIterableMap.prototype);
console.groupEnd();

console.group('map.entries()');
const entries = map.entries();
console.info('> const entries = map.entries();');
assertHasOwnProperty('entries', 'next', entries);
assertHasOwnProperty('entries', Symbol.iterator, entries);

let entriesNext = entries.next();
console.info('> let entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 'key1', entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '4', entriesNext.value[1]);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 'key2', entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '5', entriesNext.value[1]);

entriesNext = entries.next();
console.info('> entriesNext = entries.next();');
assertHasOwnProperty('entriesNext', 'done', entriesNext);
assertHasOwnProperty('entriesNext', 'value', entriesNext);
assertEqual('entriesNext.done', false, entriesNext.done);
assertEqual('entriesNext.value[0]', 'key3', entriesNext.value[0]);
assertEqual('entriesNext.value[1]', '6', entriesNext.value[1]);

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
assertEqual('valuesNext.value', '4', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '5', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertHasOwnProperty('valuesNext', 'value', valuesNext);
assertEqual('valuesNext.value', '6', valuesNext.value);
assertEqual('valuesNext.done', false, valuesNext.done);

valuesNext = values.next();
console.info('> valuesNext = values.next();');
assertHasOwnProperty('valuesNext', 'done', valuesNext);
assertEqual('valuesNext.done', true, valuesNext.done);
console.groupEnd();

console.group('map.entries().reverse()');
const entriesReverse = map.entries().reverse();
console.info('> const entriesReverse = map.entries().reverse();');
assertHasOwnProperty('entriesReverse', 'next', entriesReverse);
assertHasOwnProperty('entriesReverse', Symbol.iterator, entriesReverse);

let entriesReverseNext = entriesReverse.next();
console.info('> let entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 'key3', entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '6', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 'key2', entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '5', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
assertEqual('entriesReverseNext.value[0]', 'key1', entriesReverseNext.value[0]);
assertEqual('entriesReverseNext.value[1]', '4', entriesReverseNext.value[1]);

entriesReverseNext = entriesReverse.next();
console.info('> entriesReverseNext = entries.next();');
assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
assertEqual('entriesReverseNext.done', true, entriesReverseNext.done);
console.groupEnd();

assertEqual('map.toString()', '[object ReverseIterableMap]', map.toString());
console.groupEnd();

console.info(
  `Done. ${correctAssertions}/${totalAssertions} tests passed. ${
    correctAssertions === totalAssertions ? '🎉🎉🎉' : ''
  }`
);
console.groupEnd();
