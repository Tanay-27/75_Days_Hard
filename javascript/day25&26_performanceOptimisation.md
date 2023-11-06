Date: 6 Nov 2023
Title: Performance Optimisation
Desc:

- Optimizing JavaScript downloads
The most performant, least blocking JavaScript you can use is JavaScript that you don't use at all. You should use as little JavaScript as possible. Some tips to bear in mind:
    1. You don't always need a framework
    2. Consider a simpler solution
    3. Remove unused code
    4. Consider built-in browser features
    5. Minification of files reduces the characters.

- Handling parsing and execution
The HTML is generally parsed first, in the order in which it appears on the page.
Whenever CSS is encountered, it is parsed to understand the styles that need to be applied to the page. During this time, linked assets such as images and web fonts start to be fetched.
Whenever JavaScript is encountered, the browser parses, evaluates, and runs it against the page.
Slightly later on, the browser works out how each HTML element should be styled, given the CSS applied to it.
The styled result is then painted to the screen.
The key step here is Step 3. By default, JavaScript parsing and execution are render-blocking. This means that the browser blocks the parsing of any HTML that appears after the JavaScript is encountered, until the script has been handled. As a result, styling and painting are blocked too. This means that you need to think carefully not only about what you are downloading, but also about when and how that code is being executed.

- Loading critical assets as soon as possible
you can load in under head, but it is blocking in nature. A better strategy is to use rel="preload" to create a preloader for critical JavaScript
```
<head>
 <link rel="preload" href="important-js.js" as="script" />
  <!-- Preload a JavaScript module -->
  <link rel="modulepreload" href="important-module.js" />
</head>
```

- Deferring execution of non-critical JavaScript
On the other hand, you should aim to defer parsing and execution of non-critical JavaScript to later on, when it is needed. Loading it all up-front blocks rendering unnecessarily.

First of all, you can add the async attribute to your <script> elements

You could also just not load the JavaScript at all until an event occurs when it is needed. This could be done via DOM scripting, for example
```
const scriptElem = document.createElement("script");
scriptElem.src = "index.js";
scriptElem.addEventListener("load", () => {
  // Run a function contained within index.js once it has definitely loaded
  init();
});
document.head.append(scriptElem);


// Javascript modules can be dynamically loaded using import() function
import("./modules/myModule.js").then((module) => {
  // Do something with the module
});

```

- Breaking down long tasks
When the browser runs your JavaScript, it will organize the script into tasks that are run sequentially, such as making fetch requests, driving user interactions and input through event handlers, running JavaScript-driven animation, and so on.

Most of this happens on the main thread, with exceptions including JavaScript that runs in Web Workers. The main thread can run only one task at a time.

When a single task takes longer than 50 ms to run, it is classified as a long task. If the user attempts to interact with the page or an important UI update is requested while a long task is running, their experience will be affected. An expected response or visual update will be delayed, resulting in the UI appearing sluggish or unresponsive.

To mitigate this issue, you need to break down long tasks into smaller tasks. This gives the browser more chances to perform vital user interaction handling or UI rendering updates — the browser can potentially do them between each smaller task, rather than only before or after the long task. In your JavaScript, you might do this by breaking your code into separate functions. This also makes sense for several other reasons, such as easier maintenance, debugging, and writing tests.

```
function main() {
  a();
  b();
  c();
  d();
  e();
}
```
However, this kind of structure doesn't help with main thread blocking. Since all the five functions are being run inside one main function, the browser runs them all as a single long task.

To handle this, we tend to run a "yield" function periodically to get the code to yield to the main thread. This means that our code is split into multiple tasks, between the execution of which the browser is given the opportunity to handle high-priority tasks such as updating the UI. A common pattern for this function uses setTimeout() to postpone execution into a separate task:

```
function yield() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
```
This can be used inside a task runner pattern like so, to yield to the main thread after each task has been run:

```
async function main() {
  // Create an array of functions to run
  const tasks = [a, b, c, d, e];

  // Loop over the tasks
  while (tasks.length > 0) {
    // Shift the first task off the tasks array
    const task = tasks.shift();

    // Run the task
    task();

    // Yield to the main thread
    await yield();
  }
}
```
To improve this further, we can use navigator.scheduling.isInputPending() to run the yield() function only when the user is attempting to interact with the page:
```
async function main() {
  // Create an array of functions to run
  const tasks = [a, b, c, d, e];

  while (tasks.length > 0) {
    // Yield to a pending user input
    if (navigator.scheduling.isInputPending()) {
      await yield();
    } else {
      // Shift the first task off the tasks array
      const task = tasks.shift();

      // Run the task
      task();
    }
  }
}
```
This allows you to avoid blocking the main thread when the user is actively interacting with the page, potentially providing a smoother user experience. However, by only yielding when necessary, we can continue running the current task when there are no user inputs to process. This also avoids tasks being placed at the back of the queue behind other non-essential browser-initiated tasks that were scheduled after the current one.

- Handling JavaScript animations

For essential DOM animations, you are advised to use CSS animations where possible, rather than JavaScript animations (the Web Animations API provides a way to directly hook into CSS animations using JavaScript). Using the browser to directly perform DOM animations rather than manipulating inline styles using JavaScript is much faster and more efficient.

For animations that can't be handled in JavaScript, for example, animating an HTML <canvas>, you are advised to use Window.requestAnimationFrame() rather than older options such as setInterval(). The requestAnimationFrame() method is specially designed for handling animation frames efficiently and consistently, for a smooth user experience.

- Optimizing event performance
Another tip is to use event delegation wherever possible. When you have some code to run in response to a user interacting with any one of a large number of child elements, you can set an event listener on their parent. Events fired on any child element will bubble up to their parent, so you don't need to set the event listener on each child individually. Less event listeners to keep track of means better performance.

- Tips for writing more efficient code
Reduce DOM manipulation
Batch DOM changes
Simplify your HTML
Reduce the amount of looped code

Run computation off the main thread: Earlier on we talked about how JavaScript generally runs tasks on the main thread, and how long operations can block the main thread, potentially leading to bad UI performance. We also showed how to break long tasks up into smaller tasks, mitigating this problem. Another way to handle such problems is to move tasks off the main thread altogether. There are a few ways to achieve this

Use asynchronous code
Run computation in web workers
Use WebGPU


