Date: 28 Oct 2023
Title: Async Await
Desc:

- An asnyc function declaration creates an AsyncFunction object.
Each time when an async function is called, it returns a new Promise which will be resolved with the value returned by the asnyc function, or rejected with an exception uncaught within the asnyc function.

- Async functions can contain zero or more await expressions. Await expresions make promise-returning functions behave as though they're synchronous by suspending execution of that function (and not blocking the whole code) untill the returned promise if fullfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. Use of async and await enables the use of ordinary try/catch blocks around asnychronous code.

- Async functions always return a promise. If the return value of an async function is not explicityly a promise, it will be implicitly wrapped in a promise.

- The async function declaration creates a binding of a new async function to a given name. The await keyword is permitted within the function body, enabling asnychronous, promise -based behavior to be written in cleaner style and avoiding the need to explicitly configure promise chains.
```
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();
```
Syntax
```async function name(param0) {
  statements
}
async function name(param0, param1) {
  statements
}
async function name(param0, param1, /* …, */ paramN) {
  statements
}
```

- Async functions can contain zero or more await expressions. Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. Use of async and await enables the use of ordinary try / catch blocks around asynchronous code.

- Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.
eg: 
This 
```async function foo() {
  return 1;
}
```
is similar to 
```function foo() {
  return Promise.resolve(1);
}
```
- Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve, they are not equivalent.
An async function will return a different reference, whereas Promise.resolve returns the same reference if the given value is a promise.
It can be a problem when you want to check the equality of a promise and a return value of an async function.
```const p = new Promise((res, rej) => {
  res(1);
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false
```

- The body of an async function can be thought of as being split by zero or more await expressions. Top-level code, up to and including the first await expression (if there is one), is run synchronously. In this way, an async function without an await expression will run synchronously. If there is an await expression inside the function body, however, the async function will always complete asynchronously.

For example:
```
async function foo() {
  await 1;
}
It is also equivalent to:

function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```
Code after each await expression can be thought of as existing in a .then callback. In this way a promise chain is progressively constructed with each reentrant step through the function. The return value forms the final link in the chain.
