import { LinkedMap } from '../src/linked-map.js';

const body = document.querySelector('body');

function print(...args) {
  body.insertAdjacentHTML('beforeend', `<div>${args.join(' ')}</div>`);
}

function runExample() {
  const map = new LinkedMap();
  map
    .push('key1', '1')
    .push('key2', '2')
    .push('key3', '3');

  print('[key, value] of map');
  for (const [key, value] of map) {
    print(key, ':', value);
  }

  print('[key, value] of map.entries(true)');
  for (const [key, value] of map.entries(true)) {
    print(key, ':', value);
  }

  print('key of map.keys()');
  for (const key of map.keys()) {
    print(key);
  }

  print('value of map.values()');
  for (const value of map.values()) {
    print(value);
  }

  print('[key, value] of map.reverse()');
  for (const [key, value] of map.reverse()) {
    print(key, ':', value);
  }

  print('[...map]:');
  print([...map]);

  print('[...map.reverse()]:');
  print([...map.reverse()]);

  print('Current size:', map.size);
  print('map.delete("key2")');
  map.delete('key2');
  print('Current size:', map.size);

  print('value of map.values()');
  for (const value of map.values()) {
    print(value);
  }
}

runExample();
