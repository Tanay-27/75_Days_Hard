Date: 9 Nov 2023
Title: Array Methods
Desc:

- Splice: Splice changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Will change the original array.
The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

To create a new array with a segment removed and/or replaced without mutating the original array, use toSpliced(). To access part of an array without modifying it, see slice().
```
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

The splice() method is a mutating method. It may change the content of this. If the specified number of elements to insert differs from the number of elements being removed, the array's length will be changed as well. At the same time, it uses @@species to create a new array instance to be returned.

If the deleted portion is sparse, the array returned by splice() is sparse as well, with those corresponding indices being empty slots.

The splice() method is generic. It only expects the this value to have a length property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.

Calling splice() on non-array objects
The splice() method reads the length property of this. It then updates the integer-keyed properties and the length property as needed.

```
const arrayLike = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
};
console.log(Array.prototype.splice.call(arrayLike, 0, 1, 2, 3));
// [ 5 ]
// length 4
```

- Slice: Slice returns some part of the array which is specified. Does not changes the whole array
The slice() method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

```

Calling slice() on non-array objects
The slice() method reads the length property of this. It then reads the integer-keyed properties from start to end and defines them on a newly created array.
```
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 33, // ignored by slice() since length is 3
};
console.log(Array.prototype.slice.call(arrayLike, 1, 3));
// [ 3, 4 ]
```

Using slice() to convert array-like objects to arrays
The slice() method is often used with bind() and call() to create a utility method that converts an array-like object into an array.

```
// slice() is called with `this` passed as the first argument
const slice = Function.prototype.call.bind(Array.prototype.slice);

function list() {
  return slice(arguments);
}

const list1 = list(1, 2, 3); // [1, 2, 3]
```


- Push: Add the given item to end of array and returns the new array's length. It changes the original array.
```
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
```
The push() method is a mutating method. It changes the length and the content of this. In case you want the value of this to be the same, but return a new array with elements appended to the end, you can use arr.concat([element0, element1, /* ... ,*/ elementN]) instead. Notice that the elements are wrapped in an extra array — otherwise, if the element is an array itself, it would be spread instead of pushed as a single element due to the behavior of concat().

The push() method is generic. It only expects the this value to have a length property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.

Using an object in an array-like fashion
As mentioned above, push is intentionally generic, and we can use that to our advantage. Array.prototype.push can work on an object just fine, as this example shows.

Note that we don't create an array to store a collection of objects. Instead, we store the collection on the object itself and use call on Array.prototype.push to trick the method into thinking we are dealing with an array—and it just works, thanks to the way JavaScript allows us to establish the execution context in any way we want.
```
const obj = {
  length: 0,

  addElem(elem) {
    // obj.length is automatically incremented
    // every time an element is added.
    [].push.call(this, elem);
  },
};

// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length); // 2
```

- Pop: Removes the last element of array and returns the last element. It also changes the original array.
The pop() method removes the last element from an array and returns that value to the caller. If you call pop() on an empty array, it returns undefined.

Array.prototype.shift() has similar behavior to pop(), but applied to the first element in an array.

The pop() method is a mutating method. It changes the length and the content of this. In case you want the value of this to be the same, but return a new array with the last element removed, you can use arr.slice(0, -1) instead.

The pop() method is generic. It only expects the this value to have a length property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.
Calling pop() on non-array objects
The pop() method reads the length property of this. If the normalized length is 0, length is set to 0 again (whereas it may be negative or undefined before). Otherwise, the property at length - 1 is returned and deleted.
```
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
console.log(Array.prototype.pop.call(arrayLike));
// 4
console.log(arrayLike);
// { length: 2, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.pop.call(plainObj);
console.log(plainObj);
// { length: 0 }
```

Using an object in an array-like fashion
we don't create an array to store a collection of objects. Instead, we store the collection on the object itself and use call on Array.prototype.push and Array.prototype.pop to trick those methods into thinking we're dealing with an array.
```
const collection = {
  length: 0,
  addElements(...elements) {
    // obj.length will be incremented automatically
    // every time an element is added.

    // Returning what push returns; that is
    // the new value of length property.
    return [].push.call(this, ...elements);
  },
  removeElement() {
    // obj.length will be decremented automatically
    // every time an element is removed.

    // Returning what pop returns; that is
    // the removed element.
    return [].pop.call(this);
  },
};

collection.addElements(10, 20, 30);
console.log(collection.length); // 3
collection.removeElement();
console.log(collection.length); // 2
```

- Shift: Removes the first element of array and returns the removed element.Will modify original array.
```
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1
```

Calling shift() on non-array objects
The shift() method reads the length property of this. If the normalized length is 0, length is set to 0 again (whereas it may be negative or undefined before). Otherwise, the property at 0 is returned, and the rest of the properties are shifted left by one. The length property is decremented by one.
```
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
console.log(Array.prototype.shift.call(arrayLike));
// undefined, because it is an empty slot
console.log(arrayLike);
// { '1': 4, length: 2, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.shift.call(plainObj);
console.log(plainObj);
// { length: 0 }
```


- Unshift: Adds the given element to start of the array and returns the new length of array.
```
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]
```
If multiple elements are passed as parameters, they're inserted in chunk at the beginning of the object, in the exact same order they were passed as parameters. Hence, calling unshift() with n arguments once, or calling it n times with 1 argument (with a loop, for example), don't yield the same results.

Calling unshift() on non-array objects
```
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
Array.prototype.unshift.call(arrayLike, 1, 2);
console.log(arrayLike);
// { '0': 1, '1': 2, '4': 4, length: 5, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.unshift.call(plainObj, 1, 2);
console.log(plainObj);
// { '0': 1, '1': 2, length: 2 }
```

