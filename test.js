var _ = require('./')
var assert = require('assert')

describe('extend', function() {
	it('should basic extend', function() {
		var a = {a: 1, b: 2}
		var ret = _.extend(a, {b: 3, c: undefined}, {d: 5})
		assert(ret === a)
		assert.deepEqual(ret, {a: 1, b: 3, d: 5})
	})
	it('always return first', function() {
		var arr = [0, null, {}, false]
		for (var i = 0; i < arr.length; i++) {
			assert.deepEqual(_.extend(arr[i]), arr[i])
		}
	})
	it('not crash when get shit', function() {
		var ret = _.extend(null, {foo: true})
		assert.deepEqual(ret, null)
	})
	it('should work on this', function() {
		var obj = {
			add: function(val) {
				_.extend(this, val)
			}
		}
		obj.add({foo: true})
		assert(true == obj.foo)
	})
})

describe('each', function() {
	it('never run empty', function() {
		var arr = [{}, [], 0, false, NaN]
		for (var i = 0; i < arr.length; i++) {
			_.each(arr[i], function() {
				assert(false, 'never access')
			})
		}
	})
	it('should iterate all', function() {
		var ret = []
		var arr = [1, 2, 3]
		_.each(arr, function(x, i, arr2) {
			assert(arr === arr2)
			assert(arr[i] === x)
			ret.push(x)
		})
		assert.deepEqual(ret, arr)
	})
	it('cannot crash when fn is shit', function() {
		_.each([1, 2, 3])
		assert(true)
	})
	it('always return arguments[0]', function() {
		var arr = [1, 2, 3]
		assert(arr === _.each(arr, _.noop))
		assert(null === _.each(null))
	})
})

describe('map', function() {
	it('should map array', function() {
		var arr = _.map([1, 2, 3], function(x) {
			return 2 * x
		})
		assert.deepEqual([2, 4, 6], arr)
	})
})

describe('filter', function() {
	it('should filter unmatch', function() {
		assert.deepEqual(_.filter([1, 2, 3, 4, 5], function(x) {
			return x > 3
		}), [4, 5])
	})
})

describe('some', function() {
	it('should return true', function() {
		assert(true === _.some([1, 2, 3, 4, 5], function(x) {
			return x > 3
		}))
	})
	it('should return false', function() {
		assert(false === _.some([1, 2, 3, 4, 5], function(x) {
			return x > 6
		}))
	})
})

describe('every', function() {
	it('should return true', function() {
		assert(true === _.every([1, 2, 3, 4, 5], function(x) {
			return x > 0
		}))
	})
	it('should return false', function() {
		assert(false === _.every([1, 2, 3, 4, 5], function(x) {
			return x > 3
		}))
	})
})

describe('reduce', function() {
	it('can realize sum', function() {
		function sum(arr) {
			return _.reduce(arr, function(ret, val) {
				return ret + val
			}, 0)
		}
		assert(10 == sum([1, 2, 3, 4]))
	})
})

describe('findIndex', function() {
	it('should find first matched item', function() {
		assert.equal(2, _.findIndex([1, 2, 3, 4, 5], function(x) {
			return x >= 3
		}))
	})
	it('should find nothing', function() {
		assert.equal(-1, _.findIndex([1, 2, 3, 4, 5], function(x) {
			return x >= 10
		}))
	})
})

describe('find', function() {
	it('should find first matched item', function() {
		assert.equal(3, _.find([1, 2, 3, 4, 5], function(x) {
			return x >= 3
		}))
	})
	it('should find nothing', function() {
		assert.equal(undefined, _.find([1, 2, 3, 4, 5], function(x) {
			return x >= 10
		}))
	})
})

describe('indexOf', function() {
	it('should return index', function() {
		assert(-1 == _.indexOf([1, 2, 3], 4))
		assert(-1 == _.indexOf([1, 2, 3], [1]))
		assert(-1 == _.indexOf([1, 2, 3], '1'))
		assert(1 == _.indexOf([1, 2, 3], 2))
	})
})

describe('toArray', function() {
	it('should turn array like to array', function() {
		var is = require('min-is')
		function test() {
			var arr = _.toArray(arguments)
			assert(is.array(arr))
			assert(arguments.length == arr.length)
		}

		test()
		test(1, 2, 3)
	})
	it('should always return a new array', function() {
		var arr = [1, 2, 3]
		var arr2 = _.toArray(arr)
		assert(arr2 != arr)
		assert.deepEqual(arr2, arr)
	})
})

describe('has', function() {
	it('should return true', function() {
		assert(true === _.has('qwer', 'we'))
		assert(true === _.has([1, 2, 3], 2))
	})
	it('should return false', function() {
		assert(false === _.has('qwer', 'ew'))
		assert(false === _.has([1, 2, 3], 4))
	})
})

describe('slice', function() {
	it('should create a new array', function() {
		var arr = [1, 2, 3, 4]
		var slice = _.slice(arr)
		assert(arr !== slice)
		assert.deepEqual(arr, slice)
	})
	it('should return rest when only giving begin', function() {
		var arr = [1, 2, 3, 4]
		var slice = _.slice(arr, 1)
		assert.deepEqual(slice, [2, 3, 4])
	})
	it('should return empty array when param is shit', function() {
		assert.deepEqual(_.slice(), [])
		assert.deepEqual(_.slice([1, 2, 3], 3, 2), [])
	})
	it('should auto adjust when out of range', function() {
		assert.deepEqual(_.slice([1, 2, 3], -1, 100), [3])
	})
})

describe('negate', function() {
	it('always return negate', function() {
		function isMatch3(val) {
			return 3 == val
		}
		var isNotMatch3 = _.negate(isMatch3)
		assert(true == isNotMatch3(2))
		assert(false == isNotMatch3(3))
	})
})

describe('keys', function() {
	it('should return key in hash, and hash owns key', function() {
		function Ctor() {}
		Ctor.prototype.foo = 'bar'
		var hash = new Ctor
		hash.key = 'val'
		assert.deepEqual(_.keys(hash), ['key'])
	})
})

describe('trim', function() {
	it('should ok', function() {
		assert(_.trim('  qq  ') == 'qq')
		assert(_.trim('   ') === '')
		assert(_.trim('') === '')
		assert(_.trim(true) === 'true')
		assert.equal(_.trim(NaN), 'NaN')
	})
	it('should return empty when meet null', function() {
		assert(_.trim() === '')
		assert(_.trim(null) === '')
	})
})

describe('noop', function() {
	it('always do nothing', function() {
		assert(undefined === _.noop())
	})
})
