Date: 25 Oct 2023
Title: Promise Methods
Desc:
1. Promise.prototype.then()
The then method of Promise instance takes up two arguments , callback function for fulfilled and rejected cases of promise. It returns an equivalent Promise object, allowing you to chain calls to promise methods.
```const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value);
  // Expected output: "Success!"
});```

2. Promise.prototype.catch()
The catch method of Promise instance schedules a function to be called when the promise is rejected. It returns an equivalent Promise object, allowing you to chain calls to other promise methods.
```const promise1 = new Promise((resolve, reject) => {
  throw new Error('Uh-oh!');
});

promise1.catch((error) => {
  console.error(error);
});```

3. Promise.prototype.finally()
The finally method of Promise instance schedules a function to be called when the promise is settled(either fulfilled or rejected). It immediately returns an equivalent Promise object, allowing to chain promise methods.
```function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
```

4. Promise.resolve()
It resolves a given value to a promise.If value is promise, promise is returned, if it is thenable value ,.then is called otherwise returned promised will be fulfilled with value.
```const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
```

5. Promise.reject()
It returns a promise object that is rejected with a given reason
```function resolved(result) {
  console.log('Resolved');
}

function rejected(result) {
  console.error(result);
}

Promise.reject(new Error('fail')).then(resolved, rejected);
// Expected output: Error: fail
```
Calling reject() on a non-Promise constructor
Promise.reject() is a generic method. It can be called on any constructor that implements the same signature as the Promise() constructor. For example, we can call it on a constructor that passes it console.log as reject:
```class NotPromise {
  constructor(executor) {
    // The "resolve" and "reject" functions behave nothing like the
    // native promise's, but Promise.reject() calls them in the same way.
    executor(
      (value) => console.log("Resolved", value),
      (reason) => console.log("Rejected", reason),
    );
  }
}

Promise.reject.call(NotPromise, "foo"); // Logs "Rejected foo"
```


6. Promise.all()
Takes an array of promises as input and returns a single promise. This single promise returns when all input promises are fulfilled , with an array of values or rejects when any of the input rejects with the first rejection reasons.
```const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```
Promise.all is the best choice of concurrency method here, because error handling is intuitive — if any of the promises reject, the result is no longer available, so the whole await expression throws.

Promise.all accepts an iterable of promises, so if you are using it to run several async functions concurrently, you need to call the async functions and use the returned promises. Directly passing the functions to Promise.all does not work, since they are not promises.

```async function getPrice() {
  const [choice, prices] = await Promise.all([
    promptForDishChoice(),
    fetchPrices(),
  ]);
  return prices[choice];
}```

Promise.all fail-fast behavior
Promise.all is rejected if any of the elements are rejected. For example, if you pass in four promises that resolve after a timeout and one promise that rejects immediately, then Promise.all will reject immediately.

```const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("three"), 3000);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 4000);
});
const p5 = new Promise((resolve, reject) => {
  reject(new Error("reject"));
});

// Using .catch:
Promise.all([p1, p2, p3, p4, p5])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error.message);
  });

// Logs:
// "reject"
```

It is possible to change this behavior by handling possible rejections:

```const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1_delayed_resolution"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("p2_immediate_rejection"));
});

Promise.all([p1.catch((error) => error), p2.catch((error) => error)]).then(
  (values) => {
    console.log(values[0]); // "p1_delayed_resolution"
    console.error(values[1]); // "Error: p2_immediate_rejection"
  },
);
```

7. Promise.race()
Takes array of promises as input and returns a single promise. The returned promise settles with the state of first promise that settles

```const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
```

This following example demonstrates the asynchronicity of Promise.race. Unlike other promise concurrency methods, Promise.race is always asynchronous: it never settles synchronously, even when the iterable is empty.

```const foreverPendingPromise = Promise.race([]);
console.log(foreverPendingPromise);
setTimeout(() => {
  console.log("the stack is now empty");
  console.log(foreverPendingPromise);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "pending" }
```

8. Promise.any()
Input and output is same as promise.race(). Difference is it fulfills with any of input is fulfilled with first fulfilled value and rejects when all of input promises reject with array of rejected reasons
```const promise1 = romise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"
```


