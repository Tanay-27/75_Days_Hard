Date: 6 Nov 2023
Title: Intersection Observer API 
Desc:

- The Intersection Observer (IO) API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

- Uses:
    1. Lazy-loading of images or other content as page is scrolled.
    2. Implementing "infinite scrolling" websites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
    3. Reporting of visibility of advertisements in order to calculate ad revernues.
    4. Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

- How to use:
    The intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:
    1. A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of Intersection Observer API.
    3. The first time observer is initially asked to watch a target element.

- Theory
Consider a web page that uses infinite scrolling. It uses a vendor-provided library to manage the advertisements placed periodically throughout the page, has animated graphics here and there, and uses a custom library that draws notification boxes and the like. Each of these has its own intersection detection routines, all running on the main thread. The author of the website may not even realize this is happening, since they may know very little about the inner workings of the two libraries they are using. As the user scrolls the page, these intersection detection routines are firing constantly during the scroll handling code, resulting in an experience that leaves the user frustrated with the browser, the website, and their computer.

The Intersection Observer API lets code register a callback function that is executed whenever a particular element enters or exits an intersection with another element (or the viewport), or when the intersection between two elements changes by a specified amount. This way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit.

One thing the Intersection Observer API can't tell you: the exact number of pixels that overlap or specifically which ones they are; however, it covers the much more common use case of "If they intersect by somewhere around N%, I need to do something."

- Creating an intersection observer
Create the intersection observer by calling its constructor and passing it a callback function to be run whenever a threshold is crossed in one direction or the other:
```
let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);
```

Targeting an element to be observed

Once you have created the observer, you need to give it a target element to watch:
```
let target = document.querySelector("#listItem");
observer.observe(target);

// the callback we setup for the observer will be executed now for the first time
// it waits until we assign a target to our observer (even if the target is currently not visible)
```

Whenever the target meets a threshold specified for the IntersectionObserver, the callback is invoked. The callback receives a list of IntersectionObserverEntry objects and the observer:
```
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```

The list of entries received by the callback includes one entry for each target which reported a change in its intersection status. Check the value of the isIntersecting property to see if the entry represents an element that currently intersects with the root.

Be aware that your callback is executed on the main thread. It should operate as quickly as possible; if anything time-consuming needs to be done, use Window.requestIdleCallback().


https://medium.com/@ryanfinni/the-intersection-observer-api-practical-examples-7844dfa429e9

