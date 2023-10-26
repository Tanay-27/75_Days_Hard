/*
Date: 26 Oct 2023
Title: Writing the polyfill for Promise itself
*/

// Check if the Promise object is already defined (modern browser support).
if (!window.Promise) {
    // Define the Promise class.
    function Promise(executor) {
      // Initialize the promise status, result, and callbacks.
      this._status = 'pending'; // Can be 'pending', 'fulfilled', or 'rejected'.
      this._value = undefined;  // The resolved value or rejection reason.
      this._callbacks = [];
  
      // Function to resolve the promise.
      const resolve = (value) => {
        if (this._status === 'pending') {
          this._status = 'fulfilled';
          this._value = value;
          this._executeCallbacks();
        }
      };
  
      // Function to reject the promise.
      const reject = (reason) => {
        if (this._status === 'pending') {
          this._status = 'rejected';
          this._value = reason;
          this._executeCallbacks();
        }
      };
  
      // Execute the executor function with resolve and reject functions.
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    // Function to execute promise callbacks.
    Promise.prototype._executeCallbacks = function () {
      if (this._status === 'fulfilled') {
        this._callbacks.forEach((callback) => {
          setTimeout(() => callback.onFulfilled(this._value), 0);
        });
      } else if (this._status === 'rejected') {
        this._callbacks.forEach((callback) => {
          setTimeout(() => callback.onRejected(this._value), 0);
        });
      }
      this._callbacks = []; // Clear callbacks once executed.
    };
  
    // Define the then method for Promises.
    Promise.prototype.then = function (onFulfilled, onRejected) {
      // Create a new promise.
      const newPromise = new Promise((resolve, reject) => {
        // Function to handle fulfillment.
        const handleFulfillment = (value) => {
          try {
            if (typeof onFulfilled === 'function') {
              const result = onFulfilled(value);
              resolve(result);
            } else {
              resolve(value);
            }
          } catch (error) {
            reject(error);
          }
        };
  
        // Function to handle rejection.
        const handleRejection = (reason) => {
          if (typeof onRejected === 'function') {
            try {
              const result = onRejected(reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          } else {
            reject(reason);
          }
        };
  
        // Add the callback to the promise's callback list.
        if (this._status === 'pending') {
          this._callbacks.push({
            onFulfilled: handleFulfillment,
            onRejected: handleRejection,
          });
        } else if (this._status === 'fulfilled') {
          setTimeout(() => handleFulfillment(this._value), 0);
        } else if (this._status === 'rejected') {
          setTimeout(() => handleRejection(this._value), 0);
        }
      });
  
      return newPromise;
    };
  
    // Export the Promise polyfill to the global scope.
    window.Promise = Promise;
  }
  
