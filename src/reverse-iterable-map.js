export { ReverseIterableMap };

/**
 * A reverse-iterable map implementation based on the built-in Map object.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 *
 * It exposes its order via iterable iterators which can be used for both
 * forwards and backwards iteration. As per Map, the order of a ReverseIterableMap is
 * always the insertion order (i.e. not sorted).
 *
 * @typedef {class} ReverseIterableMapType
 * @template K, V
 * @property {Map<K, V>} _map
 * @property {ReverseIterableMapNode} _first
 * @property {ReverseIterableMapNode} _last
 *
 * @type {ReverseIterableMapType}
 */
class ReverseIterableMap {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/prototype
   *
   * @param {Iterable?} iterable
   * @public
   */
  constructor(iterable = null) {
    this._map = new Map();
    this._first = null;
    this._last = null;

    if (iterable) {
      for (const [key, value] of iterable) {
        this.set(key, value);
      }
    }
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@toStringTag
   *
   * @returns {string}
   * @public
   */
  get [Symbol.toStringTag]() {
    return 'ReverseIterableMap';
  }

  /**
   * @returns {ReverseIterableMapNode}
   * @private
   */
  get first() {
    return this._first;
  }

  /**
   * @param {ReverseIterableMapNode} node
   * @private
   */
  set first(node) {
    this._first = node;
  }

  /**
   * @returns {ReverseIterableMapNode}
   * @private
   */
  get last() {
    return this._last;
  }

  /**
   * @param {ReverseIterableMapNode} node
   * @private
   */
  set last(node) {
    this._last = node;
  }

  /**
   * The size accessor property returns the number of elements in a ReverseIterableMap object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
   *
   * @returns {number} the size of the ReverseIterableMap.
   * @public
   */
  get size() {
    return this._map.size;
  }

  /**
   * The clear() method removes all elements from a ReverseIterableMap object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
   *
   * @public
   */
  clear() {
    this._map.clear();
    this._first = null;
    this._last = null;
  }

  /**
   * The has() method returns a boolean indicating whether an element with the
   * specified key exists or not.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
   *
   * @param {*} key
   * @returns {boolean}
   * @public
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
   * @public
   */
  get(key) {
    return this._map.get(key).value;
  }

  /**
   * Retrieves the last element in a ReverseIterableMap object
   *
   * @returns {*}
   * @public
   */
  getLast() {
    return this.last.value;
  }

  /**
   * Retrieves the first element in a ReverseIterableMap object
   *
   * @returns {*}
   * @public
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
   * @returns {ReverseIterableMapNode}
   * @private
   */
  add(key, value) {
    let node = this._map.get(key);

    if (node) {
      node.value = value;
    } else {
      node = new ReverseIterableMapNode(key, value);

      this._map.set(key, node);
    }

    return node;
  }

  /**
   * The set() method adds and links a new element at the end of a ReverseIterableMap
   * object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {ReverseIterableMap}
   * @public
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
   * ReverseIterableMap object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {ReverseIterableMap}
   * @public
   */
  setFirst(key, value) {
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
   * @public
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
   * The forEach() method executes a provided function once per each key/value
   * pair in the Map object, in insertion order.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
   *
   * @param {function} callback
   * @param {*?} thisArg
   * @public
   */
  forEach(callback, thisArg = undefined) {
    for (const [key, value] of this.entries()) {
      callback(value, key, thisArg);
    }
  }

  /**
   * Same as the forEach() method, but executing in reverse insertion order.
   *
   * @param {function} callback
   * @param {*?} thisArg
   * @public
   */
  forEachReverse(callback, thisArg = undefined) {
    for (const [key, value] of this.entries().reverse()) {
      callback(value, key, thisArg);
    }
  }

  /**
   * The initial value of the @@iterator property is the same function object
   * as the initial value of the entries property.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
   *
   * @returns {IterableIterator}
   * @public
   */
  [Symbol.iterator]() {
    return this.entries();
  }

  /**
   * Allows usage of the iteration protocols for reverse iteration.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * Example:
   *
   * ```
   * const map = new ReverseIterableMap();
   *
   * [...map.reverse()];
   *
   * for (const [key, value] of map.reverse()) {
   *   console.log(key, value);
   * }
   * ```
   *
   * @returns {IterableIterator}
   * @public
   */
  reverse() {
    return this.entries().reverse();
  }

  /**
   * The entries() method returns a new Iterator object that contains the
   * [key, value] pairs for each element in the Map object in insertion order.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
   *
   * @returns {IterableIterator}
   * @public
   */
  entries() {
    const getIteratorValue = function(node) {
      return [node.key, node.value];
    };

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * The keys() method returns a new Iterator object that contains the keys for
   * each element in the Map object in insertion order.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
   *
   * @returns {IterableIterator}
   * @public
   */
  keys() {
    const getIteratorValue = function(node) {
      return node.key;
    };

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * The values() method returns a new Iterator object that contains the values
   * for each element in the Map object in insertion order.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
   *
   * @returns {IterableIterator}
   * @public
   */
  values() {
    const getIteratorValue = function(node) {
      return node.value;
    };

    return this.iterableIterator(getIteratorValue);
  }

  /**
   * Return an iterator for a specific element in the ReverseIterableMap.
   *
   * @param {*} key
   * @returns {IterableIterator}
   * @public
   */
  iteratorFor(key) {
    let startNode = this._map.get(key);
    const getIteratorValue = function(node) {
      return [node.key, node.value];
    };

    return this.iterableIterator(getIteratorValue, startNode);
  }

  /**
   * Returns an object which is both an iterable and an iterator since it
   * fulfills the requirements of the iteration protocols.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
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
   * In addition, the object is also reverse-iterable by providing a reverse()
   * method. Calling it on an iterable will iterate in reverse insertion order.
   *
   * @param {function} getIteratorValue
   * @param {ReverseIterableMapNode?} startNode
   * @returns {IterableIterator}
   * @private
   */
  iterableIterator(getIteratorValue, startNode = undefined) {
    let currentNode = startNode ? startNode : this.first;
    // Store the this.last node as inside the reverse() method, `this` will be
    // bound to iterableIterator, not ReverseIterableMap. That’s on purpose.
    const last = this.last;
    let nextProp = 'next';

    return {
      reverse() {
        currentNode = startNode ? startNode : last;
        nextProp = 'prev';
        return this;
      },
      [Symbol.iterator]() {
        // Return the iterable itself.
        return this;
      },
      next: function() {
        let value;
        if (currentNode) {
          value = getIteratorValue(currentNode);
          currentNode = currentNode[nextProp];
        }
        return iteratorResult(value);
      }
    };
  }
}

/**
 * Represents a node within a ReverseIterableMap.
 *
 * @typedef {class} ReverseIterableMapNodeType
 * @template K, V
 * @property {K} _key
 * @property {V} _value
 * @property {ReverseIterableMapNode} _prev
 * @property {ReverseIterableMapNode} _next
 *
 * @type {ReverseIterableMapNodeType}
 * @protected
 */
class ReverseIterableMapNode {
  /**
   * @template K, V
   * @param {K} key
   * @param {V} value
   */
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._next = null;
    this._prev = null;
  }

  /**
   * @returns {*}
   * @protected
   */
  get key() {
    return this._key;
  }

  /**
   * @returns {*}
   * @protected
   */
  get value() {
    return this._value;
  }

  /**
   * @param {*} value
   * @protected
   */
  set value(value) {
    this._value = value;
  }

  /**
   * @returns {ReverseIterableMapNode}
   * @protected
   */
  get next() {
    return this._next;
  }

  /**
   * @param {ReverseIterableMapNode} next
   * @protected
   */
  set next(next) {
    this._next = next;
  }

  /**
   * @returns {ReverseIterableMapNode}
   * @protected
   */
  get prev() {
    return this._prev;
  }

  /**
   * @param {ReverseIterableMapNode} prev
   * @protected
   */
  set prev(prev) {
    this._prev = prev;
  }
}

/**
 * Returns an IteratorResult object as per the following rules:
 * - If value is not undefined, done is false.
 * - If value is undefined, done is true. In this case, value may be omitted.
 *
 * This function does not belong to ReverseIterableMap as it doesn’t need access to any
 * of its properties.
 *
 * @param {*|undefined} value
 * @returns {IteratorResult}
 */
function iteratorResult(value) {
  return {
    value: value,
    done: value === undefined
  };
}
