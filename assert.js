var IN_DEVELOPMENT_ONLY = function(fn) {
	if(this.ASSERT) {
		fn();
	} else {
		console.warn('Call to <IN_DEVELOPMENT_ONLY> in production build. ' +
			     'Did you forget to compile some files?');
	}
};

((function (global) { "use strict";

IN_DEVELOPMENT_ONLY((function() { global.ASSERT = true; return function() {
	global.ASSERT = function assert(condition, msg) { 
		if (!condition) {
			msg = msg || "";

			msg = "[ASSERTION FAILED] " + msg;

			var error;

			if (typeof Error !== "undefined") {
				error = new Error(msg);
			}

			if(assert.eventEmitter) {
				assert.eventEmitter.emit("assertion failure", error || msg);
			}

			throw error || msg;
		}
	};

	if(typeof EventEmitter !== "undefined") {
		ASSERT.eventEmitter = new EventEmitter();
	}

	global.ASSERT_NOT_REACHED = function assert_not_reached() { 
		ASSERT(false, "in state asserted not to be reached");
	};


	global.ASSERT_IS_INT = function assert_is_int(v, msg) {
		ASSERT(is_int(v), msg || "Expected an integer, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_INT_IN_RANGE = function assert_is_int(v, range, msg) {
		ASSERT(is_int_in_range(v, range), msg || "Expected an integer in ["+range[0]+","+range[1]+"),"
		       + "got <" + (~~v===v ? v : typeof v) + "> instead");
	};

	global.ASSERT_IS_NON_NEGATIVE_INT = function assert_is_non_negative_int(v, msg) {
		ASSERT(is_non_negative_int(v), msg || "Expected a non negative integer, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_POSITIVE_INT = function assert_is_positive_int(v, msg) {
		ASSERT(is_positive_int(v), msg || "Expected a positive integer, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_ARRAY = function assert_is_array(v, msg) {
		ASSERT(is_array(v), msg || "Expected an array, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_FUNC = function assert_is_func(v, msg) {
		ASSERT(is_func(v), msg || "Expected a function, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_STRING = function assert_is_string(v, msg) {
		ASSERT(is_string(v), msg || "Expected a string, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_UNDEF = function assert_is_undef(v, msg) {
		ASSERT(is_undef(v), msg || "Expected undefined or null, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_OBJ = function assert_is_obj(v, msg) {
		ASSERT(is_obj(v), msg || "Expected an object, got <" + (v === null ? "null" : typeof v) + "> instead");
	};

	global.ASSERT_IS_NUM = function assert_is_num(v, msg) {
		ASSERT(is_num(v), msg || "Expected a number, got <" + typeof v + "> instead");
	};

	global.ASSERT_IS_CTOR = function assert_is_ctor(a, b, msg) {
		ASSERT(is_ctor(a,b), msg || "Constructor called without `new` or wrong binding of this.");
	};
};})());

function is_int(val) { 
	return ~~val === val;
}

function is_int_in_range(val, range) { 
	return ~~val === val && val >= range[0] && val < range[1];
}

function is_positive_int(val) { 
	return ~~val === val && val > 0;
}

function is_non_negative_int(val) { 
	return ~~val === val && val >= 0;
}

function is_array(val) { 
	return Object.prototype.toString.call(val) === '[object Array]';
}

function is_func(val) { 
	return val && val.constructor && val.call && val.apply;
}

function is_string(val) { 
	return typeof val === "string" || val instanceof String;
}

function is_undef(val) { 
	return val === void 0 || val === null;
}

function is_num(val) { 
	return typeof val === "number" && val < Infinity && val > -Infinity;
}

function is_typed_array(val) { 
	return val instanceof Int8Array ||
	       val instanceof Uint8Array ||
	       val instanceof Int8Array ||
	       val instanceof Uint8Array ||
	       val instanceof Uint8ClampedArray ||
	       val instanceof Int16Array ||
	       val instanceof Uint16Array ||
	       val instanceof Int32Array ||
	       val instanceof Uint32Array ||
	       val instanceof Float32Array ||
	       val instanceof Float64Array;
}

function is_obj(val, msg) { 
	return val !== null && typeof val === 'object';
}

function is_ctor(self, selfname) { 
	return self instanceof selfname;
}

if(typeof EXPOSE_BOOLEAN_FUNCTIONS === "undefined") {
	global.is_int = is_int;
	global.is_non_negative_int = is_non_negative_int;
	global.is_positive_int = is_positive_int;
	global.is_array = is_array;
	global.is_func = is_func;
	global.is_string = is_string;
	global.is_undef = is_undef;
	global.is_obj = is_obj;
	global.is_num = is_num;
	global.is_ctor = is_ctor;
	global.is_typed_array = is_typed_array;
}

})(this))

