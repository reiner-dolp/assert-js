"use strict";

export function ASSERT(condition, msg) { 
	if (!condition) {
		msg = msg || "";

		msg = "[ASSERTION FAILED] " + msg;

		var error;

		if (typeof Error !== "undefined") {
			error = new Error(msg);
		}

		if(ASSERT.eventEmitter) {
			ASSERT.eventEmitter.emit("assertionFailure", error || msg);
		}

		throw error || msg;
	}
}

export function ASSERT_NOT_REACHED() {
	ASSERT(false, "in state asserted not to be reached");
}


export function ASSERT_IS_INT(v, msg) {
	ASSERT(is_int(v), msg || "Expected an integer, got <" + typeof v + "> instead");
}

export function ASSERT_IS_INT_IN_RANGE(v, range, msg) {
	ASSERT(is_int_in_range(v, range), msg || "Expected an integer in ["+range[0]+","+range[1]+"),"
	       + "got <" + (~~v===v ? v : typeof v) + "> instead");
}

export function ASSERT_IS_NON_NEGATIVE_INT(v, msg) {
	ASSERT(is_non_negative_int(v), msg || "Expected a non negative integer, got <" + typeof v + "> instead");
}

export function ASSERT_IS_POSITIVE_INT(v, msg) {
	ASSERT(is_positive_int(v), msg || "Expected a positive integer, got <" + typeof v + "> instead");
}

export function ASSERT_IS_ARRAY(v, msg) {
	ASSERT(is_array(v), msg || "Expected an array, got <" + typeof v + "> instead");
}

export function ASSERT_IS_FUNC(v, msg) {
	ASSERT(is_func(v), msg || "Expected a function, got <" + typeof v + "> instead");
}

export function ASSERT_IS_STRING(v, msg) {
	ASSERT(is_string(v), msg || "Expected a string, got <" + typeof v + "> instead");
}

export function ASSERT_IS_UNDEF(v, msg) {
	ASSERT(is_undef(v), msg || "Expected undefined or null, got <" + typeof v + "> instead");
}

export function ASSERT_IS_OBJ(v, msg) {
	ASSERT(is_obj(v), msg || "Expected an object, got <" + (v === null ? "null" : typeof v) + "> instead");
}

export function ASSERT_IS_NUM(v, msg) {
	ASSERT(is_num(v), msg || "Expected a number, got <" + typeof v + "> instead");
}

export function ASSERT_IS_CTOR(a, b, msg) {
	ASSERT(is_ctor(a,b), msg || "Constructor called without `new` or wrong binding of this.");
}

export function is_int(val) { 
	return ~~val === val;
}

export function is_int_in_range(val, range) { 
	return ~~val === val && val >= range[0] && val < range[1];
}

export function is_positive_int(val) { 
	return ~~val === val && val > 0;
}

export function is_non_negative_int(val) { 
	return ~~val === val && val >= 0;
}

export function is_array(val) { 
	return Object.prototype.toString.call(val) === '[object Array]';
}

export function is_func(val) { 
	return val && val.constructor && val.call && val.apply;
}

export function is_string(val) { 
	return typeof val === "string" || val instanceof String;
}

export function is_undef(val) { 
	return val === void 0 || val === null;
}

export function is_num(val) { 
	return typeof val === "number" && val < Infinity && val > -Infinity;
}

export function is_typed_array(val) { 
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

export function is_obj(val, msg) { 
	return val !== null && typeof val === 'object';
}

export function is_ctor(self, selfname) { 
	return self instanceof selfname;
}

