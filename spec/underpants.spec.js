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
});



QUnit.test("_.pluck()", function(assert){
  var inputData = [
      { name: "Ralph", age: 22},
      { name: "Jimmy", age: 13},
      { name: "Carla", age: 20}
  ];
  assert.deepEqual(_.pluck(inputData, "name"), ["Ralph","Jimmy","Carla"], "Should pluck properties out of a list of objects.");
  assert.deepEqual(inputData, [
      { name: "Ralph", age: 22},
      { name: "Jimmy", age: 13},
      { name: "Carla", age: 20}
  ], "Should not have side effects.");
});

QUnit.test("_.every()", function(assert){
  var inputData = [2,4,6,7,8];
  var inputDataTruthy = [1, [], true, "a"];
  var inputDataFalsy = ["",0,false,null];
  var inputObject = {a:"one",b:"two",c:"three"};
  assert.deepEqual(_.every(inputData, function(v){
      return v % 2 === 0 || v === 7;
  }) , true, "Should return true when all iterations are true");
  assert.deepEqual(_.every(inputData, function(v){
      return v % 2 === 0;
  }) , false, "Should return false when not all iterations are true");
  assert.deepEqual(_.every(inputObject, function(v,k,o){
      return ["aone3","btwo3","cthree3"].indexOf(k+v+Object.keys(o).length) !== -1;
  }), true, "Should handle objects");
  assert.deepEqual(_.every(inputDataTruthy), true, "Should return true for truthy results when no function is passed in.");
  assert.deepEqual(_.every(inputDataFalsy), false, "Should return false for falsy results when no function is passed in.");
  assert.deepEqual(inputData, [2,4,6,7,8], "Should not have side effects.");
});

QUnit.test("_.some()", function(assert){
  var inputData = [2,4,6,7,8];
  var inputDataTruthy = [1, [], true, "a"];
  var inputDataFalsy = ["",0,false,null];
  var inputObject = {a:"one",b:"two",c:"three"};
  assert.deepEqual(_.some(inputData, function(v){
      return v === 7;
  }) , true, "Should return true when at least one iteration is true");
  assert.deepEqual(_.some(inputData, function(v){
      return v > 10;
  }) , false, "Should return false when no iterations are true");
  assert.deepEqual(_.some(inputObject, function(v,k,o){
      return ["aone3","btwo3"].indexOf(k+v+Object.keys(o).length) !== -1;
  }), true, "Should handle objects");
  assert.deepEqual(_.some(inputDataTruthy), true, "Should return true for truthy results when no function is passed in.");
  assert.deepEqual(_.some(inputDataFalsy), false, "Should return false for falsy results when no function is passed in.");
  assert.deepEqual(inputData, [2,4,6,7,8], "Should not have side effects.");
});

QUnit.test("_.reduce()", function(assert){
  var inputArray = [10,20,30,40];

  assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
      return memo + element + i;
  }, 10), 116, "Should work with an array and a seed");
  assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
      return memo * element * (i+1);
  }), 5760000, "Should work without a seed");
  assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
      return memo * element * (i+1);
  }, 0), 0, "Should work when seed is falsy");
  assert.deepEqual(inputArray, [10,20,30,40], "Should not have side effects");
});

QUnit.test("_.extend()", function(assert){
  var inputData = {a:"one", b:"two"};
  _.extend(inputData, {c: "three", d: "four"});
  assert.deepEqual(inputData, {a: "one",b:"two",c:"three",d:"four"}, "Should extend an object.");
  inputData = {a:"one", b:"two"};
  _.extend(inputData, {a: "three", d: "four"});
  assert.deepEqual(inputData, {a: "three",b:"two",d:"four"} , "Should overwrite existing properties");
  inputData = {a:"one", b:"two"};
  _.extend(inputData);
  assert.deepEqual(_.extend(inputData, {a:"three",c:"four"}, {d:"five",c:"six"}), {a:"three",b:"two",c:"six",d:"five"}, "Should handle any number of arguments.");