var is = require('min-is')

var _ = exports

_.is = is

/*
var stopKey = 'stopOnFalse'

function each(arr, fn, custom) {
	if (!is.fn(fn) || !is.arraylike(arr)) return

	var len = arr.length
	var opt = extend({}, custom)

	if (custom) {
		var ints = ['from', 'end', 'step']
		for (var i = 0; i < ints.length; i++) {
			var val = +opt[ints[i]]
			if (!is.int(val)) val = undefined
			opt[ints[i]] = val
		}
	}

	var from = opt.from || 0
	var end = opt.end || len
	var step = opt.step || 1

	if (custom) {
		if (from < 0) from = 0
		if (end > len) end = len
		if (from + step * Infinity <= end) return arr // cannot finish
	}

	for (var i = from; i < end; i += step) {
		var ret
		if (opt.context) {
			ret = fn.call(opt.context, arr[i], i, arr)
		} else {
			ret = fn(arr[i], i, arr)
		}
		// default is stop on false
		if (false !== opt[stopKey] && false === ret) break
	}

	return arr
}
*/
function each(arr, fn, start, end) {
	var len = arr ? arr.length : 0
	if (len && fn && 'call' in fn) {
		start = start || 0
		end = end || len
		for (var i = start; i < end; i++) {
			if (false === fn())
		}
	}
}

_.each = each

_.findIndex = findIndex

function findIndex(arr, fn) {
	var ret = -1
	each(arr, function(item, i, arr) {
		if (fn(item, i, arr)) {
			ret = i
			return false
		}
	})
	return ret
}

_.map = function(arr, fn) {
	var ret = []
	each(arr, function(item, i, arr) {
		ret[i] = fn(item, i, arr)
	})
	return ret
}

_.filter = function(arr, fn) {
	var ret = []
	each(arr, function(item, i, arr) {
		var val = fn(item, i, arr)
		if (val) ret.push(item)
	})
	return ret
}

_.some = function(arr, fn) {
	return -1 != findIndex(arr, fn)
}

function negate(fn) {
	return function() {
		return !fn.apply(this, arguments)
	}
}

_.every = function(arr, fn) {
	return -1 == findIndex(arr, negate(fn))
}

_.find = function(arr, fn) {
	var index = _.findIndex(arr, fn)
	if (-1 != index) {
		return arr[index]
	}
}

_.without = function(arr) {
	var other = _.slice(arguments, 1)
	return _.difference(arr, other)
}

_.difference = function(arr, other) {
	return _.filter(arr, function(item) {
		return !_.has(other, item)
	})
}

function slice(arr, from, end) {
	var ret = []
	each(arr, function(item) {
		ret.push(item)
	}, {
		  from: from
		, end: end
	})
	return ret
}

_.slice = slice

function indexOf(val, sub) {
	if (is.str(val)) return val.indexOf(sub)

	return findIndex(val, function(item) {
		return sub == item
	})
}

function has(val, sub) {
	return -1 != indexOf(val, sub)
}

_.has = has

function reduce(arr, fn, prev) {
	each(arr, function(item, i) {
		prev = fn(prev, item, i, arr)
	})
	return prev
}

_.reduce = reduce

_.only = function(obj, keys) {
	obj = obj || {}
	if (is.str(keys)) keys = keys.split(/ +/)
	return reduce(keys, function(ret, key) {
		if (null != obj[key]) ret[key] = obj[key]
		return ret
	}, {})
}


// Object

function extend(dst) {
	var len = arguments.length
	if (dst && len > 1) {
		for (var i = 1; i < len; i++) {
			var hash = arguments[i]
			if (hash) {
				for (var key in hash) {
					if (is.owns(hash, key)) {
						var val = hash[key]
						if (is.undef(val) || val === dst[key] || val === dst) continue
						dst[key] = val
					}
				}
			}
		}
	}
	return dst
}

_.keys = function(hash) {
	var ret = []
	if (hash) {
		for (var key in hash) {
			if (is.owns(hash, key)) {
				ret.push(key)
			}
		}
	}
	return ret
}

// String

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

_.trim = function(str) {
	if (null == str) return ''
	return ('' + str).replace(rtrim, '')
}

_.noop = function() {}
