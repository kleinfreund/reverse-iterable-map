import { ReverseIterableMap } from '../src/reverse-iterable-map.mjs';
import { TestRunner } from './test-runner.mjs';

function tests() {
  const testRunner = new TestRunner();
  console.group('Tests');
  console.info('Running tests …');

  const map = new ReverseIterableMap()
    .set('key1', '1')
    .set('key2', '2')
    .set('key3', '3');

  console.group('map.get() method');
  testRunner.assertEqual('map.size', 3, map.size);
  testRunner.assertEqual('map.get("key1")', '1', map.get('key1'));
  testRunner.assertEqual('map.get("key2")', '2', map.get('key2'));
  testRunner.assertEqual('map.get("key3")', '3', map.get('key3'));
  testRunner.assertEqual('map.has("key1")', true, map.has('key1'));
  testRunner.assertEqual('map.has("key2")', true, map.has('key2'));
  testRunner.assertEqual('map.has("key3")', true, map.has('key3'));
  testRunner.assertEqual('map.has("")', false, map.has(''));
  console.groupEnd();

  console.group('map.delete() method');
  testRunner.assertEqual('map.delete("key2")', true, map.delete('key2'));
  testRunner.assertEqual('map.size', 2, map.size);
  testRunner.assertEqual('map.delete("key1")', true, map.delete('key1'));
  testRunner.assertEqual('map.size', 1, map.size);
  testRunner.assertEqual('map.delete("key2")', false, map.delete('key2'));
  testRunner.assertEqual('map.delete("key3")', true, map.delete('key3'));
  testRunner.assertEqual('map.size', 0, map.size);
  console.groupEnd();

  console.group('Iterables & Iterators');
  map
    .set('key1', '4')
    .set('key2', '5')
    .set('key3', '6');

  console.group('map');
  testRunner.assertHasOwnProperty('ReverseIterableMap.prototype', Symbol.iterator, ReverseIterableMap.prototype);
  console.groupEnd();

  console.group('map.entries()');
  const entries = map.entries();
  console.info('> const entries = map.entries();');
  testRunner.assertHasOwnProperty('entries', 'next', entries);
  testRunner.assertHasOwnProperty('entries', Symbol.iterator, entries);

  let entriesNext = entries.next();
  console.info('> let entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'key1', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '4', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'key2', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '5', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertHasOwnProperty('entriesNext', 'value', entriesNext);
  testRunner.assertEqual('entriesNext.done', false, entriesNext.done);
  testRunner.assertEqual('entriesNext.value[0]', 'key3', entriesNext.value[0]);
  testRunner.assertEqual('entriesNext.value[1]', '6', entriesNext.value[1]);

  entriesNext = entries.next();
  console.info('> entriesNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesNext', 'done', entriesNext);
  testRunner.assertEqual('entriesNext.done', true, entriesNext.done);
  console.groupEnd();

  console.group('map.keys()');
  const keys = map.keys();
  console.info('> const keys = map.keys();');
  testRunner.assertHasOwnProperty('keys', 'next', keys);
  testRunner.assertHasOwnProperty('keys', Symbol.iterator, keys);

  let keysNext = keys.next();
  console.info('> let keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 'key1', keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 'key2', keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertHasOwnProperty('keysNext', 'value', keysNext);
  testRunner.assertEqual('keysNext.value', 'key3', keysNext.value);
  testRunner.assertEqual('keysNext.done', false, keysNext.done);

  keysNext = keys.next();
  console.info('> keysNext = keys.next();');
  testRunner.assertHasOwnProperty('keysNext', 'done', keysNext);
  testRunner.assertEqual('keysNext.done', true, keysNext.done);
  console.groupEnd();

  console.group('map.values()');
  const values = map.values();
  console.info('> const values = map.values();');
  testRunner.assertHasOwnProperty('values', 'next', values);
  testRunner.assertHasOwnProperty('values', Symbol.iterator, values);

  let valuesNext = values.next();
  console.info('> let valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '4', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '5', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertHasOwnProperty('valuesNext', 'value', valuesNext);
  testRunner.assertEqual('valuesNext.value', '6', valuesNext.value);
  testRunner.assertEqual('valuesNext.done', false, valuesNext.done);

  valuesNext = values.next();
  console.info('> valuesNext = values.next();');
  testRunner.assertHasOwnProperty('valuesNext', 'done', valuesNext);
  testRunner.assertEqual('valuesNext.done', true, valuesNext.done);
  console.groupEnd();

  console.group('map.entries().reverseIterator()');
  const entriesReverse = map.entries().reverseIterator();
  console.info('> const entriesReverse = map.entries().reverseIterator();');
  testRunner.assertHasOwnProperty('entriesReverse', 'next', entriesReverse);
  testRunner.assertHasOwnProperty('entriesReverse', Symbol.iterator, entriesReverse);

  let entriesReverseNext = entriesReverse.next();
  console.info('> let entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'key3', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '6', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'key2', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '5', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertHasOwnProperty('entriesReverseNext', 'value', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', false, entriesReverseNext.done);
  testRunner.assertEqual('entriesReverseNext.value[0]', 'key1', entriesReverseNext.value[0]);
  testRunner.assertEqual('entriesReverseNext.value[1]', '4', entriesReverseNext.value[1]);

  entriesReverseNext = entriesReverse.next();
  console.info('> entriesReverseNext = entries.next();');
  testRunner.assertHasOwnProperty('entriesReverseNext', 'done', entriesReverseNext);
  testRunner.assertEqual('entriesReverseNext.done', true, entriesReverseNext.done);
  console.groupEnd();

  testRunner.assertEqual('map.toString()', '[object ReverseIterableMap]', map.toString());
  console.groupEnd();

  testRunner.printResults();
  console.groupEnd();
}

tests();
