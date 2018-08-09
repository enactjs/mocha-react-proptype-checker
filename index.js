/* global console, beforeEach, afterEach, expect */
/* eslint no-var: off, no-console: ["error", { allow: ["error"] }] */

var spy = require('console-snoop');

var watchErrorAndWarnings = spy.watchErrorAndWarnings;
var filterErrorAndWarnings = spy.filterErrorAndWarnings;
var restoreErrorAndWarnings = spy.restoreErrorAndWarnings;

beforeEach(watchErrorAndWarnings);

afterEach(function(done) {
	var actual = filterErrorAndWarnings(/(Invalid prop|Failed prop type|Unknown prop|non-boolean attribute|Received NaN|Invalid value|React does not recognize)/);
	var expected = 0;
	restoreErrorAndWarnings();
	if (actual.length > expected) {
		console.error(`Errors/Warnings at:' ${this.currentTest.parent.title}, 'at ${this.currentTest.title}`);
	}
	expect(actual).to.have.length(expected);
	done();
});
