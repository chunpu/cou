var is = require('min-is')

var slice = [].slice

var _ = exports

_.is = is

_.extend = _.assign = extend

_.each = each

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

_.every = function(arr, fn) {
	return -1 == findIndex(arr, negate(fn))
}

_.reduce = reduce

_.findIndex = findIndex

_.find = function(arr, fn) {
	var index = _.findIndex(arr, fn)
	if (-1 != index) {
		return arr[index]
	}
}

_.indexOf = indexOf

_.includes = function(val, sub) {
	return -1 != indexOf(val, sub)
}

_.toArray = toArray

_.slice = function(arr, start, end) {
	var ret = []
	var len = getLength(arr)
	if (len) {
		start = start || 0
		end = end || len
		if (!(arr instanceof Object)) {
			// IE8- dom object
			arr = toArray(arr)
		}
		ret = slice.call(arr, start, end)
	}
	return ret
}

_.negate = negate

_.forIn = forIn

_.keys = keys

_.size = function(arr) {
	var len = getLength(arr)
	if (null == len) {
		len = keys(arr).length
	}
	return len
}

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

_.trim = function(str) {
	if (null == str) return ''
	return ('' + str).replace(rtrim, '')
}

_.noop = function() {}

function getLength(arr) {
	if (null != arr) return arr.length
}

function each(arr, fn) {
	var len = getLength(arr)
	if (len && is.fn(fn)) {
		for (var i = 0; i < len; i++) {
			if (false === fn(arr[i], i, arr)) break
		}
	}
	return arr
}

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

function toArray(arr) {
	var ret = []
	each(arr, function(item) {
		ret.push(item)
	})
	return ret
}


function extend(target) {
	if (target) {
		var sources = slice.call(arguments, 1)
		each(sources, function(src) {
			forIn(src, function(val, key) {
				if (!is.undef(val)) {
					target[key] = val
				}
			})
		})
	}
	return target
}

function negate(fn) {
	return function() {
		return !fn.apply(this, arguments)
	}
}

function indexOf(val, sub) {
	if (is.str(val)) return val.indexOf(sub)

	return findIndex(val, function(item) {
		// important!
		return sub === item
	})
}

function reduce(arr, fn, prev) {
	each(arr, function(item, i) {
		prev = fn(prev, item, i, arr)
	})
	return prev
}

function forIn(hash, fn) {
	each(keys(hash), function(key) {
		return fn(hash[key], key, hash)
	})
	return hash
}

function keys(hash) {
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

