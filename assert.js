function assert(condition, msg) { "use strict";

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
}

if(typeof EventEmitter !== "undefined") {
	assert.eventEmitter = new EventEmitter();
}

function is_int(val) { "use strict";
	return ~~val === val;
}
function is_array(val) { "use strict";
	return Object.prototype.toString.call(val) === '[object Array]';
}

function is_func(val) { "use strict";
	return val && val.constructor && val.call && val.apply;
}

function is_typed_array(val) { "use strict";
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

function is_string(val) { "use strict";
	return typeof val === "string" || val instanceof String;
}

assert.not_reached = function(msg) { "use strict";
	assert(false, msg || "reached code that is asserted to never be reached");
};

assert.is_int = function(val, msg) { "use strict";
	assert(is_int(val), msg || "expected variable to be an integer");
};

assert.is_undefined = function(val, msg) { "use strict";
	assert(typeof val === "undefined", msg || "expected variable to be undefined");
};

assert.is_func = function(val, msg) { "use strict";
	assert(is_func(val), msg || "expected variable to be a function");
};

assert.is_function = assert.is_func;

assert.is_numeric = function(val, msg) { "use strict";
	// more permissive with strings etc:
	//!isNaN(parseFloat(n)) && isFinite(n);
	assert(typeof val === "number", msg || "expected number, got " + typeof val);
};

assert.is_num = assert.is_numeric;

assert.is_array = function(val, msg) { "use strict";
	assert(is_array(val) || is_typed_array(val), msg || "expected variable to be of type array");
};

assert.is_arr = assert.is_array;

assert.is_string = function(val, msg) { "use strict";
	assert(typeof val === 'string', msg || "expected variable to be of type string. Got " + typeof val + "instead.");
};

assert.is_str = assert.is_string;

assert.is_object = function(val, msg) { "use strict";
	assert(val !== null && typeof val === 'object', msg || "expected variable to be of type object");
};

assert.is_ctor = function (self, selfname) { "use strict";
	var msg_shortname = selfname.toString().length > 120 ? selfname.toString().substring(0, 120 - 3) + "..." : selfname;
	assert(self instanceof selfname, "function <" + msg_shortname + "> has to be called as constructor");
};
