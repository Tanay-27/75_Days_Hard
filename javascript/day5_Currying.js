/*
Date: 15 Oct 2023
Title: Currying
Desc: 
- Curring is a method which takes a function and return a new function with different ability to take parameters. It works on the principles of closures.
- Currying is transformation of a function from callable like f(a,b,c) to f(a)(b)(c)
- Currying does not call the function, instead it just transforms it.

- Currying is a function that takes one argument at a time and returns a new function expecting the next argument. 
- Basically currying doesnt call a function. It just transforms a function. They are constructed by chaining closures by immediately returning their inner functions simultaneously.

Why should currying be used.
it makes a function pure, which makes it expose to less errors and side effects.
- Helps in avoiding same variable again and again.
- Checking method that checks if you have all the things before you procedd.
- Divides one function into multiple functions so the one hanldes one set of responsibility.
*/

// Function to take infinite numbers and add them.
const sum2 = function(a){
    return function(b){
        if(b) return sum(a+b);
        else return a;
    }
}

// rewriting in 1 line
const sumC = a => b => b? sumC(a+b):a;

// Medium Acrticle on different types of currying, to be updated.



// Questions:
// 1 Write function to curry multiple functions
function sum(a,b,c){ return a+b+c;}
function mul(a,b,c){ return a*b*c;}
function sub(a,b,c){ return a-b-c;}

const curriedFuncSum = curry(sum)
const curriedFuncMul = curry(mul)
const curriedFuncSub = curry(sub)

// curriedFuncSum(1)(2)(3) // 1+2+3
// curriedFuncMul(1,2,3) // 1*2*3
// curriedFuncSum(1,2,3) // 1-2-3

// console.log(curriedFuncSum(1,2,3),curriedFuncMul(1,2,3),curriedFuncSum(1,2,3));

function curry(fn){
    // length of arguments
    const N = fn.length;

    function innerFn(n,args){
        return function actualFn(a){
            if(n <= 1) return fn(...args,a);
            else innerFn(n-1,[...args,a]);
        }
    }
    return innerFn(N,[]);
}


// 2 Make a function from fn(a,b,c) to fn(a)(b)(c)
function sum3(a,b,c){
    return a+b+c;
}

const a=2,b=4,c=6;
const sum3Curry = a => b => c => a+b+c;

console.log('normal',sum3(a,b,c));
console.log('curry',sum3Curry(a)(b)(c));