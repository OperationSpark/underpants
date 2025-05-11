describe("underpants library", () => {
  describe("_.identity()", () => {
    it('should return input value unchanged', () => {
      assert.strictEqual( _.identity(14), 14);
      assert.deepEqual( _.identity({a: "one"}), {a: "one"});
      assert.strictEqual(_.identity("hello there"), "hello there");
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
    it('should return the whole array if the number is greater than the length of the array', () => {
      assert.deepEqual(_.first(["a", "b", "c"], 5), ["a", "b", "c"]);
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
      assert.deepEqual(_.indexOf(inputData, "b"), 1);
    });
    it('should return -1 if the element is not found', () => {
      assert.deepEqual(_.indexOf(inputData, "e") , -1);
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, ["a","b","c","d", "b"]);
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
    beforeEach(() => {
      sinon.spy(console, 'log');
    });
  
    afterEach(() => {
      console.log.restore();
    });
    it('should handle arrays', () => {
      const inputArray = [1,2,3,4,5];
      const output = [];
      _.each(inputArray, function(e, i, a){
        output.push(e * 10);
      });
      assert.deepEqual(output, [10, 20, 30, 40, 50]);
      
    });
    it('should handle objects', () => {
      const inputObject = {a:"1",b:"2",c:"3",d:"4"};
      const output = [];
      _.each(inputObject, function(v, k, o){
        output.push(v + v);
      });
      assert.deepEqual(output, ["11", "22", "33", "44"]);
    });
    it('callback should take in current index as an argument if collection is an array', () => {
      const inputArray = ['a', 'b', 'c'];
      const logs = [0, 1, 2];
      const output = [];
      _.each(inputArray, function(e, i, a){
        console.log(i);
        output.push(e.toUpperCase());
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          console.dir('hit this');
          assert.equal(e[0], logs[i]);
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
    it('callback should take in array as an argument if collection is an array', () => {
      const inputArray = ['a', 'b', 'c'];
      const output = [];
      _.each(inputArray, function(e, i, a){
        console.log(a);
        output.push(e.toUpperCase());
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          assert.deepEqual(e[0], ['a', 'b', 'c']);
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
    it('callback should take in current key as an argument if collection is an object', () => {
      const inputObject = { a: "one", b: "two" };
      const logs = ["a", "b"];
      _.each(inputObject, (v, k, o) => {
        console.log(k);
        inputObject[k] = inputObject[k].toUpperCase();
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          assert.deepEqual(e[0], logs[i]);
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
    it('callback should take in object as an argument if collection is an object', () => {
      const inputObject = { a: "one", b: "two" };
      const output = [];
      _.each(inputObject, (v, k, o) => {
        console.log(o);
        output.push(inputObject[k].toUpperCase());
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          assert.deepEqual(e[0], { a: 'one', b: 'two'});
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
  });

  describe("_.unique()", () => {
    const inputData = ["a",1,1,"a","c",false,"b",5,"c",null,false,null];
    it('should return an array with no duplicates', () => {
      assert.deepEqual(_.unique(inputData),["a",1,"c",false,"b",5,null]);
    });
    it('should invoke _.indexOf() method', () => {
      const func = _.unique.toString();
      assert.equal(func.includes("_.indexOf("), true);
    })
    it('should not have side effects', () => {
      assert.deepEqual(inputData, ["a",1,1,"a","c",false,"b",5,"c",null, false, null]);
    });
  });

  describe("_.filter()", () => {
    beforeEach(() => {
      sinon.spy(console, 'log');
    });
  
    afterEach(() => {
      console.log.restore();
    });

    const inputData = ["a",1,"b",2,"c",4];

    it('should filter elements in an array', () => {
      assert.deepEqual(_.filter(inputData, (e,i,a) => {
        return typeof e === "string";
      }), ["a","b", "c"]);
    });
    it('callback function should take in the current index as one of its arguments', () => {
      const input = ['a', 'b', 'aa'];
      const logs = [0, 1, 2]
      _.filter(input, (e, i, a) => {
        console.dir("current test: " + i);
        console.log(i);
        return e.length === 1;
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          assert.equal(e[0], logs[i]);
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
    it('callback function should take in the array as one its arguments', () => {
      const input = ['a', 'b', 'aa'];
      _.filter(input, (e, i, a) => {
        console.log(a);
        return e.length === 1;
      });
      if (console.log.args.length){
        console.log.args.forEach((e, i) => {
          assert.deepEqual(e[0], ['a', 'b', 'aa']);
        });
      } else {
        assert.equal(console.log.args.length > 0, true);
      }
    });
    it('should not have side effects', () => {
      assert.deepEqual(inputData, ["a",1,"b",2,"c",4]);
    })
  });

});