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
    return this._last.value;
  }

  /**
   * Retrieves the first element in a LinkedMap object
   *
   * @returns {*}
   */
  getFirst() {
    return this._first.value;
  }

  /**
   * The add() method adds a new element to the internal data structure.
   * It does not link itself with its neighboring elements which is why
   * this method must never be called directly.
   *
   * @param {*} key
   * @param {*} value
   * @private
   */
  add(key, value) {
    let link = this._map.get(key);

    if (link) {
      link.value = value;
    } else {
      link = {
        key,
        value,
        next: null,
        prev: null
      };

      this._map.set(key, link);
    }

    return link;
  }

  /**
   * The set() method adds and links a new element at the end of a LinkedMap
   * object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {*}
   */
  set(key, value) {
    const link = this.add(key, value);

    if (this._first === null && this._last === null) {
      this._first = link;
      this._last = link;
    } else {
      link.prev = this._last;
      this._last.next = link;
      this._last = link;
    }

    return this;
  }

  /**
   * The setFront() method adds and links a new element at the beginning of a
   * LinkedMap object.
   *
   * @param {*} key
   * @param {*} value
   */
  setFront(key, value) {
    const link = this.add(key, value);

    if (this._first === null && this._last === null) {
      this._first = link;
      this._last = link;
    } else {
      link.next = this._first;
      this._first.prev = link;
      this._first = link;
    }
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
      const link = this._map.get(key);

      if (this._first === this._last) {
        this._first = null;
        this._last = null;
      } else if (this._first === link) {
        link.next.prev = null;
        this._first = link.next;
      } else if (this._last === link) {
        link.prev.next = null;
        this._last = link.prev;
      } else {
        link.prev.next = link.next;
        link.next.prev = link.prev;
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
      // Returns an IteratorResult
      next: () => {
        if (currentNode) {
          let it = {
            value: [currentNode.key, this.get(currentNode.key)],
            done: false
          };
          currentNode = currentNode[nextProp];
          return it;
        }

        return { value: undefined, done: true };
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
      // Returns an IteratorResult
      next: () => {
        if (currentNode) {
          let it = {
            value: currentNode.key,
            done: false
          };
          currentNode = currentNode[nextProp];
          return it;
        }

        return { value: undefined, done: true };
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
      // Returns an IteratorResult
      next: () => {
        if (currentNode) {
          let it = {
            value: this.get(currentNode.key),
            done: false
          };
          currentNode = currentNode[nextProp];
          return it;
        }

        return { value: undefined, done: true };
      }
    };
  }
}
