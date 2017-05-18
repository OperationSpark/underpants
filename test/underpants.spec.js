const
    path = '../underpants',
    udp = require(path),
    expect = require('chai').expect,
    assert = require('chai').assert,
    sinon = require('sinon');

// (function() {
//   'use strict';

console.log(udp);

  describe('Underpants', function() {

    describe('identity', function() {
      var uniqueObject = {};

      it('should return whatever value is passed into it', function() {

        expect(udp.identity(1)).to.equal(1);
        expect(udp.identity('string')).to.equal('string');
        expect(udp.identity(false)).to.be.false;
        expect(udp.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('typeOf', function() {
      it('should return type of whatever value is passed into it', function() {
        assert.strictEqual(udp.typeOf("a"), "string", "Should handle strings");
        assert.strictEqual(udp.typeOf(10), "number", "Should handle numbers");
        assert.strictEqual(udp.typeOf([1,3]), "array", "Should handle arrays");
        assert.strictEqual(udp.typeOf({a: "one"}), "object", "Should handle objects");
        assert.strictEqual(udp.typeOf(false), "boolean", "Should handle booleans");
        assert.strictEqual(udp.typeOf(undefined), "undefined", "Should handle undefined");
        assert.strictEqual(udp.typeOf(null), "null", "Should handle null");
        assert.strictEqual(udp.typeOf(function(){}), "function", "Should handle functions");
      });
    });

    describe('first', function() {
      it('should be able to pull out the first element of an array', function() {
        expect(udp.first([1,2,3])).to.equal(1);
      });

      it('should accept an index argument', function() {
        expect(udp.first([1,2,3], 2)).to.eql([1, 2]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(udp.first([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(udp.first([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {
      it('should pull the last element from an array', function() {
        expect(udp.last([1,2,3])).to.equal(3);
      });

      it('should accept an index argument', function() {
        expect(udp.last([1,2,3], 2)).to.eql([2, 3]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(udp.last([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(udp.last([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('each', function() {
      it('should iterate over arrays, providing access to the element, index, and array itself', function() {

        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        udp.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should only iterate over the array elements, not properties of the array', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        animals.shouldBeIgnored = 'Ignore me!';

        udp.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should iterate over objects, providing access to the element, index, and object itself', function() {
        var animals = { a: 'ant', b: 'bat', c: 'cat' };
        var iterationInputs = [];

        udp.each(animals, function(animal, key, object) {
          iterationInputs.push([animal, key, object]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 'a', animals],
          ['bat', 'b', animals],
          ['cat', 'c', animals]
        ]);
      });
    });

    describe('indexOf', function() {
      it('should find 40 in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(udp.indexOf(numbers, 40)).to.equal(3);
      });

      it('should be able to compute indexOf even when the native function is undefined', function() {
        var numbers = [10, 20, 30];

        expect(udp.indexOf(numbers, 20)).to.equal(1);
      });

      it('returns -1 when the target cannot be found not in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(udp.indexOf(numbers, 35)).to.equal(-1);
      });

      it('returns the first index that the target can be found at when there are multiple matches', function() {
        var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(udp.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe('filter', function() {
      beforeEach(function() {
        sinon.spy(udp, 'each');
        // const each = sinon.spy(udp.each);
        sinon.spy(udp, 'filter');
      });

      afterEach(function() {
        udp.each.restore();
        udp.filter.restore();
      });

      it('should return all even numbers in an array', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var evens = udp.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should return all odd numbers in an array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var odds = udp.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = udp.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });

      it('should use the udp.filter function', function() {
        var isEven = function(num) { return num % 2 === 0; };
        expect(udp.filter.called).to.be.false;

        udp.filter([1, 2, 3, 4, 5, 6], isEven);

        console.log('filter', udp.filter.called);
        expect(udp.filter.called).to.be.true;
      });

      it('should use the udp.each function', function() {
        var isEven = function(num) { return num % 2 === 0; };
        expect(udp.each.calledOnce).to.be.false;

        udp.filter([1, 2, 3, 4, 5, 6], isEven);

        console.log('each', udp.each);
        expect(udp.each.calledOnce).to.be.true;
      });
    });

    describe('reject', function() {
      it('should reject all even numbers', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var odds = udp.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should reject all odd numbers', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var evens = udp.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = udp.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('partition', function() {
      var inputData = ["a",1,"b",2,"c",4];

      it('Should reject elements in an array', function() {
        var test = udp.partition(inputData, function(e,i,a){
            return typeof e === "string";
        });
        var result = [["a","b","c"],[1,2,4]];
        expect(test).to.eql(result);
      });

      it('Should not have side effects', function() {
        expect(inputData).to.eql(["a",1,"b",2,"c",4]);
      });

      xit('should use the udp.filter function', function() {
        expect(udp.filter.called).to.be.true;
      });

      xit('should use the udp.reject function', function() {
        expect(udp.reject.called).to.be.true;
      });
    });

    describe('unique', function() {
      it('should return all unique values contained in an unsorted array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];

        expect(udp.unique(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('should handle iterators that work with a sorted array', function() {
        var iterator = function(value) { return value + 1; };
        var numbers = [1, 2, 2, 3, 4, 4];

        expect(udp.unique(numbers, true, iterator)).to.eql([1, 2, 3, 4]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];
        var uniqueNumbers = udp.unique(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {
      before(function() {
        sinon.spy(udp, 'each');
      });

      after(function() {
        udp.each.restore();
      });

      it('should apply a function to every value in an array', function() {
        var doubledNumbers = udp.map([1, 2, 3], function(num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 3];
        var mappedNumbers = udp.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });

      xit('should use the udp.each function', function() {
        expect(udp.each.called).to.be.true;
      });
    });

    describe('pluck', function() {
      it('should return values contained at a user-defined property', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(udp.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('should not modify the original array', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        udp.pluck(people, 'name');

        expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('contains', function() {
      var inputData = [1,"3",4,5,"a","4","b"];

      it('Should return true if a list contains an element', function() {
        expect(udp.contains(inputData, "a")).to.be.true;
      });

      it('Should return false if a list doesn\'t contain an element', function() {
        expect(udp.contains(inputData, "c")).to.be.false;
      });

      it('Should not convert types when checking', function(){
        expect(udp.contains(inputData, 3)).to.be.false;
      });

      it('Should not have side effects', function(){
        expect(inputData).to.eql([1,"3",4,5,"a","4","b"]);
      });
    });

    describe('every', function() {
      var isEven = function(num) {
        return num % 2 === 0;
      };

      it('passes by default for an empty collection', function() {
        expect(udp.every([], udp.identity)).to.be.true;
      });

      it('passes for a collection of all-truthy results', function() {
        expect(udp.every([true, {}, 1], udp.identity)).to.be.true;
      });

      it('fails for a collection of all-falsy results', function() {
        expect(udp.every([null, 0, undefined], udp.identity)).to.be.false;
      });

      it('fails for a collection containing mixed falsy and truthy results', function() {
        expect(udp.every([true, false, 1], udp.identity)).to.be.false;
        expect(udp.every([1, undefined, true], udp.identity)).to.be.false;
      });

      it('should work when provided a collection containing undefined values', function() {
        expect(udp.every([undefined, undefined, undefined], udp.identity)).to.be.false;
      });

      it('should cast the result to a boolean', function() {
        expect(udp.every([1], udp.identity)).to.be.true;
        expect(udp.every([0], udp.identity)).to.be.false;
      });

      it('should handle callbacks that manipulate the input', function() {
        expect(udp.every([0, 10, 28], isEven)).to.be.true;
        expect(udp.every([0, 11, 28], isEven)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(udp.every([true, true, true])).to.be.true;
        expect(udp.every([true, true, false])).to.be.false;
        expect(udp.every([false, false, false])).to.be.false;
      });
    });

    describe('some', function() {
      var isEven = function(number){
        return number % 2 === 0;
      };

      it('should fail by default for an empty collection', function() {
        expect(udp.some([])).to.be.false;
      });

      it('should pass for a collection of all-truthy results', function() {
        expect(udp.some([true, {}, 1], udp.identity)).to.be.true;
      });

      it('should fail for a collection of all-falsy results', function() {
        expect(udp.some([null, 0, undefined], udp.identity)).to.be.false;
      });

      it('should pass for a collection containing mixed falsy and truthy results', function() {
        expect(udp.some([true, false, 1], udp.identity)).to.be.true;
      });

      it('should pass for a set containing one truthy value that is a string', function() {
        expect(udp.some([null, 0, 'yes', false], udp.identity)).to.be.true;
      });

      it('should fail for a set containing no matching values', function() {
        expect(udp.some([1, 11, 29], isEven)).to.be.false;
      });

      it('should pass for a collection containing one matching value', function() {
        expect(udp.some([1, 10, 29], isEven)).to.be.true;
      });

      it('should cast the result to a boolean', function() {
        expect(udp.some([1], udp.identity)).to.be.true;
        expect(udp.some([0], udp.identity)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(udp.some([true, true, true])).to.be.true;
        expect(udp.some([true, true, false])).to.be.true;
        expect(udp.some([false, false, false])).to.be.false;
      });
    });

    describe('reduce', function() {
      it('should be able to sum up an array', function() {
        var add = function(tally, item) {return tally + item; };
        var total = udp.reduce([1, 2, 3], add, 0);

        expect(total).to.equal(6);
      });

      it('should use the first element as an accumulator when none is given', function() {
        var add = function(tally, item) {return tally + item; };
        var total = udp.reduce([1, 2, 3], add);

        expect(total).to.equal(6);
      });

      it('should invoke the iterator on the first element when given an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = udp.reduce([2, 3], sumSquares, 0);

        expect(total).to.equal(13);
      });

      it('should not invoke the iterator on the first element when using it as an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = udp.reduce([2, 3], sumSquares);

        expect(total).to.equal(11);
      });

    });

    describe('extend', function() {
      it('returns the first argument', function() {
        var to = {};
        var from = {};
        var extended = udp.extend(to, from);

        expect(extended).to.equal(to);
      });

      it('should extend an object with the attributes of another', function() {
        var to = {};
        var from = { a: 'b' };
        var extended = udp.extend(to, from);

        expect(extended.a).to.equal('b');
      });

      it('should override properties found on the destination', function() {
        var to = { a: 'x' };
        var from = { a: 'b' };
        var extended = udp.extend(to, from);

        expect(extended.a).to.equal('b');
      });

      it('should not override properties not found in the source', function() {
        var to = { x: 'x' };
        var from = { a: 'b' };
        var extended = udp.extend(to, from);

        expect(extended.x).to.equal('x');
      });

      it('should extend from multiple source objects', function() {
        var extended = udp.extend({ x: 1 }, { a: 2 }, { b:3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
        var extended = udp.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });
  });
// }());
