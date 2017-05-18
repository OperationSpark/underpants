// This is the proper way to start a javascript library
// (function() {

// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

// This allows us to use our "_" anywhere. In a web browser, properties of window
// are available everywhere without having to type "window."
/* global _ */
const _ = {};

/**
* START OF OUR LIBRARY!
* Implement each function below it's instructions
*/

/** _.identity()
* Arguments:
*   1) Anything
* Objectives:
*   1) Returns <anything> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/
_.identity = function(i) {
    return i;
}

/** _.typeOf()
* Arguments:
*   1) Anything
* Objectives:
*   1) Return the type of <anything> as a string
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
_.typeOf = function(i) {
    if(Array.isArray(i)) {
        return "array";
    } else if(i instanceof Date) {
        return "date";
    } else if(i === null) {
        return "null";
    } else if(typeof i === "object") {
        return "object";
    } else if(typeof i === "string") {
        return "string";
    } else if(typeof i === "number") {
        return "number";
    } else if(typeof i === "boolean") {
        return "boolean";
    } else if(typeof i === "function") {
        return "function";
    } else {
        return "undefined";
    }
}

/** _.first()
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the first element in <array>.
*   3) Otherwise, return the first <number> items of <array>
* Gotchas:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.first(["a","b","c"], 1) -> ["a"]
*   _.first(["a","b","c"], 2) -> ["a", "b"]
*   _.first(["a", "b", "c"], "ponies") -> "a"
*/
_.first = function(arr, num) {
    if (Array.isArray(arr) !== true) {
        return [];
    } else if (isNaN(num) || num === "") {
        return arr[0];
    } else if(num > arr.length) {
        return arr;
    }
    else {
        var arr2 = [];
        for(var i = 0; i < num; i++) {
        arr2.push(arr[i])
        }
        return arr2;
    }
}

/** _.last()
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
* Gotchas:
*   1) What if <nubmer> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.last(["a","b","c"], 2) -> ["b","c"]
*   _.last(["a","b","c"], 5) -> ["a", "b","c"]
*   _.last(["a", "b", "c"], "ponies") -> "c"
*/
_.last = function(arr, num) {
    if (Array.isArray(arr) !== true) {
        return [];
    } else if (isNaN(num) || num === "") {
        return arr[arr.length - 1];
    } else if(num > arr.length) {
        return arr;
    }
    else {
        var arr2 = [];
        for(var i = arr.length - num; i < arr.length; i++) {
        arr2.push(arr[i]);
        }
        return arr2;
    }
}


/** _.each()
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
_.each = function(coll, func) {
    if(Array.isArray(coll)) {
        for(var i = 0; i < coll.length; i++) {
            func(coll[i], i, coll);
        }
    } else if (typeof coll === "object") {
        for(var key in coll) {
            func(coll[key], key, coll);
        }
    }
}

/** _.indexOf()
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
*   3) Do not use [].indexOf()!
* Gotchas:
*   1) What if <array> has multiple occurances of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/
_.indexOf = function(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === val) {
            return i;
        }
    }
    return -1
}

/** _.filter()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Gotchas:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
*/
_.filter = function(arr, test) {
    var results = [];
    _.each (arr, function(val,index,array) {
            if(test(val, index, array)){
                results.push(val);
            }
        });
    return results;
    }
/** _.reject()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter(), you must use _.filter() in your implementation
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
*/
_.reject = function(arr, test) {
    return _.filter(arr, function(val,index,array) {
        return !test(val,index,array);
    })
}
/** _.partition()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Gotchas:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/
_.partition = function(arr, test) {
    return [_.filter(arr, test), _.reject(arr, test)]
}
/** _.unique()
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/
_.unique = function(arr) {
    var newArr = [];
    _.each(arr, function(val,index,coll) {
        if(_.indexOf(newArr,val) === -1) {
            newArr.push(coll[index]);
        }
    });
    return newArr;
};

/** _.map()
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
    let arr = [];
    _.each(coll, function(val,index,array) {
        arr.push(func(val,index,array));
    });
    return arr;
};

/** _.pluck()
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/
_.pluck = function(arr, key) {
    return _.map(arr, function(val,index,array) {
        return array[index][key];
    });
};

/** _.contains()
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Gotchas:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/
_.contains = function(arr, val) {
    return _.indexOf(arr, val) != -1 ? true : false;
};

/** _.every()
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
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/
_.every = function(collection, func) {
    let arrr = _.map(collection, function(e,i,a) {return Boolean(e)})
    if(func === undefined ) {
        if(_.contains(arrr, false)) {return false}
        return true
    }
    // if(func === undefined && _.contains(arrr, false)) {return false;} // DOESN'T WORK because the lower array won't work for function being undefined but values being truthy
    let arr = _.map(collection, function(e,i,a) {return func(e,i,a) ? true: false;})
    if(_.contains(arr, false)) {return false;}
    return true;
}

/** _.some()
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
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/
_.some = function(coll, func) {
    let valueBool = _.map(coll, function(e,i,a) {return Boolean(e)})
    if(func === undefined) {
        if(_.contains(coll, true)) return true;
        return false;
    }
    // if(func === undefined) {_.contains(coll, true) ? true : false;}
    let valueFunc = _.map(coll, function(e,i,a) {return func(e,i,a) ? true : false;})
    if(_.contains(valueFunc, true)) return true;
    return false;
}

/** _.reduce()
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
*   4) If no <seed> was given, use the first element/value of <collection> as <seed>
*   5) After the last iteration, return the return value of the final <function> call
* Gotchas:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(prev, curr){ return prev + curr}) -> 6
*/
_.reduce = function(arr, func, seed) {
    // console.log("BEGIN BEGIN BEGIN BEGIN BEGIN BEGIN , arr is " + arr);
    // console.log("the func is \n" + func)
    // console.log(seed + " is the seed")
    if(seed === undefined) {
        let prev = arr[0];
        for(var i = 1; i < arr.length; i++) {
        // console.log("index " + i + " is " + arr[i])
        // console.log("prev is " + prev)
        prev = func(prev, arr[i], i)
        // console.log("prev is now " + prev)
        }
        return prev
    }
    let prev = seed;
        for(var i = 0; i < arr.length; i++) {
            // console.log("index is " + i)
            // console.log("prev is " + prev)
            prev = func(prev, arr[i], i)
            // console.log("prev is now " + prev)
        }
    return prev
}
/** _.extend()
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
_.extend = function(obj) {
    // arguments[i] THIS IS HOW YOU DO IT WITH ARGUMENTS OR W/E
    var args = Array.prototype.slice.call(arguments);
    for(var i = 0; i < args.length; i++) {
        for(var key in args[i]) {
            args[0][key] = args[i][key];
        }
    }
    return arguments[0]
}

// This is the proper way to end a javascript library
// }());

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    // module.exports._ = _;
    module.exports.identity = _.identity;
    module.exports.typeOf = _.typeOf;
    module.exports.first = _.first;
    module.exports.last = _.last;
    module.exports.each = _.each;
    module.exports.indexOf = _.indexOf;
    module.exports.filter = _.filter;
    module.exports.reject = _.reject;
    module.exports.partition = _.partition;
    module.exports.unique = _.unique;
    module.exports.map = _.map;
    module.exports.pluck = _.pluck;
    module.exports.contains = _.contains;
    module.exports.every = _.every;
    module.exports.some = _.some;
    module.exports.reduce = _.reduce;
    module.exports.extend = _.extend;
}
