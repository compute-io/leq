'use strict';

// LESS THAN OR EQUAL TO //

/**
* FUNCTION: leq( x, y )
*	Checks whether input element x is less than or equal to y
*
* @param {Number|String} x - input value
* @param {Number|String} y - comparator
* @returns {Number} 1 if x is less than or equal to y, 0 otherwise
*/
function leq( x, y ) {
		return x <= y ? 1 : 0;
} // end FUNCTION leq()

// EXPORTS //

module.exports = leq;
