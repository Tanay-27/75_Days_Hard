/*
Date: 16 Oct 2023
Title: Microtask Queue, How callbacks and promises work under the hood
Desc:
How is javascript asynchronous?
As we know javascript is a single-threaded synchronous language. Then how does javascript performs some of the tasks asynchronously? So javascript is just a dynamic programming language for adding functionalities on the page. However, javascript also allows us to make a network request, manipulate timer operations and so on. Javascript can not support these features by itself but it supports these features with the help of a web browser. These features are called browser APIs. So, when javascript hands over the task to the web browser it does not wait till the completion instead it moves on to the next line of the code. Parallelly the web browser executes the code and pushes the output onto the queue.

Callback Queue
When the asynchronous task is performed with the help of the callback function, the output from the web browser is pushed to the callback queue. 


Microtask Queue
When the asynchronous task is performed with the help of javascript promises, the output from the web browser is pushed to the microtask queue. When the code contains only promises it works the same way as explained in the example of the callback queue. The only difference is that instead of a callback queue, the web browser output is pushed onto the microtask queue upon completion.

Then how does the callback queue behaves differently from the microtask queue?
The Microtask queue has a higher priority than the callback queue which means that if both queues are scheduled to be executed at the same time, the microtask queue will be executed first.


< Need to insert> set timeout vs set immediate vs process.nextick
*/