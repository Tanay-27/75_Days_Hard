/** 
Date: 18 Oct 2023
Title: SetTimeout
Desc: 
- setTimeout is a webApi which is used to execute a function after a specified time
- Whenever setTimeout is called, the code for it is popped out of call stack and then it waits for timer to complete post which gets pushed in the callback queue from where event loop picks it up and pushes it again into callback queue from where event loop picks it up and pushes it again into the callstack to execute which then gets executed. So if in any case there is already some more items in callback queue or main thread is busy in other items this setTimeout may get starved and might cause delay.

Syntax
setTimeout(functionRef, delay, param1, param2,... paramN)

functionRef:
A function to be executed after the timer expires.

delay (Optional) :
The time, in milliseconds that the timer should wait before the specified function or code is executed. Default value of of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.

param1, …, paramN (Optional):
Additional arguments which are passed through to the function specified by functionRe
The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout(). This value can be passed to clearTimeout() to cancel the timeout.

setTimeout() is an asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack

The "this" problem
setTimeout(fn(),100)
When you pass a method to setTimeout(), it will be invoked with a this value that may differ from your expectation. This is because setTimeout creates a new execution context which has different values of this than what you expect.
To solve this use a wrapper in function
setTimeout(()=>{fn()},100)
This will bring back the code execution the same context and hence this would point correctly




*/


let timeoutID;

function setOutput(outputContent) {
  document.querySelector("#output").textContent = outputContent;
}

function delayedMessage() {
  setOutput("");
  timeoutID = setTimeout(setOutput, 2 * 1000, "That was really slow!");
}

function clearMessage() {
  clearTimeout(timeoutID);
}

// for(let i=0;i<5;i++){
//     setTimeout((x)=>{console.log(x)},i*1000,i);
// }