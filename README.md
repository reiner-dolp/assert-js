__A simple assertion library to ensure pre conditions, post conditions and
invariants are correct.__ Supports automatic removal of assertion calls
from production builds. 

---
<p align=center><strong>Table of Contents</strong></p>

1. [API Overview](#api)
2. [Usage Example](#usage-example)
3. [Usage Example in Typescript](#usage-example-in-typescript)
4. [Usage Example in Typescript using ES6 Modules](#usage-example-in-typescript-using-es6-modules)
5. [Usage Example with Webpack](#usage-example-with-webpack)
6. [Automatic Assertion Removal](#automatic-assertion-removal)
7. [Usage with an Event Emitter](#usage-with-an-eventemitter)

---

## API

| Function Signature | Description |
|--------------------|-------------|
| `ASSERT(cond[, msg])` | throws an error (and optionally emits an event) if condition is `false`. An optional error message may be passed as second argument. |
| `ASSERT_NOT_REACHED()` | always throws an error (and optionally emits an event). |
| `IN_DEVELOPMENT_ONLY(fn)` | `fn` is only executed in development environments. See *usage with the C preprocessor* below. |

| Function Signature | Description |
|--------------------|-------------|
| `is_num(v)` | true if the given value is a finite number. therefore `is_num(infinity)`, `is_num(nan)` and `is_num("1")` are `false`. `is_num(-1)`, `is_num(1)` and `is_num(42.42)` are `true`. |
| `is_int(v)` | like `is_num`, but only `true` for integers. |
| `is_int_in_range(v, range)` | like `is_num`, but restricted to the range `[a, b]`. |
| `is_non_negative_int(v)` | `true` for integers greater than or equal to zero. |
| `is_positive_int(v)` | `true` for integers greater than zero. |
| `is_array(v)` | `true` for arrays. `false` for typed arrays. |
| `is_func(v)` | returns `true` if the given argument is a function. |
| `is_string(v)` | returns to `true` for strings and string objects. |
| `is_undef(v)` | evaluates to `true` for `null` and `undefined`. |
| `is_obj(v)` | evaluates to `true` for values that are not `null` or `undefined`. |
| `is_ctor(this, classref)` | `true` if the function was called with `new`, `false` if it was omitted. |

There are shorthand notations that are equivalent to calling a boolean function and asserting its return value.
They should be used in most cases, as they provide better default error messages:

| Function Signature | Call Target |
|--------------------|-------------|
| `ASSERT_IS_INT(v [, msg])` | is_int |
| `ASSERT_IS_INT_IN_RANGE(v, range, [, msg])` | is_int_in_range |
| `ASSERT_IS_NON_NEGATIVE_INT(v [, msg])` | is_non_negative_int |
| `ASSERT_IS_POSITIVE_INT(v [, msg])` | is_positive_int |
| `ASSERT_IS_ARRAY(v [, msg])` | is_array |
| `ASSERT_IS_FUNC(v [, msg])` | is_func |
| `ASSERT_IS_STRING(v [, msg])` | is_string |
| `ASSERT_IS_UNDEF(v [, msg])` | is_undef |
| `ASSERT_IS_OBJ(v [, msg])` | is_obj |
| `ASSERT_IS_NUM(v) [, msg]` | is_num |
| `ASSERT_IS_CTOR(this, classref [, msg])` | is_ctor |

Uppercase function calls will be stripped from the source code if you compile the code with
a C preprocessor. Lowercase function calls are not stripped.

## Usage Example

```js
/**
 * Instantiate a new data object representing a rectangular raster image
 * region.
 *
 * All options given can later be read using the same property name.
 * Note that the constructor can be used as copy constructor:
 *
 * ```js
 * new ImgRegion(new ImageRegion({ ... }));
 * ```
 *
 * @param {int} opts.width   the width of the image region
 *
 * @param {int} opts.height  the height of the image region
 * 
 * @param {int} opts.offsetX the position of the image region
 *                           relative to origin in x-direction.
 *
 * @param {int} opts.offsetY the position of the image region
 *                           relative to origin in y-direction.
 */
function ImgRegion(opts) {
	ASSERT_IS_CTOR(this, ImgRegion)
	ASSERT_IS_OBJ(opts)
	ASSERT_IS_POSITIVE_INT(opts.width)
	ASSERT_IS_POSITIVE_INT(opts.height)
	ASSERT_IS_NON_NEGATIVE_INT(opts.offsetX)
	ASSERT_IS_NON_NEGATIVE_INT(opts.offsetY)

	this.width   = opts.width;
	this.height  = opts.height;
	this.offsetX = opts.offsetX;
	this.offsetY = opts.offsetY;
}
```

`assert.is_ctor` ensures that the function is called using the `new` keyword.
Note that semicolons are optional in javascript. The code above is valid
javascript without a compilation step.

## Usage Example in Typescript

```js
/// <reference types="assert-js"/>

/**
 * Instantiate a new data object representing a rectangular raster image
 * region.
 *
 * All options given can later be read using the same property name.
 * Note that the constructor can be used as copy constructor:
 *
 * ```js
 * new ImgRegion(new ImageRegion({ ... }));
 * ```
 *
 * @param {int} opts.width   the width of the image region
 *
 * @param {int} opts.height  the height of the image region
 * 
 * @param {int} opts.offsetX the position of the image region
 *                           relative to origin in x-direction.
 *
 * @param {int} opts.offsetY the position of the image region
 *                           relative to origin in y-direction.
 */
export class ImgRegion {

    readonly width   :number;
    readonly height  :number;
    readonly offsetX :number;
    readonly offsetY :number;
    
    constructor(opts : {
        width:   number,
        height:  number,
        offsetX: number,
        offsetY: number
    }) {
	ASSERT_IS_POSITIVE_INT(opts.width)
	ASSERT_IS_POSITIVE_INT(opts.height)
	ASSERT_IS_NON_NEGATIVE_INT(opts.offsetX)
	ASSERT_IS_NON_NEGATIVE_INT(opts.offsetY)

        this.width   = opts.width;
        this.height  = opts.height;
        this.offsetX = opts.offsetX;
        this.offsetY = opts.offsetY;
    }
}
```
## Usage Example in Typescript using ES6 Modules

```js
import {ASSERT} from 'assert-js/es6';
ASSERT("something");
```

## Usage Example with Webpack

As Webpack supports the ES6 module syntax, you can use the import-from-syntax
shown above. You can get rid of the `/es6` suffix, by adding an alias to
your `webpack.config.js`:

```js
/* ... */
resolve: {
	alias: {
		"assert-js": "assert-js/es6.js"
	}
},
/* ... */
```

```js
import {ASSERT} from 'assert-js';
ASSERT("something");
```

#Automatic Assertion Removal

You can automatically remove all assertion calls from your source code using
the [C preprocessor](https://en.wikipedia.org/wiki/C_preprocessor). To do this
execute the following command for each source file:

```
gcc -E -D UNCHECKED_PRODUCTION_BUILD -P -include assert.c -C -x c -o out.js input.js
```

The following code for example

```js
function is_positive(val) {
	ASSERT_IS_INT(val))
	return val > 0;
}
``` 
will be reduced to 

```js
function is_positive(val) {

	return val > 0;
}
```

You can also define your own functions, that will be removed in production
builds and called when the code was not preprocessed as follows:

```js
IN_DEVELOPMENT_ONLY(function() {
	console.info("this is not a production build!");
});
```

Calling the C preprocessor on the library file `assert.js` itself, will reduce
the file to

```js
var IN_DEVELOPMENT_ONLY = function(fn) {
	if(this.ASSERT) {
		fn();
	} else {
		console.warn('Call to <IN_DEVELOPMENT_ONLY> in production build. ' +
			     'Did you forget to compile some files?');
	}
};
```

This snippet will be removed by your minifier in production environments,
as all calls should have been removed by the preprocessor.

## Usage With an EventEmitter

If you include an EventEmitter package (e.g.
[EventEmitter3](https://github.com/primus/eventemitter3)) first, you can call
`assert.eventEmitter.addListener("assertion failure", myLoggerFunc)`, where
`myLoggerFunc` is one of your functions. 
