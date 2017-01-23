__A simple assertion library to ensure pre conditions, post conditions and
invariants are correct.__ Supports automatic removal of assertion calls
from production builds. 

---

<p align=center><strong>Table of Contents</strong></p>

1. [API Overview](#api)
2. [Usage Example](#usage-example)
2. [Usage Example in Typescript](#usage-examples)
3. [Zero Runtime Overhead Using the C Preprocessor](#changelog)
3. [Usage with an Event Emitter](#using-an-eventemitter)

---

## API

| Function Signature | Description |
|--------------------|-------------|
| `ASSERT(cond)` | throws an error (and optionally emits an event) if condition is `false`.
| `ASSERT_NOT_REACHED()` | always throws an error (and optionally emits an event). |
| `IS_INT(v)` | `true` for integers. |
| `IS_NON_NEGATIVE_INT(v)` | `true` for integers greater than or equal to zero. |
| `IS_POSITIVE_INT(v)` | `true` for integers greater than zero. |
| `IS_ARRAY(v)` | `true` for arrays. `false` for typed arrays. |
| `IS_FUNC(v)` | returns `true` if the given argument is a function. |
| `IS_STRING(v)` | returns to `true` for strings and string objects. |
| `IS_UNDEF(v)` | evaluates to `true` for `null` and `undefined`. |
| `IS_OBJ(v)` | evaluates to `true` for values that are not `null` or `undefined`. |
| `IS_NUM(v)` | true if the given value is a finite number. Therefore `IS_NUM(Infinity)`, `IS_NUM(NaN)` and `IS_NUM("1")` are `false`. `IS_NUM(-1)`, `IS_NUM(1)` and `IS_NUM(42.42)` are `true`. |
| `IS_CTOR(this, classref)` | `true` if the function was called with `new`, `false` if it was omitted. |
| `IN_DEVELOPMENT_ONLY(fn)` | `fn` is only executed in development environments. See *usage with the C preprocessor* below. |

## Example Usage

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
	ASSERT(IS_CTOR(this, ImgRegion))
	ASSERT(IS_OBJ(opts))
	ASSERT(IS_POSITIVE_INT(opts.width))
	ASSERT(IS_POSITIVE_INT(opts.height))
	ASSERT(IS_NON_NEGATIVE_INT(opts.offsetX))
	ASSERT(IS_NON_NEGATIVE_INT(opts.offsetY))

	this.width   = opts.width;
	this.height  = opts.height;
	this.offsetX = opts.offsetX;
	this.offsetY = opts.offsetY;
}
```

`assert.is_ctor` ensures that the function is called using the `new` keyword.

## Example Usage in Typescript

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
	ASSERT(IS_POSITIVE_INT(opts.width))
	ASSERT(IS_POSITIVE_INT(opts.height))
	ASSERT(IS_NON_NEGATIVE_INT(opts.offsetX))
	ASSERT(IS_NON_NEGATIVE_INT(opts.offsetY))

        this.width   = opts.width;
        this.height  = opts.height;
        this.offsetX = opts.offsetX;
        this.offsetY = opts.offsetY;
    }
}
```

#Zero Runtime Overhead Using the C Preprocessor

You can automatically remove all assertion calls from your source code using
the [C preprocessor](https://en.wikipedia.org/wiki/C_preprocessor). To do this
execute:

```
gcc -E -D UNCHECKED_PRODUCTION_BUILD -P -include assert.c -C -x c -o out.js input.js
```

The following code for example

```js
function is_positive(val) {
	ASSERT(IS_INT(val))
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

## Using an EventEmitter

If you include an EventEmitter package (e.g. [EventEmitter3](https://github.com/primus/eventemitter3)) first, you can call
`assert.eventEmitter.addListener("assertion failure", myLoggerFunc)`, where
`myLoggerFunc` is one of your functions. 
