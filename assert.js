var IN_DEVELOPMENT_ONLY = function(fn) {
	if(this.ASSERT) {
		fn();
	} else {
		console.warn('Call to <IN_DEVELOPMENT_ONLY> in production build. ' +
			     'Did you forget to compile some files?');
	}
};

IN_DEVELOPMENT_ONLY((function (global) { global.ASSERT = true; return function() { "use strict";

	global.ASSERT = function assert(condition, msg) { 
		if (!condition) {
			msg = msg || "";

			assert.is_string(msg, "second argument to assert must be a string");

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

	global.IS_INT = function is_int(val) { 
		return ~~val === val;
	};

	global.IS_POSITIVE_INT = function is_positive_int(val) { 
		return ~~val === val && val > 0;
	};

	global.IS_NON_NEGATIVE_INT = function is_non_negative_int(val) { 
		return ~~val === val && val >= 0;
	};

	global.IS_ARRAY = function is_array(val) { 
		return Object.prototype.toString.call(val) === '[object Array]';
	};

	global.IS_FUNC = function is_func(val) { 
		return val && val.constructor && val.call && val.apply;
	};

	global.IS_STRING = function is_string(val) { 
		return typeof val === "string" || val instanceof String;
	}

	global.ASSERT_NOT_REACHED = function assert_not_reached() { 
		ASSERT(false, "reached code that is asserted to never be reached");
	};

	global.IS_UNDEF = function(val) { 
		return val === void 0 || val === null;
	};

	global.IS_NUM = function(val) { 
		return typeof val === "number";
	};

	global.IS_TYPED_ARRAY = function(val) { 
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
	};

	global.IS_OBJECT = function(val, msg) { 
		return val !== null && typeof val === 'object';
	};

	global.IS_CTOR = function (self, selfname) { 
		return self instanceof selfname;
	};

	if(typeof EventEmitter !== "undefined") {
		assert.eventEmitter = new EventEmitter();
	}
};})(this))

