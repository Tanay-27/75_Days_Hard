Date: 31 Oct 2023
Title: Shallow and Deep Copy in Javascript
Desc:
- Shallow copy: Only the first level of the object is copied. Deeper levels are refferenced.
- Deep copy: All levels of the object are copied.

- A shallow copy can be achieved using spread operator or using object.assign()
```
const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const shallowCopy1 = { ...obj };
const shallowCopy2 = Object.assign({}, obj);

shallowCopy1.name = 'Version 2';
shallowCopy1.additionalInfo.version = 2;

shallowCopy2.name = 'Version 2';
shallowCopy2.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 2 } }
console.log(shallowCopy1); // { name: 'Version 2', additionalInfo: { version: 2 } }
console.log(shallowCopy2); // { name: 'Version 2', additionalInfo: { version: 2 } }
```
- After updating a property in the first level of the cloned objects, the original property is not updated.
- After updating a property in a deeper level, the original property is also updated. This happens because, in this case, deeper levels are referenced, not copied.

- A deep copy can be achieved using JSON.parse + JSON.stringify
```
const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.name = 'Version 2';
deepCopy.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 1 } }
console.log(deepCopy); // { name: 'Version 2', additionalInfo: { version: 2 } }
```
- After updating a property in the first level of the cloned objects, the original property is not updated.
- After updating a property in a deeper level, the original property is neither updated. This happens because, in this case, deeper levels are also copied.
- You have to consider that you will not be able to copy custom class instances, so you can only use it when you copy objects with native JavaScript values inside.
- Instead, you would want to add a custom copy method to create a new instance with all of the old values. Let’s see how that works:
```
class Counter {
  constructor() {
     this.count = 5
  }
  copy() {
    const copy = new Counter()
    copy.count = this.count
    return copy
  }
}
const originalCounter = new Counter()
const copiedCounter = originalCounter.copy()
console.log(originalCounter.count) // 5
console.log(copiedCounter.count) // 5
copiedCounter.count = 7
console.log(originalCounter.count) // 5
console.log(copiedCounter.count) // 7
```

- Performance
For obvious reasons, shallow copies are a lot faster than deep copies. But this doesn’t mean that you should always use a shallow copy, because sometimes you will also need a copy of the nested objects. So, which option should I use?
If the depth of your object is equal to one, use a shallow copy.
If the depth of your object is bigger than one, use a deep copy.