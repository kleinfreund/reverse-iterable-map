import test from 'ava';
import ReverseIterableMap from '../src/reverse-iterable-map';

test('Construct map without argument', t => {
  const map = new ReverseIterableMap();

  t.is(map.size, 0, 'Map is empty.');
});

test('Construct map with illegal argument', t => {
  t.throws(() => {
    // @ts-ignore because this is a deliberately wrong call to the constructor
    new ReverseIterableMap([1, 2, 3]);
  }, 'iterable for Map should have array-like objects');
});

test('Construct map with array of arrays', t => {
  const map = new ReverseIterableMap([
    [0, 'Hello?'],
    [1, 'Are you still there?'],
    [2, 'I see you']
  ]);

  t.is(map.size, 3, 'Map has three elements.');
});

test('Construct map with another map', t => {
  const map = new Map([
    [0, 'Hello?'],
    [1, 'Are you still there?'],
    [2, 'I see you']
  ]);
  const map2 = new ReverseIterableMap(map);

  t.true(map instanceof Map);
  t.true(map2 instanceof ReverseIterableMap);

  t.is(map2.size, 3, 'Map has three elements.');
});

test('Construct map with iterable', t => {
  const iterable = ['a', 'b', 'c'].entries();
  const map = new ReverseIterableMap(iterable);

  t.is(map.size, 3, 'Map has three elements.');
});

test('map.clear()', t => {
  const iterable = ['a', 'b', 'c'].entries();
  const map = new ReverseIterableMap(iterable);

  t.is(map.size, 3, 'Map has three elements.');
  map.clear();
  t.is(map.size, 0, 'Map is empty.');
});

test('map.has()', t => {
  const map = new ReverseIterableMap([
    [0, 'Hello?'],
    [1, 'Are you still there?'],
    [2, 'I see you']
  ]);

  t.true(map.has(0));
  t.true(map.has(1));
  t.true(map.has(2));
  t.false(map.has(3));
});

test('map.get()', t => {
  const map = new ReverseIterableMap([
    [0, 'Hello?'],
    [1, 'Are you still there?'],
    [2, 'I see you']
  ]);

  t.is(map.get(0), 'Hello?');
  t.is(map.get(1), 'Are you still there?');
  t.is(map.get(2), 'I see you');
  t.is(map.get(3), undefined);
});

test('map.set()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  t.is(map.set(0, 'Overwritten value'), map);

  t.is(map.get(0), 'Overwritten value');
  t.is(map.get(1), 'Are you still there?');
  t.is(map.get(2), 'I see you');
  t.is(map.get(3), undefined);
});

test('map.setFirst()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you')
    .setFirst(-1, 'lie')
    .setFirst(-2, 'a')
    .setFirst(-3, 'is')
    .setFirst(-4, 'cake');

  t.is(map.set(0, 'Overwritten value'), map);

  t.deepEqual([...map.keys()], [-4, -3, -2, -1, 0, 1, 2]);
});

test('map.set() first node with existing key', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  t.is(map.set(0, 'alpha'), map);

  t.deepEqual([...map.values()], ['alpha', 'b', 'c']);
});

test('map.set() last node with existing key', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  t.is(map.set(2, 'omega'), map);

  t.deepEqual([...map.values()], ['a', 'b', 'omega']);
});

test('map.setFirst() first node with existing key', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  t.is(map.setFirst(0, 'alpha'), map);

  t.deepEqual([...map.values()], ['alpha', 'b', 'c']);
});

test('map.setFirst() last node with existing key', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  t.is(map.setFirst(2, 'omega'), map);

  t.deepEqual([...map.values()], ['a', 'b', 'omega']);
});

test('map.delete() with multiple entries', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  t.is(map.size, 3);
  t.deepEqual([...map.keys()], [0, 1, 2]);

  t.true(map.delete(0));

  t.is(map.size, 2);
  t.deepEqual([...map.keys()], [1, 2]);
});

test('map.delete() with a single entry', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?');

  t.is(map.size, 1);

  t.true(map.delete(0));

  t.is(map.size, 0);
});

test('map[Symbol.toStringTag]()', t => {
  const map = new ReverseIterableMap();

  t.is(map.toString(), '[object ReverseIterableMap]');
});

