var _ = require('./')
var assert = require('assert')

// Iteration

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
	it('run belong 0 ~ arr.length', function() {
		var arr = []
		_.each([1, 2, 3], function(val) {
			arr.push(val)
		}, {
			start: -100,
			end: 100
		})
		assert.deepEqual([1, 2, 3], arr)
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

describe('difference', function() {
	it('should return new array without other', function() {
		var arr = _.difference([1, 2, 3, 1, 2, 3], [1, 2])
		assert.deepEqual([3, 3], arr)
	})
})

describe('without', function() {
	it('should return new array without args', function() {
		var arr = _.without([1, 2, 3, 1, 2], 1)
		assert.deepEqual([2, 3, 2], arr)
	})
})

