/**
 * Date: 14 Oct 2023
 * TItle: Closures
 * Desc:
 * - A closure is the combination of a function bundled together (enclosed) with references to its surrounding state(lexical env).
 * 
 * Advantages of closure:
 * - Encapsulation: Closures allows you to encapsulate variables and functions within a private scope. This means you can create private data and methods that are inaccessible from the outside.
 * 
 * - Data Privacy: Enable you to create private variables and functions that are hidden from global scope. Helps protect sensitive data and prevents accidental modifications by external code.
 * 
 * - Function Factories: Closures are commonly used to create function factories.
 * A function factory is a function that generates and returns other functions with specific behaviors based on the paramters passed to it. This is useful for creating reusable code patterns and generating specialised functions on the fly.
 * 
 * Disadvantages:
 * It is unwise to unnecessarily creates closuers as it will negatively affect script performances both in terms of processing speed and menmory consumption.
 * 
 * Uses:
 * - Module design Pattern
 * - Currying
 * - Momoizer
 * - SetTimeouts
 */

function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() {
      // displayName() is the inner function, that forms the closure
      console.log(name); // use variable declared in the parent function
    }
    displayName();
}

init();

`
init() creates a local variable called name and function called displayNmae().
- The displayName() function is an inner function that is defined inside init() and is available only within the body of the init() function.

- The word lexical refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Nested functions have access to variables declared in their outer scope.

- In this particular example, the scope is called a function scope, because the variable is accessible and only accessible within the function body where it's declared.

- In essence, blocks are finally treated as scopes in ES6, but only if you declare variables with let or const. In addition, ES6 introduced modules, which introduced another kind of scope. Closures are able to capture variables in all these scopes, which we will introduce later.

`

function makeFunc() {
    const name = "Mozilla";
    function displayName() {
      console.log(name);
    }
    return displayName;
}
  
const myFunc = makeFunc();
myFunc();

`
- Running this code has exactly the same effect as prev code.

- The local variables within a function exist for just the duration of that function's execution. Once makeFunc() finishes executing, you might expect that the name variable would no longer be accessible. However, because the code still works as expected, this is obviously not the case in JavaScript.

- The reason is that functions in JavaScript form closures. A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

- In this case, myFunc is a reference to the instance of the function displayName that is created when makeFunc is run. The instance of displayName maintains a reference to its lexical environment, within which the variable name exists.
`  
function makeAdder(x) {
    return function (y) {
      return x + y;
    };
  }
  
  const add5 = makeAdder(5);
  const add10 = makeAdder(10);
  
  console.log(add5(2)); // 7
  console.log(add10(2)); // 12

`
- In essence, makeAdder is a function factory. It creates functions that can add a specific value to their argument. In the above example, the function factory creates two new functions—one that adds five to its argument, and one that adds 10.

- add5 and add10 both form closures. They share the same function body definition, but store different lexical environments. In add5's lexical environment, x is 5, while in the lexical environment for add10, x is 10.
`

`
For instance, suppose we want to add buttons to a page to adjust the text size. One way of doing this is to specify the font-size of the body element (in pixels), and then set the size of the other elements on the page (such as headers) using the relative em unit:
CSS
body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
  }
  
  h1 {
    font-size: 1.5em;
  }
  
  h2 {
    font-size: 1.2em;
  }
  Such interactive text size buttons can change the font-size property of the body element, and the adjustments are picked up by other elements on the page thanks to the relative units.
  
`
function makeSizer(size) {
    return function () {
      document.body.style.fontSize = `${size}px`;
    };
  }
  
  const size12 = makeSizer(12);
  const size14 = makeSizer(14);
  const size16 = makeSizer(16);
  
  document.getElementById("size-12").onclick = size12;
  document.getElementById("size-14").onclick = size14;
  document.getElementById("size-16").onclick = size16;

  
`<button id="size-12">12</button>
<button id="size-14">14</button>
<button id="size-16">16</button>
`

`
JavaScript, prior to classes, didn't have a native way of declaring private methods, but it was possible to emulate private methods using closures. Private methods aren't just useful for restricting access to code. They also provide a powerful way of managing your global namespace.
`
const counter = (function () {
    let privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
  
    return {
      increment() {
        changeBy(1);
      },
  
      decrement() {
        changeBy(-1);
      },
  
      value() {
        return privateCounter;
      },
    };
  })();
  
  console.log(counter.value()); // 0.
  
  counter.increment();
  counter.increment();
  console.log(counter.value()); // 2.
  
  counter.decrement();
  console.log(counter.value()); // 1.
  