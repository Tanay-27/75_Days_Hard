Date: 30 Oct 2023
Title: Polyfills of flatenning an object and flattening an array
Desc:

- Problem Statement:
transform [1,[2,[3]]] to [1,2,3]
and {a: {b: {c:3}}} to {a_b_c:3}

- There is an inbuild method array.flat(). We'll see how to achieve that ourselves.

- Array.prototype.flat()
the flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

```
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.log(arr2.flat(Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]
```

- flat() is a copying method. It does not alter ```this``` but instead returns a shallow copy that contains the same elements as the ones from original array.

- Flat ignoes the empty slots if array being flattened is sparse. 

- Flat method is generic. It only expects the ```this``` value to have a length property and integer-keyed properties. However, its elements must be arrays if they are to be flattened.

- Using flat() on sparse arrays
```
const arr5 = [1, 2, , 4, 5];
console.log(arr5.flat()); // [1, 2, 4, 5]

const array = [1, , 3, ["a", , "c"]];
console.log(array.flat()); // [ 1, 3, "a", "c" ]

const array2 = [1, , 3, ["a", , ["d", , "e"]]];
console.log(array2.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
console.log(array2.flat(2)); // [ 1, 3, "a", "d", "e"]
```

- Calling flat() on non-array objects
The flat() mthod reads the length property of this and then accesses each property whose key is a non-negative integer less than the length. If elements is not an array, it's directly appended to the result. If the element is an array, its flattened according to depth parameter.

```
const arrayLike = {
  length: 3,
  0: [1, 2],
  // Array-like objects aren't flattened
  1: { length: 2, 0: 3, 1: 4 },
  2: 5,
  3: 3, // ignored by flat() since length is 3
};
console.log(Array.prototype.flat.call(arrayLike));
// [ 1, 2, { '0': 3, '1': 4, length: 2 }, 5 ]
```

- flat() polyfill
```
const a=[ [1,2,3], [1,[2,[4,[5]]]]]



function flatArr(a,depth){
const resp =[]
	for(let i of a){
		if(typeof i == "object" && depth >0){
			resp.push(...flatArr(i,depth-1))
		}
		else resp.push(i)
	}
	return resp
}

console.log(flatArr(a,3))
```
- flatten an object
```
const a = {a: { b : {c : 3} } }

  function objFlat(obj, parent, res = {}){
    for(let key in obj){
        let propName = parent ? parent + '_' + key : key;
        if(typeof obj[key] == 'object'){
            objFlat(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}


console.log(objFlat(a))
```