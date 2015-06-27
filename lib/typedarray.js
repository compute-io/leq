'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isString = require( 'validate.io-string-primitive' );


// FUNCTIONS //

var LEQ = require( './element.js' );


// LESS THAN OR EQUAL TO //

/**
* FUNCTION: leq( out, arr, y )
*	Computes an element-wise comparison (less than or equal to) of a typed array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function leq( out, arr, y ) {
	var len = arr.length,
		i;

	if ( isTypedArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'leq()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
				out[ i ] = LEQ( arr[ i ], y[ i ] );
		}
	} else if ( isArrayLike( y ) && !isString( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'leq()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof y[ i ] === 'number' || typeof y[ i ] === 'string' ) {
				out[ i ] = LEQ( arr[ i ], y[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if (  typeof y === 'number' || typeof y === 'string' ) {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = LEQ( arr[ i ], y );
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION leq()


// EXPORTS //

module.exports = leq;
