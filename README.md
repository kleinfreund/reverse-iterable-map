# reverse-iterable-map.js

A reverse-iterable map implementation based on the built-in [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.

## Table of Contents

* [Install](#install)
* [Examples](#examples)
* [Tests](#tests)
* [Why?](#why)
* [But why a map?](#but-why-a-map)

## Install

### … for JavaScript

Downloads an ES module file.

```shell
curl -O https://github.com/kleinfreund/reverse-iterable-map.js/blob/master/src/reverse-iterable-map.js
```

```js
import { ReverseIterableMap } from './src/reverse-iterable-map.js';

const map = new ReverseIterableMap();
```

### … for Node.js (8.5+)

Installs the node package as a dependency. It doesn’t have any non-development dependencies itself.

```shell
npm install --save reverse-iterable-map
```

```node
import { ReverseIterableMap } from 'reverse-iterable-map';

const map = new ReverseIterableMap();
```

Note, that Node.js version 8.5 or higher is required, as it comes with support for ES modules. If you don’t want to use it as an ES module, you will need to transpile the package yourself.

## Examples

**… on the website:**:

[kleinfreund.github.io/reverse-iterable-map.js](https://kleinfreund.github.io/reverse-iterable-map.js/)

Prints test results to the console.

**… on a local HTTP server**:

```shell
npm run example
```

Prints test results to the console.

## Tests

**… with Node’s experimental ES module feature**:

```shell
npm test
```

## Why?

Part of the additions to ECMAScript 2015 are the [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols): [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) and [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). The former allows arbitrary objects to become iterable. Following the rules of the protocol gives one iteration capabilities via the following techniques:

* [`for...of` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
* [`Array.from()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
* [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

**However**, only the iteration in one direction is considered by the [specification](https://www.ecma-international.org/ecma-262/6.0/#sec-iteration) at the time. This means that we only get forward-iteration by default.

Now, with the iteration protocols, we could redefine the iteration behavior for our purpose and make an object backwards-iterable. At the same time, this means losing the ability to iterate forwards.

**If you need both a forwards- and backwards-iterable object, this implementation might be for you.**

## But why a map?

That’s what I needed. To be precise, I needed to access an iterator _at a specific location_ in my data structure and be able to _iterate in both directions_.

I tried to stick to the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) interface as close as possible.

Implementing a reverse-iterable array, for example, can be accomplished by using the same techniques of this implementation.
