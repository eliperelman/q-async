# q-async

## Q wrapper for the async package

This library aims to add Q promises to async methods that use continuation-style passing. Only methods that make sense for Q promises have been modified (which is almost all of them).

Please refer to promise documentation on [Q](https://github.com/kriskowal/q) for how to consume the promises, and [async](https://github.com/caolan/async) documentation on how to complete each of the methods' initial argument syntax, minus the callback. For example, the async documentation has the following for using `async.each`:

### each(arr, iterator, callback)

Applies an iterator function to each item in an array, in parallel.
The iterator is called with an item from the list and a callback for when it
has finished. If the iterator passes an error to this callback, the main
callback for the each function is immediately called with the error.

Note, that since this function applies the iterator to each item in parallel
there is no guarantee that the iterator functions will complete in order.

__Arguments__

* arr - An array to iterate over.
* iterator(item, callback) - A function to apply to each item in the array.
  The iterator is passed a callback(err) which must be called once it has 
  completed. If no error has occured, the callback should be run without 
  arguments or with an explicit null argument.
* callback(err) - A callback which is called after all the iterator functions
  have finished, or an error has occurred.

__Example__

```js
// assuming openFiles is an array of file names and saveFile is a function
// to save the modified contents of that file:

async.each(openFiles, saveFile, function(err){
    // if any of the saves produced an error, err would equal that error
});
```

But with q-async, you leave out the callback and use the Q promise syntax instead:

```js
async.each(openFiles, saveFile)
  .fail(function(err){
    // if any of the saves produced an error, err would equal that error
  })
  .done(function () {
    // move on when done
  });
```
