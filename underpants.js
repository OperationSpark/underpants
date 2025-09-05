// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var _ = {};


/**
* START OF OUR LIBRARY!
* Implement each function below its instructions
*/

/** _.identity
* Arguments:
*   1) Any value
* Objectives:
*   1) Returns <value> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/
_.identity = function(val) {
    // Returns input
    return val;
};

/** _.typeOf
* Arguments:
*   1) Any value
* Objectives:
*   1) Return the type of <value> as a string
*       Types are one of:
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"
* Examples:
* _.typeOf(134) -> "number"
* _.typeOf("javascript") -> "string"
* _.typeOf([1,2,3]) -> "array"
*/
_.typeOf = function(val) {
    // Default output
    var output = 'undefined';

    // Checks input type
    typeof val === 'string' ? output = 'string' : null;
    typeof val === 'number' ? output = 'number' : null;
    typeof val === 'boolean' ? output = 'boolean' : null;
    Array.isArray(val) ? output = 'array' : 
    typeof val === 'object' ? output = 'object' : null;
    typeof val === 'function' ? output = 'function' : null;
    val === null ? output = 'null' : null;

    // Returns input type
    return output;
};

/** _.first
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the first element in <array>.
*   3) Otherwise, return the first <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.first("ponies", 1) -> []
*   _.first(["a", "b", "c"], "ponies") -> "a"
*   _.first(["a", "b", "c"], 1) -> "a"
*   _.first(["a", "b", "c"], 2) -> ["a", "b"]
*/
_.first = function(arr, num) {
    // Conditions to run function
    if (!Array.isArray(arr) || num < 0) {
        return [];
    } else if (!num || _.typeOf(num) !== 'number') {
        return arr[0];
    } else if (num > arr.length) {
        return arr;
    }

    // Adds first 'num' values to items
    var items = [];
    for (var i = 0; i < num; i++) {
        items.push(arr[i]);
    }

    // Returns new array
    return items;
};

/** _.last
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.last("ponies", 2) -> []
*   _.last(["a", "b", "c"], "ponies") -> "c"
*   _.last(["a", "b", "c"], 1) -> "c"
*   _.last(["a", "b", "c"], 2) -> ["b", "c"]
*/
_.last = function(arr, num) {
    // Conditions to run function
    if (!Array.isArray(arr) || num < 0) {
        return [];
    } else if (!num || _.typeOf(num) !== 'number') {
        return arr[arr.length - 1];
    } else if (num > arr.length) {
        return arr;
    }

    // Adds last 'num' values to items
    var items = [];
    for (var i = arr.length - num; i < arr.length; i++) {
        items.push(arr[i])
    }

    // Returns new array
    return items;
};

/** _.indexOf
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
*   3) Do not use [].indexOf()!
* Edge Cases:
*   1) What if <array> has multiple occurances of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/
_.indexOf = function(arr, val) {
    // Searches for first occurrance of 'val' in 'arr'
    for (var i = 0; i < arr.length; i++) {
        if (val === arr[i]) {
            // Returns index of 'val'
            return i;
        }
    }

    // Returns if 'val' is not found
    return -1;
};

/** _.contains
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Edge Cases:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/
_.contains = function(arr, val) {
    // Default ouput
    var output = false;

    // Sets output to true if 'val' is found in 'arr'
    for (var i = 0; i < arr.length; i++) {
        val === arr[i] ? output = true : null;
    }

    // Returns true or false
    return output;
};

/** _.each
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
* Examples:
*   _.each(["a","b","c"], function(e,i,a){ console.log(e)});
*      -> should log "a" "b" "c" to the console
*/
_.each = function (coll, func) {
    // Checks if 'coll' is an array or object
    if (Array.isArray(coll)) {
        // Passes each element of 'coll' through 'func'
        coll.forEach((element, index, array) => func(element, index, array));
    } else if (_.typeOf(coll) === 'object') {
        // Passes each element of 'coll' through 'func'
        for (var [key, value] of Object.entries(coll)) {
            func(value, key, coll);
        }
    }
};

