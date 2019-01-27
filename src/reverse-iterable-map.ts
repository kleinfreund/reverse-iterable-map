/**
 * A reverse-iterable map implementation based on the built-in [`Map`][1] object.
 *
 * It exposes its order via iterable iterators which can be used for both forwards and backwards
 * iteration. As per `Map`, the order of a `ReverseIterableMap` is the insertion order.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
export default class ReverseIterableMap<K, V> {
  private _map: Map<K, ReverseIterableMapNode<K, V>>;
  private _firstNode: ReverseIterableMapNode<K, V> | null;
  private _lastNode: ReverseIterableMapNode<K, V> | null;

  /**
   * An [iterable][1] object whose elements are key-value pairs.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
   */
  constructor(iterable?: Iterable<[K, V]> | Array<Array<any>>) {
    this._map = new Map();
    this._firstNode = null;
    this._lastNode = null;

    if (iterable !== undefined) {
      for (const array of iterable) {
        if (!Array.isArray(array)) {
          throw new TypeError('iterable for Map should have array-like objects');
        }

        this.set(array[0], array[1]);
      }
    }
  }

  /**
   * The [`@@toStringTag`][1] property is used is used when `toString()` is called on a
   * `ReverseIterableMap` object.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@toStringTag
   *
   * @returns the string tag of the `ReverseIterableMap` class.
   */
  get [Symbol.toStringTag](): string {
    return 'ReverseIterableMap';
  }

  /**
   * The `size` accessor property returns the number of elements in a `ReverseIterableMap` object.
   * Calls [`Map.prototype.size`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
   *
   * @returns the size of the `ReverseIterableMap` object.
   */
  get size(): number {
    return this._map.size;
  }

  /**
   * The `clear()` method removes all elements from a `ReverseIterableMap` object.
   * Calls [`Map.prototype.clear`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
   */
  clear(): void {
    this._map.clear();
    this._firstNode = null;
    this._lastNode = null;
  }

  /**
   * The `has()` method returns a boolean indicating whether an element with the specified key
   * exists or not.
   * Calls [`Map.prototype.has`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
   *
   * @returns `true` if an element with the specified key exists in a
   * `ReverseIterableMap` object; otherwise `false`.
   */
  has(key: K): boolean {
    return this._map.has(key);
  }

  /**
   * The `get()` method returns a specified element from a `ReverseIterableMap` object.
   * Calls [`Map.prototype.get`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
   */
  get(key: K): V | undefined {
    const node = this._map.get(key);
    return node !== undefined ? node.value : undefined;
  }

  /**
   * Updates a node’s value if one exists for the given key.
   *
   * @param key The key of the element to update.
   * @param value The new value to set on the element.
   * @returns `true` if a node was present and updated; `false` otherwise.
   */
  private _updateExistingNode(key: K, value: V) {
    const node = this._map.get(key);

    if (node !== undefined) {
      node.value = value;
      return true;
    }

    return false;
  }

  /**
   * The `set()` method adds a new element to a `ReverseIterableMap` object in insertion order or
   * updates the value of an existing element.
   *
   * @param key The key of the element to add to the `ReverseIterableMap` object.
   * @param value The value of the element to add to the `ReverseIterableMap` object.
   * @returns the `ReverseIterableMap` object.
   */
  set(key: K, value: V): this {
    if (this._updateExistingNode(key, value)) {
      return this;
    }

    const node = new ReverseIterableMapNode(key, value);
    this._map.set(key, node);

    // If there is already a last node it needs to be linked with the new node.
    if (this._lastNode !== null) {
      node.prevNode = this._lastNode;
      this._lastNode.nextNode = node;
    }

    // If there is only one entry in the map, set the first node reference.
    if (this._firstNode === null) {
      this._firstNode = node;
    }

    this._lastNode = node;

    return this;
  }

  /**
   * The `setFirst()` method adds a new element to a `ReverseIterableMap` object in
   * reverse insertion order or updates the value of an existing element.
   *
   * @param key The key of the element to add to the `ReverseIterableMap` object.
   * @param value The value of the element to add to the `ReverseIterableMap` object.
   * @returns the `ReverseIterableMap` object.
   */
  setFirst(key: K, value: V): this {
    if (this._updateExistingNode(key, value)) {
      return this;
    }

    const node = new ReverseIterableMapNode(key, value);
    this._map.set(key, node);

    // If there is already a first node it needs to be linked with the new node.
    if (this._firstNode !== null) {
      node.nextNode = this._firstNode;
      this._firstNode.prevNode = node;
    }

    // If there is only one entry in the map, set the last node reference.
    if (this._lastNode === null) {
      this._lastNode = node;
    }

    this._firstNode = node;

    return this;
  }

  /**
   * The `delete()` method removes the specified element from a `ReverseIterableMap` object.
   * Calls [`Map.prototype.delete`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
   *
   * @param key The key of the element to remove from the
   * `ReverseIterableMap` object.
   * @returns `true` if an element in the `ReverseIterableMap` object
   * existed and has been removed, or `false` if the element does not exist.
   */
  delete(key: K): boolean {
    const node = this._map.get(key);

    if (node === undefined) {
      return false;
    }

    if (node.prevNode !== null && node.nextNode !== null) {
      // `node` is in the middle.
      node.prevNode.nextNode = node.nextNode;
      node.nextNode.prevNode = node.prevNode;
    }
    else if (node.prevNode !== null) {
      // `node` is the last node; a new last node needs to be linked.
      node.prevNode.nextNode = null;
      this._lastNode = node.prevNode;
    }
    else if (node.nextNode !== null) {
      // `node` is the first node; a new first node needs to linked.
      node.nextNode.prevNode = null;
      this._firstNode = node.nextNode;
    }
    else {
      // `node` is the first and last node.
      // Both first and last node reference need to be unset.
      this._firstNode = null;
      this._lastNode = null;
    }

    return this._map.delete(key);
  }

  /**
   * The `forEach()` method executes a provided function once per each key/value pair in the
   * `ReverseIterableMap` object, in insertion order. For reference, see
   * [`Map.prototype.forEach`][1].
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
   */
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  /**
   * The `forEachReverse()` method executes a provided function once per each key/value pair in the
   * `ReverseIterableMap` object, in reverse insertion order.
   */
  forEachReverse(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    for (const [key, value] of this.entries().reverseIterator()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  /**
   * The initial value of the [@@iterator][1] property is the same function object as the initial
   * value of the entries property.
   *
   * [1]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
   */
  [Symbol.iterator](): ReverseIterableIterator<[K, V]> {
    return this.entries();
  }

  /**
   * Allows usage of the [iteration protocols][1] for reverse iteration.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * Examples:
   *
   * ```js
   * const map = new ReverseIterableMap([1, 2, 3].entries());
   *
   * [...map.reverseIterator()];
   *
   * for (const [key, value] of map.reverseIterator()) {
   *   console.log(key, value);
   * }
   * ```
   */
  reverseIterator(): IterableIterator<[K, V]> {
    return this.entries().reverseIterator();
  }

  /**
   * The `entries()` method returns a new [Iterator][1] object that contains the `[key, value]`
   * pairs for each element in a `ReverseIterableMap` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  entries(): ReverseIterableIterator<[K, V]> {
    const getIteratorValue = (node: ReverseIterableMapNode<K, V>): [K, V] => [node.key, node.value];

    return this._iterableIterator(getIteratorValue, undefined);
  }

  /**
   * The `keys()` method returns a new [Iterator][1] object that contains the keys for each
   * element in a `ReverseIterableMap` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  keys(): ReverseIterableIterator<K> {
    const getIteratorValue = (node: ReverseIterableMapNode<K, V>): K => node.key;

    return this._iterableIterator(getIteratorValue, undefined);
  }

  /**
   * The `values()` method returns a new [Iterator][1] object that contains the values for each
   * element in a `ReverseIterableMap` object in insertion order.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   */
  values(): ReverseIterableIterator<V> {
    const getIteratorValue = (node: ReverseIterableMapNode<K, V>): V => node.value;

    return this._iterableIterator(getIteratorValue, undefined);
  }

  /**
   * The `iteratorFor()` method returns a new [Iterator][1] object that contains the
   * `[key, value]` pairs for each element in a `ReverseIterableMap` object in insertion order
   *  **starting with the pair specified by the `key` parameter**.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
   *
   * @param key The key of the element to start iterating from.
   */
  iteratorFor(key: K): ReverseIterableIterator<[K, V]> {
    let startNode = this._map.get(key);
    const getIteratorValue = (node: ReverseIterableMapNode<K, V>): [K, V] => [node.key, node.value];

    return this._iterableIterator(getIteratorValue, startNode);
  }

  /**
   * Returns an object which is both an iterable and an iterator. It fulfills the requirements of
   * the [iteration protocols][1] plus allowing reverse-iteration.
   *
   * - **Iterator requirements**: An object that implements a function `next`. This function
   *   returns an object with two properties: `value` and `done`.
   *
   * - **Iterable requirements**: An object that implements a function `[Symbol.iterator]()`. This
   *   function returns an iterator.
   *
   * - **Reverse-iterable requirements**: An object that implements a function `reverse`. This
   *   function returns an iterator with the special behavior of iterating in reverse insertion
   *   order. This is non-standard behavior.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * @param startNode Node to start iterating from
   * @returns a reverse-iterable iterator
   */
  private _iterableIterator(
    getIteratorValue: (node: ReverseIterableMapNode<K, V>) => [K, V] | K | V,
    startNode?: ReverseIterableMapNode<K, V>
  ): ReverseIterableIterator<any> {
    // Store `this._lastNode` because inside the `reverseIterator()` method, `this` will be
    // bound to the `_iterableIterator` method, not the `ReverseIterableMap` object.
    const lastNode = this._lastNode;
    let currentNode = startNode !== undefined ? startNode : this._firstNode;
    let forwards = true;

    return {
      reverseIterator() {
        currentNode = startNode !== undefined ? startNode : lastNode;
        forwards = false;
        return this;
      },
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next() {
        let value;
        if (currentNode) {
          value = getIteratorValue(currentNode);
          currentNode = forwards ? currentNode.nextNode : currentNode.prevNode;
        }
        return iteratorResult(value);
      }
    };
  }
}

/**
 * The `ReverseIterableMapNode` object represents an element in a `ReverseIterableMap` object.
 * Its main purpose is storing a `[key, value]` pair. Additionally, it keeps references to the
 * `ReverseIterableMapNode` objects appearing before and after itself in a `ReverseIterableMap`
 * object.
 */
class ReverseIterableMapNode<K, V> {
  key: K;
  value: V;
  nextNode: ReverseIterableMapNode<K, V> | null;
  prevNode: ReverseIterableMapNode<K, V> | null;

  /**
   * A `[key, value]` pair that is part of a `ReverseIterableMap` object.
   */
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.prevNode = null;
    this.nextNode = null;
  }
}

/**
 * Returns an `IteratorResult` object as per the following rules:
 *
 * - If `value` is not `undefined`, `done` is `false`.
 * - If `value` is `undefined`, `done` is `true`. In this case, `value` may be omitted.
 */
function iteratorResult<T>(value: T): IteratorResult<T> {
  return {
    value: value,
    done: value === undefined
  };
}

/**
 * Custom `IterableIterator` interface including a `reverseIterator` function.
 * Should reverse-iteration make it into ECMAScript, this function would probably be named
 * `[Symbol.reverseIterator]`.
 */
interface ReverseIterableIterator<T> extends IterableIterator<T> {
  reverseIterator(): IterableIterator<T>;
}
