__A very simple assertion library to ensure pre conditions, post conditions and
invariants are adhered to.__

---

Note that this is not a package for _[node.js](https://nodejs.org/api/assert.html)_. _node.js_
has its own [assertion package](https://nodejs.org/api/assert.html).

---


## API

All assertion methods take the variable to test as first argument, and an
optional error message as second argument:

```js
function assert(condition, msg)
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
 * new ImgRegion(new ImageRegion({ /* ... */ }));
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
	assert.is_int(opts.width);
	assert.is_int(opts.height);
	assert.is_int(opts.offsetX);
	assert.is_int(opts.offsetY);
	assert(opts.width >= 0);
	assert(opts.height >= 0);

	this.width   = opts.width;
	this.height  = opts.height;
	this.offsetX = opts.offsetX;
	this.offsetY = opts.offsetY;
}
```

`assert.is_ctor` ensures that the function is called using the `new` keyword.

## Using an EventEmitter

If you include an EventEmitter package (e.g. [1] [2] [3]) first, you can call
`assert.eventEmitter.addListener("assertion failure", myLoggerFunc)`, where
`myLoggerFunc` is one of your functions. 
