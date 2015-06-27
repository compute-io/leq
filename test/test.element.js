/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	leq = require( './../lib/element.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'element leq', function tests() {

	it( 'should export a function', function test() {
		expect( leq ).to.be.a( 'function' );
	});

	it( 'should correctly compare different values', function test() {
		assert.strictEqual( leq( 2, 4 ), 1 );
		assert.strictEqual( leq( 2, 2 ), 1 );

		assert.strictEqual( leq( 900, 800 ), 0 );
		assert.strictEqual( leq( 900, 900 ), 1 );

		assert.strictEqual( leq( 'A', 'C' ), 1 );
		assert.strictEqual( leq( 'A', 'A' ), 1 );
	});

});
