import { describe, expect, test } from 'vitest'

import ReverseIterableMap from './reverse-iterable-map.js'

describe('ReverseIterableMap', () => {
	test('Construct map without argument', () => {
		const map = new ReverseIterableMap()

		expect(map.size).toBe(0)
	})

	test('Construct map with illegal argument', () => {
		const fn = () => {
			// @ts-ignore because this is a deliberately wrong call to the constructor
			new ReverseIterableMap([1, 2, 3])
		}

		expect(fn).toThrowError(TypeError('iterable for Map should have array-like objects'))
	})

	test('Construct map with array of arrays', () => {
		const map = new ReverseIterableMap([
			[0, 'Hello?'],
			[1, 'Are you still there?'],
			[2, 'I see you'],
		])

		expect(map.size).toBe(3)
	})

	test('Construct map with array of arrays (readonly)', () => {
		/** @type {Array<[number, string]>} */
		const arrayOfArrays = [
			[0, 'Hello?'],
			[1, 'Are you still there?'],
			[2, 'I see you'],
		]
		const map = new ReverseIterableMap(arrayOfArrays)

		expect(map.size).toBe(3)
	})

	test('Construct map with another map', () => {
		const map = new Map([
			[0, 'Hello?'],
			[1, 'Are you still there?'],
			[2, 'I see you'],
		])
		const map2 = new ReverseIterableMap(map)

		expect(map instanceof Map).toBe(true)
		expect(map2 instanceof ReverseIterableMap).toBe(true)

		expect(map2.size).toBe(3)
	})

	test('Construct map with iterable', () => {
		const iterable = ['a', 'b', 'c'].entries()
		const map = new ReverseIterableMap(iterable)

		expect(map.size).toBe(3)
	})

	test('map.clear()', () => {
		const iterable = ['a', 'b', 'c'].entries()
		const map = new ReverseIterableMap(iterable)

		expect(map.size).toBe(3)
		map.clear()
		expect(map.size).toBe(0)
	})

	test('map.has()', () => {
		const map = new ReverseIterableMap([
			[0, 'Hello?'],
			[1, 'Are you still there?'],
			[2, 'I see you'],
		])

		expect(map.has(0)).toBe(true)
		expect(map.has(1)).toBe(true)
		expect(map.has(2)).toBe(true)
		expect(map.has(3)).toBe(false)
	})

	test('map.get()', () => {
		const map = new ReverseIterableMap([
			[0, 'Hello?'],
			[1, 'Are you still there?'],
			[2, 'I see you'],
		])

		expect(map.get(0)).toBe('Hello?')
		expect(map.get(1)).toBe('Are you still there?')
		expect(map.get(2)).toBe('I see you')
		expect(map.get(3)).toBe(undefined)
	})

	test('map.set()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		expect(map.set(0, 'Overwritten value')).toBe(map)

		expect(map.get(0)).toBe('Overwritten value')
		expect(map.get(1)).toBe('Are you still there?')
		expect(map.get(2)).toBe('I see you')
		expect(map.get(3)).toBe(undefined)
	})

	test('map.set() on map with single element', () => {
		const map = new ReverseIterableMap()
			.set(1, 'a')
			.set(2, 'b')

		expect([...map.keys()]).toEqual([1, 2])
	})

	test('map.setFirst()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')
			.setFirst(-1, 'lie')
			.setFirst(-2, 'a')
			.setFirst(-3, 'is')
			.setFirst(-4, 'cake')

		expect(map.set(0, 'Overwritten value')).toBe(map)

		expect([...map.keys()]).toEqual([-4, -3, -2, -1, 0, 1, 2])
	})

	test('map.setFirst() on map with single element', () => {
		const map = new ReverseIterableMap()
			.setFirst(2, 'b')
			.setFirst(1, 'a')

		expect([...map.keys()]).toEqual([1, 2])
	})

	test('map.set() first node with existing key', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		expect(map.set(0, 'alpha')).toBe(map)

		expect([...map.values()]).toEqual(['alpha', 'b', 'c'])
	})

	test('map.set() last node with existing key', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		expect(map.set(2, 'omega')).toBe(map)

		expect([...map.values()]).toEqual(['a', 'b', 'omega'])
	})

	test('map.setFirst() first node with existing key', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		expect(map.setFirst(0, 'alpha')).toBe(map)

		expect([...map.values()]).toEqual(['alpha', 'b', 'c'])
	})

	test('map.setFirst() last node with existing key', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		expect(map.setFirst(2, 'omega')).toBe(map)

		expect([...map.values()]).toEqual(['a', 'b', 'omega'])
	})

	test('map.delete() node at the start', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		expect(map.size).toBe(3)
		expect([...map.keys()]).toEqual([0, 1, 2])

		expect(map.delete(0)).toBe(true)

		expect(map.size).toBe(2)
		expect([...map.keys()]).toEqual([1, 2])
	})

	test('map.delete() node in the middle', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		expect(map.size).toBe(3)
		expect([...map.keys()]).toEqual([0, 1, 2])

		expect(map.delete(1)).toBe(true)

		expect(map.size).toBe(2)
		expect([...map.keys()]).toEqual([0, 2])
	})

	test('map.delete() node at the end', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		expect(map.size).toBe(3)
		expect([...map.keys()]).toEqual([0, 1, 2])

		expect(map.delete(2)).toBe(true)

		expect(map.size).toBe(2)
		expect([...map.keys()]).toEqual([0, 1])
	})

	test('map.delete() with a single entry', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')

		expect(map.size).toBe(1)

		expect(map.delete(0)).toBe(true)

		expect(map.size).toBe(0)
	})

	test('map.delete() non-existing key', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')

		expect(map.size).toBe(1)

		expect(map.delete(137)).toBe(false)

		expect(map.size).toBe(1)
	})

	test('map[Symbol.toStringTag]()', () => {
		const map = new ReverseIterableMap()

		expect(map.toString()).toBe('[object ReverseIterableMap]')
	})

	test('Some particulars', () => {
		const map = new ReverseIterableMap()

		let obj = {}
		map.set(obj, 'aha!')
		expect(map.has(obj)).toBe(true)
		expect(map.get(obj)).toBe('aha!')

		map.set(NaN, 'u wot?')
		expect(map.has(NaN)).toBe(true)
		expect(map.get(NaN)).toBe('u wot?')

		map.set('key', undefined)
		expect(map.has('key')).toBe(true)
		expect(map.get('key')).toBe(undefined)

		expect(map.has('non-existing key')).toBe(false)
		expect(map.get('non-existing key')).toBe(undefined)

		map.set('', 'Hello?')
		map.set(String(''), 'Are you still there?')
		map.set(new String(''), 'I see you!')

		expect(map.get('')).toBe('Are you still there?')
		expect(map.get(String(''))).toBe('Are you still there?')
		expect(map.get(new String(''))).toBe(undefined)
	})

	test('map.forEach() with one-argument-callback', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.

		map.forEach(/** @this {any} */ function (value) {
			expect(this).toBe(map)
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))

			lowerCaseCodePoint++
		}, map)
	})

	test('map.forEach() with two-argument-callback', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.
		let index = 0

		map.forEach(function (value, key) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)

			lowerCaseCodePoint++
			index++
		})
	})

	test('map.forEach() with three-argument-callback', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		let lowerCaseCodePoint = 97 // 97 is the code point for "a", 98 → "b", etc.
		let index = 0

		map.forEach(function (value, key, mapReference) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)
			expect(mapReference).toBe(map)

			lowerCaseCodePoint++
			index++
		})
	})

	test('map.forEach() with thisArg', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		const obj = {}

		map.forEach(/** @this {any} */ function () {
			expect(this).toBe(obj)
		}, obj)
	})

	test('map.forEachReverse() with three-argument-callback and thisArg', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
		])

		let lowerCaseCodePoint = 99 // 99 → "c", etc.
		let index = 2
		const obj = {}

		map.forEachReverse(/** @this {any} */ function (value, key, mapReference) {
			expect(value).toBe(String.fromCodePoint(lowerCaseCodePoint))
			expect(key).toBe(index)
			expect(mapReference).toBe(map)
			expect(this).toBe(obj)

			lowerCaseCodePoint--
			index--
		}, obj)
	})

	test('map[Symbol.iterator]()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		expect(ReverseIterableMap.prototype.hasOwnProperty(Symbol.iterator)).toBe(true)

		const iterator = map[Symbol.iterator]()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.reverseIterator()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		const iterator = map.reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.entries()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		const iterator = map.entries()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.keys()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		const iterator = map.keys()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(0)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(1)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe(2)

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.values()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		const iterator = map.values()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.entries().reverseIterator()', () => {
		const map = new ReverseIterableMap()
			.set(0, 'Hello?')
			.set(1, 'Are you still there?')
			.set(2, 'I see you')

		const iterator = map.entries().reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('I see you')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('Are you still there?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('Hello?')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.iteratorFor()', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		const iterator = map.iteratorFor(2)
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('c')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(3)
		expect(iteratorResult.value[1]).toBe('d')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(4)
		expect(iteratorResult.value[1]).toBe('e')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('map.iteratorFor().reverseIterator()', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		const iterator = map.iteratorFor(2).reverseIterator()
		expect(iterator.hasOwnProperty('next')).toBe(true)

		let iteratorResult = iterator.next()

		expect(iteratorResult.hasOwnProperty('done')).toBe(true)
		expect(iteratorResult.hasOwnProperty('value')).toBe(true)
		expect(Array.isArray(iteratorResult.value)).toBe(true)

		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(2)
		expect(iteratorResult.value[1]).toBe('c')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(1)
		expect(iteratorResult.value[1]).toBe('b')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(false)
		expect(iteratorResult.value[0]).toBe(0)
		expect(iteratorResult.value[1]).toBe('a')

		iteratorResult = iterator.next()
		expect(iteratorResult.done).toBe(true)
		expect(iteratorResult.value).toBe(undefined)
	})

	test('Spread operator: [...map]', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		expect([...map]).toEqual([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])
	})

	test('Spread operator: [...map.reverseIterator()]', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		expect([...map.reverseIterator()]).toEqual([
			[4, 'e'],
			[3, 'd'],
			[2, 'c'],
			[1, 'b'],
			[0, 'a'],
		])
	})

	test('Spread operator: [...map.entries()]', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		expect([...map.entries()]).toEqual([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])
	})

	test('Spread operator: [...map.keys()]', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		expect([...map.keys()]).toEqual([0, 1, 2, 3, 4])
	})

	test('Spread operator: [...map.values()]', () => {
		const map = new ReverseIterableMap([
			[0, 'a'],
			[1, 'b'],
			[2, 'c'],
			[3, 'd'],
			[4, 'e'],
		])

		expect([...map.values()]).toEqual(['a', 'b', 'c', 'd', 'e'])
	})
})
