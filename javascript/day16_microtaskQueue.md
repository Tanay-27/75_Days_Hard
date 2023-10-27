Date: 27 Oct 2023
Title: Microtask and Microtask Queue
Desc:
Javascript has 3 basic stacks:
- Standard stack for all synchronous calls
- microtask queue / job queue / microtask stack : for all asnyc operations with higher priority (process.nextTick, Promises, Object.observe, MutationObserver)
- macrotask queue ( or event queue/ task queue) for all asnyc poerations with lower pirority ( setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering)

- Event Loop:
Executes everything from bottom to top from the stack, and ONLY when hte stack is empty. check what is going on in the queue.
If it finds that the callstack is empty, it checks in microtask queue and executes everything there untill its empty.
After that it checks the macrotask queue and executes them.
This might cause starvation of tasks if callStack or microtask queue if there are a lot of tasks there.

- If a microtask recursively queues other microtasks, it might take a long time until the next macrotask is processed. This means, you could end up with a blocked UI, or some finished I/O idling in your application.

However, at least concerning Node.js's process.nextTick function (which queues microtasks), there is an inbuilt protection against such blocking by means of process.maxTickDepth. This value is set to a default of 1000, cutting down further processing of microtasks after this limit is reached which allows the next macrotask to be processed

- So when to use what?
Basically, use microtasks when you need to do stuff asynchronously in a synchronous way (i.e. when you would say perform this (micro-)task in the most immediate future). Otherwise, stick to macrotasks.

- Each time a task exits, the event loop checks to see if the task is returning control to other JavaScript code. If not, it runs all of the microtasks in the microtask queue. The microtask queue is, then, processed multiple times per iteration of the event loop, including after handling events and other callbacks.

- Second, if a microtask adds more microtasks to the queue by calling queueMicrotask(), those newly-added microtasks execute before the next task is run. That's because the event loop will keep calling microtasks until there are none left in the queue, even if more keep getting added.

- Microtasks can be used in Batching operations

You can also use microtasks to collect multiple requests from various sources into a single batch, avoiding the possible overhead involved with multiple calls to handle the same kind of work.

The snippet below creates a function that batches multiple messages into an array, using a microtask to send them as a single object when the context exits.

```
const messageQueue = [];

let sendMessage = (message) => {
  messageQueue.push(message);

  if (messageQueue.length === 1) {
    queueMicrotask(() => {
      const json = JSON.stringify(messageQueue);
      messageQueue.length = 0;
      fetch("url-of-receiver", json);
    });
  }
};
```
When sendMessage() gets called, the specified message is first pushed onto the message queue array. Then things get interesting.

If the message we just added to the array is the first one, we enqueue a microtask that will send a batch. The microtask will execute, as always, when the JavaScript execution path reaches the top level, just before running callbacks. That means that any further calls to sendMessage() made in the interim will push their messages onto the message queue, but because of the array length check before adding a microtask, no new microtask is enqueued.

When the microtask runs, then, it has an array of potentially many messages waiting for it. It starts by encoding it as JSON using the JSON.stringify() method. After that, the array's contents aren't needed anymore, so we empty the messageQueue array. Finally, we use the fetch() method to send the JSON string to the server.

This lets every call to sendMessage() made during the same iteration of the event loop add their messages to the same fetch() operation, without potentially having other tasks such as timeouts or the like delay the transmission.

The server will receive the JSON string, then will presumably decode it and process the messages it finds in the resulting array.

- There are three types of event loop:

- Window event loop
The window event loop is the one that drives all of the windows sharing a similar origin (though there are further limits to this, as described below).

- Worker event loop
A worker event loop is one which drives a worker; this includes all forms of workers, including basic web workers, shared workers, and service workers. Workers are kept in one or more agents that are separate from the "main" code; the browser may use a single event loop for all of the workers of a given type or may use multiple event loops to handle them.

- Worklet event loop
A worklet event loop is the event loop used to drive agents which run the code for the worklets for a given agent. This includes worklets of type Worklet and AudioWorklet.


- Several windows loaded from the same origin may be running on the same event loop, each queueing tasks onto the event loop so that their tasks take turns with the processor, one after another. Keep in mind that in web parlance, the word "window" actually means "browser-level container that web content runs within," including an actual window, a tab, or a frame.

There are specific circumstances in which this sharing of an event loop among windows with a common origin is possible, such as:

If one window opened the other window, they are likely to be sharing an event loop.
If a window is actually a container within an <iframe>, it likely shares an event loop with the window that contains it.
The windows happen to share the same process in a multi-process web browser implementation.


Tasks vs. microtasks

A task is any JavaScript scheduled to be run by the standard mechanisms such as initially starting to execute a program, an event triggering a callback, and so forth. Other than by using events, you can enqueue a task by using setTimeout() or setInterval().

The difference between the task queue and the microtask queue is simple but very important:

When executing tasks from the task queue, the runtime executes each task that is in the queue at the moment a new iteration of the event loop begins. Tasks added to the queue after the iteration begins will not run until the next iteration.
Each time a task exits, and the execution context stack is empty, each microtask in the microtask queue is executed, one after another. The difference is that execution of microtasks continues until the queue is empty—even if new ones are scheduled in the interim. In other words, microtasks can enqueue new microtasks and those new microtasks will execute before the next task begins to run, and before the end of the current event loop iteration.

Microtasks are another solution to this problem, providing a finer degree of access by making it possible to schedule code to run before the next iteration of the event loop begins, instead of having to wait until the next one.

The microtask queue has been around for a while, but it's historically been used only internally in order to drive things like promises. The addition of queueMicrotask(), exposing it to web developers, creates a unified queue for microtasks which is used wherever it's necessary to have the ability to schedule code to run safely when there are no execution contexts left on the JavaScript execution context stack. Across multiple instances and across all browsers and JavaScript runtimes, a standardized microqueue mechanism means these microtasks will operate reliably in the same order, thus avoiding potentially difficult to find bugs.