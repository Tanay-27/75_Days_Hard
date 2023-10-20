/*  
Date: 19 Oct 2023
Title: Polyfill for setTimeout
Desc:
requestIdleCallback
The window.requestIdleCallback() method queues a function to be called during a browser's idle periods. This enables developers to perform background and low priority work on the main event loop, without impacting latency-critical events such as animation and input response.


Syntax
requestIdleCallback(callback, options)

callback
A reference to a function that should be called in the near future, when the event loop is idle. The callback function is passed an IdleDeadline object describing the amount of time available and whether or not the callback has been run because the timeout period expired.

options Optional
Contains optional configuration parameters. Currently only one property is defined:

timeout
If the number of milliseconds represented by this parameter has elapsed and the callback has not already been called, then a task to execute the callback is queued in the event loop (even if doing so risks causing a negative performance impact). timeout must be a positive value or it is ignored.

Return value
An ID which can be used to cancel the callback by passing it into the window.cancelIdleCallback() method.

*/


// Polyfill for setTimeout

function st(){
	console.log('setTimeout')
}

function customSetTimeout (){
	let id = 0
	let map = {}
	
	function setTimeoutPoly(fn,delay){
		var timeId = id++;
		map[timeId]= true
		var start = Date.now()
		
		function triggerCallback(){
			if(!map[timeId]){
				return
			}
			if(Date.now()> start+delay)
				fn()
			else 
				requestIdleCallback(triggerCallback)
		}
		requestIdleCallback(triggerCallback)
		return timeId
	}
	
	function clearTimeoutPoly(id){
		delete map[timeId]
	}
	return {setTimeoutPoly,clearTimeoutPoly} 
}


const {setTimeoutPoly , clearTimeoutPoly} = customSetTimeout()


setTimeoutPoly(()=>st(),100)