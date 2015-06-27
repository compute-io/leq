'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isString = require( 'validate.io-string-primitive' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );

// FUNCTIONS //

var leq1 = require( './element.js' ),
	leq2 = require( './array.js' ),
	leq3 = require( './accessor.js' ),
	leq4 = require( './matrix.js' ),
	leq5 = require( './typedarray.js' );

/**
* FUNCTION: fill( n, val )
*	Creates an array of length n and fills it with the supplied value
* @param {Number} n - array length
* @param {*} val - value to fill the array with
* @returns {Array} array of length n
*/
function fill( n, val ) {
	var ret = new Array( n );
	for ( var i = 0; i < n; i++ ) {
		ret[ i ] = val;
	}
	return ret;
}

// LESS THAN OR EQUAL TO //

/**
* FUNCTION: leq( x, y[, opts] )
*	Computes an element-wise comparison (less than or equal to)
*
* @param {Number|Number[]|String|String[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number|Number[]|String|String[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} y - comparator
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} 1s and 0s, where a `1` indicates that an input element is less than or equal to a compared value and `0` indicates that an input element is greater than a compared value
*/
function leq( x, y, options ) {

	var opts = {},
		err,
		out,
		d;

	if ( isNumber( x ) || isString( x ) ) {
		if ( options ) {
			throw new Error( 'leq()::options object is only applicable when first argument is array- or matrix-like. Value: `' + options + '`.' );
		}
		if ( isMatrixLike( y ) ) {
			// Create a matrix holding x's:
			d = new Float64Array( fill( y.length, x ) );
			x = matrix( d, y.shape, 'float64' );
			return leq( x, y );
		}
		if ( isArrayLike( y ) && !isString( y ) ) {
			return leq( fill( y.length, x ), y );
		}
		if ( !isNumber( y ) && !isString( y ) ) {
			return NaN;
		}
		return leq1( x, y );
	}

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( isMatrixLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = matrix( x.shape, 'uint8' );
		}
		out = leq4( out, x, y );
		return out;
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = new Uint8Array( x.length );
		}
		out = leq5( out, x, y );
		return out;
	}
	if ( isArrayLike( x ) && !isString( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			out = new Array( x.length );
		}
 		if ( opts.accessor ) {
			out = leq3( out, x, y, opts.accessor );
		} else {
			out = leq2( out, x, y );
		}
		return out;
	}
	return NaN;
} // end FUNCTION leq()


// EXPORTS //

module.exports = leq;
