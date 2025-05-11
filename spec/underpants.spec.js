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

});