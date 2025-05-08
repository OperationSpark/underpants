

describe("underpants library", () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  describe("_.identity()", () => {
    it('should return input value unchanged', () => {
      assert.strictEqual( _.identity(14), 14);
      assert.deepEqual( _.identity({a: "one"}), {a: "one"});
      assert.strictEqual(_.identity("hello there"));
      assert.deepEqual(_.identity([1,2,3]), [1,2,3]);
    });
  });

  describe("_.typeof()", () => {
    it('should handle simple datatypes', () => {
      assert.strictEqual(_.typeOf("a"), "string");
      assert.strictEqual(_.typeOf(10), "number");
      assert.strictEqual(_.typeOf(false), "boolean");
      assert.strictEqual(_.typeOf(undefined), "undefined");
      assert.strictEqual(_.typeOf(function(){}), "function");
    });
    it('should return `object` for objects intended as as collections', () => {
      assert.strictEqual(_.typeOf({a: "one"}), "object", "Should handle objects.");
    });
    it('should return `array` for array inputs', () => {
      assert.strictEqual(_.typeOf([1,3]), "array");
    });
    it('should return `null` for null inputs', () => {
      assert.strictEqual(_.typeOf(null), "null");
    });
    it('should return `function` for function inputs', () => {
      assert.strictEqual(_.typeOf(function(){}), "function");
    });
  });

  describe("_.first()", () => {
    it('should accept an argument representing the number of items to include in the output', () => {
      assert.deepEqual(_.first(["a","b","c"],2) ,["a","b"]);
    });
    it('should return the first element if no numerical argument is given', () => {
      assert.deepEqual(_.first(["a","b","c"]) ,"a");
    });
    it('should return empty array if numerical argument is not a positive number', () => {
      assert.deepEqual(_.first(["a","b","c"], -1) ,[], "Should return empty list if numerical argument is not a positive number.");
    });
    it('should return empty array if the array param is not an an array', () => {
      assert.deepEqual(_.first({a:"b"}, 2), [], "Should return empty array if the array param is not an array.");
    });
  });

  describe("_.last()", () => {
    it('should accept an argument representing the number of items to include in the output', () => {
      assert.deepEqual(_.last(["a","b","c"],2) ,["b","c"]);
    });
    it('should return the last element if no numerical argument is given', () => {
      assert.deepEqual(_.last(["a","b","c"]) ,"c");
    });
    it('should return empty array if numerical argument is not a positive number', () => {
      assert.deepEqual(_.last(["a","b","c"], -1) ,[]);
    });
    it("shoud return the array if the numerical argument is greater than the array's length", () => {
      assert.deepEqual(_.last(["a","b","c"], 5) ,["a","b","c"]);
    });
    it('should return empty array if array param is not an array', () => {
      assert.deepEqual(_.last({a:"b"}, 2), []);
    });
  });

  describe("_.indexOf()", () => {
    const inputData = ["a","b","c","d","b"];
    it('should return the correct index when an element is found', () => {
      assert.deepEqual(_.indexOf(inputData, "b") , 1);
    });
    it('should return the index of the first occurance of a found element if there are duplicates', () => {
      assert.deepEqual(_.indexOf(inputData), "b");
    });
    it('should return -1 if the element is not found', () => {
      assert.deepEqual(_.indexOf(inputData, "e") , -1);
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, ["a","b","c","d"]);
    });
  });

  describe("_.contains()", () => {
    const inputData = [1,"3",4,5,"a","4","b"];
    it('should return true if a list contains an element', () => {
      assert.strictEqual(_.contains(inputData, "a") , true);
    });
    it("should return false if the list doesn't contain an element", () => {
      assert.strictEqual(_.contains(inputData, "c") , false);
    });
    it('should not convert types when checking', () => {
      assert.strictEqual(_.contains(inputData, 3) , false);
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, [1,"3",4,5,"a","4","b"]);
    });
  });

  describe("_.each()", () => {
    const inputArray = [1,2,3,4,5];
    inputArray.ignoreMe = "this shouldn't show up";
    const inputObject = {a:"1",b:"2",c:"3",d:"4"};
  
    _.each(inputArray, function(e, i, a){
        inputArray[i] = e*a.length;
    });
    it('should handle arrays', () => {
      assert.deepEqual(inputArray ,[5,10,15,20,25]);
    });
    
    _.each(inputObject, function(v, k, o){
        inputObject[k] = inputObject[k] + inputObject[k];
    });
    it('should handle objects', () => {
      assert.deepEqual(inputObject,{a: "11", b: "22", c: "33", d: "44"});
    });
  });

  describe("_.unique()", () => {
    const inputData = ["a",1,1,"a","c",false,"b",5,"c",null,false,null];
    it('should return an array with no duplicates', () => {
      assert.deepEqual(_.unique(inputData),["a",1,"c",false,"b",5,null]);
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, ["a",1,1,"a","c",false,"b",5,"c",null, false, null]);
    });
  });

  describe("_.filter()", () => {
    const inputData = ["a",1,"b",2,"c",4];
    it('should filter elements in an array', () => {
      assert.deepEqual(_.filter(inputData, (e,i,a) => {
        return typeof e === "string" && i < a.length/2;
      }), ["a","b"]);
    });
    it('callback function should take in the current index as one of its arguments', () => {
      const input = ['a', 'b', 'aa'];
      const logs = [0, 1, 2]
      _.filter(input, (e, i, a) => {
        console.log(i);
        return e.length === 1;
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback function should take in the array as an argument', () => {
      const input = ['a', 'b', 'aa'];
      const logs = [['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c']];
      console.log.args.forEach((e, i) => {
        assert.deepEqual(e[0], logs[i]);
      });
    });
    it('should not have side effects', () => {
      filter(inputData, (e) => {
        return typeof e === 'number';
      });
      assert.deepEqual(inputData, ["a",1,"b",2,"c",4]);
    });
  });
    
  describe("_.reject()", () => {
    const inputData = ["a",1,"b",2,"c",4];
    it('should return an array of items rejected by the callback function', () => {
      assert.deepEqual(_.reject(inputData, (e) => {
        return typeof e === 'string';
      }), [2,4]);
    });
    it('callback function should take in the current index as an argument', () => {
      const input = ['a', 'b', 'aa'];
      const logs = [0, 1, 2];
      _.reject(input, (e, i, a) => {
        console.log(i);
        return e.length === 2;
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback function should take in the array as an argument', () => {
      const input = ['a', 'b', 'aa'];
      const logs = [['a', 'b', 'aa'], ['a', 'b', 'aa'], ['a', 'b', 'aa']];
      _.reject(input, (e, i, a) => {
        console.log(i);
        return e.length === 2;
      });
      console.log.args.forEach((e, i) => {
        assert.deepEqual(e[0], logs[i]);
      });
    }); 
    it('should not have side effects', () => {
      _.reject(inputData, (e) => {
        return typeof e === 'string';
      });
      assert.deepEqual(inputData, ["a",1,"b",2,"c",4], "Should not have side effects.");
    });
  });

  describe("_.partition()", () => {
    const inputData = ["a",1,"b",2,"c",4];
    it('should create a correctly partitioned array of subarrays', () => {
      assert.deepEqual(_.partition(inputData, (e) => {
        return typeof e === 'string';
      }), [ ['a', 'b', 'c'], [1, 2, 3]])
    });
    it('callback function should take in the current index as an argument', () => {
      const input = ['a', 1];
      const logs = [0, 1];
      _.partition(input, (e, i, a) => {
        console.log(i);
        return typeof e === 'string';
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback function should take in the array as an argument', () => {
      const input = ['a', 1];
      const logs = [['a', 1], ['a', 1]];
      _.partition(input, (e, i, a) => {
        console.log(a);
        return typeof e === 'string';
      });
      console.log.args.forEach((e, i) => {
        assert.deepEqual(e[0], logs[i]);
      });
    });
  
    it('should not have side effects', () => {
      _.partition(inputData, (e) => {
        return typeof e === 'string';
      });
      assert.deepEqual(inputData, ["a",1,"b",2,"c",4]);
    });
  });

  describe("_.map", () => {
    const inputArray = ["a","b","c","d"];
    const inputObject = {"a":1, "b":2, "c":3, "d":4};
    it('should correctly map an array', () => {
      const result = _.map(inputArray, (e) => e.toUpperCase());
      assert.deepEqual(result, ['A', 'B', 'C', 'D']);
    });
    it('should correctly map an object', () => {
      const result = _.map(inputObject, (e) => e * 10);
      assert.deepEqual(result, {a: 10, b: 20, c: 30, d: 40});
    });
    it('callback should take in the current index as an argument if collection is an array', () => {
      const logs = [0, 1, 2, 3];
      _.map(inputArray, (e, i, a) => {
        console.log(i);
        return e.toUpperCase();
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback should take in the array as argument if collection is an array', () => {
      const logs = [
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd']
        ['a', 'b', 'c', 'd']
      ];
      _.map(inputArray, (e, i, a) => {
        console.log(a);
        return e.toUpperCase();
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback should take in the current key as an argument if collection is an argument', () => {
      const logs = [1, 2, 3, 4];
      _.map(inputObject, (v, k, o) => {
        console.log(k);
        return v * 10;
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('callback should take in the object as an argument if collection is an argument', () => {
      const logs = [
        {"a":1, "b":2, "c":3, "d":4},
        {"a":1, "b":2, "c":3, "d":4},
        {"a":1, "b":2, "c":3, "d":4},
        {"a":1, "b":2, "c":3, "d":4}
      ];
      _.map(inputObject, (v, k, o) => {
        console.log(o);
        return v * 10;
      });
      console.log.args.forEach((e, i) => {
        assert.deepEqual(e[0], logs[i]);
      })
    });
    it('should not have side effects', () => {
      _.map(inputArray, (e) => e.toUpperCase());
      _.map(inputObject, (e) => e * 10);
      assert.deepEqual(inputArray, ["a","b","c","d"]);
      assert.deepEqual(inputObject, {"a":1, "b":2, "c":3, "d":4});
    });
  });

  describe("_.pluck()", () => {
    const inputData = [
        { name: "Ralph", age: 22},
        { name: "Jimmy", age: 13},
        { name: "Carla", age: 20}
    ];
    it('should pluck properties from a list of objects', () => {
      const result = _.pluck(inputData, 'name');
      const correct = ['Ralph', 'Jimmy', 'Carla'];
      assert.deepEqual(result, correct);
    });
    it('should not have side effects', () => {
      _.pluck(inputData, 'name');
      assert.deepEqual(inputData, [
        { name: "Ralph", age: 22},
        { name: "Jimmy", age: 13},
        { name: "Carla", age: 20}
      ]);
    });
  });

  describe("_.every()", () => {
    const inputData = [2,4,6,7,8];
    const inputObject = {a:"one",b:"two",c:"three"};
    it('should return true when all iterations are true', () => {
      const resultOne = _.every(inputData, (e) => e > 0);
      const resultTwo = _.every(inputObject, (e) => typeof e === 'string');
      assert.equal(resultOne, true);
      assert.equal(resultTwo, true);
    });
    it('should return false when not all iterations are true for an array input', () => {
      const resultOne = _.every(inputData, (e) => e % 2 === 0);
      const resultTwo = _.every(inputObject, (e) => e.length === 3);
      assert.equal(resultOne, false);
      assert.equal(resultTwo, false);
    });
    it('should return true for truthy results when no function is passed in', () => {
      assert.equal(_.every(['a', 'b']), true);
      assert.equal(_.every({ a: 1, b: 2 }), true);
    });
    it('should return false for falsey results when no function is passed in', () => {
      assert.equal(_.every(['a', 'b', null]), false);
      assert.equal(_.every({ a: 1, b: 2, c: null}), false);
    });
    it('callback should take in the current index as an argument if collection is an array', () => {
      const input = ['a', 'b'];
      const logs = [0, 1];
      _.every(input, (e, i, a) => {
        console.log(i);
        return typeof e === 'string';
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('should take in the array as an argument if collection is an array', () => {
      const input = ['a', 'b'];
      const logs = [
        ['a', 'b'],
        ['a', 'b']
      ];
      _.every(input, (e, i, a) => {
        console.log(a);
        return typeof e === 'string';
      });
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      });
    });
    it('should take in the current value as an argument if collection is an object', () => {
      const input = { a: 1, b: 2 };
      const logs = [1, 2];
      _.every(input, (v, k, o) => {
        console.log(k);
        return typeof v === 'number';
      })
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      })
    });
    it('should take in the object as an argument if collection is an object', () => {
      const input = { a: 1, b: 2 };
      const logs = [
        { a: 1, b: 2 },
        { a: 1, b: 2 }
      ];
      _.every(input, (v, k, o) => {
        console.log(o);
        return typeof v === 'number';
      })
      console.log.args.forEach((e, i) => {
        assert.equal(e[0], logs[i]);
      })
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, [2,4,6,7,8]);
    });
  });

  describe("_.some()", () => {
    const inputArray = [2,4,6,7,8];
    const inputObject = {a:"one",b:"two",c:"three"};
    it('should handle objects', () => {
      const result = _.every(inputObject, (e) => e.length > 3);
      assert.equal(typeof result, 'boolean');
    });
    it('should return when at least one iteration is true', () => {
      const resultOne = _.some(inputArray, (e) => e % 2 !== 0);
      const resultTwo = _.some(inputObject, (e) => e.length > 3);
      assert.equal(resultOne, true);
      assert.equal(resultTwo, true);
    });
    it('should return false when no iterations are true', () => {
      const resultOne = _.some(inputArray, (e) => e > 10);
      const resultTwo = _.some(inputObject, (e) => e.length > 5);
      assert.equal(resultOne, false);
      assert.equal(resultTwo, false);
    });
    it('should return true for truthy results when no function is passed in', () => {
      assert.equal(_.every(inputArray), true);
      assert.equal(_every(inputObject), true);
    });
    it('should return false for falsey results when no function is passed in', () => {
      assert.equal(_.every([undefined, null]), false);
      assert.equal(_.every({a: undefined, b: null}), false);
    }); 
    it('should not have side effects', () => {
      assert.deepEqual(inputData, [2,4,6,7,8]);
    });
  });

  describe("_.reduce()", () => {
    const inputArray = [10,20,30,40];
    it('should work with an array and a seed', () => {
      const result = _.reduce(inputArray, (acc, current, i) => {
        acc += current;
        return acc;
      }, 100);
      assert.equal(result, 200);
    });
    it('should work without a seed', () => {
      const result = _.reduce(inputArray, (acc, current, i) => {
        acc += current;
        return acc;
      });
      assert.equal(result, 100);
    });
    it('should work when seed is falsey', () => {
      const result = _.reduce(inputArray, (acc, current, i) => {
        acc += current;
        return acc;
      }, 0);
      assert.equal(result, 100);
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputArray, [10,20,30,40]);
    })
  });

  describe("_.extend()", () => {
    it('should extend an object', () => {
      const inputData = {a:"one", b:"two"};
      _.extend(inputData, {c: "three", d: "four"});
      assert.deepEqual(inputData, {a: "one",b:"two",c:"three",d:"four"});
    });
    it('should overwrite existing properties', () => {
      const inputData = {a:"one", b:"two"};
      _.extend(inputData, {a: "three", d: "four"});
      assert.deepEqual(inputData, {a: "three", b:"two",d:"four"});
    });
    it('should handle any number of arguments', () => {
      const inputData = {a:"one", b:"two"};
      _.extend(inputData, { c: 'three'}, { d: 'four' }, { e: 'five' }, { f: 'six' });
       assert.deepEqual(inputData, { a: 'one', b: 'two', c: 'three', d: 'four', e: 'five', f: 'six' });
    });
    
  });

});