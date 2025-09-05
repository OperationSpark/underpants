# @lealonwolfe/underpants

A functional utility library implementing underscore.js-style functions. Created as part of a coding bootcamp exercise.

## Installation

```bash
npm install @lealonwolfe/underpants
Usage
Node.js
const _ = require('@lealonwolfe/underpants');

console.log(_.identity(42)); // 42
console.log(_.first([1, 2, 3], 2)); // [1, 2]
console.log(_.map([1, 2, 3], x => x * 2)); // [2, 4, 6]
Browser
<script src="node_modules/@lealonwolfe/underpants/underpants.js"></script>
<script>
    console.log(_.identity(42)); // 42
</script>
Available Functions
_.identity(value) - Returns the value unchanged
_.typeOf(value) - Returns the type of value as a string
_.first(array, n) - Returns the first n elements of an array
_.last(array, n) - Returns the last n elements of an array
_.indexOf(array, value) - Returns the index of the first occurrence of value
_.contains(array, value) - Returns true if array contains value
_.each(collection, function) - Iterates over collection calling function for each element
_.unique(array) - Returns array with duplicates removed
_.filter(array, predicate) - Returns elements that pass the predicate test
_.reject(array, predicate) - Returns elements that fail the predicate test
_.partition(array, predicate) - Splits array into two arrays based on predicate
_.map(collection, function) - Creates new array with results of calling function on each element
_.pluck(array, property) - Extracts property values from array of objects
_.every(collection, predicate) - Returns true if all elements pass predicate test
_.some(collection, predicate) - Returns true if any element passes predicate test
_.reduce(array, function, seed) - Reduces array to single value using function
_.extend(object, ...sources) - Copies properties from sources to object
Testing
Run the test suite:

npm test
Open browser tests:

npm run test:browser
Development
This library was created as part of a coding bootcamp exercise to understand functional programming concepts and utility libraries like underscore.js and lodash.