test('Some particulars', t => {
  const map = new ReverseIterableMap();

  let obj = {};
  map.set(obj, 'aha!');
  t.true(map.has(obj));
  t.is(map.get(obj), 'aha!', 'Map key can be an object');

  map.set(NaN, 'u wot?');
  t.true(map.has(NaN));
  t.is(map.get(NaN), 'u wot?', 'Map key is `NaN`');

  map.set('key', undefined);
  t.true(map.has('key'));
  t.is(map.get('key'), undefined, 'Entry’s value is `undefined`');

  t.false(map.has('non-existing key'));
  t.is(map.get('non-existing key'), undefined, 'Entry is `undefined`');

  map.set('', 'Hello?');
  map.set(String(''), 'Are you still there?');
  map.set(new String(''), 'I see you!');

  t.is(map.get(''), 'Are you still there?');
  t.is(map.get(String('')), 'Are you still there?');
  t.is(map.get(new String('')), undefined);
});

test('map.forEach() with one-argument-callback', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.

  map.forEach(function (value) {
    t.is(this, map);
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));

    lowerCaseCodePoint++;
  }, map);
});

test('map.forEach() with two-argument-callback', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.
  let index = 0;

  map.forEach(function (value, key) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);

    lowerCaseCodePoint++;
    index++;
  });
});

test('map.forEach() with three-argument-callback', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  let lowerCaseCodePoint = 97; // 97 is the code point for "a", 98 → "b", etc.
  let index = 0;

  map.forEach(function (value, key, mapReference) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);
    t.is(mapReference, map);

    lowerCaseCodePoint++;
    index++;
  });
});

test('map.forEach() with thisArg', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  const obj = {};

  map.forEach(function () {
    t.is(this, obj);
  }, obj);
});

test('map.forEachReverse() with three-argument-callback and thisArg', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
  ]);

  let lowerCaseCodePoint = 99; // 99 → "c", etc.
  let index = 2;
  const obj = {};

  map.forEachReverse(function (value, key, mapReference) {
    t.is(value, String.fromCodePoint(lowerCaseCodePoint));
    t.is(key, index);
    t.is(mapReference, map);
    t.is(this, obj);

    lowerCaseCodePoint--;
    index--;
  }, obj);
});

test('map[Symbol.iterator]()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  t.true(ReverseIterableMap.prototype.hasOwnProperty(Symbol.iterator));

  const iterator = map[Symbol.iterator]();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.reverseIterator()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  const iterator = map.reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.entries()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  const iterator = map.entries();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.keys()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  const iterator = map.keys();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 0);

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 1);

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 2);

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.values()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  const iterator = map.values();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Hello?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value, 'I see you');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.entries().reverseIterator()', t => {
  const map = new ReverseIterableMap()
    .set(0, 'Hello?')
    .set(1, 'Are you still there?')
    .set(2, 'I see you');

  const iterator = map.entries().reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'I see you');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'Are you still there?');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'Hello?');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.iteratorFor()', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  const iterator = map.iteratorFor(2);
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 3);
  t.is(iteratorResult.value[1], 'd');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 4);
  t.is(iteratorResult.value[1], 'e');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('map.iteratorFor().reverseIterator()', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  const iterator = map.iteratorFor(2).reverseIterator();
  t.true(iterator.hasOwnProperty('next'));

  let iteratorResult = iterator.next();

  t.true(iteratorResult.hasOwnProperty('done'));
  t.true(iteratorResult.hasOwnProperty('value'));
  t.true(Array.isArray(iteratorResult.value));

  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 2);
  t.is(iteratorResult.value[1], 'c');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 1);
  t.is(iteratorResult.value[1], 'b');

  iteratorResult = iterator.next();
  t.false(iteratorResult.done);
  t.is(iteratorResult.value[0], 0);
  t.is(iteratorResult.value[1], 'a');

  iteratorResult = iterator.next();
  t.true(iteratorResult.done);
  t.is(iteratorResult.value, undefined);
});

test('Spread operator: [...map]', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  t.deepEqual([...map], [
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);
});

test('Spread operator: [...map.reverseIterator()]', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  t.deepEqual([...map.reverseIterator()], [
    [4, 'e'],
    [3, 'd'],
    [2, 'c'],
    [1, 'b'],
    [0, 'a']
  ]);
});

test('Spread operator: [...map.entries()]', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  t.deepEqual([...map.entries()], [
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);
});

test('Spread operator: [...map.keys()]', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  t.deepEqual([...map.keys()], [0, 1, 2, 3, 4]);
});

test('Spread operator: [...map.values()]', t => {
  const map = new ReverseIterableMap([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e']
  ]);

  t.deepEqual([...map.values()], ['a', 'b', 'c', 'd', 'e']);
});
