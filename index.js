/* global console, beforeEach, afterEach, expect */
/* eslint no-var: off, no-console: ["error", { allow: ["error"] }] */

var spy = require('console-snoop');

var watchErrorAndWarnings = spy.watchErrorAndWarnings;
var filterErrorAndWarnings = spy.filterErrorAndWarnings;
var restoreErrorAndWarnings = spy.restoreErrorAndWarnings;

beforeEach(watchErrorAndWarnings);

afterEach(function(done) {
	var actual = filterErrorAndWarnings();
	var expected = 0;
	restoreErrorAndWarnings();
	if (actual.length > expected) {
		actual.forEach(() => console.error(actual));
		console.error(`Errors/Warnings at:' ${this.currentTest.parent.title}, 'at ${this.currentTest.title}`);
	}
	expect(actual).to.have.length(expected);
	done();
});
