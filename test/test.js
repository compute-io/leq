/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	leq = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-leq', function tests() {

	it( 'should export a function', function test() {
		expect( leq ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				leq( value, 10 );
			};
		}
	});

	it( 'should throw an error if a comparison value which is not an array, number primitive, or string primitive', function test() {
		var values = [
			new Number( 5 ),
			new String( '5' ),
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				leq( [1,2,3], value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				leq( [1,2,3], 10, value );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			new Boolean( true ),
			{},
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				leq( [1,2,3], 10, {
					'copy': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				leq( [1,2,3], 10, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if not provided a comparison array of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			leq( [1,2], [1,2,3] );
		}
	});

	it( 'should not mutate an input array by default', function test() {
		var data, actual;

		data = [ 4, 5, 3, 6, 8 ];
		actual = leq( data, 4 );

		assert.ok( data !== actual );
	});

	it( 'should correctly compare values', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		// Single numeric comparator:
		actual = leq( data, 4 );
		expected = [ 1, 0, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		// Array of numeric values:
		actual = leq( data, [ 5, 5, 5, 5, 9 ] );
		expected = [ 1, 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );

		// Strings:
		actual = leq( data, '5' );
		expected = [ 1, 1, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		data = [ 'a', 'aa', 'aaa', 'b' ];

		actual = leq( data, 'aa' );
		expected = [ 1, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		actual = leq( data, [ 'aa', 'bb', 'aa', 'b' ] );
		expected = [ 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		actual = leq( data, 4, {
			'copy': false
		});
		expected = [ 1, 0, 1, 0, 0 ];

		assert.ok( data === actual );
		assert.deepEqual( actual, expected );
	});

	it( 'should correctly compare values using an accessor', function test() {
		var data, expected, actual;

		data = [
			[1,4],
			[2,5],
			[3,3],
			[4,6],
			[5,8]
		];

		// Single numeric comparator:
		actual = leq( data, 4, {
			'accessor': function getValue( d ) {
				return d[ 1 ];
			}
		});
		expected = [ 1, 0, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		// Single string comparator:
		data = [
			{'x': 'a'},
			{'x': 'aa'},
			{'x': 'aaa'},
			{'x': 'b'}
		];

		actual = leq( data, 'aa', {
			'accessor': function getValue( d ) {
				return d.x;
			}
		});
		expected = [ 1, 1, 0, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly compare values when provided a comparison array and using an accessor', function test() {
		var data, arr, expected, actual;

		data = [
			[1,4],
			[2,5],
			[3,3],
			[4,6],
			[5,8]
		];

		arr = [ 5, 5, 5, 5, 9 ];

		actual = leq( data, arr, {
			'accessor': function getValue( d ) {
				return d[ 1 ];
			}
		});
		expected = [ 1, 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );

		// Both arrays are accessed:
		arr = [
			{'x':5},
			{'x':5},
			{'x':5},
			{'x':5},
			{'x':9}
		];

		actual = leq( data, arr, {
			'accessor': function getValue( d, i, j ) {
				if ( j === 0 ) {
					return d[ 1 ];
				}
				return d.x;
			}
		});
		expected = [ 1, 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );
	});

});
