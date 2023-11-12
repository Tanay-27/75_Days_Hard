Date: 7 Nov 2023
Title: Call, Apply and Bind Methods
Deesc:

- Bind
The bind() method of function instances creates a new function that, when called, calls this function with its this keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.
```
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
```

- A bound function may also be constructed using the new operator if its target function is constructable. Doing so acts as though the target function had instead been constructed. The prepended arguments are provided to the target function as usual, while the provided this value is ignored (because construction prepares its own this, as seen by the parameters of Reflect.construct). If the bound function is directly constructed, new.target will be the target function instead.
```
class Base {
  constructor(...args) {
    console.log(new.target === Base);
    console.log(args);
  }
}

const BoundBase = Base.bind(null, 1, 2);

new BoundBase(3, 4); // true, [1, 2, 3, 4]
```
However, because a bound function does not have the prototype property, it cannot be used as a base class for extends.

When using a bound function as the right-hand side of instanceof, instanceof would reach for the target function (which is stored internally in the bound function) and read its prototype instead.

```
class Base {}
const BoundBase = Base.bind(null, 1, 2);
console.log(new Base() instanceof BoundBase); // true
```

```
// Top-level 'this' is bound to 'globalThis' in scripts.
this.x = 9;
const module = {
  x: 81,
  getX() {
    return this.x;
  },
};

// The 'this' parameter of 'getX' is bound to 'module'.
console.log(module.getX()); // 81

const retrieveX = module.getX;
// The 'this' parameter of 'retrieveX' is bound to 'globalThis' in non-strict mode.
console.log(retrieveX()); // 9

// Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
const boundGetX = retrieveX.bind(module);
console.log(boundGetX()); // 81
```

- How to call a function with different contexts in JS
```
function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.call(this, "convertible", "petrol");
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.call(this, "convertible", "diesel");
	this.price = price;
	console.log(`Car details = `, this);
}

const newBrand = new setBrand('Brand1');
const newCarPrice = new definePrice(100000);
```
If you look carefully, you can see that we use the call function to invoke the Car function on two occasions. Firstly, in the setBrand and then in the definePrice functions.

In both of these functions, we invoke the Car function with this object representing to the respective functions themselves. For example, inside setBrand, we call the Car function with the this object belonging to its context. The case is similar for definePrice.


- How to Use the Apply Function in JavaScript
The Apply function is very similar to the Call function. The only difference between call and apply is the difference in how arguments are passed.

In apply, arguments you can pass an argument as an array literal or a new array object.
arguments is a special object available inside a function. It contains values of the arguments that are passed to a function. You can use this keyword with the apply function to take any number of arbitrary arguments.

The best part about apply is we don’t need to take care of the number of arguments that are passed to the invoking function. Because of its dynamic and versatile nature, you can use it in complicated situations.
```
function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
	this.price = price;
	console.log(`Car details = `, this);
}

const newBrand = new setBrand('Brand1');
const newCarPrice = new definePrice(100000);
```

And here is an example that showcases how you'd use the arguments keyword:
```
function addUp(){
		//Using arguments to capture the arbitrary number of inputs
    const args = Array.from(arguments); 
    this.x = args.reduce((prev, curr) => prev + curr, 0);
    console.log("this.x = ", this.x);
}

function driverFunc(){
    const obj = {
        inps: [1,2,3,4,5,6]
    }
    addUp.apply(obj, obj.inps);
}

driverFunc();
```

- How to Use the Bind Function in JavaScript
The bind function creates a copy of a function with a new value to the this present inside the calling function.
The bind function then returns a new function that consists of a new context to the this variable present inside the calling function:

- How to Create Your Own map Function
```
function newMap(func){
  let destArr = [];
  const srcArrLen = this.length;
  for(let i = 0; i < srcArrLen; i++){
    destArr.push(func.call(this, this[i]));
  }

  return destArr;
} 

Object.defineProperty(Array.prototype, 'newMap', {
  value: newMap
}); 


const arr = [1,2,3];
const newArr = arr.newMap(item => item + 1);
console.log(newArr);

```