/** _.unique
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/
_.unique = function(arr) {
    // Adds unique elements from 'arr' to output
   var output = [];
    _.each(arr, function (element) { 
        _.contains(output, element) ? null : output.push(element);
    })

    // returns a new array
    return output;
};

/** _.filter
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
*/
_.filter = function (arr, func) {
    // Adds elements from 'arr' that return true when passed through 'func' to output
    var output = [];
    _.each(arr, (element, index, array) => func(element, index, array) ? output.push(element) : null)

    // Returns a new array
    return output;
}

/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter()
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
*/
_.reject = function(arr, func) {
    // Adds elements from 'arr' that return false when passed through 'func' to output
    var output = [];
    _.each(arr, (element, index, array) => !func(element, index, array) ? output.push(element) : null)

    // Returns a new array
    return output;
}

/** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/
_.partition = function(arr, func) {
    // Runs 'arr' through 'func' and adds true elements to output[0] and false elements to output[1]
    var output = [[], []];
    _.each(arr, (element, index, array) => func(element, index, array) ? output[0].push(element) : output[1].push(element));

    // Returns a new array
    return output;
}

/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, it's index, <collection>
*        if <collection> is an object:
*            the value, it's key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/
_.map = function(coll, func) {
    // Runs 'coll' through 'func' then adds the result to output
    var output = [];
    if (Array.isArray(coll)) {
        _.each(coll, (element, index, array) => output.push(func(element, index, array)));
    } else if (_.typeOf(coll) === 'object') {
        for (var [key, value] of Object.entries(coll)) {
            output.push(func(value, key, coll))
        }
    }

    // Returns a new array
    return output;
}

/** _.pluck
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/
_.pluck = function(arr, prop) {
    // Iterates over 'arr'
    var output = _.map(arr, function (element) {
        // Iterates over objects in 'arr'
        for (var [key, value] of Object.entries(element)) {
            // Finds 'prop' and returns its value
            var val;
            key === prop ? val = value : null;
            return val;
        }
    });

    // Returns a new array
    return output;
}

/** _.every
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/
_.every = function(coll, func) {
    // Runs 'coll' through 'func' and assigns output to true if every element returns true, and false if one is false 
    var output = true;
    if (Array.isArray(coll)) {
        !func ? 
        _.each(coll, (element, index, array) => element ? null : output = false) :
        _.each(coll, (element, index, array) => func(element, index, array) ? null : output = false)
    } else if (_.typeOf(coll) === 'object') {
        !func ? 
        _.each(coll, (element, index, array) => element ? null : output = false) :
        _.each(coll, (element, index, array) => func(element, index, array) ? null : output = false)
    }

    // Returns boolean
    return output;
}

/** _.some
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/
_.some = function(coll, func) {
    // Runs 'coll' through 'func' and assigns output to true if one element returns true, and false if all are false 
    var output = false;
    if (Array.isArray(coll)) {
        !func ? 
        _.each(coll, (element, index, array) => element ? output = true : null) :
        _.each(coll, (element, index, array) => func(element, index, array) ? output = true : null)
    } else if (_.typeOf(coll) === 'object') {
        !func ? 
        _.each(coll, (element, index, array) => element ? output = true : null) :
        _.each(coll, (element, index, array) => func(element, index, array) ? output = true : output = true)
    }

    // Returns boolean
    return output;
}

/** _.reduce
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed> and continue to the next element
*   5) After the last iteration, return the return value of the final <function> call
* Edge Cases:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/
_.reduce = function(arr, func, seed) {
    // Sets prevResult to 'seed', or 1 if 'seed' is undefined
    var prevResult;
    seed !== undefined ? prevResult = seed : prevResult = 1;

    // Runs prevResult, the current element, and the current through 'func' 
    _.each(arr, (element, index, array) => prevResult = func(prevResult, element, index));

    // Returns the final result of 'func'
    return prevResult;
}

/** _.extend
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/
_.extend = function(obj1) {
    // Iterates over all arguments and adds the properties to 'obj1'
    for (var i = 1; i < arguments.length; i++) {
        for (var [key, value] of Object.entries(arguments[i])) {
            obj1[key] = value;
        }
    }

    // Returns 'obj1'
    return obj1;
}

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
}
