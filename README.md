__A very simple assertion library to ensure pre conditions, post conditions and
invariants are adhered to.__ Note that this is a browser package and not a
package for _node.js_. _node.js_ has its
own [assertion package](https://nodejs.org/api/assert.html).

## API

All assertion methods take the variable to test as first argument, and an
optional error message as second argument:

```js
assert(condition, msg)
assert.is_int(val, msg)
assert.is_undefined(val, msg)
assert.is_func(val, msg)
assert.is_numeric(val, msg)
assert.is_array(val, msg)
assert.is_string(val, msg)
assert.is_object(val, msg)

assert.is_ctor (self, selfname)
assert.not_reached(msg)
```

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
	assert.is_ctor(this, ImgRegion);
	assert.is_object(opts);

	// is a natural number:
	assert.is_int(opts.width);
	assert(opts.width >= 0);

	assert.is_int(opts.height);
	assert(opts.height >= 0);

	// alternate shorthand notation:
        assert.is_int(opts.offsetX, [0,Infinity]);
        assert.is_int(opts.offsetY, [0,Infinity]);

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
        assert.is_int(opts.width,   [0,Infinity]);
        assert.is_int(opts.height,  [0,Infinity]);
        assert.is_int(opts.offsetX, [0,Infinity]);
        assert.is_int(opts.offsetY, [0,Infinity]);

        this.width   = opts.width;
        this.height  = opts.height;
        this.offsetX = opts.offsetX;
        this.offsetY = opts.offsetY;
    }
}
```

## Using an EventEmitter

If you include an EventEmitter package (e.g. [EventEmitter3](https://github.com/primus/eventemitter3)) first, you can call
`assert.eventEmitter.addListener("assertion failure", myLoggerFunc)`, where
`myLoggerFunc` is one of your functions. 
