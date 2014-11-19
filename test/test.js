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

	it( 'should throw an error if a comparison value which is not an array of equal length, number, or string', function test() {
		var values = [
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
				leq( [], value );
			};
		}
	});

	it( 'should throw an error if not provided a comparison array of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			leq( [1,2], [1,2,3] );
		}
	});

	it( 'should correctly compare values', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		// Single numeric value:
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

});
