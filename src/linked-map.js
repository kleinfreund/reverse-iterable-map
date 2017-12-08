// @ts-check

export { LinkedMap };

/**
 * A doubly-linked Map implementation based on Map.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 *
 * It exposes its order via iterable iterators which can be used for both
 * forwards and backwards iteration. As per Map, the order of a LinkedMap is
 * always the insertion order (i.e. not sorted).
 */
class LinkedMap {
  /**
   * @constructor
   */
  constructor() {
    this._map = new Map();
    this._first = null;
    this._last = null;
  }

  /**
   * The clear() method removes all elements from a LinkedMap object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
   */
  clear() {
    this._map.clear();
    this._first = null;
    this._last = null;
  }

  /**
   * @returns {LinkedMapNode}
   */
  get first() {
    return this._first;
  }

  /**
   * @param {LinkedMapNode} node
   */
  set first(node) {
    this._first = node;
  }

  /**
   * @returns {LinkedMapNode}
   */
  get last() {
    return this._last;
  }

  /**
   * @param {LinkedMapNode} node
   */
  set last(node) {
    this._last = node;
  }

  /**
   * The size accessor property returns the number of elements in a LinkedMap object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
   *
   * @returns {number}
   */
  get size() {
    return this._map.size;
  }

  /**
   * The has() method returns a boolean indicating whether an element with the
   * specified key exists or not.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
   *
   * @param {*} key
   * @returns {boolean}
   */
  has(key) {
    return this._map.has(key);
  }

  /**
   * The get() method returns a specified element from a Map object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
   *
   * @param {*} key
   * @returns {*|undefined}
   */
  get(key) {
    return this._map.get(key).value;
  }

  /**
   * Retrieves the last element in a LinkedMap object
   *
   * @returns {*}
   */
  getLast() {
    return this.last.value;
  }

  /**
   * Retrieves the first element in a LinkedMap object
   *
   * @returns {*}
   */
  getFirst() {
    return this.first.value;
  }

  /**
   * The add() method adds a new element to the internal data structure.
   * It does not link itself with its neighboring elements which is why
   * this method must never be called directly.
   *
   * @param {*} key
   * @param {*} value
   * @returns {LinkedMapNode}
   * @private
   */
  add(key, value) {
    let node = this._map.get(key);

    if (node) {
      node.value = value;
    } else {
      node = new LinkedMapNode(key, value);

      this._map.set(key, node);
    }

    return node;
  }

  /**
   * The set() method adds and links a new element at the end of a LinkedMap
   * object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {LinkedMap}
   */
  set(key, value) {
    const node = this.add(key, value);

    if (this.first === null && this.last === null) {
      this.first = node;
      this.last = node;
    } else {
      node.prev = this.last;
      this.last.next = node;
      this.last = node;
    }

    return this;
  }

  /**
   * The setFront() method adds and links a new element at the beginning of a
   * LinkedMap object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {LinkedMap}
   */
  setFront(key, value) {
    const node = this.add(key, value);

    if (this.first === null && this.last === null) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first.prev = node;
      this.first = node;
    }

    return this;
  }

  /**
   * The delete() method removes the specified element from a Map object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
   *
   * @param {*} key
   * @returns {boolean}
   */
  delete(key) {
    if (this.has(key)) {
      const node = this._map.get(key);

      if (this.first === this.last) {
        this.first = null;
        this.last = null;
      } else if (this.first === node) {
        node.next.prev = null;
        this.first = node.next;
      } else if (this.last === node) {
        node.prev.next = null;
        this.last = node.prev;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }

      this._map.delete(key);

      return true;
    }

    return false;
  }

  /**
   * The initial value of the @@iterator property is the same function object
   * as the initial value of the entries property.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
   *
   * @returns {IterableIterator}
   */
  [Symbol.iterator]() {
    return this.entries();
  }

  /**
   * Allows usage of the iteration protocols for reverse iteration.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * Examples:
   *
   *   for (const [key, value] of linkedMap.reverse()) { … }
   *
   *   [...linkedMap.reverse()]
   *
   * @returns {IterableIterator}
   */
  reverse() {
    return this.entries(true);
  }

  /**
   * The entries() method returns a new Iterator object that contains the
   * [key, value] pairs for each element in the Map object in insertion order.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
   *
   * Iterator requirements:
   * An object that implements a function called next. This function returns an
   * object with two properties: value and done.
   *
   * Iterable requirements:
   * An object that implements a function [Symbol.iterator](). This function
   * returns an iterator. Since the entries() method itself returns the
   * iterator object, `this` references the correct iterator object.
   *
   * The same rules apply for the keys() and values() methods.
   *
   * @param {boolean} reverse
   * @returns {IterableIterator}
   */
  entries(reverse = false) {
    let currentNode = reverse ? this._last : this._first;
    let nextProp = reverse ? 'prev' : 'next';

    return {
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next: () => {
        let value;
        if (currentNode) {
          value = [currentNode.key, this.get(currentNode.key)];
          currentNode = currentNode[nextProp];
        }
        return this.iteratorResult(value);
      }
    };
  }

  /**
   * The keys() method returns a new Iterator object that contains the keys for
   * each element in the Map object in insertion order.
   *
   * @param {boolean} reverse
   * @returns {IterableIterator}
   */
  keys(reverse = false) {
    let currentNode = reverse ? this._last : this._first;
    let nextProp = reverse ? 'prev' : 'next';

    return {
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next: () => {
        let value;
        if (currentNode) {
          value = currentNode.key;
          currentNode = currentNode[nextProp];
        }
        return this.iteratorResult(value);
      }
    };
  }

  /**
   * The values() method returns a new Iterator object that contains the values
   * for each element in the Map object in insertion order.
   *
   * @param {boolean} reverse
   * @returns {IterableIterator}
   */
  values(reverse = false) {
    let currentNode = reverse ? this._last : this._first;
    let nextProp = reverse ? 'prev' : 'next';

    return {
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next: () => {
        let value;
        if (currentNode) {
          value = this.get(currentNode.key);
          currentNode = currentNode[nextProp];
        }
        return this.iteratorResult(value);
      }
    };
  }

  /**
   * Returns an IteratorResult object as per the following rules:
   * - If value is not undefined, done is false.
   * - If value is undefined, done is true. Furthermore, value may be omitted.
   *
   * @param {*} value
   * @returns {IteratorResult}
   * @private
   */
  iteratorResult(value) {
    return {
      value: value,
      done: value === undefined ? false : true
    };
  }
}

/**
 * Represents a node within a LinkedMap.
 */
class LinkedMapNode {
  /**
   * @constructor
   */
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._next = null;
    this._prev = null;
  }

  /**
   * @returns {*}
   */
  get key() {
    return this._key;
  }

  /**
   * @returns {*}
   */
  get value() {
    return this._value;
  }

  /**
   * @param {*} value
   */
  set value(value) {
    this._value = value;
  }

  /**
   * @returns {*}
   */
  get next() {
    return this._next;
  }

  /**
   * @param {*} next
   */
  set next(next) {
    this._next = next;
  }

  /**
   * @returns {*}
   */
  get prev() {
    return this._prev;
  }

  /**
   * @param {*} prev
   */
  set prev(prev) {
    this._prev = prev;
  }
}
