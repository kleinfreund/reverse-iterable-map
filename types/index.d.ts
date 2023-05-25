/**
 * Custom `IterableIterator` interface including a `reverseIterator` function. Should reverse-iteration make it into ECMAScript, this function would probably be named `[Symbol.reverseIterator]`.
 */
export interface ReverseIterableIterator<T> extends IterableIterator<T> {
	reverseIterator(): IterableIterator<T>
}

/**
 * The `ReverseIterableMapNode` object represents an element in a `ReverseIterableMap` object. Its main purpose is storing a `[key, value]` pair. Additionally, it keeps references to the `ReverseIterableMapNode` objects appearing before and after itself in a `ReverseIterableMap` object.
 */
export interface ReverseIterableMapNode<K, V> {
	key: K
	value: V
	nextNode: ReverseIterableSetNode<K, V> | null
	prevNode: ReverseIterableSetNode<K, V> | null
}
