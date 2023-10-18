/* 
Date: 17 Oct 2023
Title: Memory Management/ Garbage Collection
Desc:
Memory Liefcycle of Programs:- Allocate Memory => Use Memory => Release the memory

Most common way to collect garbage is by references model. Within the context of memory management, an object is said to reference another object if the former has access to the latter.

Mark and sweep Algorithm:
This algorithm assumes the knowledge of a set of objects called roots. In JavaScript, the root is the global object. Periodically, the garbage collector will start from these roots, find all objects that are referenced from these roots. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.


Configuring an engine's memory model

The max amount of available heap memory in nodeJS can be increased with a flag:
node --max-old-space-size=6000 index.js
Some of the common pitfalls for memory leakage
Some of the very common causes of memory leakage in the application is given below.
Excessive use of globals by creating global variables or by omitting the var keyword in local scope
Forgetting the clearing of timers like setInterval()
Unnecessary use of closures (closures always keep a reference of the variables from the parent function even if the parent function has completed execution).

Data structure which aids in memory management :
Although JavaScript does not directly expose the garbage collector API, the language offers several data structures that indirectly observe garbage collection and can be used to manage memory usage. Some of these Data structures are weakSet and weakMap


- In order to release the memory of an object, it needs to be made explicitly unreachable. x = null;

WeakMaps and WeakSets
WeakMap and WeakSet are data structures whose APIs closely mirror their non-weak counterparts: Map and Set. WeakMap allows you to maintain a collection of key-value pairs, while WeakSet allows you to maintain a collection of unique values, both with performant addition, deletion, and querying.

WeakMap and WeakSet got the name from the concept of weakly held values. If x is weakly held by y, it means that although you can access the value of x via y, the mark-and-sweep algorithm won't consider x as reachable if nothing else strongly holds to it. Most data structures, except the ones discussed here, strongly holds to the objects passed in so that you can retrieve them at any time. The keys of WeakMap and WeakSet can be garbage-collected (for WeakMap objects, the values would then be eligible for garbage collection as well) as long as nothing else in the program is referencing the key. This is ensured by two characteristics:

WeakMap and WeakSet can only store objects or symbols. This is because only objects are garbage collected — primitive values can always be forged (that is, 1 === 1 but {} !== {}), making them stay in the collection forever. Registered symbols (like Symbol.for("key")) can also be forged and thus not garbage collectable, but symbols created with Symbol("key") are garbage collectable. Well-known symbols like Symbol.iterator come in a fixed set and are unique throughout the lifetime of the program, similar to intrinsic objects such as Array.prototype, so they are also allowed as keys.
WeakMap and WeakSet are not iterable. This prevents you from using Array.from(map.keys()).length to observe the liveliness of objects, or get hold of an arbitrary key which should otherwise be eligible for garbage collection. (Garbage collection should be as invisible as possible.)
In typical explanations of WeakMap and WeakSet (such as the one above), it's often implied that the key is garbage-collected first, freeing the value for garbage collection as well. However, consider the case of the value referencing the key:
*/
const wm = new WeakMap();
const key = {};
wm.set(key, { key });
/*
// Now `key` cannot be garbage collected,
// because the value holds a reference to the key,
// and the value is strongly held in the map!
If key is stored as an actual reference, it would create a cyclic reference and make both the key and value ineligible for garbage collection, even when nothing else references key — because if key is garbage collected, it means that at some particular instant, value.key would point to a non-existent address, which is not legal. To fix this, the entries of WeakMap and WeakSet aren't actual references, but ephemerons, an enhancement to the mark-and-sweep mechanism. Barros et al. offers a good summary of the algorithm (page 4). To quote a paragraph:

Ephemerons are a refinement of weak pairs where neither the key nor the value can be classified as weak or strong. The connectivity of the key determines the connectivity of the value, but the connectivity of the value does not affect the connectivity of the key. […] when the garbage collection offers support to ephemerons, it occurs in three phases instead of two (mark and sweep).
As a rough mental model, think of a WeakMap as the following implementation:

Warning: This is not a polyfill nor is anywhere close to how it's implemented in the engine (which hooks into the garbage collection mechanism).
*/

class MyWeakMap {
  #marker = Symbol("MyWeakMapData");
  get(key) {
    return key[this.#marker];
  }
  set(key, value) {
    key[this.#marker] = value;
  }
  has(key) {
    return this.#marker in key;
  }
  delete(key) {
    delete key[this.#marker];
  }
}
/*
As you can see, the MyWeakMap never actually holds a collection of keys. It simply adds metadata to each object being passed in. The object is then garbage-collectable via mark-and-sweep. Therefore, it's not possible to iterate over the keys in a WeakMap, nor clear the WeakMap (as that also relies on the knowledge of the entire key collection).

For more information on their APIs, see the keyed collections guide.

WeakRefs and FinalizationRegistry
Note: WeakRef and FinalizationRegistry offer direct introspection into the garbage collection machinery. Avoid using them where possible because the runtime semantics are almost completely unguaranteed.
All variables with an object as value are references to that object. However, such references are strong — their existence would prevent the garbage collector from marking the object as eligible for collection. A WeakRef is a weak reference to an object that allows the object to be garbage collected, while still retaining the ability to read the object's content during its lifetime.

One use case for WeakRef is a cache system which maps string URLs to large objects. We cannot use a WeakMap for this purpose, because WeakMap objects have their keys weakly held, but not their values — if you access a key, you would always deterministically get the value (since having access to the key means it's still alive). Here, we are okay to get undefined for a key (if the corresponding value is no longer alive) since we can just re-compute it, but we don't want unreachable objects to stay in the cache. In this case, we can use a normal Map, but with each value being a WeakRef of the object instead of the actual object value.
*/

function cached(getter) {
  // A Map from string URLs to WeakRefs of results
  const cache = new Map();
  return async (key) => {
    if (cache.has(key)) {
      return cache.get(key).deref();
    }
    const value = await getter(key);
    cache.set(key, new WeakRef(value));
    return value;
  };
}

const getImage2 = cached((url) => fetch(url).then((res) => res.blob()));
/*
FinalizationRegistry provides an even stronger mechanism to observe garbage collection. It allows you to register objects and be notified when they are garbage collected. For example, for the cache system exemplified above, even when the blobs themselves are free for collection, the WeakRef objects that hold them are not — and over time, the Map may accumulate a lot of useless entries. Using a FinalizationRegistry allows one to perform cleanup in this case.

*/
function cached(getter) {
  // A Map from string URLs to WeakRefs of results
  const cache = new Map();
  // Every time after a value is garbage collected, the callback is
  // called with the key in the cache as argument, allowing us to remove
  // the cache entry
  const registry = new FinalizationRegistry((key) => {
    // Note: it's important to test that the WeakRef is indeed empty.
    // Otherwise, the callback may be called after a new object has been
    // added with this key, and that new, alive object gets deleted
    if (!cache.get(key)?.deref()) {
      cache.delete(key);
    }
  });
  return async (key) => {
    if (cache.has(key)) {
      return cache.get(key).deref();
    }
    const value = await getter(key);
    cache.set(key, new WeakRef(value));
    registry.register(value, key);
    return value;
  };
}

const getImage = cached((url) => fetch(url).then((res) => res.blob()));
/*
Due to performance and security concerns, there is no guarantee of when the callback will be called, or if it will be called at all. It should only be used for cleanup — and non-critical cleanup. There are other ways for more deterministic resource management, such as try...finally, which will always execute the finally block. WeakRef and FinalizationRegistry exist solely for optimization of memory usage in long-running programs.



*/