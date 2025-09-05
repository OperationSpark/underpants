// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var _ = {};

//this is a comment
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
_.identity = function (val) {
    return val;
}

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
//_.typeOf =  (val) => typeof(val);
_.typeOf = (val) => {
    return val === null ? "null" :
        Array.isArray(val) ? "array" :
            typeof val;
}
// console.log(_.typeOf(5));
// console.log(_.typeOf("hello"));
// console.log(_.typeOf([1,2,3]));
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
_.first = (arr, num) =>
    !Array.isArray(arr) ? [] :
        num === undefined || typeof num !== "number" ? arr[0] :
            num < 0 ? [] :
                arr.slice(0, num);
// console.log( _.first("ponies", 1));
// console.log(_.first(["a", "b", "c"], "ponies"))
// console.log(_.first(["a", "b", "c"], 1))
// console.log( _.first(["a", "b", "c"], 4))

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

_.last = (arr, num) =>
    !Array.isArray(arr) ? [] : //first check: if arr is an array
        num === undefined || typeof num !== "number" ? arr[arr.length - 1] : //second check
            num < 0 ? [] : //third check
                num > arr.length ? arr :
                    arr.slice(num - 1, arr.length);

// console.log(_.last("ponies", 1));
// console.log(_.last(["a", "b", "c"], "ponies"))
// console.log(_.last(["a", "b", "c"], 1))
// console.log(_.last(["a", "b", "c"], 2))
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
_.indexOf = (arr, value) => {
    var isFound = false;
    var ind = [];
    if (Array.isArray(arr)) {

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                ind.push(i);
                isFound = true;
            }
        }

        if (isFound) { return ind[0] } else { return -1 };

    } else { return -1 };

}

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
_.contains = (arr, val) => {
    var isFound = false;
    if (Array.isArray(arr)) {

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                isFound = true;
            }
        }

        return isFound === true ? true :
            false;

    }






}

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

_.each = (coll, func) => {

    if (Array.isArray(coll)) {
        for (var i = 0; i < coll.length; i++) {
            func(coll[i], i, coll)
        }
    } else {
        for (var element in coll) {
            func(coll[element], element, coll);
        }
    }

}


//it runs the function you give it while passing the element, index/elemment, and  collection
//no inherent returns
// _.each(Any array, a function with possible parameters(  the element, index/elemment, and  collection) )




/** _.unique
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/
_.unique = (arr) => {
    var holder = [];



    for (var i = 0; i < arr.length; i++) {
        if (!_.contains(holder, arr[i])) { holder.push(arr[i]) }
    }
    return holder;
}


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




_.filter = (arr, func) => {
    // holds variable to return
    var truths = [];
    var holders = [];
    //go through  each element  
    _.each(arr, (...a) => {
        truths.push(func(...a))
    })
    for (var i = 0; i < arr.length; i++) {
        if (truths[i]) { holders.push(arr[i]) }
    }
    return holders;
}

//console.log(_.filter([1, 2, 3, 4, 5], (x) => { return x > 2 }))

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

_.reject = (arr, func) => {
    // holds variable to return
    var truths = [];
    var holders = [];
    //go through  each element  
    _.each(arr, (...a) => {
        truths.push(func(...a))
    })
    for (var i = 0; i < arr.length; i++) {
        if (!truths[i]) { holders.push(arr[i]) }
    }
    return holders;
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

_.partition = (arr, func) => {
    // holds variable to return
    var truths = [];
    var tHolders = [];
    var fHolders = [];
    //go through  each element  
    _.each(arr, (...a) => {
        truths.push(func(...a))
    })
    for (var i = 0; i < arr.length; i++) {
        if (!truths[i]) { fHolders.push(arr[i]) }
    }

    for (var i = 0; i < arr.length; i++) {
        if (truths[i]) { tHolders.push(arr[i]) }
    }

    return [tHolders, fHolders];
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
_.map = (coll, func) => {
    var result = [];
    _.each(coll, (...a) => {
        result.push(func(...a))
    })
    return result;
    // var result = [];
    // _.each(coll, (coll[i], i, coll) => {
    //     result.push(func(coll[i], i, coll))
    // })
    // return result;

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

_.pluck = (ao, prop) => {
    //console.log({ ao, prop })
    let holder = _.map(ao, (o) => {
        // console.log([e])
        return (o[prop]) // gives us access to the the objects 
    })

    //    for(let i= 0; i < prop.length; i++){
    //     return prop[i]
    //    }
    //console.log(holder)
    return holder // returns the array stored in .map

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
_.every = (coll, func) => {
    // default function: identity (checks truthiness of elements)
    func = (typeof func === "function") ? func : (val => val);

    // map results of func across coll
    const results = _.map(coll, (...a) => func(...a));

    // check if all results are truthy
    for (let i = 0; i < results.length; i++) {
        if (!results[i]) {
            return false;
        }
    }
    return true;
}




//console.log(_.every([1, 2, 3], function (e) { return e % 2 === 0 }))
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

_.some = (coll, func) => {
func = (typeof func === "function") ? func : (val => val);
const results = _.map(coll, (...a) => func(...a));

    // check if all results are truthy
    for (let i = 0; i < results.length; i++) {
        if (results[i]) {
            return true;
        }
    }
    return false;
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

_.reduce = (arr ,func, seed) =>{
    var result;
    var startIndex;
    if(seed !== undefined){
        result = seed;
        startIndex = 0
    }
    else{
result = arr[0];
startIndex = 1
    }

for(let i = startIndex; i < arr.length; i++){
    result = func(result, arr[i], i)
}
return result
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
_.extend = (obj1,...objs) => {      // ..makes paramiters/ arguments arrays
_.each(objs, o =>{
for(let key in o){
    obj1[key] = o[key]
}
})
return obj1
}

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
}
