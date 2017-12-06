import { LinkedMap } from '../src/linked-map.js';

const map = new LinkedMap();
map
  .push('key1', '1')
  .push('key2', '2')
  .push('key3', '3');

for (const [key, value] of map) {
  console.log(key, ':', value);
}

let reverse = true;
for (const [key, value] of map.entries(reverse)) {
  console.log(key, ':', value);
}

console.log(map.size);

map.delete('key2');

console.log(map.size);

for (const value of map.values()) {
  console.log(value);
}
